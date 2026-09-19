import React, { useState, useEffect } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Activity, 
  Wifi, 
  Volume2, 
  VolumeX, 
  Menu, 
  ShieldAlert, 
  Clock, 
  Server,
  Zap,
  PlayCircle,
  PauseCircle,
  Layers,
  LayoutList,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { UserProfile } from './UserProfile';

export const Topbar: React.FC = () => {
  const { 
    isSidebarOpen, 
    setIsSidebarOpen, 
    soundEnabled, 
    setSoundEnabled, 
    isEmergencyActive, 
    emergency,
    demoMode,
    toggleDemoMode,
    viewMode,
    setViewMode,
    theme,
    toggleTheme,
    logout
  } = useTraffic();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#111827]/95 backdrop-blur-xl border-b border-[#263449] px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-[#151E2E] border border-[#263449] text-slate-300 hover:text-[#22D3EE] hover:border-[#22D3EE]/50 transition lg:hidden cursor-pointer"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#22D3EE] to-[#34D399] flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.35)]">
              <Activity className="w-5 h-5 text-[#0B1120] stroke-[2.5]" />
            </div>
            <div>
              {/* REQUIREMENT 15: Header Branding */}
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white uppercase font-mono">
                  SMARTCITY <span className="text-[#22D3EE]">AI</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/15 text-[#22D3EE] border border-cyan-500/30 font-mono">
                  TRAFFIC CONTROL V2.4
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] hidden sm:block font-medium">
                AI-Powered Smart City Traffic & Emergency Response System
              </p>
            </div>
          </div>
        </div>

        {/* Center: Cluster Status / Emergency Active Banner */}
        {isEmergencyActive ? (
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/60 shadow-[0_0_20px_rgba(239,68,68,0.35)] animate-pulse">
            <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
            <span className="text-xs font-bold text-rose-200 font-mono tracking-wider">
              PRIORITY CORRIDOR ACTIVE: {emergency.vehicleId} (ETA {Math.floor(emergency.etaSeconds / 60)}m {emergency.etaSeconds % 60}s)
            </span>
          </div>
        ) : (
          <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#151E2E] border border-[#263449] text-xs shadow-sm">
            <div className="flex items-center gap-1.5 text-[#22D3EE] font-mono font-bold">
              <Server className="w-3.5 h-3.5" />
              <span>EDGE INFERENCE CLUSTER</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-mono text-[11px]">YOLOv8 Edge Vision</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-mono text-[11px]">ESP32 IoT Network</span>
          </div>
        )}

        {/* Right: Telemetry, Theme Toggle, User Profile & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Light / Dark Mode Toggle (Requirement 15) */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-sm bg-[#151E2E] text-slate-300 hover:text-white border-[#263449] hover:border-[#22D3EE]/50 cursor-pointer"
            title={`Current: ${theme === 'dark' ? 'Dark' : 'Light'} Mode. Click to toggle.`}
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                <span className="hidden md:inline text-indigo-200 font-semibold">DARK</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="hidden md:inline text-amber-200 font-semibold">LIGHT</span>
              </>
            )}
          </button>

          {/* REQUIREMENT 16: DEMO MODE TOGGLE */}
          <button
            onClick={toggleDemoMode}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-sm cursor-pointer ${
              demoMode
                ? 'bg-cyan-500/20 text-[#22D3EE] border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'bg-[#151E2E] text-slate-400 border-[#263449]'
            }`}
            title="Toggle autonomous traffic simulation mode"
          >
            {demoMode ? (
              <>
                <Zap className="w-3.5 h-3.5 text-[#22D3EE] animate-pulse" />
                <span className="hidden sm:inline">DEMO: ON</span>
              </>
            ) : (
              <>
                <PauseCircle className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">DEMO: OFF</span>
              </>
            )}
          </button>

          {/* View Mode Toggle: All-in-One Continuous vs Dedicated Page */}
          <button
            onClick={() => setViewMode(viewMode === 'all' ? 'page' : 'all')}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#151E2E] border border-[#263449] text-xs text-slate-300 hover:text-white cursor-pointer"
            title="Toggle layout view mode"
          >
            {viewMode === 'all' ? (
              <>
                <LayoutList className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="text-[11px]">Continuous</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-[#34D399]" />
                <span className="text-[11px]">Single Page</span>
              </>
            )}
          </button>

          {/* Connection status badge (ONLINE) */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span className="font-semibold text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <Wifi className="w-3 h-3" /> ONLINE
            </span>
          </div>

          {/* Current Live Time Clock (updating every second) */}
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#151E2E] border border-[#263449] text-xs shadow-sm font-mono">
            <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
            <div className="flex flex-col text-right">
              <span className="font-bold text-white tracking-wider">{formatTime(currentTime)}</span>
              <span className="text-[9px] text-slate-400 uppercase hidden sm:block">{formatDate(currentTime)}</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#151E2E] border-cyan-500/40 text-[#22D3EE]'
                : 'bg-[#151E2E] border-[#263449] text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Mute system sounds' : 'Enable system sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* REQUIREMENT 9: User Profile Dropdown Component */}
          <UserProfile />

          {/* Quick Logout Button (Requirement 10) */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-400 hover:bg-rose-900/40 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
            title="Sign out of Traffic Control Center"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">LOGOUT</span>
          </button>
        </div>
      </div>
    </header>
  );
};
