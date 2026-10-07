export interface RetailDevice {
  art_fravega?: string;
  art_on_city?: string;
  art_cetrogar?: string;
  art_naldo?: string;
  part_number: string;
  Equipo: string;
  Familia?: string;
  Tipo_Dispositivo: string;
  Cadena?: string;
  Procesador: string;
  Placa_Video: string;
  Pantalla: string;
  Formato_Chasis: string;
  RAM_Instalada: string;
  Soporta_RAM: 'SÍ' | 'NO';
  RAM_Max_GB: string;
  Modulos_RAM: string;
  ram_modulos_ocupados: string;
  Tipo_RAM: string;
  Almacenamiento_Instalado: string;
  Soporta_Almacenamiento: 'SÍ' | 'NO';
  Tipo_Almacenamiento: string;
  Almacenamiento_Maximo_Total: string;
  Tiene_GPU_Dedicada: boolean;
  Aptitud_Resumen: {
    fluido: string;
    medio: string;
    noApto: string;
    alternativaSku: string | null;
  };
  guia_ampliacion: string;
}

export interface SoftwareRequirement {
  id: string;
  aliases: string[];
  name: string;
  reqGPU: 'integrada_ok' | 'dedicada_opt' | 'dedicada_req';
  minRAM: number;
  recRAM: number;
}

