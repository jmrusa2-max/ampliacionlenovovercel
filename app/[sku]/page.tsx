import { getSheetData } from '@/lib/googleSheets';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: { sku: string } }) {
  const sku = params.sku;
  const data = await getSheetData();

  // Busca el producto por SKU (asegúrate de que el nombre del campo coincida con tu Google Sheet)
  const product = data.find((item) => item.SKU === sku);

  if (!product) {
    notFound(); // Muestra página 404 si no se encuentra
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{product.modelo}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg">
                <strong className="text-gray-300">SKU:</strong> {product.SKU}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">RAM:</strong> {product.RAM}
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">Almacenamiento:</strong> {product.Almacenamiento}
              </p>
            </div>
            <div>
              <p className="text-lg">
                <strong className="text-gray-300">Puede ampliarse:</strong>{' '}
                <span className={product.PuedeAmpliarse ? 'text-green-400' : 'text-red-400'}>
                  {product.PuedeAmpliarse ? 'Sí' : 'No'}
                </span>
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