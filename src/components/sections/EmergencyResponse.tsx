import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Ambulance, 
  MapPin, 
  Route, 
  GitFork, 
  Timer, 
  ShieldAlert, 
  Square, 
  Play, 
  Radio, 
  CheckCircle2, 
  AlertOctagon 
} from 'lucide-react';

export const EmergencyResponse: React.FC = () => {
  const { 
    emergency, 
    isEmergencyActive, 
    simulateEmergency, 
    endEmergencyPriority 
  } = useTraffic();

  const formatEta = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs < 10 ? '0' : ''}${secs} sec`;
  };

  return (
    <section id="emergency" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-500/10 text-rose-400">
              <Ambulance className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
              Life-Safety Critical Dispatch
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            EMERGENCY RESPONSE
          </h2>
        </div>

        {/* Action Buttons: [ SIMULATE EMERGENCY ] and [ END EMERGENCY PRIORITY ] */}
        <div className="flex items-center gap-3">
          <button
            onClick={simulateEmergency}
            disabled={isEmergencyActive}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
              isEmergencyActive
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:brightness-110 shadow-[0_0_25px_rgba(239,68,68,0.5)] animate-pulse'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>SIMULATE EMERGENCY</span>
          </button>

          <button
            onClick={endEmergencyPriority}
            disabled={!isEmergencyActive}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
              !isEmergencyActive
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/40'
            }`}
          >
            <Square className="w-4 h-4 fill-current" />
            <span>END EMERGENCY PRIORITY</span>
          </button>
        </div>
      </div>

      {/* Emergency Active Banner */}
      {isEmergencyActive && (
        <div className="glass-panel-danger p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white tracking-wide flex items-center gap-2 font-mono">
                <span>PRIORITY CORRIDOR ACTIVE</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-white text-rose-900 font-sans font-bold">
                  AMBULANCE OVERRIDE
                </span>
              </div>
              <p className="text-xs text-rose-200 mt-0.5">
                Signals along the corridor (Signal 04, Signal 05, Signal 06) overridden to GREEN.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono text-center">
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-rose-500/50">
              <span className="text-[10px] text-rose-300 block uppercase">Signal State</span>
              <span className="text-base font-black text-emerald-400">CORRIDOR GREEN</span>
            </div>
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-rose-500/50">
              <span className="text-[10px] text-rose-300 block uppercase">Countdown ETA</span>
              <span className="text-lg font-black text-rose-400">{formatEta(emergency.etaSeconds)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Telemetry Cards & Route */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Incident Specifications (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  EMERGENCY VEHICLE DETECTED
                </h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                  isEmergencyActive
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {isEmergencyActive ? 'PRIORITY CORRIDOR ACTIVE' : 'STANDBY'}
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Vehicle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                    <Ambulance className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vehicle</span>
                    <span className="text-sm font-bold text-white font-mono">{emergency.vehicleId}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  VERIFIED GPS FIX
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Location</span>
                    <span className="text-sm font-bold text-white font-mono">{emergency.currentLocation}</span>
                  </div>
                </div>
                <span className="text-slate-400 font-mono">Approach Corridor East</span>
              </div>

              {/* ETA */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estimated Arrival (ETA)</span>
                    <span className="text-sm font-bold text-white font-mono">{formatEta(emergency.etaSeconds)}</span>
                  </div>
                </div>
                <span className="font-mono text-cyan-400 font-bold">Speed: 62 km/h</span>
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Priority Tier</span>
                    <span className="text-sm font-bold text-rose-400 font-mono">HIGH (Level 1 Medical Priority)</span>
                  </div>
                </div>
                <span className="text-rose-400 font-bold font-mono">CRITICAL PREEMPTION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Route & Signal Override Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/25 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Route className="w-4 h-4 text-cyan-400" />
                Emergency Route
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">GREEN CORRIDOR</span>
            </div>

            {/* Route path breadcrumb */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-mono">
              <span className="text-slate-400 block text-[10px] mb-1 uppercase font-semibold">Active Path:</span>
              <div className="flex items-center gap-2 flex-wrap text-cyan-300 font-bold">
                <span>Hospital</span>
                <span>→</span>
                <span className="text-rose-400">Junction 04</span>
                <span>→</span>
                <span>Main Road</span>
              </div>
            </div>

            {/* Display Signals: Signal 04 -> GREEN, Signal 05 -> GREEN, Signal 06 -> GREEN */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Synchronized Intersections
              </span>

              {emergency.corridorSignals.map((sig) => (
                <div
                  key={sig.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white font-mono">{sig.name}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 text-[11px]">
                    {isEmergencyActive ? 'GREEN (LOCKED)' : 'GREEN'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-[11px] text-cyan-200/90 leading-relaxed">
              💡 <strong>Green Wave Logic:</strong> Opposite and pedestrian intervals are safely suspended until the vehicle clears the designated GPS geo-fence.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