export const RETAIL_CATALOG: RetailDevice[] = [
  {
    art_fravega: 'CM4777',
    art_on_city: 'CM4777',
    art_cetrogar: '4777-SLIM3',
    art_naldo: 'NL-83K1004',
    part_number: '83K1004QAR',
    Equipo: 'IdeaPad Slim 3 15IRH10',
    Familia: 'IdeaPad Slim 3',
    Tipo_Dispositivo: 'Notebook',
    Cadena: 'Frávega / On City',
    Procesador: 'Intel Core i5-13420H (8 núcleos: 4P + 4E / 12 hilos, hasta 4.6 GHz)',
    Placa_Video: 'Intel UHD Graphics integrada (DirectX 12.1)',
    Pantalla: '15.6" FHD (1920x1080) IPS 300nits Antirreflejo',
    Formato_Chasis: 'Notebook liviana (1.62 kg) con teclado numérico',
    RAM_Instalada: '16 GB DDR5-5200',
    Soporta_RAM: 'SÍ',
    RAM_Max_GB: '24',
    Modulos_RAM: '2',
    ram_modulos_ocupados: '2',
    Tipo_RAM: 'DDR5',
    Almacenamiento_Instalado: '512 GB SSD M.2 PCIe 4.0 NVMe',
    Soporta_Almacenamiento: 'SÍ',
    Tipo_Almacenamiento: 'NVMe M.2 2280 PCIe 4.0',
    Almacenamiento_Maximo_Total: '2 TB',
    Tiene_GPU_Dedicada: false,
    Aptitud_Resumen: {
      fluido: 'Office intensivo, AutoCAD 2D, Photoshop, Illustrator, LoL, Valorant, Roblox.',
      medio: 'Premiere Pro 1080p, CS2 (ajustes bajos), Fortnite (modo rendimiento 55 FPS).',
      noApto: 'Gaming AAA pesado (Warzone, Cyberpunk), Render 3D Revit masivo.',
      alternativaSku: '364912'
    },
    guia_ampliacion: '🛠️ *Guía de Ampliación para IdeaPad Slim 3 15IRH10:*\n\n' +
      '> • *Memoria RAM (Ampliable a 24 GB):* Cuenta con 16 GB instalados (8 GB soldados a la placa + 1 ranura SO-DIMM ocupada con módulo de 8 GB). Para alcanzar los *24 GB máximos*, se retira el módulo de 8 GB y se coloca *1 módulo de 16 GB SO-DIMM DDR5 4800/5200 MHz*.\n\n' +
      '> • *Almacenamiento (Ampliable a 2 TB):* Posee ranura M.2 2280 PCIe 4.0. Podés reemplazar el SSD original por una unidad de hasta *2 TB NVMe M.2 2280* de alta velocidad.'
  },
  {
    art_fravega: '364549',
    art_on_city: '364549',
    art_cetrogar: 'AIO3-364549',
    art_naldo: 'NL-364549',
    part_number: 'F0GH00XXAR',
    Equipo: 'IdeaCentre AIO 3 24IAP7',
    Familia: 'IdeaCentre AIO',
    Tipo_Dispositivo: 'All In One (Escritorio)',
    Cadena: 'Frávega / On City',
    Procesador: 'Intel Core i3-1215U (6 núcleos: 2P + 4E / 8 hilos, hasta 4.4 GHz)',
    Placa_Video: 'Intel UHD Graphics integrada',
    Pantalla: '23.8" FHD (1920x1080) IPS 250nits sin bordes',
    Formato_Chasis: 'Todo en uno de sobremesa con teclado y mouse inalámbrico',
    RAM_Instalada: '8 GB DDR4-3200',
    Soporta_RAM: 'SÍ',
    RAM_Max_GB: '16',
    Modulos_RAM: '2',
    ram_modulos_ocupados: '1',
    Tipo_RAM: 'DDR4',
    Almacenamiento_Instalado: '256 GB SSD M.2 2280 NVMe',
    Soporta_Almacenamiento: 'SÍ',
    Tipo_Almacenamiento: 'Bahía Dual: 1x M.2 SSD + 1x 2.5" SATA',
    Almacenamiento_Maximo_Total: '2 TB (1TB SSD M.2 + 1TB HDD 2.5" SATA)',
    Tiene_GPU_Dedicada: false,
    Aptitud_Resumen: {
      fluido: 'Ofimática comercial, Zoom/Teams, navegación con decenas de pestañas, Roblox, LoL.',
      medio: 'Photoshop liviano, edición básica en Canva o CorelDraw.',
      noApto: 'Juegos 3D exigentes, edición de video 4K, AutoCAD 3D.',
      alternativaSku: '364912'
    },
    guia_ampliacion: '🛠️ *Guía de Ampliación para IdeaCentre AIO 3 24IAP7:*\n\n' +
      '> • *Memoria RAM (Ampliable a 16 GB):* Posee 2 ranuras SO-DIMM DDR4. Tiene 1 ranura ocupada con 8 GB y 1 ranura libre. Podés agregar otro módulo de *8 GB SO-DIMM DDR4 3200 MHz* para sumar 16 GB en Dual Channel.\n\n' +
      '> • *Almacenamiento Dual (Hasta 2 TB):* Cuenta con una bahía libre de 2.5" SATA. Podés incorporar un HDD o SSD de *2.5" SATA de 1 TB* manteniendo el SSD M.2 de fábrica sin reinstalar el sistema.'
  },
  {
    art_fravega: '364120',
    art_on_city: '364120',
    art_cetrogar: 'IP1-82VG',
    art_naldo: 'NL-82VG00',
    part_number: '82VG0007AR',
    Equipo: 'IdeaPad 1 15AMN7',
    Familia: 'IdeaPad 1',
    Tipo_Dispositivo: 'Notebook',
    Cadena: 'Frávega',
    Procesador: 'AMD Ryzen 5 7520U (4 núcleos / 8 hilos, hasta 4.3 GHz, 6nm TSMC)',
    Placa_Video: 'AMD Radeon 610M integrada (RDNA 2)',
    Pantalla: '15.6" FHD (1920x1080) TN 220nits Antirreflejo',
    Formato_Chasis: 'Notebook delgada y ligera (1.58 kg) color Cloud Grey',
    RAM_Instalada: '8 GB LPDDR5-5500 Soldada',
    Soporta_RAM: 'NO',
    RAM_Max_GB: '8',
    Modulos_RAM: '0',
    ram_modulos_ocupados: '0',
    Tipo_RAM: 'LPDDR5 Soldada Dual Channel',
    Almacenamiento_Instalado: '512 GB SSD M.2 PCIe NVMe',
    Soporta_Almacenamiento: 'SÍ',
    Tipo_Almacenamiento: 'NVMe M.2 2242 / 2280',
    Almacenamiento_Maximo_Total: '1 TB',
    Tiene_GPU_Dedicada: false,
    Aptitud_Resumen: {
      fluido: 'Estudio universitario, Office 365, streaming FHD, LoL, Roblox, emuladores.',
      medio: 'Valorant (60 FPS estables), Photoshop 2D básico.',
      noApto: 'Ampliación de RAM (soldada), Gaming pesado, renders pesados.',
      alternativaSku: '364912'
    },
    guia_ampliacion: '🛠️ *Detalle de Ampliación para IdeaPad 1 15AMN7:*\n\n' +
      '> • *Memoria RAM (NO ampliable ❌):* La memoria viene soldada a la placa madre (LPDDR5) y no cuenta con slots SO-DIMM libres. Permanece en 8 GB fijos.\n\n' +
      '> • *Almacenamiento (SÍ ampliable ✅):* Podés reemplazar la unidad original M.2 por un SSD de hasta *1 TB NVMe M.2 2242 o 2280 PCIe*.'
  },
  {
    art_fravega: '364912',
    art_on_city: '364912',
    art_cetrogar: 'LOQ-15IAX',
    art_naldo: 'NL-LOQ3050',
    part_number: '83GS0035AR',
    Equipo: 'Lenovo LOQ 15IAX9E (Gamer)',
    Familia: 'Lenovo LOQ Gamer',
    Tipo_Dispositivo: 'Notebook Gamer',
    Cadena: 'Frávega / On City / Cetrogar',
    Procesador: 'Intel Core i5-12450HX (8 núcleos: 4P + 4E / 12 hilos, hasta 4.4 GHz)',
    Placa_Video: 'NVIDIA GeForce RTX 3050 6GB GDDR6 (Dedicada, TGP 95W con DLSS)',
    Pantalla: '15.6" FHD (1920x1080) IPS 144Hz 300nits 100% sRGB G-SYNC',
    Formato_Chasis: 'Chasis gamer térmico con doble ventilación y teclado retroiluminado (2.38 kg)',
    RAM_Instalada: '16 GB DDR5-4800 (2x 8GB)',
    Soporta_RAM: 'SÍ',
    RAM_Max_GB: '32',
    Modulos_RAM: '2',
    ram_modulos_ocupados: '2',
    Tipo_RAM: 'DDR5 SO-DIMM',
    Almacenamiento_Instalado: '512 GB SSD M.2 PCIe 4.0 NVMe',
    Soporta_Almacenamiento: 'SÍ',
    Tipo_Almacenamiento: 'Dual M.2 2280 PCIe 4.0 NVMe',
    Almacenamiento_Maximo_Total: '2 TB (ranura libre adicional)',
    Tiene_GPU_Dedicada: true,
    Aptitud_Resumen: {
      fluido: 'Warzone, Fortnite 120+ FPS, AutoCAD 3D, Revit BIM, Premiere 4K, GTA V, FIFA/FC.',
      medio: 'Cyberpunk 2077 (calidad media con DLSS activado).',
      noApto: 'Ninguno en retail estándar; es la opción de máxima potencia.',
      alternativaSku: null
    },
    guia_ampliacion: '🛠️ *Guía de Ampliación para Lenovo LOQ 15IAX9E Gamer:*\n\n' +
      '> • *Memoria RAM (Ampliable a 32 GB):* Cuenta con 2 ranuras SO-DIMM DDR5. Soporta hasta *32 GB DDR5 4800/5200 MHz* (2 módulos de 16 GB).\n\n' +
      '> • *Almacenamiento Dual M.2:* Viene con *segunda ranura M.2 2280 PCIe 4.0 libre*. Podés agregar un segundo SSD de hasta 1 TB o 2 TB sin tocar la unidad que trae el sistema operativo.'
  },
  {
    art_fravega: '364890',
    art_on_city: '364890',
    art_cetrogar: 'SLIM5-16',
    art_naldo: 'NL-SLIM5',
    part_number: '82XF0075AR',
    Equipo: 'IdeaPad Slim 5 16IRL8',
    Familia: 'IdeaPad Slim 5',
    Tipo_Dispositivo: 'Notebook Premium',
    Cadena: 'Frávega / Naldo',
    Procesador: 'Intel Core i7-13620H (10 núcleos: 6P + 4E / 16 hilos, hasta 4.9 GHz)',
    Placa_Video: 'Intel Iris Xe Graphics integrada',
    Pantalla: '16" WUXGA (1920x1200) IPS 300nits 16:10 Antirreflejo',
    Formato_Chasis: 'Chasis de aluminio militar MIL-STD-810H ultra resistente (1.89 kg)',
    RAM_Instalada: '16 GB LPDDR5-5200 Soldada Dual Channel',
    Soporta_RAM: 'NO',
    RAM_Max_GB: '16',
    Modulos_RAM: '0',
    ram_modulos_ocupados: '0',
    Tipo_RAM: 'LPDDR5 Soldada',
    Almacenamiento_Instalado: '512 GB SSD M.2 PCIe 4.0',
    Soporta_Almacenamiento: 'SÍ',
    Tipo_Almacenamiento: 'NVMe M.2 PCIe 4.0',
    Almacenamiento_Maximo_Total: '1 TB',
    Tiene_GPU_Dedicada: false,
    Aptitud_Resumen: {
      fluido: 'Programación pesada, multitarea analítica, Photoshop/Illustrator, LoL, Valorant.',
      medio: 'Edición de video 1080p en Premiere, CS2 ajustes bajos.',
      noApto: 'Gaming AAA sin placa dedicada, ampliación física de RAM.',
      alternativaSku: '364912'
    },
    guia_ampliacion: '🛠️ *Detalle de Ampliación para IdeaPad Slim 5 16IRL8:*\n\n' +
      '> • *Memoria RAM (NO ampliable ❌):* Cuenta con 16 GB soldados LPDDR5 de alta frecuencia en Dual Channel. No admite expansión física.\n\n' +
      '> • *Almacenamiento (SÍ ampliable ✅):* Podés reemplazar el SSD por uno de hasta *1 TB NVMe M.2 PCIe 4.0*.'
  }
];

