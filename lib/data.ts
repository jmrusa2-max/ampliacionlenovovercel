// lib/data.ts
import { supabase } from './supabaseClient';
import { Device } from '@/types';

export async function getDevices(): Promise<Device[]> {
  // Esta función se deja intencionalmente vacía.
  // Cargar todos los dispositivos a la vez causa problemas de memoria en el servidor.
  // La funcionalidad de búsqueda principal no depende de esto.
  return [];
}

export async function searchDevice(query: string): Promise<Device | null> {
  // 1. Aseguramos que el valor de la query sea un string válido y eliminamos espacios
  //    al inicio/final para una búsqueda más limpia.
  const safeQuery = query.trim();

  // 2. Construimos la cláusula .or() con la sintaxis de string que ha demostrado
  //    ser más compatible y robusta en entornos de producción (Vercel).
  //    Buscamos el valor exacto (.eq.) en las tres columnas de artículos.
  const orCondition = `
    art_fravega.eq.${safeQuery},
    art_on_city.eq.${safeQuery},
    art_cetrogar.eq.${safeQuery}
  `;

  const { data, error } = await supabase
    .from('devices') // Nombre de tabla verificado
    .select(
      'part_number,Familia,Equipo,art_fravega,art_on_city,art_cetrogar,Tipo_Dispositivo,Soporta_RAM,RAM_Max_GB,Modulos_RAM,ram_modulos_ocupados,Tipo_RAM,Soporta_Almacenamiento,Tipo_Almacenamiento,Almacenamiento_Maximo_Total,Notas'
    ) // Columnas verificadas con el CSV
    .or(orCondition) // Aplicamos la condición robusta
    .limit(1);

  if (error) {
    console.error('Error fetching device by article code:', error); 
    return null;
  }

  if (!data || data.length === 0) {
    // Si no se encuentran datos, retorna null (provocando el 404/Inexistente).
    return null;
  }

  return data[0];
}