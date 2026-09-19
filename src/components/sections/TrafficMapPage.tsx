import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { MapView } from '../ui/MapView';
import { 
  Map as MapIcon, 
  Layers, 
  Filter, 
  Video, 
  TrafficCone, 
  Ambulance, 
  AlertTriangle,
  Compass,
  Zap,
  Info
} from 'lucide-react';

export const TrafficMapPage: React.FC = () => {
  const { junctions, selectedJunction, setSelectedJunctionId, isEmergencyActive, emergency } = useTraffic();
  const [filter, setFilter] = useState<'all' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'>('all');

  return (
    <section id="map" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <MapIcon className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Geospatial Digital Twin
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            FULL TRAFFIC MAP
          </h2>
        </div>

        {/* REQUIREMENT 8: Filters [ ALL ] [ LOW ] [ MEDIUM ] [ HIGH ] [ EMERGENCY ] */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-400 px-2 font-semibold hidden sm:inline">Filter View:</span>
          {(['all', 'LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                filter === key
                  ? key === 'EMERGENCY'
                    ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              [ {key} ]
            </button>
          ))}
        </div>
      </div>

      {/* Map Feature Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          <span>Road Segments: 14</span>
        </div>
        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Low Zones: 2</span>
        </div>
        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-amber-400">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Medium Zones: 2</span>
        </div>
        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-rose-400">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>High Zones: 2</span>
        </div>
        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-cyan-300">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
          <span>CCTV Cameras: 4</span>
        </div>
        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-blue-400">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Fleet Ambulance: 1</span>
        </div>
      </div>

      {/* Large Interactive Simulated Map */}
      <MapView externalFilter={filter} showToolbar={false} />

      {/* Location Inspection Bar */}
      <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>
            Currently inspecting: <strong className="text-white font-mono">{selectedJunction.name}</strong> ({selectedJunction.density}% Density)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Click any junction node or camera to load live telemetry.</span>
        </div>
      </div>
    </section>
  );
};
