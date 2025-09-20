// types/index.ts
export interface Device {
  modelo: string;
  marca: string;
  tipo_dispositivo: 'Notebook' | 'PC' | 'All-in-One';
  soporta_ram: 'SÍ' | 'NO';
  ram_max_gb?: number;
  slots_ram?: number;
  tipo_ram?: string;
  soporta_almacenamiento: 'SÍ' | 'NO';
  tipo_almacenamiento?: string;
  almacenamiento_max_gb?: number;
  link_imagen?: string;
}