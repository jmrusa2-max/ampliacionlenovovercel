// types/index.ts
export interface Device {
  part_number: string;
  Familia: string;
  Equipo: string;
  art_fravega?: string;
  art_on_city?: string;
  art_cetrogar?: string;
  Tipo_Dispositivo: string;
  Soporta_RAM: 'SÍ' | 'NO' | 'SI';
  RAM_Max_GB: string;
  Modulos_RAM: string;
  ram_modulos_ocupados: number;
  Tipo_RAM: string;
  Soporta_Almacenamiento: 'SÍ' | 'NO' | 'SI';
  Tipo_Almacenamiento: string;
  Almacenamiento_Maximo_Total: string;
  Notas?: string;
}
