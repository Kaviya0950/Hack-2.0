import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Gauge, 
  Clock, 
  Info, 
  Compass, 
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const DensityAnalysis: React.FC = () => {
  const { junctions, trafficSummary } = useTraffic();

  // The 4 main directional junctions specified: North, South, East, West
  const cardinalJunctions = [
    {
      id: 'east',
      name: 'East Junction',
      code: 'JUNCTION 04',
      vehicles: 146,
      density: 82,
      speed: 18,
      status: 'HIGH' as const,
      description: 'Major arterial connecting Tech Corridor to Ring Road',
    },
    {
      id: 'north',
      name: 'North Junction',
      code: 'JUNCTION 01',
      vehicles: 74,
      density: 48,
      speed: 42,
      status: 'MEDIUM' as const,
      description: 'North Expressway & 1st Avenue Flyover',
    },
    {
      id: 'west',
      name: 'West Junction',
      code: 'JUNCTION 03',
      vehicles: 112,
      density: 68,
      speed: 25,
      status: 'HIGH' as const,
      description: 'Silicon Way & Innovation Boulevard interchange',
    },
    {
      id: 'south',
      name: 'South Junction',
      code: 'JUNCTION 02',
      vehicles: 58,
      density: 36,
      speed: 48,
      status: 'MEDIUM' as const,
      description: 'South Boulevard & Unity Parkway feeder',
    },
  ];

  // Helper to categorize density according to prompt:
  // 0-30% = LOW, 31-60% = MEDIUM, 61-80% = HIGH, 81-100% = CRITICAL
  const getCongestionLevel = (density: number) => {
    if (density <= 30) return { label: 'LOW', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', bar: 'bg-emerald-500' };
    if (density <= 60) return { label: 'MEDIUM', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40', bar: 'bg-amber-500' };
    if (density <= 80) return { label: 'HIGH', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40', bar: 'bg-rose-500' };
    return { label: 'CRITICAL', color: 'text-purple-300', bg: 'bg-purple-500/20', border: 'border-purple-500/40', bar: 'bg-purple-500' };
  };

  // Semi-circle gauge calculation for East Junction (82%)
  const eastDensity = 82;
  const radius = 80;
  const strokeWidth = 14;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (eastDensity / 100) * circumference;

  return (
    <section id="density" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
              <Gauge className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Urban Saturation Assessment
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            TRAFFIC DENSITY ANALYSIS
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-time Density Spectrum: <strong>0 – 100%</strong></span>
        </div>
      </div>

      {/* REQUIREMENT 4: Density Range Definition Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="glass-panel p-3.5 rounded-xl border border-emerald-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-bold text-slate-200">0 – 30%</span>
          </div>
          <div className="text-sm font-extrabold text-emerald-400 mt-1">LOW</div>
          <span className="text-[10px] text-slate-400">Free-flow velocity</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-amber-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="font-bold text-slate-200">31 – 60%</span>
          </div>
          <div className="text-sm font-extrabold text-amber-400 mt-1">MEDIUM</div>
          <span className="text-[10px] text-slate-400">Moderate steady flow</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-rose-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="font-bold text-slate-200">61 – 80%</span>
          </div>
          <div className="text-sm font-extrabold text-rose-400 mt-1">HIGH</div>
          <span className="text-[10px] text-slate-400">Dense queue formation</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-purple-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="font-bold text-slate-200">81 – 100%</span>
          </div>
          <div className="text-sm font-extrabold text-purple-300 mt-1">CRITICAL</div>
          <span className="text-[10px] text-slate-400">Near gridlock condition</span>
        </div>
      </div>

      {/* REQUIREMENT 4: 4 Cardinal Junctions Grid (North, South, East, West) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardinalJunctions.map((j) => {
          const congestion = getCongestionLevel(j.density);
          const isEast = j.id === 'east';

          return (
            <div
              key={j.id}
              className={`rounded-2xl glass-panel p-5 border transition-all duration-300 space-y-4 flex flex-col justify-between ${
                isEast
                  ? 'border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.15)] bg-rose-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block">{j.code}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{j.name}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${congestion.bg} ${congestion.color} ${congestion.border}`}>
                    {congestion.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{j.description}</p>
              </div>

              {/* Linear Density Visualization */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Density Saturation:</span>
                  <span className={`font-mono font-black text-sm ${congestion.color}`}>
                    {j.density}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${congestion.bar}`}
                    style={{ width: `${j.density}%` }}
                  />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Vehicles</span>
                  <span className="font-mono font-bold text-white text-sm">{j.vehicles}</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Avg Speed</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{j.speed} km/h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Circular Gauge Visualization for East Junction & Real-Time Congestion Index */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Circular Semi-Gauge (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-rose-500/30 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            EAST JUNCTION PEAK GAUGE
          </div>

          <div className="relative w-56 h-32 flex items-end justify-center">
            <svg className="w-56 h-56 overflow-visible" viewBox="0 0 200 120">
              <defs>
                <linearGradient id="eastGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="75%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              <path
                d="M 20 110 A 80 80 0 0 1 180 110"
                fill="none"
                stroke="#1e293b"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              <path
                d="M 20 110 A 80 80 0 0 1 180 110"
                fill="none"
                stroke="url(#eastGaugeGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="absolute bottom-0 text-center flex flex-col items-center">
              <span className="text-4xl font-extrabold font-mono text-white tracking-tight">82%</span>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">HIGH / CRITICAL</span>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-slate-400">
            East Junction • Vehicles: <strong className="text-white">146</strong> • Speed: <strong className="text-cyan-400">18 km/h</strong>
          </div>
        </div>

        {/* System Summary Description (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Activity className="w-4 h-4" />
              <span>Real-Time Congestion Index Summary</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Traffic density is calculated using spatial surface occupancy models derived from optical CCTV tracking and inductive loops.
              Currently, <strong>East Junction</strong> and <strong>West Junction</strong> are experiencing significant saturation due to morning commute merging.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Lowest Density</span>
              <span className="text-emerald-400 font-bold text-sm">South (36%)</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Peak Congestion</span>
              <span className="text-rose-400 font-bold text-sm">East (82%)</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Avg City Speed</span>
              <span className="text-cyan-400 font-bold text-sm">33.2 km/h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
