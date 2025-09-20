// app/page.tsx
// ¡NO debe tener 'use client'!

import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">¿Se puede ampliar?</h1>
        <p className="text-center text-gray-300 mb-8">Consulta si puedes ampliar la RAM o el almacenamiento.</p>

        <SearchBar />

        <div className="mt-8 text-center">
          <Link href="/CM4774" className="text-blue-400 hover:text-blue-300 inline-block">
            Ver ejemplo de producto
          </Link>
        </div>
      </div>
    </div>
  );
}