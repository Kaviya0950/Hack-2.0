import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  ScanEye, 
  TrafficCone, 
  Ambulance, 
  ArrowRight, 
  Cpu, 
  Play, 
  ShieldCheck,
  Car,
  Radio,
  AlertTriangle,
  Timer,
  Activity
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { setActiveSection, overviewStats, viewMode, setViewMode } = useTraffic();

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    if (viewMode === 'all') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="landing" className="relative pt-4 pb-8 space-y-10 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 cyber-grid opacity-35" />
      </div>

      {/* Hero Header & Copy */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Next-Generation Autonomous Urban Mobility Platform</span>
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            AI-Powered Smart City{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Traffic & Emergency Response
            </span>{' '}
            System
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
            Intelligent traffic monitoring, dynamic signal management, and emergency vehicle priority using AI and IoT.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-extrabold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNavigate('architecture')}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 font-bold text-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>View System Architecture</span>
          </button>

          <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Realtime YOLOv8 Demo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>ESP32 IoT Cluster</span>
            </div>
          </div>
        </div>
      </div>

      {/* REQUIREMENT 1: 5 Real-Time Animated Statistic Cards Below Hero */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" /> Real-Time City Telemetry
          </span>
          <span className="text-[11px] text-emerald-400">● LIVE DEMO STREAM ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Vehicles Detected */}
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/25 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Vehicles Detected</span>
              <Car className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl font-black font-mono text-white tracking-tight">
              {overviewStats.vehiclesDetected.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-emerald-400">LIVE</span>
            </div>
          </div>

          {/* 2. Active Signals */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/25 hover:border-emerald-500/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Active Signals</span>
              <Radio className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl font-black font-mono text-white tracking-tight">
              {overviewStats.activeSignals}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono font-bold text-emerald-400">ONLINE</span>
            </div>
          </div>

          {/* 3. Congested Roads */}
          <div className="glass-panel p-4 rounded-2xl border border-amber-500/25 hover:border-amber-500/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Congested Roads</span>
              <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl font-black font-mono text-white tracking-tight">
              {overviewStats.congestedRoads}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-mono font-bold text-amber-400">MONITORING</span>
            </div>
          </div>

          {/* 4. Emergency Vehicles */}
          <div className="glass-panel p-4 rounded-2xl border border-rose-500/25 hover:border-rose-500/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Emergency Vehicles</span>
              <Ambulance className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl font-black font-mono text-white tracking-tight">
              {overviewStats.emergencyVehicles}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-rose-400">PRIORITY ACTIVE</span>
            </div>
          </div>

          {/* 5. Average Response Time */}
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/25 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Avg Response Time</span>
              <Timer className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl font-black font-mono text-white tracking-tight">
              {overviewStats.averageResponseTime}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono font-bold text-emerald-400">OPTIMIZED</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Existing Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div
          onClick={() => handleNavigate('detection')}
          className="group cursor-pointer rounded-2xl glass-panel p-6 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
            <ScanEye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>AI Traffic Detection</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Optical neural vision models detect cars, motorcycles, buses, and heavy trucks with 96.4% confidence and real-time bounding box tracking.
          </p>
        </div>

        <div
          onClick={() => handleNavigate('signals')}
          className="group cursor-pointer rounded-2xl glass-panel p-6 border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)] transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <TrafficCone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>Smart Signal Control</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dynamic cycle calculation dynamically allocates green splits to heavy congestion axes, reducing average junction idle waiting times by 38%.
          </p>
        </div>

        <div
          onClick={() => handleNavigate('emergency')}
          className="group cursor-pointer rounded-2xl glass-panel p-6 border border-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.18)] transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
            <Ambulance className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>Emergency Priority</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic GPS corridor recognition overrides intersection phases to uninterrupted green waves, saving critical minutes for first responders.
          </p>
        </div>
      </div>
    </section>
  );
};
