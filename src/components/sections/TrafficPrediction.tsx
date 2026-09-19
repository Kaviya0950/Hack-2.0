import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Sparkles, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Gauge, 
  Car, 
  Zap, 
  Activity, 
  Info 
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

export const TrafficPrediction: React.FC = () => {
  const { predictionData } = useTraffic();
  const [activeMetric, setActiveMetric] = useState<'density' | 'vehicles' | 'speed'>('density');

  return (
    <section id="prediction" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
              Predictive AI Neural Forecaster
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            TRAFFIC PREDICTION
          </h2>
        </div>

        {/* Prediction Demo Mode Label */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-300 font-mono font-bold">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>Prediction Demo Mode</span>
        </div>
      </div>

      {/* Prominent Alert Banner as requested */}
      <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                AI TRAFFIC PREDICTION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PEAK COMMUTE ALERT
              </span>
            </div>
            <p className="text-base font-bold text-white mt-0.5">
              "{predictionData.alertMessage}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
          <div className="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-purple-500/30 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Predicted Density</span>
            <span className="text-lg font-black text-rose-400">{predictionData.predictedDensity}%</span>
          </div>
          <div className="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-purple-500/30 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Model Confidence</span>
            <span className="text-lg font-black text-emerald-400">{predictionData.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveMetric('density')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            activeMetric === 'density'
              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Traffic Density (%)</span>
        </button>

        <button
          onClick={() => setActiveMetric('vehicles')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            activeMetric === 'vehicles'
              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>Vehicle Count</span>
        </button>

        <button
          onClick={() => setActiveMetric('speed')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            activeMetric === 'speed'
              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Average Speed (km/h)</span>
        </button>
      </div>

      {/* Interactive Hourly Prediction Chart (10 AM to 7 PM) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Hourly Forecast Simulation (10 AM – 7 PM)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Highlighting afternoon rush ramp-up and peak window (5:30 PM – 7:30 PM)
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" /> Peak Commute Period
            </span>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData.hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="predDensityGrad" x1="0%" y1="0%" x2="0%" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis
                stroke="#64748b"
                domain={activeMetric === 'vehicles' ? [400, 1400] : activeMetric === 'speed' ? [10, 60] : [0, 100]}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#a855f7',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [
                  activeMetric === 'density' ? `${val}% Density` : activeMetric === 'vehicles' ? `${val} Vehicles` : `${val} km/h`,
                  'Prediction',
                ]}
              />
              <Area
                type="monotone"
                dataKey={activeMetric === 'density' ? 'density' : activeMetric === 'vehicles' ? 'vehicleCount' : 'avgSpeed'}
                stroke="#c084fc"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#predDensityGrad)"
                dot={(props: any) => {
                  const isPeak = props.payload.isPeak;
                  return (
                    <circle
                      key={props.index}
                      cx={props.cx}
                      cy={props.cy}
                      r={isPeak ? 6 : 4}
                      fill={isPeak ? '#f59e0b' : '#c084fc'}
                      stroke="#0f172a"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Data Grid Cards (10 AM to 7 PM) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 pt-2 border-t border-slate-800">
          {predictionData.hourlyData.map((pt) => (
            <div
              key={pt.time}
              className={`p-2 rounded-xl text-center border text-xs font-mono ${
                pt.isPeak
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[10px] text-slate-400 block font-sans">{pt.time}</span>
              <span className="font-bold block mt-0.5 text-sm">{pt.density}%</span>
              <span className="text-[9px] text-slate-400 block">{pt.avgSpeed} km/h</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
