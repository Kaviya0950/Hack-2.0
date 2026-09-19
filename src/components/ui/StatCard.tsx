import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'alert';
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'blue';
  subtitle?: string;
  badge?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  change,
  changeType = 'neutral',
  accentColor = 'cyan',
  subtitle,
  badge,
  onClick,
}) => {
  const accentStyles = {
    cyan: {
      border: 'hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      textAccent: 'text-cyan-400',
    },
    emerald: {
      border: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      textAccent: 'text-emerald-400',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      textAccent: 'text-amber-400',
    },
    rose: {
      border: 'hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]',
      textAccent: 'text-rose-400',
    },
    blue: {
      border: 'hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
      textAccent: 'text-blue-400',
    },
  }[accentColor];

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl glass-panel p-5 transition-all duration-300 ${accentStyles.border} ${accentStyles.glow} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono">{value}</span>
            {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
          </div>
        </div>

        <div className={`p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 ${accentStyles.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {change && (
            <span
              className={`font-semibold flex items-center gap-1 ${
                changeType === 'positive'
                  ? 'text-emerald-400'
                  : changeType === 'negative'
                  ? 'text-rose-400'
                  : changeType === 'alert'
                  ? 'text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-400 ml-auto truncate">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
