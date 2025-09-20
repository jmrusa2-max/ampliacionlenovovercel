import { getSheetData } from '@/lib/googleSheets'; // ✅ CORRECTO: esta función SÍ existe
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const models = await getSheetData(); // ✅ CORRECTO: usamos la función que YA FUNCIONA
    const filtered = models.filter(model =>
      model.Modelo.toLowerCase().includes(query)
    );
    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json({ error: 'Error al buscar modelos' }, { status: 500 });
  }
}