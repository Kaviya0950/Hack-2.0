import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Ambulance, 
  Zap, 
  Clock, 
  Car,
  Gauge,
  Activity,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { junctions, detectionData } = useTraffic();
  const [dateFilter, setDateFilter] = useState<'Today' | '7 Days' | '30 Days'>('Today');

  // Multiplier depending on selected date filter
  const mult = dateFilter === 'Today' ? 1 : dateFilter === '7 Days' ? 6.8 : 28.5;

  // 1. Data for Traffic Density by Junction
  const junctionData = junctions.map((j) => ({
    name: j.codeName || j.name.split('-')[0].replace('Junction ', 'J'),
    density: j.density,
    vehicles: Math.round(j.vehicleCount * mult),
  }));

  // 2. Vehicle Modality Share
  const vehicleTypeData = [
    { name: 'Cars', value: Math.round(detectionData.cars * mult), color: '#06b6d4' },
    { name: 'Bikes', value: Math.round(detectionData.bikes * mult), color: '#f59e0b' },
    { name: 'Buses', value: Math.round(detectionData.buses * mult), color: '#10b981' },
    { name: 'Trucks', value: Math.round(detectionData.trucks * mult), color: '#a855f7' },
  ];

  // 3. Peak Traffic Hours progression
  const peakHourlyData = [
    { time: '06:00', density: 25, speed: 52 },
    { time: '08:00', density: 78, speed: 22 },
    { time: '10:00', density: 64, speed: 34 },
    { time: '12:00', density: 52, speed: 41 },
    { time: '14:00', density: 58, speed: 38 },
    { time: '16:00', density: 74, speed: 26 },
    { time: '18:00', density: 88, speed: 18 },
    { time: '20:00', density: 62, speed: 36 },
    { time: '22:00', density: 34, speed: 48 },
  ];

  return (
    <section id="analytics" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-purple-500/10 text-purple-400">
              <BarChart3 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
              Urban Intelligence & KPI Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            CITY ANALYTICS
          </h2>
        </div>

        {/* Date Filter: Today, 7 Days, 30 Days (Requirement 11) */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2" />
          {(['Today', '7 Days', '30 Days'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                dateFilter === filter
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* REQUIREMENT 11: 6 Primary City Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Daily Vehicle Count */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Car className="w-3 h-3 text-cyan-400" /> Daily Vehicles
          </span>
          <div className="text-xl font-black font-mono text-white">
            {dateFilter === 'Today' ? '28,490' : dateFilter === '7 Days' ? '194,200' : '824,600'}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">+6.2% vs baseline</span>
        </div>

        {/* Average Traffic Density */}
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Gauge className="w-3 h-3 text-amber-400" /> Avg Density
          </span>
          <div className="text-xl font-black font-mono text-amber-300">
            68%
          </div>
          <span className="text-[10px] text-amber-400 font-mono">Moderate Citywide</span>
        </div>

        {/* Peak Traffic Hours */}
        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Clock className="w-3 h-3 text-rose-400" /> Peak Hours
          </span>
          <div className="text-sm font-black font-mono text-rose-300 leading-tight mt-1">
            5:30 – 7:30 PM
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Evening Commute</span>
        </div>

        {/* Average Speed */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-400" /> Average Speed
          </span>
          <div className="text-xl font-black font-mono text-emerald-300">
            33.2 km/h
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">+18% with AI</span>
        </div>

        {/* Emergency Response Time */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Ambulance className="w-3 h-3 text-purple-400" /> Response Time
          </span>
          <div className="text-xl font-black font-mono text-purple-300">
            4.8 min
          </div>
          <span className="text-[10px] text-purple-400 font-mono">-65% Transit Delay</span>
        </div>

        {/* Signal Optimization Rate */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" /> Signal Opt Rate
          </span>
          <div className="text-xl font-black font-mono text-cyan-300">
            94.8%
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Optimal Flow Splits</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart: Density by Junction (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Traffic Density by Junction (%)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Filter: {dateFilter} distribution</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">6 Major Intersections</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={junctionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#06b6d4',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Congestion Density']}
                />
                <Bar dataKey="density" radius={[6, 6, 0, 0]}>
                  {junctionData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={entry.density > 70 ? '#ef4444' : entry.density > 45 ? '#f59e0b' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Vehicle Modality Share (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-emerald-400" />
                Vehicle Modality Distribution
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Detected by camera vision models</p>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry) => (
                    <Cell key={`slice-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#10b981',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Legend
                  formatter={(val) => <span className="text-slate-300 text-xs">{val}</span>}
                  wrapperStyle={{ paddingTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
