// components/DeviceResultWrapper.tsx
'use client';

import { useState } from 'react';
import StatusCard from './StatusCard';
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';


import { Device } from '@/types';

interface DeviceResultWrapperProps {
  device: Device;
}

export default function DeviceResultWrapper({ device }: DeviceResultWrapperProps) {
  const [showDetails, setShowDetails] = useState(false);

  const ramSupport = device.Soporta_RAM === 'SÍ' || device.Soporta_RAM === 'SI';
  const storageSupport = device.Soporta_Almacenamiento === 'SÍ' || device.Soporta_Almacenamiento === 'SI';

  // --- Calculation for free RAM slots (moved from page.tsx) ---
  let ramSlotsLibres = 0;
  if (ramSupport) {
    const totalSlots = parseInt(device.Slots_RAM || '0', 10);
    const occupiedSlots = device.ram_slots_ocupados || 0;
    ramSlotsLibres = totalSlots - occupiedSlots;
  }

  if (showDetails) {
    // --- Detailed View ---
    return (
      <>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">{device.Marca}</h1>
          <p className="text-center text-slate-400 text-lg mb-6">{device.Modelo}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
            {/* --- RAM Card --- */}
            <div className={`border rounded-lg p-4 transition-all ${ramSupport ? 'border-green-500/50' : 'border-red-500/50'}`}>
              <h2 className="text-xl font-semibold mb-3">Memoria RAM</h2>
              <div className={`flex items-center text-lg font-medium mb-3 ${ramSupport ? 'text-green-400' : 'text-red-500'}`}>
                {ramSupport ? <CheckIcon /> : <XIcon />}
                <span className="ml-2">{ramSupport ? 'Ampliable' : 'No Ampliable'}</span>
              </div>
              {ramSupport ? (
                <div className="space-y-2 text-slate-400">
                  <p><strong>Total de Slots:</strong> {device.Slots_RAM}</p>
                  <p><strong>Slots Ocupados:</strong> {device.ram_slots_ocupados}</p>
                  <p><strong>Slots Libres:</strong> {ramSlotsLibres}</p>
                  <p><strong>RAM Máxima:</strong> {device.RAM_Max_GB} GB</p>
                  <p><strong>Tipo:</strong> {device.Tipo_RAM}</p>
                </div>
              ) : (
                <p className="text-slate-400">La memoria de este equipo viene soldada en placa y no puede ser modificada.</p>
              )}
            </div>

            {/* --- Storage Card --- */}
            <div className={`border rounded-lg p-4 transition-all ${storageSupport ? 'border-green-500/50' : 'border-red-500/50'}`}>
              <h2 className="text-xl font-semibold mb-3">Almacenamiento</h2>
              <div className={`flex items-center text-lg font-medium mb-3 ${storageSupport ? 'text-green-400' : 'text-red-500'}`}>
                {storageSupport ? <CheckIcon /> : <XIcon />}
                <span className="ml-2">{storageSupport ? 'Ampliable' : 'No Ampliable'}</span>
              </div>
              {storageSupport ? (
                <div className="space-y-2 text-slate-400">
                  <p><strong>Máximo Total:</strong> {device.Almacenamiento_Maximo_Total}</p>
                  <p><strong>Tipo:</strong> {device.Tipo_Almacenamiento}</p>
                </div>
              ) : (
                <p className="text-slate-400">El almacenamiento de este equipo no puede ser ampliado.</p>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 text-center">
            <button
                onClick={() => setShowDetails(false)}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
            >
                Volver
            </button>
        </div>
      </>
    );
  }

  // --- Initial "SI/NO" View ---
  return (
    <div className="p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">{device.Marca}</h1>
        <p className="text-center text-slate-400 text-lg mb-6">{device.Modelo}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusCard type="RAM" isSupported={ramSupport} />
            <StatusCard type="Almacenamiento" isSupported={storageSupport} />
        </div>
        <div className="text-center mt-8">
            <button
            onClick={() => setShowDetails(true)}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-transform transform hover:scale-105"
            >
            Ver más detalles
            </button>
        </div>
    </div>
  );
}