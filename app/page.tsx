import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">¿Se puede ampliar?</h1>
        <p className="text-center text-gray-300 mb-8">Consulta si se puede ampliar la RAM o el almacenamiento de notebooks y AIO Lenovo</p>

        <SearchBar />

      </div>
    </div>
  );
}