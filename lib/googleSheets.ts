// lib/googleSheets.ts

import { google } from 'googleapis';

// Definimos la estructura de nuestros datos para que TypeScript entienda
export interface Device {
  modelo: string;
  marca: string;
  tipo_dispositivo: string;
  soporta_ram: string;
  ram_max_gb: string;
  slots_ram: string;
  tipo_ram: string;
  soporta_almacenamiento: string;
  tipo_almacenamiento: string;
  almacenamiento_max_gb: string;
}

export async function getSheetData(): Promise<Device[]> {
  try {
    // Le decimos a nuestro código que busque los "ingredientes secretos"
    // en el archivo .env.local
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // Verificamos que los ingredientes existan
    if (!apiKey || !sheetId) {
      throw new Error("No se encontraron la API Key o el Sheet ID en el archivo .env.local");
    }

    // Preparamos la conexión a la API de Google Sheets
    const sheets = google.sheets({ version: 'v4', auth: apiKey });

    // Hacemos la petición para obtener los valores de la hoja
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'base', // ¡IMPORTANTE! Este es el nombre de la pestaña en tu hoja de cálculo.
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log("No se encontraron datos en la hoja.");
      return [];
    }

    // Convertimos las filas (arrays) en objetos más manejables,
    // saltando la primera fila que son los encabezados (por eso el .slice(1))
    const devices: Device[] = rows.slice(1).map((row) => ({
      modelo: row[0] || '',
      marca: row[1] || '',
      tipo_dispositivo: row[2] || '',
      soporta_ram: row[3] || '',
      ram_max_gb: row[4] || '',
      slots_ram: row[5] || '',
      tipo_ram: row[6] || '',
      soporta_almacenamiento: row[7] || '',
      tipo_almacenamiento: row[8] || '',
      almacenamiento_max_gb: row[9] || '',
    }));

    return devices;

  } catch (error) {
    console.error("Error al obtener los datos de Google Sheets:", error);
    // En caso de error, devolvemos una lista vacía para que la app no se rompa
    return [];
  }
}

// Puedes crear funciones adicionales aquí para buscar un modelo específico
// usando los datos que obtuvimos de getSheetData.