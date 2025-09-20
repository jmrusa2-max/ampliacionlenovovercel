// app/[modelo]/page.tsx

import { getSheetData } from "@/lib/googleSheets";
import { notFound } from 'next/navigation';
import { FooterSearch } from '@/components/FooterSearch';


interface PageProps {
  params: { modelo: string };
}

export default async function ResultPage({ params }: PageProps) {
  const allDevices = await getSheetData();
  const requestedModel = decodeURIComponent(params.modelo).toLowerCase();

  // --- LÍNEAS DE DEPURACIÓN (LA LUPA) ---
  console.log("-----------------------------------------");
  console.log("Buscando el modelo desde la URL:", `"${requestedModel}"`);
  console.log("Datos recibidos de Google Sheets:", allDevices);
  console.log("-----------------------------------------");
  // --- FIN DE LÍNEAS DE DEPURACIÓN ---

  const device = allDevices.find(
    // Hacemos la búsqueda más robusta con .trim() para quitar espacios
    (d) => d.modelo.trim().toLowerCase() === requestedModel
  );

  if (!device) {
    notFound();
  }

  // El return con el código para mostrar la página no cambia
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      
      <div className="w-full max-w-4xl bg-slate-800 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-700">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-100">{device.marca} {device.modelo}</h1>
        <h2 className="text-lg text-slate-400 mb-8">{device.tipo_dispositivo}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-700 rounded-lg p-6 bg-slate-900">
            <h3 className="text-2xl font-semibold mb-4 text-slate-200">Memoria RAM</h3>
            <p className={`text-2xl font-bold ${device.soporta_ram === 'SÍ' ? 'text-green-500' : 'text-red-500'}`}>
              {device.soporta_ram === 'SÍ' ? '✅ Soporta Ampliación' : '❌ No Soporta Ampliación'}
            </p>
            {device.soporta_ram === 'SÍ' && (
              <ul className="mt-4 space-y-2 text-slate-400">
                <li>Memoria Máxima: <strong>{device.ram_max_gb} GB</strong></li>
                <li>Ranuras Totales: <strong>{device.slots_ram}</strong></li>
                <li>Tipo de RAM: <strong>{device.tipo_ram}</strong></li>
              </ul>
            )}
          </div>
          <div className="border border-slate-700 rounded-lg p-6 bg-slate-900">
            <h3 className="text-2xl font-semibold mb-4 text-slate-200">Almacenamiento</h3>
            <p className={`text-2xl font-bold ${device.soporta_almacenamiento === 'SÍ' ? 'text-green-500' : 'text-red-500'}`}>
              {device.soporta_almacenamiento === 'SÍ' ? '✅ Soporta Ampliación' : '❌ No Soporta Ampliación'}
            </p>
            {device.soporta_almacenamiento === 'SÍ' && (
              <ul className="mt-4 space-y-2 text-slate-400">
                <li>Tipo de Disco: <strong>{device.tipo_almacenamiento}</strong></li>
                <li>Capacidad Máxima: <strong>{device.almacenamiento_max_gb}</strong></li>
              </ul>
            )}
          </div>
        </div>
        
      </div>
      <FooterSearch />
    </main>
  );
}