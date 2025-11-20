// lib/data.ts
import { supabase } from './supabaseClient';
import { Device } from '@/types'; 

export async function getDevices(): Promise<Device[]> {
  // Esta función se deja intencionalmente vacía, ya que no se usa para la búsqueda principal.
  return [];
}

export async function searchDevice(query: string): Promise<Device | null> {
  // Se normaliza la búsqueda para evitar problemas con espacios.
  const safeQuery = query.trim();

  // Se construye la condición .or() final.
  // ATENCIÓN: Se añaden comillas simples (') alrededor de ${safeQuery} para forzar 
  // que la BD busque el valor como un STRING, resolviendo el problema de Vercel.
  const orCondition = `
    art_fravega.eq.'${safeQuery}',
    art_on_city.eq.'${safeQuery}',
    art_cetrogar.eq.'${safeQuery}'
  `;

  const { data, error } = await supabase
    .from('devices') // Tabla verificada con la nueva BD
    .select(
      // Columnas verificadas con el CSV y estructura final
      'part_number,Familia,Equipo,art_fravega,art_on_city,art_cetrogar,Tipo_Dispositivo,Soporta_RAM,RAM_Max_GB,Modulos_RAM,ram_modulos_ocupados,Tipo_RAM,Soporta_Almacenamiento,Tipo_Almacenamiento,Almacenamiento_Maximo_Total,Notas'
    )
    .or(orCondition) // Aplicamos la condición corregida
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