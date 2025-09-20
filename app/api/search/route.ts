// app/api/search/route.ts
// API route para el autocompletado

import { searchModels } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json([], { status: 400 });
  }

  const results = await searchModels(query);
  return NextResponse.json(results);
}
