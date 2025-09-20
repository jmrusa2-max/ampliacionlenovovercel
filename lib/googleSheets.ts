// lib/googleSheets.ts

import { google } from 'googleapis';

export interface Device {
  Modelo: string;
  Marca: string;
  Tipo_Dispositivo: string;
  Soporta_RAM: string;
  RAM_Max_GB: string;
  Slots_RAM: string;
  Tipo_RAM: string;
  Soporta_Almacenamiento: string;
  Tipo_Almacenamiento: string;
  Almacenamiento_Maximo_Total: string;
  Notas?: string;
}

export async function getSheetData(): Promise<Device[]> {
  try {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!apiKey || !sheetId) {
      throw new Error("No se encontraron la API Key o el Sheet ID en el archivo .env.local");
    }

    const sheets = google.sheets({ version: 'v4', auth: apiKey });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'base',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log("No se encontraron datos en la hoja.");
      return [];
    }

    const devices: Device[] = rows.slice(1).map((row) => ({
      Modelo: row[0] || '',
      Marca: row[1] || '',
      Tipo_Dispositivo: row[2] || '',
      Soporta_RAM: row[3] || '',
      RAM_Max_GB: row[4] || '',
      Slots_RAM: row[5] || '',
      Tipo_RAM: row[6] || '',
      Soporta_Almacenamiento: row[7] || '',
      Tipo_Almacenamiento: row[8] || '',
      Almacenamiento_Maximo_Total: row[9] || '',
      Notas: row[10] || '',
    }));

    return devices;

  } catch (error) {
    console.error("Error al obtener los datos de Google Sheets:", error);
    return [];
  }
}