export const SOFTWARE_CATALOG: SoftwareRequirement[] = [
  { id: 'autocad', aliases: ['autocad', 'cad', 'dwg', 'planos'], name: 'AutoCAD (Autodesk)', reqGPU: 'dedicada_opt', minRAM: 8, recRAM: 16 },
  { id: 'photoshop', aliases: ['photoshop', 'ps', 'foto', 'adobe photoshop'], name: 'Adobe Photoshop', reqGPU: 'integrada_ok', minRAM: 8, recRAM: 16 },
  { id: 'illustrator', aliases: ['illustrator', 'ai', 'vector', 'adobe illustrator'], name: 'Adobe Illustrator', reqGPU: 'integrada_ok', minRAM: 8, recRAM: 16 },
  { id: 'revit', aliases: ['revit', 'bim', 'arquitectura 3d'], name: 'Autodesk Revit (BIM)', reqGPU: 'dedicada_req', minRAM: 16, recRAM: 32 },
  { id: 'premiere', aliases: ['premiere', 'video', 'edicion de video', 'adobe premiere'], name: 'Adobe Premiere Pro', reqGPU: 'dedicada_opt', minRAM: 16, recRAM: 32 },
  { id: 'office', aliases: ['office', 'excel', 'word', 'powerpoint', 'macros'], name: 'Microsoft Office / Excel', reqGPU: 'integrada_ok', minRAM: 4, recRAM: 8 },
  { id: 'roblox', aliases: ['roblox'], name: 'Roblox', reqGPU: 'integrada_ok', minRAM: 4, recRAM: 8 },
  { id: 'lol', aliases: ['lol', 'league of legends', 'riot'], name: 'League of Legends (LoL)', reqGPU: 'integrada_ok', minRAM: 4, recRAM: 8 },
  { id: 'valorant', aliases: ['valorant'], name: 'Valorant', reqGPU: 'integrada_ok', minRAM: 8, recRAM: 16 },
  { id: 'cs2', aliases: ['cs2', 'counter', 'counter strike', 'cs go'], name: 'Counter-Strike 2 (CS2)', reqGPU: 'dedicada_opt', minRAM: 8, recRAM: 16 },
  { id: 'fortnite', aliases: ['fortnite'], name: 'Fortnite', reqGPU: 'dedicada_opt', minRAM: 8, recRAM: 16 },
  { id: 'warzone', aliases: ['warzone', 'call of duty', 'cod'], name: 'Call of Duty: Warzone', reqGPU: 'dedicada_req', minRAM: 16, recRAM: 16 },
  { id: 'fifa', aliases: ['fifa', 'ea fc', 'fc 24', 'fc 25', 'futbol'], name: 'EA Sports FC / FIFA', reqGPU: 'dedicada_opt', minRAM: 8, recRAM: 16 },
  { id: 'gta', aliases: ['gta', 'gta v', 'gta 5', 'grand theft auto'], name: 'GTA V', reqGPU: 'integrada_ok', minRAM: 8, recRAM: 16 },
  { id: 'minecraft', aliases: ['minecraft', 'mc'], name: 'Minecraft', reqGPU: 'integrada_ok', minRAM: 4, recRAM: 8 },
  { id: 'blender', aliases: ['blender', 'render 3d', '3d max', 'maya'], name: 'Blender / Render 3D', reqGPU: 'dedicada_req', minRAM: 16, recRAM: 32 },
  { id: 'programacion', aliases: ['programar', 'programacion', 'python', 'visual studio', 'desarrollo'], name: 'Programación (VS Code / Python / Docker)', reqGPU: 'integrada_ok', minRAM: 8, recRAM: 16 },
  { id: 'zoom', aliases: ['zoom', 'teams', 'meet', 'videollamadas'], name: 'Zoom / Microsoft Teams / Meet', reqGPU: 'integrada_ok', minRAM: 4, recRAM: 8 },
  { id: 'corel', aliases: ['corel', 'coreldraw', 'plotter'], name: 'CorelDRAW Graphics Suite', reqGPU: 'integrada_ok', minRAM: 8, recRAM: 16 },
  { id: 'solidworks', aliases: ['solidworks', 'mecanica', 'diseño industrial'], name: 'SolidWorks', reqGPU: 'dedicada_req', minRAM: 16, recRAM: 32 }
];

