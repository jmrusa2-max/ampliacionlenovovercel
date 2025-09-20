
// app/api/devices/route.ts
import { getDevices } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getDevices();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch device data' }, { status: 500 });
  }
}
