// components/DeviceResultWrapper.tsx
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import StatusCard from './StatusCard';
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';
import Toast from './Toast';

import Tooltip from './Tooltip';


import { Device } from '@/types';

interface DeviceResultWrapperProps {
  device: Device;
  searchTerm: string;
}

export default function DeviceResultWrapper({ device, searchTerm }: DeviceResultWrapperProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const ramSupport = device.Soporta_RAM === 'SÍ' || device.Soporta_RAM === 'SI';
  const storageSupport = device.Soporta_Almacenamiento === 'SÍ' || device.Soporta_Almacenamiento === 'SI';

  // --- Calculation for free RAM slots (moved from page.tsx) ---
  let ramSlotsLibres = 0;
  if (ramSupport) {
    const totalSlots = parseInt(device.Modulos_RAM || '0', 10);
    const occupiedSlots = device.ram_modulos_ocupados || 0;
    ramSlotsLibres = totalSlots - occupiedSlots;
  }

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const shareData = {
      title: `Ampliación: ${device.Equipo}`,
      text: `Consulta si el equipo ${device.Equipo} soporta ampliación de RAM/almacenamiento`,
      url,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShowToast(true);
      }
    } catch {
      // User cancelled share or clipboard failed
      try {
        await navigator.clipboard.writeText(url);
        setShowToast(true);
      } catch {
        // Silently fail
      }
    }
  }, [device.Equipo]);

  const handleToastDone = useCallback(() => {
    setShowToast(false);
  }, []);

  if (showDetails) {
    // --- Detailed View ---
    return (
      <>
        <Toast message="¡Enlace copiado al portapapeles!" show={showToast} onDone={handleToastDone} />
        <div className="p-6 sm:p-8 animate-fade-in-up">
          {/* Título actualizado al color exacto */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#FF4757]">{device.Equipo}</h1>
          <p className="text-center text-slate-400 text-lg mb-6">{searchTerm}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
            {/* --- RAM Card --- */}
            <div className={`animate-scale-in-delay-1 border rounded-lg p-4 transition-all text-center ${ramSupport ? 'status-card-supported border-green-500/50' : 'status-card-not-supported border-[#FF4757]/50'}`}>
              <h2 className="text-xl font-semibold mb-3">Memoria RAM</h2>
              <div className={`flex items-center justify-center text-lg font-medium mb-3 ${ramSupport ? 'text-green-400' : 'text-[#FF4757]'}`}>
                <div className={ramSupport ? 'animate-icon-pulse' : 'animate-gentle-shake'}>
                  {ramSupport ? <CheckIcon /> : <XIcon />}
                </div>
                <span className="ml-2">{ramSupport ? 'Ampliable' : 'No Ampliable'}</span>
              </div>
              {ramSupport ? (
                <div className="space-y-2 text-slate-400 text-center">
                  <div className="flex items-center justify-center gap-1">
                  <span><strong>Total de Módulos:</strong> {device.Modulos_RAM}</span>
                  <Tooltip text="Incluye módulos soldados y removibles">
                    <span className="text-xs text-gray-500">ℹ️</span>
                  </Tooltip>
                </div>
                  <p><strong>Módulos Ocupados:</strong> {device.ram_modulos_ocupados}</p>
                  <p><strong>Módulos Libres:</strong> {ramSlotsLibres}</p>
                  <p><strong>RAM Máxima:</strong> {device.RAM_Max_GB} GB</p>
                  <p><strong>Tipo:</strong> {device.Tipo_RAM}</p>
                </div>
              ) : (
                <p className="text-slate-400">La memoria RAM de este equipo no permite ser ampliada.</p>
              )}
            </div>

            {/* --- Storage Card --- */}
            <div className={`animate-scale-in-delay-2 border rounded-lg p-4 transition-all text-center ${storageSupport ? 'status-card-supported border-green-500/50' : 'status-card-not-supported border-[#FF4757]/50'}`}>
              <h2 className="text-xl font-semibold mb-3">Almacenamiento</h2>
              <div className={`flex items-center justify-center text-lg font-medium mb-3 ${storageSupport ? 'text-green-400' : 'text-[#FF4757]'}`}>
                <div className={storageSupport ? 'animate-icon-pulse' : 'animate-gentle-shake'}>
                  {storageSupport ? <CheckIcon /> : <XIcon />}
                </div>
                <span className="ml-2">{storageSupport ? 'Ampliable' : 'No Ampliable'}</span>
              </div>
              {storageSupport ? (
                <div className="space-y-2 text-slate-400 text-center">
                  <p><strong>Máximo Total:</strong> {device.Almacenamiento_Maximo_Total}</p>
                  <p><strong>Tipo:</strong> {device.Tipo_Almacenamiento}</p>
                </div>
              ) : (
                <p className="text-slate-400">El almacenamiento de este equipo no puede ser ampliado.</p>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 text-center animate-fade-in-up-delay-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <button
                  onClick={() => setShowDetails(false)}
                  className="px-8 py-3 bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-red-900/20"
              >
                  Ocultar detalles
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-all transform hover:scale-105 border border-white/10 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartir
              </button>
            </div>
            <div className="mt-6">
                <Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors">
                    Buscar otro artículo
                </Link>
            </div>
            <p className="text-xs text-gray-500 italic mt-4">
                Los datos son a modo informativo, pueden variar sin previo aviso y no constituyen una oferta de venta.
            </p>
        </div>
      </>
    );
  }

  // --- Initial "SI/NO" View ---
  return (
    <>
      <Toast message="¡Enlace copiado al portapapeles!" show={showToast} onDone={handleToastDone} />
      <div className="p-6 sm:p-8 animate-fade-in-up">
          {/* Título actualizado al color exacto */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#FF4757]">{device.Equipo}</h1>
          <p className="text-center text-slate-400 text-lg mb-6">{searchTerm}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-scale-in-delay-1">
                <StatusCard type="RAM" isSupported={ramSupport} />
              </div>
              <div className="animate-scale-in-delay-2">
                <StatusCard type="Almacenamiento" isSupported={storageSupport} />
              </div>
          </div>
          <div className="text-center mt-8 animate-fade-in-up-delay-2">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-8 py-3 bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-red-900/20"
                >
                  Ver más detalles
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-all transform hover:scale-105 border border-white/10 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartir
                </button>
              </div>
              <div className="mt-6">
                <Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Buscar otro artículo
                </Link>
              </div>
              <p className="text-xs text-gray-500 italic mt-4">
                  Los datos son a modo informativo, pueden variar sin previo aviso y no constituyen una oferta de venta.
              </p>
          </div>
      </div>
    </>
  );
}