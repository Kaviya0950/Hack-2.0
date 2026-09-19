import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { MapView } from '../ui/MapView';
import { 
  Car, 
  Gauge, 
  Activity, 
  Bike, 
  Bus, 
  Truck, 
  AlertCircle,
  Radio,
  Zap,
  Clock,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const LiveDashboard: React.FC = () => {
  const { 
    trafficSummary,
    junctions,
    selectedJunctionId,
    setSelectedJunctionId,
    selectedJunction,
    emergencyStats,
    setActiveSection
  } = useTraffic();

  const getStatusBadge = (status: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', density: number) => {
    switch (status) {
      case 'LOW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> LOW ({density}%)
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> MEDIUM ({density}%)
          </span>
        );
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" /> CRITICAL ({density}%)
          </span>
        );
      case 'HIGH':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-400" /> HIGH ({density}%)
          </span>
        );
    }
  };

  return (
    <section id="dashboard" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Activity className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono">
              Control Room Command Hub
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Live Traffic Hub
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Traffic status level indicators */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold font-mono">
            <span className="text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">Status:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              LOW
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/70 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              MEDIUM
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/70 border border-rose-500/30 text-rose-600 dark:text-rose-400">
              HIGH
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/70 border border-purple-500/30 text-purple-600 dark:text-purple-300">
              CRITICAL
            </span>
          </div>
        </div>
      </div>

      {/* REQUIREMENT 2-A: Traffic Summary Cards (Total, Cars, Bikes, Buses, Trucks, Traffic Density) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Vehicles */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Total Vehicles
          </span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {trafficSummary.totalVehicles.toLocaleString()}
          </div>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">Citywide Active</span>
        </div>

        {/* Cars */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Cars
          </span>
          <div className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-300">
            {trafficSummary.cars.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">59.5% of total</span>
        </div>

        {/* Bikes */}
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Bike className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Bikes
          </span>
          <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-300">
            {trafficSummary.bikes}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">22.8% of total</span>
        </div>

        {/* Buses */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Bus className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Buses
          </span>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300">
            {trafficSummary.buses}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">7.8% of total</span>
        </div>

        {/* Trucks */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" /> Trucks
          </span>
          <div className="text-2xl font-black font-mono text-purple-600 dark:text-purple-300">
            {trafficSummary.trucks}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">9.9% of total</span>
        </div>

        {/* Traffic Density */}
        <div className="glass-panel p-4 rounded-2xl border border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-1">
          <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-300 uppercase tracking-wider block flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" /> Traffic Density
          </span>
          <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
            {trafficSummary.density}%
          </div>
          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 font-mono">HIGH CONGESTION</span>
        </div>
      </div>

      {/* REQUIREMENT 13: Emergency Vehicles Today Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/5 to-cyan-500/10 border border-red-500/25 dark:border-red-500/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 flex-shrink-0 shadow-sm">
            <span className="text-2xl">🚑</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 font-mono">
                Active Priority Telemetry
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                +8.4% compared with yesterday
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-0.5">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                EMERGENCY VEHICLES TODAY
              </h3>
              <span className="text-2xl sm:text-3xl font-black font-mono text-red-600 dark:text-red-400">
                {emergencyStats.todayTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown mini chips */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20 flex items-center gap-1.5 font-mono">
            🚑 Ambulance <strong className="font-bold">{emergencyStats.ambulances}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 flex items-center gap-1.5 font-mono">
            🚒 Fire Truck <strong className="font-bold">{emergencyStats.fireTrucks}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 flex items-center gap-1.5 font-mono">
            🚓 Police <strong className="font-bold">{emergencyStats.police}</strong>
          </span>

          <button
            onClick={() => {
              setActiveSection('emergency-analytics');
              const el = document.getElementById('emergency-analytics');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="ml-auto md:ml-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold font-mono tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            VIEW DETAILS →
          </button>
        </div>
      </div>

      {/* REQUIREMENT 2-C: Real-time Traffic Map */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            Interactive Smart City Traffic Map
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Low
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Heavy
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Emergency
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" /> Camera
            </span>
          </div>
        </div>

        <MapView />
      </div>

      {/* Clicked Junction Details Panel (Requirement 2-C example) */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold font-mono">
              {selectedJunction.codeName ? selectedJunction.codeName.slice(-2) : '04'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedJunction.codeName || selectedJunction.name}
                </h3>
                {getStatusBadge(selectedJunction.status, selectedJunction.density)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedJunction.roadNames}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Updated: Just now</span>
          </div>
        </div>

        {/* Selected Junction Inspector Details (matches example) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Traffic Density</span>
            <span className="text-lg font-mono font-bold text-rose-600 dark:text-rose-400">{selectedJunction.density}%</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Vehicles Queued</span>
            <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">{selectedJunction.vehicleCount}</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Average Speed</span>
            <span className="text-lg font-mono font-bold text-cyan-600 dark:text-cyan-400">{selectedJunction.avgSpeed || 18} km/h</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Signal Phase</span>
            <span className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {selectedJunction.signals.find((s) => s.signal === 'GREEN')?.signal || 'GREEN'}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Signal Timer</span>
            <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
              {selectedJunction.signals[0]?.remainingTime || 27} sec
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">AI Prediction</span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 truncate block mt-1">
              {selectedJunction.aiPrediction || 'Heavy traffic expected'}
            </span>
          </div>
        </div>

        {/* Junction Switcher Selector buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">Switch Junction:</span>
          {junctions.map((junc) => (
            <button
              key={junc.id}
              onClick={() => setSelectedJunctionId(junc.id)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedJunctionId === junc.id
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {junc.codeName || junc.name.split('-')[0].trim()}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
