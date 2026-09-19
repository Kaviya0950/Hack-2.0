import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { Junction } from '../../types/traffic';
import { ShieldAlert, ZoomIn, ZoomOut, Compass, Video } from 'lucide-react';

interface MapViewProps {
  externalFilter?: 'all' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  showToolbar?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ externalFilter, showToolbar = true }) => {
  const { junctions, selectedJunctionId, setSelectedJunctionId, isEmergencyActive, emergency } = useTraffic();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [internalFilter, setInternalFilter] = useState<'all' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'>('all');

  const activeFilter = externalFilter !== undefined ? externalFilter : internalFilter;

  const getStatusColor = (status: Junction['status']) => {
    switch (status) {
      case 'LOW':
        return {
          fill: '#10b981', // GREEN
          glow: 'rgba(16, 185, 129, 0.4)',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
          indicator: '🟢',
        };
      case 'MEDIUM':
        return {
          fill: '#f59e0b', // YELLOW
          glow: 'rgba(245, 158, 11, 0.4)',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
          indicator: '🟡',
        };
      case 'CRITICAL':
        return {
          fill: '#a855f7',
          glow: 'rgba(168, 85, 247, 0.5)',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          indicator: '🟣',
        };
      case 'HIGH':
      default:
        return {
          fill: '#ef4444', // RED
          glow: 'rgba(239, 68, 68, 0.5)',
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
          indicator: '🔴',
        };
    }
  };

  // Fixed camera coordinates across city grid
  const trafficCameras = [
    { id: 'cam-01', name: 'CAM-01 North', x: 280, y: 170 },
    { id: 'cam-02', name: 'CAM-02 South', x: 400, y: 450 },
    { id: 'cam-03', name: 'CAM-03 West', x: 180, y: 330 },
    { id: 'cam-04', name: 'CAM-04 East (Active)', x: 750, y: 330 },
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl glass-panel overflow-hidden border border-cyan-500/20 cyber-grid group">
      {/* Top Map Toolbar */}
      {showToolbar && (
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 shadow-lg text-xs">
            <span className="flex items-center gap-1.5 font-bold text-cyan-400">
              <Compass className="w-4 h-4 animate-spin-slow" /> METRO DIGITAL TWIN
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-mono">6 JUNCTIONS • 4 CAMERAS</span>
          </div>

          {/* Layer Filter Buttons: ALL, LOW, MEDIUM, HIGH, EMERGENCY */}
          <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/70 shadow-lg text-xs">
            {(['all', 'LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'] as const).map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setInternalFilter(filterKey)}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase transition-all ${
                  activeFilter === filterKey
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {filterKey}
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/70 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-cyan-400"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-cyan-400"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Emergency Corridor Banner if Active */}
      {isEmergencyActive && (
        <div className="absolute top-16 left-4 right-4 z-20 bg-rose-950/90 backdrop-blur-md border border-rose-500/60 rounded-xl p-2.5 flex items-center justify-between text-xs text-rose-200 shadow-xl animate-pulse">
          <div className="flex items-center gap-2">
            <span className="text-base">🚑</span>
            <span className="font-bold tracking-wide">EMERGENCY CORRIDOR ACTIVE:</span>
            <span>Hospital → Junction 04 → Main Road</span>
          </div>
          <span className="font-mono bg-rose-900/90 px-2.5 py-0.5 rounded font-bold border border-rose-400/50">
            ETA: {Math.floor(emergency.etaSeconds / 60)}m {emergency.etaSeconds % 60}s
          </span>
        </div>
      )}

      {/* Interactive SVG Smart City Map */}
      <div
        className="w-full h-full transition-transform duration-300 ease-out origin-center flex items-center justify-center p-6"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg viewBox="0 0 1000 600" className="w-full h-full max-w-full max-h-full drop-shadow-2xl select-none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Arterial Road Networks */}
          <path d="M 100 210 L 900 210" stroke="#1e293b" strokeWidth="26" strokeLinecap="round" />
          <path d="M 100 210 L 900 210" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />

          <path d="M 100 410 L 900 410" stroke="#1e293b" strokeWidth="26" strokeLinecap="round" />
          <path d="M 100 410 L 900 410" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />

          {/* Cross Boulevards */}
          <path d="M 280 80 L 280 520" stroke="#1e293b" strokeWidth="26" strokeLinecap="round" />
          <path d="M 280 80 L 280 520" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />

          <path d="M 500 80 L 500 520" stroke="#1e293b" strokeWidth="26" strokeLinecap="round" />
          <path d="M 500 80 L 500 520" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />

          <path d="M 750 80 L 750 520" stroke="#1e293b" strokeWidth="26" strokeLinecap="round" />
          <path d="M 750 80 L 750 520" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />

          {/* Diagonal Transit Express Corridor */}
          <path d="M 280 210 L 750 410" stroke="#1e293b" strokeWidth="20" strokeLinecap="round" />
          <path d="M 280 210 L 750 410" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="6 6" />

          {/* Hospital Marker at (880, 410) */}
          <g>
            <rect x="850" y="385" width="50" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="875" y="415" textAnchor="middle" fontSize="18" fill="#ffffff">🏥</text>
            <text x="875" y="448" textAnchor="middle" fontSize="10" fill="#93c5fd" fontWeight="bold">HOSPITAL</text>
          </g>

          {/* Emergency Ambulance (BLUE) Vehicle & Green Wave Route Highlight */}
          {(isEmergencyActive || activeFilter === 'EMERGENCY') && (
            <g>
              <path
                d="M 850 410 L 750 410 L 500 410 L 100 410"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
                className="animate-pulse"
              />
              <path
                d="M 850 410 L 750 410 L 500 410 L 100 410"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeDasharray="10 10"
                fill="none"
              >
                <animate attributeName="stroke-dashoffset" values="40;0" dur="1s" repeatCount="indefinite" />
              </path>

              {/* BLUE Emergency Vehicle Node */}
              <circle cx="680" cy="410" r="16" fill="#2563eb" className="animate-ping" opacity="0.75" />
              <circle cx="680" cy="410" r="14" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
              <text x="680" y="415" textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="bold">
                🚑
              </text>
              <text x="680" y="388" textAnchor="middle" fontSize="10" fill="#60a5fa" fontWeight="bold" fontFamily="monospace">
                AMBULANCE 01
              </text>
            </g>
          )}

          {/* Traffic Cameras (WHITE/CYAN) */}
          {trafficCameras.map((cam) => (
            <g key={cam.id} className="cursor-pointer">
              <circle cx={cam.x} cy={cam.y} r="10" fill="#0f172a" stroke="#00f0ff" strokeWidth="2" />
              <circle cx={cam.x} cy={cam.y} r="4" fill="#ffffff" />
              <text x={cam.x} y={cam.y - 14} textAnchor="middle" fontSize="9" fill="#00f0ff" fontWeight="bold" fontFamily="monospace">
                📷 {cam.name.split(' ')[0]}
              </text>
            </g>
          ))}

          {/* Junction Nodes (GREEN / YELLOW / RED) */}
          {junctions.map((junc) => {
            const posX = junc.coordinates.x * 10;
            const posY = junc.coordinates.y * 6;
            const isSelected = selectedJunctionId === junc.id;
            const style = getStatusColor(junc.status);

            // Filter check
            if (activeFilter !== 'all' && activeFilter !== 'EMERGENCY' && junc.status !== activeFilter) {
              return null;
            }

            return (
              <g
                key={junc.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setSelectedJunctionId(junc.id)}
              >
                {/* Outer ripple for High / Critical density */}
                {(junc.status === 'HIGH' || junc.status === 'CRITICAL') && (
                  <circle
                    cx={posX}
                    cy={posY}
                    r="32"
                    fill="none"
                    stroke={style.fill}
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="animate-ping"
                  />
                )}

                {/* Selection ring */}
                {isSelected && (
                  <circle
                    cx={posX}
                    cy={posY}
                    r="28"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    className="animate-spin-slow"
                  />
                )}

                {/* Node circle */}
                <circle cx={posX} cy={posY} r="20" fill="#0b1120" stroke={style.fill} strokeWidth="3" />
                <circle cx={posX} cy={posY} r="8" fill={style.fill} />

                {/* Junction Label Box */}
                <foreignObject x={posX - 75} y={posY + 26} width="150" height="54">
                  <div
                    className={`text-center px-2 py-1 rounded-lg backdrop-blur-md border text-[11px] font-sans shadow-lg transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-cyan-300 border-cyan-400 scale-105'
                        : 'bg-slate-950/90 text-slate-200 border-slate-700/80'
                    }`}
                  >
                    <div className="font-bold truncate flex items-center justify-center gap-1">
                      <span>{style.indicator}</span>
                      <span>{junc.codeName || junc.name.split('-')[0].trim()}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1 font-mono">
                      <span>{junc.density}% Density</span>
                      <span>•</span>
                      <span className="font-bold text-white">{junc.status}</span>
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Junction Card Overlay in Bottom Right */}
      {selectedJunctionId && (
        <div className="absolute bottom-4 right-4 z-20 w-80 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-cyan-500/30 p-3.5 shadow-2xl">
          {(() => {
            const current = junctions.find((j) => j.id === selectedJunctionId) || junctions[0];
            const style = getStatusColor(current.status);
            return (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{style.indicator}</span>
                    <h4 className="text-xs font-bold text-white truncate max-w-[160px]">
                      {current.codeName || current.name}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${style.badge}`}>
                    {current.status} ({current.density}%)
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 truncate">{current.roadNames}</div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-xs">
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Vehicles Detected</span>
                    <span className="font-mono text-base font-bold text-cyan-400">{current.vehicleCount}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Average Speed</span>
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {current.avgSpeed || 18} km/h
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
        <span className="font-semibold text-slate-400">Legend:</span>
        <span className="flex items-center gap-1 text-emerald-400">● Green (Low)</span>
        <span className="flex items-center gap-1 text-amber-400">● Yellow (Medium)</span>
        <span className="flex items-center gap-1 text-rose-400">● Red (Heavy)</span>
        <span className="flex items-center gap-1 text-blue-400">● Blue (Emergency)</span>
        <span className="flex items-center gap-1 text-cyan-300">● Cyan (Camera)</span>
      </div>
    </div>
  );
};
