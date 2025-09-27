// app/[modelo]/page.tsx
'use client'; // Required for hooks and animations in the dashboard

import { getDeviceByModel } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HardwareDashboard from '@/components/HardwareDashboard';
import { useEffect, useState } from 'react';

// This page will be dynamically rendered to ensure it always has fresh data
export const dynamic = 'force-dynamic';

interface ModeloPageProps {
  params: { modelo: string };
}

export default function ModeloPage({ params }: ModeloPageProps) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      const decodedModelo = decodeURIComponent(params.modelo);
      const device = await getDeviceByModel(decodedModelo);
      if (!device) {
        notFound();
      }
      setProduct(device);
      setLoading(false);
    };

    fetchDevice();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <div className="mb-6">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Volver a la búsqueda
            </Link>
        </div>

        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <HardwareDashboard product={product} />
        )}
      </div>
    </div>
  );
}