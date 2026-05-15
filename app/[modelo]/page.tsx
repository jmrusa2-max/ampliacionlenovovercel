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

  let device;
  try {
    device = await searchDevice(modelo);
  } catch (error) {
    console.error('[ModeloPage] Error al consultar Supabase:', error);
    return (
      <div className="w-full max-w-3xl animate-fade-in-up">
        <div className="w-full bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-8 text-center">
          <div className="text-[#FF4757] mb-4">
            <svg className="w-14 h-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#FF4757] mb-2">Error de conexión</h1>
          <p className="text-gray-300 mb-6">
            No se pudo consultar la base de datos. Por favor, intentá de nuevo en unos segundos.
          </p>
          <Link
            href={`/${encodeURIComponent(modelo)}`}
            className="inline-block px-8 py-3 bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-red-900/20"
          >
            Reintentar
          </Link>
          <div className="mt-4">
            <Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!device) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      <div className="w-full bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <DeviceResultWrapper device={device} searchTerm={modelo} />
      </div>
    </div>
  );
}