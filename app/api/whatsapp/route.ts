import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import {
  RETAIL_CATALOG,
  SOFTWARE_CATALOG,
  findLocalDeviceBySku,
  getDisplaySku,
  buildTechnicalSheet,
  buildComparisonSheet,
  evaluateSoftwareCompatibility,
  RetailDevice,
} from '@/lib/retailCatalog';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'lenovo_retail_bot_2026';

interface QuickReplyButton {
  id: string;
  title: string;
}

// 1. GET: Verificación del Webhook por parte de Meta
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] ✅ Verificación exitosa de Meta.');
    return new Response(challenge || '', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  console.warn('[WhatsApp Webhook] ❌ Verificación fallida. Token no coincide.');
  return new Response('Forbidden', { status: 403 });
}

// 2. POST: Recepción y procesamiento de mensajes de WhatsApp
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    // Si es una notificación de estado (entregado, leído) y no un mensaje nuevo, respondemos 200 OK
    if (!message) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    const from = message.from;
    const phoneId = value?.metadata?.phone_number_id || process.env.WHATSAPP_PHONE_NUMBER_ID || '1379220215265611';
    const whatsappToken = process.env.WHATSAPP_TOKEN;

    // Caso A: Clic en Botón de Respuesta Rápida (Quick Reply Button)
    if (message.type === 'interactive' && message.interactive?.type === 'button_reply') {
      const replyId = message.interactive.button_reply.id;
      const replyTitle = message.interactive.button_reply.title;
      console.log(`[WhatsApp Webhook] 🔘 Botón presionado de "${from}": [ID: ${replyId}, Título: ${replyTitle}]`);

      await handleInteractiveButtonClick(phoneId, from, replyId, whatsappToken);
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    // Caso B: Mensaje de Texto regular
    const textBody = message.text?.body?.trim();
    console.log(`[WhatsApp Webhook] 📩 Mensaje entrante de: "${from}", Texto: "${textBody}"`);

    if (!textBody) {
      await sendWhatsAppReply(
        phoneId,
        from,
        '👋 *¡Hola!*\n\nPor favor envíame un mensaje de texto con el código de artículo (SKU de Frávega, On City, Cetrogar o Naldo) o Part Number (MTM) para consultar.',
        [
          { id: 'VER_SKU:CM4777', title: '🔍 Probar CM4777' },
          { id: 'COMPARAR_SUGERIDO', title: '⚖️ CM4777 vs 364120' },
          { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
        ],
        whatsappToken
      );
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    await processTextQuery(phoneId, from, textBody, whatsappToken);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err: any) {
    console.error('[WhatsApp Webhook] Error interno:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 200 });
  }
}

// Despachador de acciones de botones interactivos
async function handleInteractiveButtonClick(
  phoneId: string,
  from: string,
  replyId: string,
  token?: string
) {
  // 1. Instructivo de ampliación (COMO_AMPLIAR:SKU)
  if (replyId.startsWith('COMO_AMPLIAR:')) {
    const sku = replyId.replace('COMO_AMPLIAR:', '').trim();
    const localDev = findLocalDeviceBySku(sku);

    if (localDev) {
      await sendWhatsAppReply(
        phoneId,
        from,
        localDev.guia_ampliacion,
        [
          { id: `COMPARAR:${getDisplaySku(localDev)}`, title: '⚖️ Comparar modelo' },
          { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
        ],
        token
      );
      return;
    }

    const supaRes = await formatDeviceResponse(sku);
    if (supaRes.found) {
      await sendWhatsAppReply(
        phoneId,
        from,
        supaRes.text,
        [{ id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' }],
        token
      );
      return;
    }

    await sendWhatsAppReply(
      phoneId,
      from,
      'Por favor primero seleccioná un SKU para ver su instructivo de ampliación.',
      [{ id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' }],
      token
    );
    return;
  }

  // 2. Comparador automático contra otra laptop (COMPARAR:SKU)
  if (replyId.startsWith('COMPARAR:')) {
    const sku = replyId.replace('COMPARAR:', '').trim();
    const current = findLocalDeviceBySku(sku) || RETAIL_CATALOG[0];
    let rival = RETAIL_CATALOG.find(
      (d) => getDisplaySku(d) !== getDisplaySku(current) && d.Tipo_Dispositivo === 'Notebook'
    );
    if (!rival) rival = RETAIL_CATALOG[2];

    const compText = buildComparisonSheet(current, rival);
    await sendWhatsAppReply(
      phoneId,
      from,
      compText,
      [
        { id: `COMO_AMPLIAR:${getDisplaySku(current)}`, title: '💡 ¿Cómo se amplía?' },
        { id: `VER_SKU:${getDisplaySku(rival)}`, title: `🔍 Ver ${getDisplaySku(rival)}`.slice(0, 20) },
        { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
      ],
      token
    );
    return;
  }

  // 3. Comparativa sugerida CM4777 vs 364120
  if (replyId === 'COMPARAR_SUGERIDO') {
    const devA = findLocalDeviceBySku('CM4777')!;
    const devB = findLocalDeviceBySku('364120')!;
    const compText = buildComparisonSheet(devA, devB);

    await sendWhatsAppReply(
      phoneId,
      from,
      compText,
      [
        { id: 'COMO_AMPLIAR:CM4777', title: '💡 ¿Cómo se amplía?' },
        { id: 'VER_SKU:364120', title: '🔍 Ver 364120' },
        { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
      ],
      token
    );
    return;
  }

  // 4. Ver ficha de un SKU específico
  if (replyId.startsWith('VER_SKU:')) {
    const targetSku = replyId.replace('VER_SKU:', '').trim();
    await processTextQuery(phoneId, from, targetSku, token);
    return;
  }

  // 5. Consultar otro SKU
  if (replyId === 'OTRO_SKU') {
    const text =
      'Escribí el SKU de Frávega, On City, Cetrogar, Naldo o el Part Number Lenovo que querés consultar 👇\n\n' +
      '_Ejemplos sugeridos: *CM4777*, *364549*, *364120*, *364912* o *CM4777 vs 364120*._';
    await sendWhatsAppReply(
      phoneId,
      from,
      text,
      [
        { id: 'VER_SKU:CM4777', title: '🔍 Probar CM4777' },
        { id: 'COMPARAR_SUGERIDO', title: '⚖️ CM4777 vs 364120' },
      ],
      token
    );
    return;
  }

  // Default: procesar como texto
  await processTextQuery(phoneId, from, replyId, token);
}

// Procesador central de texto y consultas (idéntico al simulador)
async function processTextQuery(
  phoneId: string,
  from: string,
  rawTrim: string,
  token?: string
) {
  const upper = rawTrim.toUpperCase();

  // 1. Saludos
  const greetings = ['HOLA', 'BUENAS', 'BUEN DIA', 'BUENOS DIAS', 'BUENAS TARDES', 'BUENAS NOCHES', 'AYUDA', 'HELP', 'MENU', 'INICIO'];
  if (greetings.includes(upper)) {
    const welcome =
      '👋 *¡Hola! Asistente Lenovo Retail*\n\n' +
      'Tu asistente para cerrar ventas en tu sucursal\n\n' +
      '👉 *¿Qué podés consultar por SKU?*\n' +
      '• *Ficha técnica completa:* Escribí el SKU (ej: *CM4777* o *364549*) para ver CPU, Placa Gráfica, RAM, Almacenamiento y Pantalla.\n' +
      '• *Comparador A vs B:* Escribí dos SKUs (ej: *CM4777 vs 364120*) para ver un cara a cara con veredicto de venta.\n' +
      '• *Aptitud de Software / Juegos:* Consultá un programa junto al SKU (ej: *CM4777 AutoCAD* o *364120 LoL*).';

    await sendWhatsAppReply(
      phoneId,
      from,
      welcome,
      [
        { id: 'VER_SKU:CM4777', title: '🔍 Probar CM4777' },
        { id: 'COMPARAR_SUGERIDO', title: '⚖️ CM4777 vs 364120' },
        { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
      ],
      token
    );
    return;
  }

  // 2. Comparador A vs B ("SKU1 vs SKU2")
  const vsRegex = /^([A-Z0-9-]+)\s+(?:VS|CONTRA|V\/S)\s+([A-Z0-9-]+)$/i;
  const vsMatch = rawTrim.match(vsRegex);

  if (vsMatch) {
    const skuA = vsMatch[1];
    const skuB = vsMatch[2];
    const devA = findLocalDeviceBySku(skuA);
    const devB = findLocalDeviceBySku(skuB);

    if (!devA && !devB) {
      await sendWhatsAppReply(
        phoneId,
        from,
        `❌ No encontré en catálogo ninguno de los dos SKUs consultados (*${skuA}* ni *${skuB}*).`,
        [
          { id: 'COMPARAR_SUGERIDO', title: '⚖️ CM4777 vs 364120' },
          { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
        ],
        token
      );
      return;
    }

    if (!devA) {
      await sendWhatsAppReply(
        phoneId,
        from,
        `❌ Encontré el modelo con SKU *${skuB}*, pero el código *${skuA}* no figura en el catálogo de retail.`,
        [
          { id: `VER_SKU:${skuB}`, title: `🔍 Ver ${skuB}`.slice(0, 20) },
          { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
        ],
        token
      );
      return;
    }

    if (!devB) {
      await sendWhatsAppReply(
        phoneId,
        from,
        `❌ Encontré el modelo con SKU *${skuA}*, pero el código *${skuB}* no figura en el catálogo de retail.`,
        [
          { id: `VER_SKU:${skuA}`, title: `🔍 Ver ${skuA}`.slice(0, 20) },
          { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
        ],
        token
      );
      return;
    }

    const compText = buildComparisonSheet(devA, devB);
    await sendWhatsAppReply(
      phoneId,
      from,
      compText,
      [
        { id: `COMO_AMPLIAR:${getDisplaySku(devA)}`, title: '💡 ¿Cómo se amplía?' },
        { id: `VER_SKU:${getDisplaySku(devB)}`, title: `🔍 Ver ${getDisplaySku(devB)}`.slice(0, 20) },
        { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
      ],
      token
    );
    return;
  }

  // 3. Consulta de Software ("SKU + Programa")
  let targetSoftware = null;
  for (const sw of SOFTWARE_CATALOG) {
    for (const alias of sw.aliases) {
      const reg = new RegExp(`\\b${alias}\\b`, 'i');
      if (reg.test(rawTrim)) {
        targetSoftware = sw;
        break;
      }
    }
    if (targetSoftware) break;
  }

  let targetDevice = null;
  const tokens = rawTrim.split(/[\s,]+/);
  for (const token of tokens) {
    const found = findLocalDeviceBySku(token);
    if (found) {
      targetDevice = found;
      break;
    }
  }

  if (targetDevice && targetSoftware) {
    const evalResult = evaluateSoftwareCompatibility(targetDevice, targetSoftware);
    const dispSku = getDisplaySku(targetDevice);

    let swMsg = `🎯 *APTITUD DE SOFTWARE: ${targetSoftware.name}*\n`;
    swMsg += `💻 *${targetDevice.Equipo}* • SKU: *${dispSku}*\n\n`;
    swMsg += `> ${evalResult.badge}\n`;
    swMsg += `> \n`;
    swMsg += `> • *Procesador:* ${targetDevice.Procesador}\n`;
    swMsg += `> • *Gráficos:* ${evalResult.detalleGPU}\n`;
    swMsg += `> • *Memoria RAM:* ${evalResult.detalleRAM}\n`;
    swMsg += `> • *Experiencia:* ${evalResult.compat}\n\n`;
    swMsg += `> 💡 *ARGUMENTO DE VENTA EN SALÓN*\n`;
    swMsg += `> ${evalResult.tip}\n\n`;
    swMsg += `ℹ️ _Validación basada en la matriz oficial de requerimientos técnicos de retail._`;

    const buttons: QuickReplyButton[] = [];
    if (evalResult.altSku) {
      buttons.push({ id: `VER_SKU:${evalResult.altSku}`, title: `🔍 Ver ${evalResult.altSku}`.slice(0, 20) });
    }
    buttons.push({ id: `COMO_AMPLIAR:${dispSku}`, title: '💡 ¿Cómo se amplía?' });
    buttons.push({ id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' });

    await sendWhatsAppReply(phoneId, from, swMsg, buttons, token);
    return;
  }

  // 4. Ficha técnica por SKU en catálogo enriquecido
  const localDev = findLocalDeviceBySku(rawTrim);
  if (localDev) {
    const techSheet = buildTechnicalSheet(localDev);
    const dispSku = getDisplaySku(localDev);
    await sendWhatsAppReply(
      phoneId,
      from,
      techSheet,
      [
        { id: `COMO_AMPLIAR:${dispSku}`, title: '💡 ¿Cómo se amplía?' },
        { id: `COMPARAR:${dispSku}`, title: '⚖️ Comparar modelo' },
        { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
      ],
      token
    );
    return;
  }

  // 5. Fallback a Supabase para cualquier otro equipo / Part Number
  const supaRes = await formatDeviceResponse(rawTrim);
  if (supaRes.found) {
    await sendWhatsAppReply(
      phoneId,
      from,
      supaRes.text,
      [
        { id: `COMO_AMPLIAR:${rawTrim}`, title: '💡 ¿Cómo se amplía?' },
        { id: 'OTRO_SKU', title: '🔍 Buscar otro SKU' },
      ],
      token
    );
    return;
  }

  // 6. No encontrado
  const notFoundMsg =
    `❌ No encontré ningún equipo con el código: *${rawTrim}*.\n\n` +
    `Por favor verifica que sea un SKU de Frávega, On City, Cetrogar, Naldo o un Part Number Lenovo (MTM).\n\n` +
    `👉 *SKUs sugeridos para probar:* \n` +
    `• *CM4777* (IdeaPad Slim 3)\n` +
    `• *364549* (IdeaCentre AIO 3)\n` +
    `• *364120* (IdeaPad 1)\n` +
    `• *364912* (Lenovo LOQ Gamer RTX)\n` +
    `• *364890* (IdeaPad Slim 5)`;

  await sendWhatsAppReply(
    phoneId,
    from,
    notFoundMsg,
    [
      { id: 'VER_SKU:CM4777', title: '🔍 Probar CM4777' },
      { id: 'COMPARAR_SUGERIDO', title: '⚖️ CM4777 vs 364120' },
    ],
    token
  );
}

// Consulta de respaldo a la base de datos Supabase
async function formatDeviceResponse(query: string): Promise<{ found: boolean; text: string }> {
  const safeQuery = query.trim();

  const { data, error } = await supabase
    .from('devices')
    .select(
      'part_number,Familia,Equipo,art_fravega,art_on_city,art_cetrogar,art_naldo,Tipo_Dispositivo,Soporta_RAM,RAM_Max_GB,Modulos_RAM,ram_modulos_ocupados,Tipo_RAM,Soporta_Almacenamiento,Tipo_Almacenamiento,Almacenamiento_Maximo_Total,Notas'
    )
    .or(
      `art_fravega.ilike.${safeQuery},art_on_city.ilike.${safeQuery},art_cetrogar.ilike.${safeQuery},art_naldo.ilike.${safeQuery},part_number.ilike.${safeQuery}`
    )
    .limit(1);

  if (error || !data || data.length === 0) {
    return { found: false, text: '' };
  }

  const device = data[0];
  const ramSupport = device.Soporta_RAM === 'SÍ' || device.Soporta_RAM === 'SI' || device.Soporta_RAM === 'Si';
  const totalSlots = parseInt(device.Modulos_RAM || '0', 10);
  const occupiedSlots = Number(device.ram_modulos_ocupados) || 0;
  const freeSlots = Math.max(0, totalSlots - occupiedSlots);
  const storageSupport = device.Soporta_Almacenamiento === 'SÍ' || device.Soporta_Almacenamiento === 'SI' || device.Soporta_Almacenamiento === 'Si';

  let msg = `💻 *${device.Equipo || 'Equipo Lenovo'}*\n`;
  if (device.part_number) msg += `🏷️ *Part Number:* \`${device.part_number}\`\n`;
  msg += `🔍 *Búsqueda:* ${safeQuery}\n\n`;

  // Bloque RAM
  if (ramSupport) {
    msg += `> 🟢 *MEMORIA RAM: AMPLIABLE*\n`;
    msg += `> • Total de módulos: ${device.Modulos_RAM || '-'} (soldados + removibles)\n`;
    msg += `> • Ocupados: ${device.ram_modulos_ocupados ?? '-'} | Libres: ${freeSlots}${freeSlots === 0 ? ' (requiere reemplazo)' : ''}\n`;
    if (device.RAM_Max_GB) msg += `> • Capacidad máxima: ${device.RAM_Max_GB} GB\n`;
    if (device.Tipo_RAM) msg += `> • Tipo: ${device.Tipo_RAM}\n`;
  } else {
    msg += `> 🔴 *MEMORIA RAM: NO AMPLIABLE*\n`;
    msg += `> • Detalle: Memoria soldada a la placa madre, no admite expansión.\n`;
  }

  msg += `\n`;

  // Bloque Almacenamiento
  if (storageSupport) {
    msg += `> 🟢 *ALMACENAMIENTO: AMPLIABLE*\n`;
    if (device.Almacenamiento_Maximo_Total) msg += `> • Máximo total: ${device.Almacenamiento_Maximo_Total}\n`;
    if (device.Tipo_Almacenamiento) msg += `> • Formato: ${device.Tipo_Almacenamiento}\n`;
  } else {
    msg += `> 🔴 *ALMACENAMIENTO: NO AMPLIABLE*\n`;
    msg += `> • Detalle: Almacenamiento no ampliable.\n`;
  }

  msg += `\n`;
  msg += `ℹ️ _Los datos son a modo informativo, pueden variar sin previo aviso y no constituyen una oferta de venta._`;

  return { found: true, text: msg };
}

// Envío general (prioriza Quick Reply Buttons interactivos con fallback a texto plano)
async function sendWhatsAppReply(
  phoneId: string,
  to: string,
  text: string,
  buttons: QuickReplyButton[] = [],
  token?: string
) {
  if (buttons.length > 0) {
    const success = await sendWhatsAppInteractive(phoneId, to, text, buttons.slice(0, 3), token);
    if (success) return;
    console.warn('[sendWhatsAppReply] No se pudo enviar mensaje interactivo, enviando como texto plano...');
  }
  await sendWhatsAppTextMessage(phoneId, to, text, token);
}

// Envío de mensaje interactivo con botones nativos de WhatsApp Cloud API
async function sendWhatsAppInteractive(
  phoneId: string,
  to: string,
  text: string,
  buttons: QuickReplyButton[],
  token?: string
): Promise<boolean> {
  if (!token) {
    console.error('[WhatsApp Webhook] Falta WHATSAPP_TOKEN en .env.local');
    return false;
  }

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text },
      action: {
        buttons: buttons.slice(0, 3).map((b) => ({
          type: 'reply',
          reply: {
            id: b.id.slice(0, 256),
            title: b.title.slice(0, 20),
          },
        })),
      },
    },
  };

  const send = async (recipient: string) => {
    const url = `https://graph.facebook.com/v25.0/${phoneId}/messages`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, to: recipient }),
      });
      const resData = await response.json().catch(() => ({}));
      return { ok: response.ok, status: response.status, data: resData };
    } catch (e: any) {
      return { ok: false, status: 0, data: { error: e.message } };
    }
  };

  let result = await send(to);

  // Manejo de prefijo móvil de Argentina (54 vs 549)
  if (!result.ok && result.data?.error?.code === 131030) {
    let altTo: string | null = null;
    if (to.startsWith('549')) {
      altTo = '54' + to.slice(3);
    } else if (to.startsWith('54') && !to.startsWith('549')) {
      altTo = '549' + to.slice(2);
    }

    if (altTo) {
      console.log(`[sendWhatsAppInteractive] Reintentando con variante Argentina: "${altTo}"...`);
      result = await send(altTo);
    }
  }

  if (!result.ok) {
    console.error('[sendWhatsAppInteractive] ❌ Error de Meta:', JSON.stringify(result.data));
    return false;
  }

  console.log(`[sendWhatsAppInteractive] ✅ Mensaje interactivo entregado a Meta para: "${to}"`);
  return true;
}

// Envío de mensaje de texto simple de respaldo
async function sendWhatsAppTextMessage(
  phoneId: string,
  to: string,
  text: string,
  token?: string
) {
  if (!token) {
    console.error('[WhatsApp Webhook] Falta WHATSAPP_TOKEN en .env.local');
    return;
  }

  const send = async (recipient: string) => {
    const url = `https://graph.facebook.com/v25.0/${phoneId}/messages`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: recipient,
          type: 'text',
          text: {
            preview_url: false,
            body: text,
          },
        }),
      });
      const resData = await response.json().catch(() => ({}));
      return { ok: response.ok, status: response.status, data: resData };
    } catch (e: any) {
      return { ok: false, status: 0, data: { error: e.message } };
    }
  };

  let result = await send(to);

  // Manejo de prefijo móvil de Argentina (54 vs 549)
  if (!result.ok && result.data?.error?.code === 131030) {
    let altTo: string | null = null;
    if (to.startsWith('549')) {
      altTo = '54' + to.slice(3);
    } else if (to.startsWith('54') && !to.startsWith('549')) {
      altTo = '549' + to.slice(2);
    }

    if (altTo) {
      console.log(`[sendWhatsAppTextMessage] Reintentando con variante Argentina: "${altTo}"...`);
      result = await send(altTo);
    }
  }

  if (!result.ok) {
    console.error('[sendWhatsAppTextMessage] ❌ Error final al enviar a Meta:', JSON.stringify(result.data));
  } else {
    console.log(`[sendWhatsAppTextMessage] ✅ Mensaje entregado con éxito a Meta para: "${to}"`);
  }
}
