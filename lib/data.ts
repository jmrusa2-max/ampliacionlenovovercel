// lib/data.ts
import { supabase } from './supabaseClient';
// Asegúrate de que este tipo de dato (Device) contenga todas las propiedades seleccionadas
import { Device } from '@/types'; 

export async function getDevices(): Promise<Device[]> {
  // Esta función se deja intencionalmente vacía.
  // Cargar todos los dispositivos a la vez causa problemas de memoria en el servidor.
  // La funcionalidad de búsqueda principal no depende de esto.
  return [];
}

export async function searchDevice(query: string): Promise<Device | null> {
  // Se normaliza la búsqueda para evitar problemas con espacios.
  const safeQuery = query.trim();

  // Se restablece la condición .or() completa, que es la funcionalidad final.
  const orCondition = `
    art_fravega.eq.${safeQuery},
    art_on_city.eq.${safeQuery},
    art_cetrogar.eq.${safeQuery}
  `;

  const { data, error } = await supabase
    .from('devices') // Nombre de la tabla de la nueva BD
    .select(
      // Se seleccionan todas las columnas de tu CSV
      'part_number,Familia,Equipo,art_fravega,art_on_city,art_cetrogar,Tipo_Dispositivo,Soporta_RAM,RAM_Max_GB,Modulos_RAM,ram_modulos_ocupados,Tipo_RAM,Soporta_Almacenamiento,Tipo_Almacenamiento,Almacenamiento_Maximo_Total,Notas'
    )
    .or(orCondition) // Aplicamos la condición OR
    .limit(1);

  if (error) {
    console.error('Error fetching device by article code:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0];
}