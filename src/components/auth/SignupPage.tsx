import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { UserRole } from '../../types/traffic';
import { 
  Radio, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  TrafficCone, 
  Ambulance, 
  ScanEye, 
  BarChart3,
  CheckCircle2,
  Check,
  X
} from 'lucide-react';

interface SignupPageProps {
  onNavigateToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigateToLogin }) => {
  const { register } = useTraffic();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('Traffic Operator');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Password Strength Evaluation
  const evaluatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700' };

    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
    const isLongEnough = pass.length >= 8;

    let points = 0;
    if (isLongEnough) points += 1;
    if (hasUpper && hasLower) points += 1;
    if (hasNumber) points += 1;
    if (hasSpecial) points += 1;

    if (points <= 2) {
      return { score: 1, label: 'Weak', color: 'bg-rose-500', width: 'w-1/3' };
    } else if (points === 3) {
      return { score: 2, label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' };
    } else {
      return { score: 3, label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    }
  };

  const strength = evaluatePasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Frontend validation
    if (fullName.trim().length < 3) {
      setErrorMsg('Full Name must be at least 3 characters.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (username.trim().length < 4) {
      setErrorMsg('Username must be at least 4 characters.');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMsg(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.'
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter your password.');
      return;
    }
    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setErrorMsg('Please enter a valid phone number (e.g. +1 555-234-5678).');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms & Conditions to create an account.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = register({
        fullName,
        email,
        username,
        password,
        confirmPassword,
        phoneNumber,
        role,
        agreeTerms,
      });

      setIsLoading(false);
      if (res.success) {
        onNavigateToLogin();
      } else {
        setErrorMsg(res.message || 'Unable to register account.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex flex-col justify-center items-center p-4 lg:p-8 relative overflow-hidden">
      {/* Background Animated Cyber Ambiance */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      {/* Split Screen Container (Desktop Two-Column, Mobile Stacked) */}
      <div className="w-full max-w-5xl rounded-3xl border border-[#263449] bg-[#111827]/90 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* LEFT COLUMN: Smart City Branding & AI Highlights */}
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
                OPERATOR ONBOARDING
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                AI-Powered Urban Traffic Intelligence
              </h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Join the autonomous command grid. Real-time edge inference, dynamic signal scheduling, and emergency corridor automation.
              </p>
            </div>

            {/* 4 Feature Highlights */}
            <div className="mt-8 space-y-4">
              <div className="p-3 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
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

              <div className="p-3 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
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

              <div className="p-3 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
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

              <div className="p-3 rounded-2xl bg-[#151E2E]/80 border border-[#263449] flex items-start gap-3">
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

          {/* Footer Badge */}
          <div className="pt-4 border-t border-[#263449]/70 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              EDGE CLUSTER ONLINE
            </span>
            <span>v2.4.0</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign Up Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase block">
              NEW REGISTRATION
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1">
              CREATE YOUR ACCOUNT
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              Enter your operational details to register your Smart City Hub access.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Full Name <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Username <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. jdoe_operator"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Email Address <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@smartcity.gov"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Phone Number <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Assigned Operational Role <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-semibold text-white focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
              >
                <option value="Traffic Operator">Traffic Operator (Signal Overrides & Camera Feeds)</option>
                <option value="Admin">Admin (Full Control Room Clearance)</option>
                <option value="Traffic Analyst">Traffic Analyst (Historical Data & Predictions)</option>
                <option value="Viewer">Viewer (Telemetry Observer Mode)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Password <span className="text-[#EF4444]">*</span>
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
                    placeholder="Min 8 chars"
                    className="w-full pl-9 pr-10 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
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

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Confirm Password <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-10 py-2 rounded-xl bg-[#151E2E] border border-[#263449] text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* REQUIREMENT 5: Password Strength Indicator */}
            {password.length > 0 && (
              <div className="p-3 rounded-xl bg-[#0B1120] border border-[#263449] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-400">Password Strength:</span>
                  <span
                    className={`font-mono font-bold text-[11px] ${
                      strength.score === 1
                        ? 'text-rose-400'
                        : strength.score === 2
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="w-full bg-[#151E2E] h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400 pt-1">
                  <span className={`flex items-center gap-1 ${password.length >= 8 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {password.length >= 8 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {/[A-Z]/.test(password) && /[a-z]/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Upper & Lowercase
                  </span>
                  <span className={`flex items-center gap-1 ${/\d/.test(password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {/\d/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Number (0-9)
                  </span>
                  <span className={`flex items-center gap-1 ${/[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {/[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Special Char
                  </span>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[#263449] bg-[#151E2E] text-[#22D3EE] focus:ring-[#22D3EE] focus:ring-offset-0 cursor-pointer"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-[#22D3EE] hover:underline font-semibold">
                    Smart City Security Protocol & Terms of Service
                  </span>
                </span>
              </label>
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
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-4 border-t border-[#263449] text-center text-xs text-slate-400">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-[#22D3EE] hover:underline cursor-pointer ml-1"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