export function findLocalDeviceBySku(queryToken: string): RetailDevice | null {
  const clean = queryToken.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (!clean) return null;
  return (
    RETAIL_CATALOG.find(
      (item) =>
        (item.art_fravega && item.art_fravega.toUpperCase() === clean) ||
        (item.art_on_city && item.art_on_city.toUpperCase() === clean) ||
        (item.art_cetrogar && item.art_cetrogar.toUpperCase() === clean) ||
        (item.art_naldo && item.art_naldo.toUpperCase() === clean) ||
        (item.part_number && item.part_number.toUpperCase() === clean)
    ) || null
  );
}

export function getDisplaySku(device: RetailDevice): string {
  return device.art_fravega || device.art_on_city || device.art_cetrogar || device.art_naldo || device.part_number || 'SKU-RETAIL';
}

export function buildTechnicalSheet(dev: RetailDevice): string {
  const ramSupport = dev.Soporta_RAM === 'SÍ';
  const totalSlots = parseInt(dev.Modulos_RAM || '0', 10);
  const occupiedSlots = Number(dev.ram_modulos_ocupados) || 0;
  const freeSlots = Math.max(0, totalSlots - occupiedSlots);
  const storageSupport = dev.Soporta_Almacenamiento === 'SÍ';
  const dispSku = getDisplaySku(dev);

  let msg = `💻 *${dev.Equipo}*\n`;
  msg += `SKU: *${dispSku}* • ${dev.Cadena || 'Retail Argentina'}\n\n`;

  // Bloque Procesador & Gráficos
  msg += `> ⚡ *PROCESADOR Y PLACA GRÁFICA*\n`;
  msg += `> • CPU: ${dev.Procesador}\n`;
  msg += `> • Gráficos: ${dev.Placa_Video}\n\n`;

  // Bloque RAM
  if (ramSupport) {
    msg += `> 🟢 *MEMORIA RAM: AMPLIABLE*\n`;
    msg += `> • De fábrica: ${dev.RAM_Instalada}\n`;
    msg += `> • Total de módulos: ${dev.Modulos_RAM} (soldados + removibles)\n`;
    msg += `> • Ocupados: ${dev.ram_modulos_ocupados} | Libres: ${freeSlots}${freeSlots === 0 ? ' (requiere reemplazo)' : ''}\n`;
    msg += `> • Capacidad máxima: ${dev.RAM_Max_GB} GB (${dev.Tipo_RAM})\n`;
  } else {
    msg += `> 🔴 *MEMORIA RAM: NO AMPLIABLE*\n`;
    msg += `> • De fábrica: ${dev.RAM_Instalada}\n`;
    msg += `> • Total de módulos: 0 (memoria 100% soldada)\n`;
    msg += `> • Capacidad máxima: ${dev.RAM_Max_GB} GB fijas (${dev.Tipo_RAM})\n`;
    msg += `> • Detalle: No admite ampliación física de memoria RAM\n`;
  }

  msg += `\n`;

  // Bloque Almacenamiento
  if (storageSupport) {
    msg += `> 🟢 *ALMACENAMIENTO: AMPLIABLE*\n`;
    msg += `> • De fábrica: ${dev.Almacenamiento_Instalado}\n`;
    msg += `> • Capacidad máxima: ${dev.Almacenamiento_Maximo_Total}\n`;
    msg += `> • Bahía / Formato: ${dev.Tipo_Almacenamiento}\n`;
  } else {
    msg += `> 🔴 *ALMACENAMIENTO: NO AMPLIABLE*\n`;
    msg += `> • De fábrica: ${dev.Almacenamiento_Instalado}\n`;
  }

  msg += `\n`;

  // Bloque Pantalla & Formato
  msg += `> 🖥️ *PANTALLA Y CHASIS*\n`;
  msg += `> • Pantalla: ${dev.Pantalla}\n`;
  msg += `> • Formato: ${dev.Formato_Chasis}\n\n`;

  // Bloque Aptitud de Software en Góndola
  msg += `> 🎮 *APTITUD DE SOFTWARE EN GÓNDOLA*\n`;
  msg += `> • 🟢 *Fluido:* ${dev.Aptitud_Resumen.fluido}\n`;
  msg += `> • 🟡 *Requiere Ajustes:* ${dev.Aptitud_Resumen.medio}\n`;
  const altDev = dev.Aptitud_Resumen.alternativaSku ? findLocalDeviceBySku(dev.Aptitud_Resumen.alternativaSku) : null;
  if (altDev) {
    msg += `> • 🔴 *No apto:* ${dev.Aptitud_Resumen.noApto} ➔ *Recomendado para esto:* ${altDev.Equipo} (SKU: *${getDisplaySku(altDev)}*)\n`;
  } else {
    msg += `> • 🔴 *No apto:* ${dev.Aptitud_Resumen.noApto}\n`;
  }
  msg += `\n`;

  msg += `ℹ️ _Los datos son a modo informativo, pueden variar sin previo aviso y no constituyen una oferta de venta._`;

  return msg;
}

