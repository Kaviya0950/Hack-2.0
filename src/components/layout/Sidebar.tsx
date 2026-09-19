import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import {
  Home,
  LayoutDashboard,
  ScanEye,
  Gauge,
  Sparkles,
  TrafficCone,
  Ambulance,
  Map as MapIcon,
  Cpu,
  Bell,
  BarChart3,
  Network,
  X,
  Radio,
  Zap,
  Activity
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { 
    activeSection, 
    setActiveSection, 
    viewMode,
    isSidebarOpen, 
    setIsSidebarOpen, 
    alerts,
    isEmergencyActive,
    isCameraRunning,
    emergencyStats
  } = useTraffic();

  // REQUIREMENT 14: Organized list of 12 sidebar items
  const navItems: NavItem[] = [
    { id: 'landing', label: 'Overview & Mission', icon: Home },
    { id: 'dashboard', label: 'Live Traffic Hub', icon: LayoutDashboard },
    { 
      id: 'detection', 
      label: 'AI Vehicle Detection', 
      icon: ScanEye, 
      badge: isCameraRunning ? 'LIVE' : 'OFFLINE',
      badgeColor: isCameraRunning ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400'
    },
    { id: 'density', label: 'Density Analysis', icon: Gauge },
    { 
      id: 'prediction', 
      label: 'Traffic Prediction', 
      icon: Sparkles,
      badge: 'AI',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    },
    { id: 'signals', label: 'Smart Signal Control', icon: TrafficCone },
    { 
      id: 'emergency', 
      label: 'Emergency Response', 
      icon: Ambulance, 
      badge: isEmergencyActive ? 'PRIORITY' : undefined,
      badgeColor: 'bg-rose-500 text-white animate-pulse'
    },
    { 
      id: 'emergency-analytics', 
      label: 'Emergency Analytics', 
      icon: Activity, 
      badge: emergencyStats.todayTotal > 0 ? emergencyStats.todayTotal : undefined,
      badgeColor: 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/30'
    },
    { id: 'map', label: 'Traffic Map', icon: MapIcon },
    { id: 'iot', label: 'IoT Sensor Telemetry', icon: Cpu },
    { 
      id: 'alerts', 
      label: 'Alerts & Events', 
      icon: Bell, 
      badge: alerts.length > 0 ? alerts.length : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40'
    },
    { id: 'analytics', label: 'City Analytics', icon: BarChart3 },
    { id: 'architecture', label: 'System Architecture', icon: Network },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);

    if (viewMode === 'all') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-[#263449] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-[#263449]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#22D3EE]">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                  SMART CITY <span className="text-[#22D3EE]">HUB</span>
                </div>
                <div className="text-[11px] text-[#34D399] font-mono">
                  Autonomous Traffic Grid
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#151E2E] lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              CONTROL CENTER
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-[#22D3EE] border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#151E2E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#22D3EE]' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md font-mono border ${
                        item.badgeColor || 'bg-[#151E2E] text-slate-300 border-[#263449]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Hardware Quick Status Widget */}
        <div className="p-4 border-t border-[#263449] bg-[#0B1120]/80">
          <div className="rounded-xl p-3 bg-[#151E2E] border border-[#263449] space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#22D3EE]" /> AI Edge Status
              </span>
              <span className="font-mono text-[#22C55E] font-bold text-[11px]">ONLINE</span>
            </div>

            <div className="w-full bg-[#0B1120] h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#22D3EE] to-[#34D399] h-full w-[96%]" />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Latency: 12ms</span>
              <span>Health: 100%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
