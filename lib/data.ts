// lib/data.ts
import { supabase } from './supabaseClient';
import { Device } from '@/types';

export async function getDevices(): Promise<Device[]> {
  // This function is intentionally left empty.
  // Loading all devices at once causes server memory issues.
  // The main search functionality does not depend on this.
  return [];
}

export async function searchDevice(query: string): Promise<Device | null> {
  const { data, error } = await supabase
    .from('devices')
    .select(
      'part_number,Familia,Equipo,art_fravega,art_on_city,art_cetrogar,Tipo_Dispositivo,Soporta_RAM,RAM_Max_GB,Modulos_RAM,ram_modulos_ocupados,Tipo_RAM,Soporta_Almacenamiento,Tipo_Almacenamiento,Almacenamiento_Maximo_Total,Notas'
    )
    .or(`art_fravega.eq.${query},art_on_city.eq.${query},art_cetrogar.eq.${query}`)
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