// types/index.ts
export interface Device {
  Modelo: string;
  Marca: string;
  Tipo_Dispositivo: string;
  Soporta_RAM: 'SÍ' | 'NO' | 'SI';
  RAM_Max_GB: string;
  Slots_RAM: string;
  ram_slots_ocupados: number;
  Tipo_RAM: string;
  Soporta_Almacenamiento: 'SÍ' | 'NO' | 'SI';
  Tipo_Almacenamiento: string;
  Almacenamiento_Maximo_Total: string;
  Notas?: string;
}
