// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-red-500">404</h1>
      <p className="text-slate-400 text-lg mb-6">Artículo inexistente.</p>
      <Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors">
        Buscar otro artículo
      </Link>
    </div>
  );
}