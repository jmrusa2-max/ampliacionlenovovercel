// app/[modelo]/page.tsx
import { searchDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeviceResultWrapper from '@/components/DeviceResultWrapper';

// This page will be dynamically rendered to ensure it always has fresh data
export const dynamic = 'force-dynamic';

interface ModeloPageProps {
  params: { modelo: string };
}

export default async function ModeloPage({ params }: ModeloPageProps) {
  const resolvedParams = await params;
  const modelo = decodeURIComponent(resolvedParams.modelo);
  const device = await searchDevice(modelo);

  if (!device) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="w-full bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <DeviceResultWrapper device={device} />
      </div>
    </div>
  );
}