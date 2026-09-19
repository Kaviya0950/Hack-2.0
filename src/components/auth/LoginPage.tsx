import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Radio, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  TrafficCone, 
  Ambulance, 
  ScanEye, 
  BarChart3,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface LoginPageProps {
  onNavigateToSignup?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToSignup }) => {
  const { login } = useTraffic();
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Please enter both your email/username and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = login(identifier, password);
      setIsLoading(false);
      if (!result.success) {
        setErrorMsg(result.message || 'Invalid credentials.');
      }
    }, 500);
  };

  const handleFillDemo = () => {
    setIdentifier('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex flex-col justify-center items-center p-4 lg:p-8 relative overflow-hidden">
      {/* Background Cyber Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      {/* Split Screen Container (Desktop Two-Column, Mobile Stacked) */}
      <div className="w-full max-w-5xl rounded-3xl border border-[#263449] bg-[#111827]/90 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* LEFT COLUMN: Smart City Hub Branding & Feature Highlights */}
        <div className="lg:col-span-5 p-8 lg:p-10 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#0B1120] border-b lg:border-b-0 lg:border-r border-[#263449] flex flex-col justify-between space-y-8">
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#22D3EE] to-[#34D399] flex items-center justify-center text-[#0B1120] shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <Radio className="w-6 h-6 animate-pulse stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-white uppercase font-mono">
                  SMART CITY <span className="text-[#22D3EE]">HUB</span>
                </h1>
                <p className="text-[11px] font-bold text-[#34D399] font-mono tracking-wider">
                  AI Traffic Control System
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase block">
                CONTROL ROOM LOGIN
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                AI-Powered Urban Traffic Intelligence
              </h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Autonomous municipal mobility platform integrating computer vision, dynamic phase management, and real-time emergency dispatch corridors.
              </p>
            </div>

            {/* 4 Feature Highlights */}
            <div className="mt-8 space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#22D3EE] shrink-0 mt-0.5">
                  <TrafficCone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Smart Signal Control
                  </h4>
                  <p className="text-[11px] text-[#94A3B8]">
                    AI dynamically adjusts green phases to optimize intersection queue density.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-[#EF4444] shrink-0 mt-0.5">
                  <Ambulance className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Emergency Priority Corridors
                  </h4>
                  <p className="text-[11px] text-[#94A3B8]">
                    Zero-latency green signal override for ambulances, fire trucks, and police units.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#34D399] shrink-0 mt-0.5">
                  <ScanEye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    AI Vehicle Vision
                  </h4>
                  <p className="text-[11px] text-[#94A3B8]">
                    YOLO edge classification detects cars, bikes, buses, and freight vehicles.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Predictive Urban Analytics
                  </h4>
                  <p className="text-[11px] text-[#94A3B8]">
                    Hourly congestion forecasting with integrated ESP32 sensor telemetry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status */}
          <div className="pt-4 border-t border-[#263449]/70 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              EDGE CLUSTER ONLINE
            </span>
            <span>v2.4.0-PROD</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#151E2E] border border-[#263449] flex items-center justify-center text-[#22D3EE] shadow-md sm:hidden mx-auto">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase block">
              ACCESS PORTAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Enter your credentials to access the Smart City Control Center.
            </p>
          </div>

          {/* Error message alert */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin or username@smartcity.gov"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#263449] bg-[#151E2E] text-[#22D3EE] focus:ring-[#22D3EE] cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  setErrorMsg('Demo hint: Use Username "admin" and Password "admin123", or sign up with a new account.')
                }
                className="text-[#22D3EE] hover:underline font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#34D399] text-[#0B1120] font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0B1120] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Button Box */}
          <div className="p-3.5 rounded-2xl bg-[#0B1120] border border-[#263449] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block flex items-center gap-1 justify-center sm:justify-start">
                <Sparkles className="w-3 h-3 text-[#22D3EE]" /> HACKATHON DEMO ACCOUNT
              </span>
              <div className="font-mono text-xs text-slate-300">
                User: <span className="text-[#22D3EE] font-bold">admin</span> • Pass: <span className="text-[#34D399] font-bold">admin123</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1.5 rounded-lg bg-[#151E2E] border border-[#263449] hover:border-[#22D3EE] text-slate-200 hover:text-white font-mono text-[11px] font-bold transition shrink-0 cursor-pointer"
            >
              Autofill Credentials
            </button>
          </div>

          {/* Don't have an account? Sign Up */}
          <div className="pt-4 border-t border-[#263449] text-center text-xs text-slate-400">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="font-bold text-[#22D3EE] hover:underline cursor-pointer ml-1"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