export function evaluateSoftwareCompatibility(device: RetailDevice, software: SoftwareRequirement) {
  const ramGB = parseInt(device.RAM_Instalada) || 8;
  const hasDedicated = device.Tiene_GPU_Dedicada;

  if (software.reqGPU === 'dedicada_req') {
    if (!hasDedicated) {
      return {
        badge: '🔴 NO RECOMENDADO',
        compat: 'Incompatible o extremadamente lento',
        detalleGPU: 'Requiere placa de video dedicada (NVIDIA RTX / GTX). La GPU integrada no cumple los requerimientos mínimos de renderizado.',
        detalleRAM: `Cuenta con ${device.RAM_Instalada}. Se recomienda mínimo ${software.recRAM} GB.`,
        tip: `Para ${software.name} es fundamental ofrecer un equipo Gamer o Workstation como el Lenovo LOQ (SKU 364912) con placa NVIDIA RTX.`,
        altSku: '364912'
      };
    } else {
      return {
        badge: '🟢 100% APTO Y FLUIDO',
        compat: 'Rendimiento excelente y aceleración por hardware',
        detalleGPU: `${device.Placa_Video} con trazado de rayos y soporte CUDA/NVENC.`,
        detalleRAM: `${device.RAM_Instalada} de alta velocidad.`,
        tip: `Excelente equipo para el cliente profesional o estudiante avanzado que busca velocidad de cálculo y renders sin tirones.`,
        altSku: null
      };
    }
  }

  if (software.reqGPU === 'dedicada_opt') {
    if (hasDedicated) {
      return {
        badge: '🟢 100% APTO Y FLUIDO (Alta Calidad)',
        compat: 'Apto competitivo con máxima tasa de cuadros',
        detalleGPU: `${device.Placa_Video} permite jugar/trabajar con fluidez superior a 100 FPS o exportar en 4K.`,
        detalleRAM: `${device.RAM_Instalada}.`,
        tip: `El cliente podrá disfrutar de ${software.name} sin comprometer calidad gráfica.`,
        altSku: null
      };
    } else if (ramGB >= software.minRAM) {
      return {
        badge: '🟡 APTO CON AJUSTES MEDIOS/BAJOS',
        compat: 'Apto para uso estándar o modo rendimiento',
        detalleGPU: `${device.Placa_Video}. En juegos se recomienda resolución 720p/1080p bajo o modo rendimiento. En edición permite 1080p fluido.`,
        detalleRAM: `${device.RAM_Instalada} (${device.Soporta_RAM === 'SÍ' ? 'ampliable a futuro 🟢' : 'memoria fija 🔴'}).`,
        tip: `Le sirve para jugar o diseñar a nivel casual. Si busca exigencia competitiva o exportación 4K continua, guiar hacia línea LOQ.`,
        altSku: '364912'
      };
    } else {
      return {
        badge: '🔴 AJUSTADO / NO RECOMENDADO',
        compat: 'Memoria insuficiente',
        detalleGPU: `${device.Placa_Video}.`,
        detalleRAM: `Tiene ${device.RAM_Instalada}. ${software.name} demanda mínimo ${software.minRAM} GB libres para no congelarse.`,
        tip: `Si el cliente elige este modelo, ofrecerle la ampliación de memoria RAM en el momento de la compra.`,
        altSku: 'CM4777'
      };
    }
  }

  // integrada_ok
  return {
    badge: '🟢 100% APTO Y FLUIDO',
    compat: 'Experiencia perfecta y sin demoras',
    detalleGPU: `${device.Placa_Video} ejecuta ${software.name} con total soltura.`,
    detalleRAM: `${device.RAM_Instalada} garantiza multitarea sin ralentizaciones.`,
    tip: `Equipo ideal para esta tarea. Garantía total de satisfacción en salón.`,
    altSku: null
  };
}

