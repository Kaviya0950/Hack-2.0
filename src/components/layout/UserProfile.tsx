import React, { useState, useRef, useEffect } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  User, 
  Shield, 
  Settings, 
  Moon, 
  Sun, 
  LogOut, 
  ChevronDown, 
  Activity, 
  Mail, 
  Phone,
  CheckCircle2,
  X,
  KeyRound,
  Bell
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { currentUser, logout, theme, toggleTheme } = useTraffic();
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'profile' | 'settings'>('none');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = currentUser?.fullName || 'System Administrator';
  const userRole = currentUser?.role || 'Admin';
  const userEmail = currentUser?.email || 'admin@smartcity.gov';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Traffic Operator':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Traffic Analyst':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Viewer':
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-[#151E2E] border border-[#263449] hover:border-[#22D3EE]/50 hover:bg-[#1A253A] transition-all shadow-sm cursor-pointer group"
        title="User Account & Control Settings"
      >
        {/* Avatar Circle */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#22D3EE] to-[#34D399] p-[1.5px] shadow-[0_0_12px_rgba(34,211,238,0.25)] shrink-0">
          <div className="w-full h-full rounded-[10px] bg-[#0B1120] flex items-center justify-center font-mono font-bold text-xs text-[#22D3EE]">
            {userInitials || 'SA'}
          </div>
        </div>

        {/* User Details */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-white tracking-tight truncate max-w-[120px] leading-tight">
            {userName}
          </span>
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border mt-0.5 inline-block w-fit ${getRoleBadgeColor(userRole)}`}>
            {userRole}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200 hidden sm:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#151E2E] border border-[#263449] shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
          {/* Identity Card */}
          <div className="px-4 py-3 border-b border-[#263449]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22D3EE] to-[#34D399] flex items-center justify-center font-mono font-black text-sm text-[#0B1120] shadow-md">
                {userInitials}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-extrabold text-white truncate">{userName}</div>
                <div className="text-[11px] text-slate-400 font-mono truncate">{userEmail}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${getRoleBadgeColor(userRole)}`}>
                    {userRole}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-1.5 space-y-0.5 text-xs font-semibold">
            {/* Profile Overview */}
            <button
              onClick={() => {
                setActiveModal('profile');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1E293B] transition cursor-pointer"
            >
              <User className="w-4 h-4 text-[#22D3EE]" />
              <span>Profile Overview</span>
            </button>

            {/* Account Settings */}
            <button
              onClick={() => {
                setActiveModal('settings');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1E293B] transition cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#34D399]" />
              <span>Account Settings</span>
            </button>

            {/* Theme Toggle in Menu */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1E293B] transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
                <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0B1120] text-slate-400 border border-[#263449]">
                TOGGLE
              </span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="p-1.5 border-t border-[#263449]">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#EF4444] hover:bg-rose-950/40 hover:text-rose-300 transition font-bold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal: Profile Overview */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-[#151E2E] border border-[#263449] p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-[#263449] pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base font-mono">
                <User className="w-4 h-4 text-[#22D3EE]" /> User Profile Overview
              </div>
              <button
                onClick={() => setActiveModal('none')}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#263449]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#0B1120] border border-[#263449] flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#22D3EE] to-[#34D399] flex items-center justify-center text-[#0B1120] font-mono font-black text-lg">
                  {userInitials}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{userName}</h3>
                  <p className="text-[#22D3EE] font-mono text-[11px] font-bold">{userRole}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-[#263449]/60">
                  <span className="text-slate-400">Username:</span>
                  <span className="font-mono text-white font-bold">{currentUser?.username || 'admin'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#263449]/60">
                  <span className="text-slate-400">Email Address:</span>
                  <span className="font-mono text-white">{userEmail}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#263449]/60">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono text-white">{currentUser?.phoneNumber || '+1 (555) 019-2834'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#263449]/60">
                  <span className="text-slate-400">Security Clearance:</span>
                  <span className="font-mono text-emerald-400 font-bold">LEVEL 4 - CITYWIDE OVERRIDE</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Account Created:</span>
                  <span className="font-mono text-slate-300">
                    {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Active Fleet'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('none')}
              className="w-full py-2.5 rounded-xl bg-[#22D3EE] text-[#0B1120] font-mono font-bold text-xs hover:brightness-110 transition cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Modal: Account Settings */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-[#151E2E] border border-[#263449] p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-[#263449] pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base font-mono">
                <Settings className="w-4 h-4 text-[#34D399]" /> Account & Security Settings
              </div>
              <button
                onClick={() => setActiveModal('none')}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#263449]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#0B1120] border border-[#263449] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#22D3EE]" /> Two-Factor Authentication
                  </div>
                  <p className="text-[11px] text-slate-400">Enforced for automated signal overrides</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ENABLED
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B1120] border border-[#263449] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#34D399]" /> Emergency Broadcast Alerts
                  </div>
                  <p className="text-[11px] text-slate-400">Audio chime when priority corridor activates</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B1120] border border-[#263449] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-400" /> Edge Security Protocol
                  </div>
                  <p className="text-[11px] text-slate-400">Encrypted REST / WebSocket endpoint telemetry</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  TLS 1.3
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('none')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#34D399] text-[#0B1120] font-mono font-bold text-xs hover:brightness-110 transition cursor-pointer"
            >
              SAVE & RETURN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
