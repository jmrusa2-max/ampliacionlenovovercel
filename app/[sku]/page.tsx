// app/[sku]/page.tsx
// ¡NO debe tener 'use client'!

import { getSheetData } from '@/lib/googleSheets';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: { sku: string } }) {
  const sku = params.sku;
  const data = await getSheetData();

  const product = data.find((item) => item.Modelo === sku);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{product.Modelo}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg">
                <strong className="text-gray-300">Modelo (SKU):</strong> {product.Modelo}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Marca:</strong> {product.Marca}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Tipo de Dispositivo:</strong> {product.Tipo_Dispositivo}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">RAM Máxima:</strong> {product.RAM_Max_GB}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Slots RAM:</strong> {product.Slots_RAM}
              </p>
            </div>
            <div>
              <p className="text-lg">
                <strong className="text-gray-300">Tipo de RAM:</strong> {product.Tipo_RAM}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Almacenamiento Máximo:</strong> {product.Almacenamiento_Maximo_Total}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Tipo de Almacenamiento:</strong> {product.Tipo_Almacenamiento}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Soporta RAM:</strong> {product.Soporta_RAM}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Soporta Almacenamiento:</strong> {product.Soporta_Almacenamiento}
              </p>
              {product.Notas && (
                <p className="text-lg mt-4">
                  <strong className="text-gray-300">Notas:</strong> {product.Notas}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}