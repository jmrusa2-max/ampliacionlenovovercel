// lib/data.ts
import { supabase } from './supabaseClient';

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

export async function getDevices(): Promise<Device[]> {
  const { data, error } = await supabase
    .from('devices')
    .select('*');

  if (error) {
    console.error('Error fetching devices from Supabase:', error);
    return [];
  }

  return data || [];
}

export async function getDeviceByModel(modelo: string): Promise<Device | null> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .ilike('Modelo', modelo) // Búsqueda insensible a mayúsculas/minúsculas
    .single(); // Espera una sola fila, ideal para modelos únicos

  if (error) {
    // No registrar "No se encontraron resultados" como un error, es un caso de uso normal
    if (error.code !== 'PGRST116') { 
      console.error('Error fetching device by model:', error);
    }
    return null;
  }

  return data;
}