// app/api/search/route.ts

import { getSheetData } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const models = await getSheetData();
    const filtered = models.filter(model =>
      model.Modelo.toLowerCase().includes(query) // Filtra por Modelo (tu SKU)
    );
    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json({ error: 'Error al buscar modelos' }, { status: 500 });
  }
}