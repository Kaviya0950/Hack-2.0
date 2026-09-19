import React, { useState } from 'react';
import { 
  Camera, 
  ScanEye, 
  Gauge, 
  BrainCircuit, 
  TrafficCone, 
  Cpu, 
  Radio, 
  Ambulance, 
  MapPin, 
  ShieldAlert, 
  Activity, 
  ArrowDown, 
  Sparkles,
  Server
} from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'primary' | 'emergency'>('primary');

  const primarySteps = [
    { id: 1, title: 'TRAFFIC CAMERAS', desc: '4K CCTV optical streams and high-mast cameras', icon: Camera, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { id: 2, title: 'AI / YOLO VEHICLE DETECTION', desc: 'Edge vision inference detecting Cars, Bikes, Buses, Trucks (Demo/Simulated)', icon: ScanEye, color: 'text-blue-400', border: 'border-blue-500/30' },
    { id: 3, title: 'VEHICLE COUNTING', desc: 'Multi-object association and spatial queue counting', icon: Activity, color: 'text-purple-400', border: 'border-purple-500/30' },
    { id: 4, title: 'TRAFFIC DENSITY ANALYSIS', desc: 'Spatial occupancy classification: LOW, MEDIUM, HIGH, CRITICAL', icon: Gauge, color: 'text-amber-400', border: 'border-amber-500/30' },
    { id: 5, title: 'AI TRAFFIC PREDICTION', desc: 'Neural forecasting of peak congestion windows & ramp-up curves', icon: Sparkles, color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { id: 6, title: 'SMART SIGNAL CONTROL', desc: 'Reinforcement learning dynamic green phase reallocation (+25s extension)', icon: BrainCircuit, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { id: 7, title: 'ESP32 / IoT CONTROLLER', desc: 'Embedded hardware actuation and inductive loop telemetry', icon: Cpu, color: 'text-rose-400', border: 'border-rose-500/30' },
    { id: 8, title: 'TRAFFIC SIGNALS', desc: 'Solid-state LED phase switching with fail-safe safety clearance', icon: TrafficCone, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  ];

  const emergencySteps = [
    { id: 'E1', title: 'EMERGENCY VEHICLE', desc: 'Ambulance 01 priority dispatch detected in sector', icon: Ambulance, color: 'text-rose-400', border: 'border-rose-500/40' },
    { id: 'E2', title: 'DETECTION', desc: 'Computer vision siren flash detection and inductive trigger', icon: ScanEye, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { id: 'E3', title: 'GPS / ROUTE', desc: 'Hospital → Junction 04 → Main Road dynamic waypoint pathing', icon: MapPin, color: 'text-blue-400', border: 'border-blue-500/30' },
    { id: 'E4', title: 'EMERGENCY PRIORITY', desc: 'Immediate preemption protocol overriding standard cycles', icon: ShieldAlert, color: 'text-amber-400', border: 'border-amber-500/30' },
    { id: 'E5', title: 'GREEN CORRIDOR', desc: 'Signals 04, 05, 06 locked at GREEN with opposite red holds', icon: TrafficCone, color: 'text-emerald-400', border: 'border-emerald-500/40' },
    { id: 'E6', title: 'HOSPITAL', desc: 'Zero-delay rapid ER arrival with -65% transit delay', icon: Activity, color: 'text-purple-400', border: 'border-purple-500/40' },
  ];

  return (
    <section id="architecture" className="space-y-6 pt-4 pb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Server className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              System Engineering Diagram
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            SYSTEM ARCHITECTURE
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('primary')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'primary'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Autonomous Traffic Grid Flow
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'emergency'
                ? 'bg-rose-500 text-white shadow'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>Parallel Emergency Preemption</span>
          </button>
        </div>
      </div>

      {/* Main Architecture Visual Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 space-y-8">
        {/* REQUIREMENT 13: PRIMARY FLOW */}
        {activeTab === 'primary' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                <span>Autonomous Traffic Pipeline: Cameras → Signals</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Data flows continuously from edge optical capture to real-time physical signal actuation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {primarySteps.map((step, idx) => {
                const Icon = step.icon;

                return (
                  <div key={step.id} className="relative flex flex-col justify-between p-4 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                        {step.id}
                      </span>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>

                    <div>
                      <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wide">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {idx < primarySteps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center text-cyan-500/60 font-mono text-xs pt-1">
                        ↓ next stage
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* REQUIREMENT 13: PARALLEL EMERGENCY FLOW */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2 font-mono">
                <Ambulance className="w-5 h-5 text-rose-400" />
                <span>Parallel Emergency Preemption: Vehicle → Green Corridor → Hospital</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Dedicated life-safety interrupt pathway guaranteeing green wave clearance with zero cross-traffic delays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 relative">
              {emergencySteps.map((step, idx) => {
                const Icon = step.icon;

                return (
                  <div key={step.id} className="relative flex flex-col justify-between p-4 rounded-2xl glass-panel border border-rose-500/30 bg-rose-950/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-rose-900/60 text-rose-300 font-mono text-xs font-bold flex items-center justify-center">
                        {step.id}
                      </span>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>

                    <div>
                      <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wide">
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {idx < emergencySteps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center text-rose-400/60 font-mono text-xs pt-1">
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