export function buildComparisonSheet(devA: RetailDevice, devB: RetailDevice): string {
  const dispA = getDisplaySku(devA);
  const dispB = getDisplaySku(devB);

  let vsMsg = `⚖️ *COMPARATIVA TÉCNICA EN SALÓN*\n`;
  vsMsg += `• *Opción A:* ${devA.Equipo} (SKU: *${dispA}*)\n`;
  vsMsg += `• *Opción B:* ${devB.Equipo} (SKU: *${dispB}*)\n\n`;

  // 1. Potencia y Gráficos
  vsMsg += `> 1️⃣ *POTENCIA Y GRÁFICOS (CPU / GPU)*\n`;
  vsMsg += `> • *${dispA}:* ${devA.Procesador} | ${devA.Placa_Video}\n`;
  vsMsg += `> • *${dispB}:* ${devB.Procesador} | ${devB.Placa_Video}\n`;
  if (devA.Tiene_GPU_Dedicada && !devB.Tiene_GPU_Dedicada) {
    vsMsg += `> 🏆 *Ganador Gráfico:* *${dispA}* por amplia ventaja (Placa NVIDIA RTX dedicada).\n`;
  } else if (devB.Tiene_GPU_Dedicada && !devA.Tiene_GPU_Dedicada) {
    vsMsg += `> 🏆 *Ganador Gráfico:* *${dispB}* por amplia ventaja (Placa NVIDIA RTX dedicada).\n`;
  } else {
    vsMsg += `> 🏆 *Veredicto:* Ambos con gráficos integrados; comparar según núcleos de procesamiento.\n`;
  }

  vsMsg += `\n`;

  // 2. RAM y Almacenamiento
  vsMsg += `> 2️⃣ *AMPLIABILIDAD Y VIDA ÚTIL (RAM / SSD)*\n`;
  const ramStatusA = devA.Soporta_RAM === 'SÍ' ? `Ampliable hasta ${devA.RAM_Max_GB}GB 🟢` : `Soldada no ampliable 🔴`;
  const ramStatusB = devB.Soporta_RAM === 'SÍ' ? `Ampliable hasta ${devB.RAM_Max_GB}GB 🟢` : `Soldada no ampliable 🔴`;
  vsMsg += `> • *${dispA}:* ${devA.RAM_Instalada} (${ramStatusA}) | SSD ${devA.Almacenamiento_Instalado}\n`;
  vsMsg += `> • *${dispB}:* ${devB.RAM_Instalada} (${ramStatusB}) | SSD ${devB.Almacenamiento_Instalado}\n`;
  if (devA.Soporta_RAM === 'SÍ' && devB.Soporta_RAM === 'NO') {
    vsMsg += `> 🏆 *Mayor Durabilidad Futura:* *${dispA}* (permite expandir memoria en salón).\n`;
  } else if (devB.Soporta_RAM === 'SÍ' && devA.Soporta_RAM === 'NO') {
    vsMsg += `> 🏆 *Mayor Durabilidad Futura:* *${dispB}* (permite expandir memoria en salón).\n`;
  } else {
    vsMsg += `> 🏆 *Empate técnico en expansión de memoria.*\n`;
  }

  vsMsg += `\n`;

  // 3. Pantalla y Formato
  vsMsg += `> 3️⃣ *PANTALLA Y FORMATO*\n`;
  vsMsg += `> • *${dispA}:* ${devA.Pantalla} (${devA.Tipo_Dispositivo})\n`;
  vsMsg += `> • *${dispB}:* ${devB.Pantalla} (${devB.Tipo_Dispositivo})\n\n`;

  // Veredicto
  vsMsg += `> 💡 *VEREDICTO DE VENTA EN GÓNDOLA*\n`;
  vsMsg += `> • Si el cliente prioriza *durabilidad y ampliabilidad a largo plazo* ➔ Recomendá el SKU *${devA.Soporta_RAM === 'SÍ' ? dispA : dispB}*.\n`;
  if (devA.Tiene_GPU_Dedicada || devB.Tiene_GPU_Dedicada) {
    const gamerDev = devA.Tiene_GPU_Dedicada ? dispA : dispB;
    vsMsg += `> • Si busca *gaming, render 3D o diseño pesado* ➔ El SKU *${gamerDev}* es la opción indiscutida.\n`;
  } else {
    vsMsg += `> • Si busca *pantalla grande para el hogar o comercio fijo* ➔ La opción All-in-One despeja el escritorio sin cables.\n`;
  }

  vsMsg += `\nℹ️ _Comparativa técnica generada para asistencia comercial de retail._`;
  return vsMsg;
}
