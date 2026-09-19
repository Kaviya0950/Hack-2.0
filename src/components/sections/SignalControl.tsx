import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { TrafficLight } from '../ui/TrafficLight';
import { 
  TrafficCone, 
  Sparkles, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';

export const SignalControl: React.FC = () => {
  const { 
    selectedJunction, 
    junctions, 
    setSelectedJunctionId,
    applyAiSignalTiming,
    signalTimingApplied 
  } = useTraffic();

  const getDirectionIcon = (dir: string) => {
    switch (dir) {
      case 'North':
        return <ArrowUp className="w-4 h-4 text-cyan-400" />;
      case 'South':
        return <ArrowDown className="w-4 h-4 text-cyan-400" />;
      case 'East':
        return <ArrowRight className="w-4 h-4 text-cyan-400" />;
      case 'West':
      default:
        return <ArrowLeft className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="signals" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <TrafficCone className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Dynamic Signal Actuation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            SMART SIGNAL CONTROL
          </h2>
        </div>

        {/* Junction Switcher & APPLY AI TIMING Button */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedJunction.id}
            onChange={(e) => setSelectedJunctionId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {junctions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.codeName || j.name}
              </option>
            ))}
          </select>

          {/* Button: [ APPLY AI SIGNAL TIMING ] */}
          <button
            onClick={applyAiSignalTiming}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-[0_0_25px_rgba(16,185,129,0.35)] active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>APPLY AI SIGNAL TIMING</span>
          </button>
        </div>
      </div>

      {/* REQUIREMENT 5: AI Recommendation Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-cyan-950/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white uppercase font-mono flex items-center gap-2">
              <span>AI Recommendation Engine</span>
              {signalTimingApplied && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  APPLIED ACTIVE
                </span>
              )}
            </div>
            <p className="text-slate-300 mt-0.5">
              "East direction has the highest traffic density. Increase green time from 30 sec to 55 sec."
            </p>
          </div>
        </div>

        <button
          onClick={applyAiSignalTiming}
          className="shrink-0 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 font-bold transition-all text-xs"
        >
          Execute Recommended Phase (+25s)
        </button>
      </div>

      {/* Junction Header Banner (e.g. JUNCTION A / JUNCTION 04) */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white font-mono uppercase text-sm">
            {selectedJunction.codeName || 'JUNCTION A'}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{selectedJunction.roadNames}</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Current Phase:</span>
          <span className="font-bold text-emerald-400">
            {selectedJunction.signals.find((s) => s.signal === 'GREEN')?.direction || 'East'} GREEN — {selectedJunction.signals[0]?.remainingTime || 27} sec
          </span>
        </div>
      </div>

      {/* 4 Road Directions: North 42, South 18, East 67, West 12 vehicles (Requirement 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {selectedJunction.signals.map((sig) => {
          const isGreen = sig.signal === 'GREEN';
          const isYellow = sig.signal === 'YELLOW';
          const isRed = sig.signal === 'RED';

          return (
            <div
              key={sig.direction}
              className={`rounded-2xl glass-panel p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-4 ${
                isGreen
                  ? 'border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)] bg-emerald-950/10'
                  : isYellow
                  ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Direction Name & Current Signal State */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {getDirectionIcon(sig.direction)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base tracking-wide">{sig.direction}</h3>
                    <span className="text-[10px] text-slate-400">Corridor</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] font-extrabold border ${
                    isGreen
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isYellow
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {sig.signal}
                </span>
              </div>

              {/* Realistic Traffic Light Housing & Countdown */}
              <div className="py-2 flex justify-center">
                <TrafficLight state={sig.signal} remainingTime={sig.remainingTime} size="md" />
              </div>

              {/* Vehicle Count & Density */}
              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Vehicles Approaching:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {sig.vehicleCount} vehicles
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Traffic Density:</span>
                  <span className={`font-mono font-bold ${sig.density > 70 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {sig.density}%
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sig.density > 70 ? 'bg-rose-500' : sig.density > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${sig.density}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
