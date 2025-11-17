import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <div className="w-full max-w-3xl bg-white/25 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-red-500 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
        ¿Se Puede Ampliar?
      </h1>
      <p className="mt-4 text-lg text-gray-200">
        Consulta si se pueden ampliar las memorias de notebooks y AIO Lenovo
      </p>
      <div className="mt-8">
        <SearchBar />
      </div>
    </div>
  );
}