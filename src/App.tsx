import React, { useState } from 'react';
import { TrafficProvider, useTraffic } from './context/TrafficContext';
import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/layout/ToastContainer';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { LandingHero } from './components/sections/LandingHero';
import { LiveDashboard } from './components/sections/LiveDashboard';
import { VehicleDetection } from './components/sections/VehicleDetection';
import { DensityAnalysis } from './components/sections/DensityAnalysis';
import { TrafficPrediction } from './components/sections/TrafficPrediction';
import { SignalControl } from './components/sections/SignalControl';
import { EmergencyResponse } from './components/sections/EmergencyResponse';
import { EmergencyAnalytics } from './components/sections/EmergencyAnalytics';
import { TrafficMapPage } from './components/sections/TrafficMapPage';
import { IoTSensors } from './components/sections/IoTSensors';
import { AlertsPanel } from './components/sections/AlertsPanel';
import { AnalyticsView } from './components/sections/AnalyticsView';
import { SystemArchitecture } from './components/sections/SystemArchitecture';
import { AiAssistantModal } from './components/ui/AiAssistantModal';
import { Shield, Activity, GitBranch, LayoutList, Layers } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { 
    isAuthenticated,
    isEmergencyActive, 
    emergency, 
    viewMode, 
    setViewMode, 
    activeSection, 
    setActiveSection 
  } = useTraffic();

  // Authentication page state (Login vs Sign Up)
  const [authPage, setAuthPage] = useState<'login' | 'signup'>('login');

  // If user is not authenticated, display the Login / Sign Up portal
  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer />
        {authPage === 'login' ? (
          <LoginPage onNavigateToSignup={() => setAuthPage('signup')} />
        ) : (
          <SignupPage onNavigateToLogin={() => setAuthPage('login')} />
        )}
      </>
    );
  }

  // Helper to render the active dedicated page in 'page' mode
  const renderSinglePage = () => {
    switch (activeSection) {
      case 'dashboard':
        return <LiveDashboard />;
      case 'detection':
        return <VehicleDetection />;
      case 'density':
        return <DensityAnalysis />;
      case 'prediction':
        return <TrafficPrediction />;
      case 'signals':
        return <SignalControl />;
      case 'emergency':
        return <EmergencyResponse />;
      case 'emergency-analytics':
        return <EmergencyAnalytics />;
      case 'map':
        return <TrafficMapPage />;
      case 'iot':
        return <IoTSensors />;
      case 'alerts':
        return <AlertsPanel />;
      case 'analytics':
        return <AnalyticsView />;
      case 'architecture':
        return <SystemArchitecture />;
      case 'landing':
      default:
        return (
          <>
            <LandingHero />
            <LiveDashboard />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* REQUIREMENT 12: Floating AI Traffic Assistant Chatbot Widget */}
      <AiAssistantModal />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0 transition-all duration-300">
        {/* Top Navigation Bar */}
        <Topbar />

        {/* Emergency System-Wide High-Priority Strobe Bar */}
        {isEmergencyActive && (
          <div className="bg-rose-600 text-white px-4 py-2 font-mono text-xs font-black flex items-center justify-between shadow-lg sticky top-[57px] z-20 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="text-sm">🚨</span>
              <span>
                PRIORITY CORRIDOR ACTIVE: AMBULANCE 01 DISPATCH TOWARDS{' '}
                {emergency.nextJunction.toUpperCase()}
              </span>
            </div>
            <span>ETA: {Math.floor(emergency.etaSeconds / 60)}m {emergency.etaSeconds % 60}s</span>
          </div>
        )}

        {/* Dedicated Page Mode Breadcrumb / Switcher */}
        {viewMode === 'page' && (
          <div className="bg-[#151E2E] border-b border-[#263449] px-4 lg:px-8 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[#94A3B8]">VIEWING PAGE:</span>
              <span className="text-[#22D3EE] font-bold uppercase">{activeSection.replace('-', ' ')}</span>
            </div>
            <button
              onClick={() => setViewMode('all')}
              className="text-[#94A3B8] hover:text-[#22D3EE] transition flex items-center gap-1 font-mono text-[11px] cursor-pointer"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Switch to Continuous Full Dashboard</span>
            </button>
          </div>
        )}

        {/* Main Sections Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-12">
          {viewMode === 'all' ? (
            <>
              {/* 1. Overview & Mission */}
              <LandingHero />

              {/* 2. Live Traffic Hub */}
              <LiveDashboard />

              {/* 3. AI Vehicle Detection */}
              <VehicleDetection />

              {/* 4. Density Analysis */}
              <DensityAnalysis />

              {/* 5. Traffic Prediction (Requirement 7) */}
              <TrafficPrediction />

              {/* 6. Smart Signal Control */}
              <SignalControl />

              {/* 7. Emergency Response */}
              <EmergencyResponse />

              {/* Emergency Analytics (Requirement 4-12) */}
              <EmergencyAnalytics />

              {/* 8. Traffic Map (Requirement 8) */}
              <TrafficMapPage />

              {/* 9. IoT Sensor Telemetry */}
              <IoTSensors />

              {/* 10. Alerts & Events */}
              <AlertsPanel />

              {/* 11. City Analytics */}
              <AnalyticsView />

              {/* 12. System Architecture */}
              <SystemArchitecture />
            </>
          ) : (
            renderSinglePage()
          )}
        </main>

        {/* Professional Hackathon Footer */}
        <footer className="border-t border-[#263449] bg-[#0F172A] p-6 sm:p-8 mt-12 text-xs text-[#94A3B8]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#22D3EE]">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white font-mono">
                  AI-Powered Smart City Traffic & Emergency Response System
                </div>
                <div className="text-[11px] text-[#94A3B8]">
                  Autonomous Urban Mobility Engine • Hackathon 2.0 Project Demonstration
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#22C55E]" /> Edge AI Validated
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-[#22D3EE]" /> REST API Ready
              </span>
              <span>•</span>
              <span className="text-slate-300 font-mono">v2.4.0-Production</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <TrafficProvider>
      <DashboardContent />
    </TrafficProvider>
  );
}
