// app/[modelo]/page.tsx
import { getDeviceByModel } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeviceResultWrapper from '@/components/DeviceResultWrapper';

// This page will be dynamically rendered to ensure it always has fresh data
export const dynamic = 'force-dynamic';

interface ModeloPageProps {
  params: { modelo: string };
}

export default async function ModeloPage({ params }: ModeloPageProps) {
  const modelo = decodeURIComponent(params.modelo);
  const product = await getDeviceByModel(modelo);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block transition-colors">
          ← Volver a la búsqueda
        </Link>

        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <DeviceResultWrapper product={product} />
        </div>
      </div>
    </div>
  );
}