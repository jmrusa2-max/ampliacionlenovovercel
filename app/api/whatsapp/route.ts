import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'lenovo_retail_bot_2026';

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
    const textBody = message.text?.body?.trim();
    const phoneId = value?.metadata?.phone_number_id || process.env.WHATSAPP_PHONE_NUMBER_ID || '1379220215265611';
    const whatsappToken = process.env.WHATSAPP_TOKEN;

    console.log(`[WhatsApp Webhook] 📩 Mensaje entrante de: "${from}", Texto: "${textBody}"`);

    if (!textBody) {
      await sendWhatsAppMessage(
        phoneId,
        from,
        '👋 *¡Hola!*\n\nPor favor envíame un mensaje de texto con el código de artículo (SKU de Frávega, On City, Cetrogar o Naldo) o Part Number (MTM) para consultar.',
        whatsappToken
      );
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    const lower = textBody.toLowerCase();
    const greetings = ['hola', 'buenas', 'buen dia', 'buenos dias', 'buenas tardes', 'buenas noches', 'ayuda', 'help', 'menu', 'inicio', 'start'];

    if (greetings.includes(lower)) {
      const welcome =
        '👋 *¡Hola! Asistente Lenovo Retail*\n\n' +
        'Podés consultarme si un equipo admite ampliación de memoria RAM o disco de forma inmediata.\n\n' +
        '👉 *¿Cómo buscar?*\n' +
        'Escribí directamente el código de artículo o Part Number:\n' +
        '• SKU Frávega (ej: *364549*)\n' +
        '• SKU On City\n' +
        '• SKU Cetrogar\n' +
        '• SKU Naldo\n' +
        '• Part Number / MTM (ej: *F0GH00XXAR* o *82VG0007AR*)';
      await sendWhatsAppMessage(phoneId, from, welcome, whatsappToken);
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    // Consulta técnica a la base de datos
    const replyText = await formatDeviceResponse(textBody);
    await sendWhatsAppMessage(phoneId, from, replyText, whatsappToken);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err: any) {
    console.error('[WhatsApp Webhook] Error interno:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 200 });
  }
}

// Función auxiliar para buscar en Supabase y generar el mensaje con formato amigable
async function formatDeviceResponse(query: string): Promise<string> {
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

  if (error) {
    console.error('[formatDeviceResponse] Error en Supabase:', error);
    return '⚠️ Ocurrió un error temporal al consultar la base de datos. Por favor intenta nuevamente en unos segundos.';
  }

  const device = data?.[0];
  if (!device) {
    return (
      `❌ No encontré ningún equipo con el código: *${safeQuery}*.\n\n` +
      `Por favor verifica que sea un SKU de Frávega, On City, Cetrogar, Naldo o un Part Number Lenovo (MTM).`
    );
  }

  const ramSupport = device.Soporta_RAM === 'SÍ' || device.Soporta_RAM === 'SI' || device.Soporta_RAM === 'Si';
  const totalSlots = parseInt(device.Modulos_RAM || '0', 10);
  const occupiedSlots = Number(device.ram_modulos_ocupados) || 0;
  const freeSlots = Math.max(0, totalSlots - occupiedSlots);

  const storageSupport = device.Soporta_Almacenamiento === 'SÍ' || device.Soporta_Almacenamiento === 'SI' || device.Soporta_Almacenamiento === 'Si';

  let msg = `💻 *${device.Equipo || 'Equipo Lenovo'}*\n`;
  if (device.part_number) msg += `🏷️ *Part Number:* \`${device.part_number}\`\n`;
  msg += `🔍 *Búsqueda:* ${safeQuery}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Bloque RAM
  msg += `🧠 *MEMORIA RAM*\n`;
  if (ramSupport) {
    msg += `• *Ampliable:* SÍ ✅\n`;
    msg += `• *Total de Módulos:* ${device.Modulos_RAM || '-'} _(incluye módulos soldados y removibles)_\n`;
    msg += `• *Módulos Ocupados:* ${device.ram_modulos_ocupados ?? '-'}\n`;
    msg += `• *Módulos Libres:* ${freeSlots}${freeSlots === 0 ? ' (requiere reemplazar módulo existente)' : ''}\n`;
    if (device.RAM_Max_GB) msg += `• *RAM Máxima:* ${device.RAM_Max_GB} GB\n`;
    if (device.Tipo_RAM) msg += `• *Tipo:* ${device.Tipo_RAM}\n`;
  } else {
    msg += `• *Ampliable:* NO ❌\n`;
    msg += `• *Detalle:* Memoria soldada a la placa madre, no admite expansión.\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Bloque Almacenamiento
  msg += `💾 *ALMACENAMIENTO*\n`;
  if (storageSupport) {
    msg += `• *Ampliable:* SÍ ✅\n`;
    if (device.Almacenamiento_Maximo_Total) msg += `• *Máximo Total:* ${device.Almacenamiento_Maximo_Total}\n`;
    if (device.Tipo_Almacenamiento) msg += `• *Tipo:* ${device.Tipo_Almacenamiento}\n`;
  } else {
    msg += `• *Ampliable:* NO ❌\n`;
    msg += `• *Detalle:* Almacenamiento no ampliable.\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `ℹ️ _Los datos son a modo informativo, pueden variar sin previo aviso y no constituyen una oferta de venta._`;

  return msg;
}

// Envío de respuesta a la API de WhatsApp Cloud
async function sendWhatsAppMessage(
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

  console.log(`[sendWhatsAppMessage] Intentando enviar a: "${to}"`);
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
      console.log(`[sendWhatsAppMessage] Reintentando con variante Argentina: "${altTo}"...`);
      result = await send(altTo);
    }
  }

  if (!result.ok) {
    console.error('[sendWhatsAppMessage] ❌ Error final al enviar a Meta:', JSON.stringify(result.data));
  } else {
    console.log(`[sendWhatsAppMessage] ✅ Mensaje entregado con éxito a Meta para: "${to}"`);
  }
}
