// app/[modelo]/page.tsx
import { getDeviceByModel } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// This page will be dynamically rendered to ensure it always has fresh data
export const dynamic = 'force-dynamic';

interface ModeloPageProps {
  params: { modelo: string };
}

// --- Icon Components for visual feedback ---
const CheckIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const CrossIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export default async function ModeloPage({ params }: ModeloPageProps) {
  const modelo = decodeURIComponent(params.modelo);
  const product = await getDeviceByModel(modelo);

  if (!product) {
    notFound();
  }

  const ramSupport = product.Soporta_RAM?.toUpperCase() === 'SI';
  const storageSupport = product.Soporta_Almacenamiento?.toUpperCase() === 'SI';

  // --- Calculation for free RAM slots ---
  let ramSlotsLibres = 0;
  if (ramSupport) {
    const totalSlots = parseInt(product.Slots_RAM, 10) || 0;
    const occupiedSlots = product.ram_slots_ocupados || 0;
    ramSlotsLibres = totalSlots - occupiedSlots;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block transition-colors">
          ← Volver a la búsqueda
        </Link>

        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">{product.Marca}</h1>
            <p className="text-center text-slate-400 text-lg mb-6">{product.Modelo}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
              {/* --- RAM Card --- */}
              <div className={`border rounded-lg p-4 transition-all ${ramSupport ? 'border-green-500/50' : 'border-red-500/50'}`}>
                <h2 className="text-xl font-semibold mb-3">Memoria RAM</h2>
                <div className={`flex items-center text-lg font-medium mb-3 ${ramSupport ? 'text-green-400' : 'text-red-500'}`}>
                  {ramSupport ? <CheckIcon /> : <CrossIcon />}
                  <span>{ramSupport ? 'Ampliable' : 'No Ampliable'}</span>
                </div>
                {ramSupport ? (
                  <div className="space-y-2 text-slate-400">
                    <p><strong>Total de Slots:</strong> {product.Slots_RAM}</p>
                    <p><strong>Slots Ocupados:</strong> {product.ram_slots_ocupados}</p>
                    <p><strong>Slots Libres:</strong> {ramSlotsLibres}</p>
                    <p><strong>RAM Máxima:</strong> {product.RAM_Max_GB} GB</p>
                    <p><strong>Tipo:</strong> {product.Tipo_RAM}</p>
                  </div>
                ) : (
                  <p className="text-slate-400">La memoria de este equipo viene soldada en placa y no puede ser modificada.</p>
                )}
              </div>

              {/* --- Storage Card --- */}
              <div className={`border rounded-lg p-4 transition-all ${storageSupport ? 'border-green-500/50' : 'border-red-500/50'}`}>
                <h2 className="text-xl font-semibold mb-3">Almacenamiento</h2>
                <div className={`flex items-center text-lg font-medium mb-3 ${storageSupport ? 'text-green-400' : 'text-red-500'}`}>
                  {storageSupport ? <CheckIcon /> : <CrossIcon />}
                  <span>{storageSupport ? 'Ampliable' : 'No Ampliable'}</span>
                </div>
                {storageSupport ? (
                  <div className="space-y-2 text-slate-400">
                    <p><strong>Máximo Total:</strong> {product.Almacenamiento_Maximo_Total}</p>
                    <p><strong>Tipo:</strong> {product.Tipo_Almacenamiento}</p>
                  </div>
                ) : (
                  <p className="text-slate-400">El almacenamiento de este equipo no puede ser ampliado.</p>
                )}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}