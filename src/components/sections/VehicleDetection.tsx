import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  ScanEye, 
  Play, 
  Square, 
  Car, 
  Bike, 
  Bus, 
  Truck, 
  Video, 
  ShieldAlert,
  Sliders,
  Crosshair,
  Sparkles,
  Info
} from 'lucide-react';

export const VehicleDetection: React.FC = () => {
  const { isCameraRunning, startCamera, stopCamera, detectionData, selectedJunction } = useTraffic();
  const [showLabels, setShowLabels] = useState(true);

  // Label color tags
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Car':
        return { border: 'border-cyan-400', bg: 'bg-cyan-500/20', text: 'text-cyan-300', tag: 'bg-cyan-500' };
      case 'Motorcycle':
        return { border: 'border-amber-400', bg: 'bg-amber-500/20', text: 'text-amber-300', tag: 'bg-amber-500' };
      case 'Bus':
        return { border: 'border-emerald-400', bg: 'bg-emerald-500/20', text: 'text-emerald-300', tag: 'bg-emerald-500' };
      case 'Truck':
      default:
        return { border: 'border-purple-400', bg: 'bg-purple-500/20', text: 'text-purple-300', tag: 'bg-purple-500' };
    }
  };

  return (
    <section id="detection" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <ScanEye className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Edge Computer Vision Pipeline
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            AI VEHICLE DETECTION
          </h2>
        </div>

        {/* Buttons: [ START CAMERA ] and [ STOP CAMERA ] */}
        <div className="flex items-center gap-3">
          <button
            onClick={startCamera}
            disabled={isCameraRunning}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
              isCameraRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START CAMERA</span>
          </button>

          <button
            onClick={stopCamera}
            disabled={!isCameraRunning}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
              !isCameraRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30'
            }`}
          >
            <Square className="w-4 h-4 fill-current" />
            <span>STOP CAMERA</span>
          </button>
        </div>
      </div>

      {/* Prominent Demo/Simulated Data Notice (as explicitly requested) */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
        <Info className="w-4 h-4 shrink-0 text-amber-400" />
        <span>
          <strong>DEMO / SIMULATED DATA MODE:</strong> Bounding boxes, vehicle telemetry, and confidence scores are simulated for hackathon demonstration. No physical YOLOv8 inference hardware is currently connected.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Simulated Camera Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative w-full aspect-video rounded-2xl glass-panel overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl">
            {/* Top Camera HUD Overlay */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-xs font-mono pointer-events-none">
              <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80">
                <span className={`w-2 h-2 rounded-full ${isCameraRunning ? 'bg-rose-500 animate-ping' : 'bg-slate-500'}`} />
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan-400" /> Camera: {detectionData.cameraName}
                </span>
                <span className="text-slate-500">|</span>
                <span className={isCameraRunning ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  Status: {detectionData.status}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-cyan-300 font-bold">
                <span>FPS: {detectionData.fps}</span>
                <span className="text-slate-500">|</span>
                <span>Vehicles: {detectionData.vehiclesDetected}</span>
              </div>
            </div>

            {/* Synthetic Highway Camera Video Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120] via-[#0d162a] to-[#080d1a] overflow-hidden">
              <svg className="w-full h-full opacity-60" viewBox="0 0 800 450" preserveAspectRatio="none">
                <polygon points="120,450 680,450 480,140 320,140" fill="#141d2e" />
                <line x1="400" y1="140" x2="400" y2="450" stroke="#f8fafc" strokeWidth="3" strokeDasharray="16 16" opacity="0.4" />
                <line x1="360" y1="140" x2="260" y2="450" stroke="#f8fafc" strokeWidth="2" strokeDasharray="14 14" opacity="0.3" />
                <line x1="440" y1="140" x2="540" y2="450" stroke="#f8fafc" strokeWidth="2" strokeDasharray="14 14" opacity="0.3" />
                <line x1="0" y1="140" x2="800" y2="140" stroke="#1e293b" strokeWidth="2" />
              </svg>

              {/* Animated scanline */}
              {isCameraRunning && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full animate-scan pointer-events-none" />
              )}
            </div>

            {/* Simulated AI Bounding Boxes Layer */}
            {isCameraRunning ? (
              <div className="absolute inset-0 pointer-events-none">
                {detectionData.boxes.map((box) => {
                  const style = getTypeColor(box.type);
                  return (
                    <div
                      key={box.id}
                      className={`absolute border-2 ${style.border} ${style.bg} rounded transition-all duration-500 backdrop-blur-[1px]`}
                      style={{
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.w}%`,
                        height: `${box.h}%`,
                      }}
                    >
                      {/* Corner Target reticles */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

                      {/* Label Tags: CAR, BIKE, BUS, TRUCK */}
                      {showLabels && (
                        <div
                          className={`absolute -top-6 left-0 ${style.tag} text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded shadow flex items-center gap-1 font-mono whitespace-nowrap`}
                        >
                          <span>{box.type === 'Motorcycle' ? 'BIKE' : box.type.toUpperCase()}</span>
                          <span className="opacity-90">{box.confidence}%</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <Crosshair className="w-12 h-12 text-slate-600 animate-spin-slow" />
                <div className="text-center">
                  <div className="font-bold text-white text-base">Camera Stream Offline</div>
                  <div className="text-xs text-slate-400 mt-1">Click [ START CAMERA ] to resume simulated inference</div>
                </div>
              </div>
            )}

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-xs font-mono">
              <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-cyan-300">
                SIMULATION: YOLOv8x Demo Neural Model (30 FPS Stream)
              </div>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className="pointer-events-auto bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-[11px] text-slate-300 hover:text-white"
              >
                {showLabels ? 'Hide Labels' : 'Show Labels'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>Location: {selectedJunction.name}</span>
            <span className="text-cyan-400">Resolution: 3840x2160 UHD</span>
          </div>
        </div>

        {/* Right: Camera Telemetry & Vehicle Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Main Telemetry Box */}
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/25 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Inference Telemetry
            </span>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Camera ID</span>
                <span className="font-bold text-white text-sm">{detectionData.cameraName}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Status</span>
                <span className={`font-bold text-sm ${detectionData.status === 'ONLINE' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {detectionData.status}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">FPS</span>
                <span className="font-bold text-cyan-400 text-sm">{detectionData.fps}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Vehicles Detected</span>
                <span className="font-bold text-white text-sm">{detectionData.vehiclesDetected}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-slate-400">Average Confidence:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">{detectionData.avgConfidence}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full"
                  style={{ width: `${detectionData.avgConfidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Vehicle Breakdown List (CAR, BIKE, BUS, TRUCK) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Detected Object Classes
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                <span className="flex items-center gap-2 font-bold text-white">
                  <Car className="w-4 h-4 text-cyan-400" /> CAR
                </span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{detectionData.cars}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-amber-500/20">
                <span className="flex items-center gap-2 font-bold text-white">
                  <Bike className="w-4 h-4 text-amber-400" /> BIKE
                </span>
                <span className="font-mono font-bold text-amber-400 text-sm">{detectionData.bikes}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                <span className="flex items-center gap-2 font-bold text-white">
                  <Bus className="w-4 h-4 text-emerald-400" /> BUS
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{detectionData.buses}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-purple-500/20">
                <span className="flex items-center gap-2 font-bold text-white">
                  <Truck className="w-4 h-4 text-purple-400" /> TRUCK
                </span>
                <span className="font-mono font-bold text-purple-400 text-sm">{detectionData.trucks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
