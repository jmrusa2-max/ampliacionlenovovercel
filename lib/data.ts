// lib/data.ts
import { supabase } from './supabaseClient';
import { Device } from '@/types';

export async function getDevices(): Promise<Device[]> {
  // Esta función se deja intencionalmente vacía, ya que no se usa para la búsqueda principal.
  return [];
}

export async function searchDevice(query: string): Promise<Device | null> {
  const safeQuery = query.trim();

  // ✅ CORREGIDO: Sin comillas manuales. Usa interpolación segura de Supabase.
  // PostgREST interpreta automáticamente los valores como strings si las columnas son text.
  const { data, error } = await supabase
    .from('devices')
    .select(
      'part_number,Familia,Equipo,art_fravega,art_on_city,art_cetrogar,Tipo_Dispositivo,Soporta_RAM,RAM_Max_GB,Modulos_RAM,ram_modulos_ocupados,Tipo_RAM,Soporta_Almacenamiento,Tipo_Almacenamiento,Almacenamiento_Maximo_Total,Notas'
    )
    .or(`art_fravega.ilike.${safeQuery},art_on_city.ilike.${safeQuery},art_cetrogar.ilike.${safeQuery},art_naldo.ilike.${safeQuery}`)
    .limit(1);

  if (error) {
    console.error('[searchDevice] Error en Supabase:', error);
    return null;
  }

  return data?.[0] ?? null;
}