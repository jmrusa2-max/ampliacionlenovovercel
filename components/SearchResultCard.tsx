import { Device } from '@/types';
import { CpuChipIcon, CircleStackIcon, CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

export default function SearchResultCard({ device }: { device: Device }) {
  const ramSupport = device.Soporta_RAM?.toUpperCase() === 'SI';
  const storageSupport = device.Soporta_Almacenamiento?.toUpperCase() === 'SI';

  let ramSlotsLibres = 0;
  if (ramSupport) {
    const totalSlots = parseInt(device.Slots_RAM, 10) || 0;
    const occupiedSlots = device.ram_slots_ocupados || 0;
    ramSlotsLibres = totalSlots - occupiedSlots;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-text-primary mb-2">{device.Marca}</h1>
      <p className="text-lg text-text-secondary mb-6">{device.Modelo}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RAM Section */}
        <div className={`rounded-lg p-4 border ${ramSupport ? 'border-green-500/50' : 'border-red-500/50'}`}>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <CpuChipIcon className="w-6 h-6 mr-2" /> Memoria RAM
          </h2>
          <div className={`flex items-center text-lg font-medium mb-3 ${ramSupport ? 'text-green-500' : 'text-red-500'}`}>
            {ramSupport ? <CheckCircleIcon className="w-6 h-6 mr-2" /> : <NoSymbolIcon className="w-6 h-6 mr-2" />}
            <span>{ramSupport ? 'Ampliable' : 'No Ampliable'}</span>
          </div>
          {ramSupport ? (
            <div className="space-y-2 text-text-secondary">
              <p><strong>Total de Slots:</strong> {device.Slots_RAM}</p>
              <p><strong>Slots Ocupados:</strong> {device.ram_slots_ocupados}</p>
              <p><strong>Slots Libres:</strong> {ramSlotsLibres}</p>
              <p><strong>RAM Máxima:</strong> {device.RAM_Max_GB} GB</p>
              <p><strong>Tipo:</strong> {device.Tipo_RAM}</p>
            </div>
          ) : (
            <p className="text-text-secondary">La memoria de este equipo viene soldada en placa y no puede ser modificada.</p>
          )}
        </div>

        {/* Storage Section */}
        <div className={`rounded-lg p-4 border ${storageSupport ? 'border-green-500/50' : 'border-red-500/50'}`}>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <CircleStackIcon className="w-6 h-6 mr-2" /> Almacenamiento
          </h2>
          <div className={`flex items-center text-lg font-medium mb-3 ${storageSupport ? 'text-green-500' : 'text-red-500'}`}>
            {storageSupport ? <CheckCircleIcon className="w-6 h-6 mr-2" /> : <NoSymbolIcon className="w-6 h-6 mr-2" />}
            <span>{storageSupport ? 'Ampliable' : 'No Ampliable'}</span>
          </div>
          {storageSupport ? (
            <div className="space-y-2 text-text-secondary">
              <p><strong>Máximo Total:</strong> {device.Almacenamiento_Maximo_Total}</p>
              <p><strong>Tipo:</strong> {device.Tipo_Almacenamiento}</p>
            </div>
          ) : (
            <p className="text-text-secondary">El almacenamiento de este equipo no puede ser ampliado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
