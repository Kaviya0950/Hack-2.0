import React from 'react';
import { LightState } from '../../types/traffic';

interface TrafficLightProps {
  state: LightState;
  remainingTime: number;
  direction?: string;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({
  state,
  remainingTime,
  direction,
  size = 'md',
  compact = false,
}) => {
  const dotSize = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  const housingPadding = {
    sm: 'p-1.5 gap-1.5',
    md: 'p-2.5 gap-2',
    lg: 'p-3 gap-2.5',
  }[size];

  return (
    <div className="flex flex-col items-center gap-1.5">
      {direction && (
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
          {direction}
        </div>
      )}

      {/* Traffic Light Housing */}
      <div
        className={`flex ${
          compact ? 'flex-row' : 'flex-col'
        } items-center bg-slate-950/90 rounded-2xl border border-slate-700/60 shadow-xl backdrop-blur-md ${housingPadding}`}
      >
        {/* RED */}
        <div
          className={`rounded-full transition-all duration-300 ${dotSize} ${
            state === 'RED'
              ? 'bg-rose-500 shadow-[0_0_15px_#f43f5e] ring-2 ring-rose-400'
              : 'bg-rose-950/60 border border-rose-900/40 opacity-40'
          }`}
        />

        {/* YELLOW */}
        <div
          className={`rounded-full transition-all duration-300 ${dotSize} ${
            state === 'YELLOW'
              ? 'bg-amber-400 shadow-[0_0_15px_#fbbf24] ring-2 ring-amber-300 animate-pulse'
              : 'bg-amber-950/60 border border-amber-900/40 opacity-40'
          }`}
        />

        {/* GREEN */}
        <div
          className={`rounded-full transition-all duration-300 ${dotSize} ${
            state === 'GREEN'
              ? 'bg-emerald-400 shadow-[0_0_15px_#34d399] ring-2 ring-emerald-300'
              : 'bg-emerald-950/60 border border-emerald-900/40 opacity-40'
          }`}
        />
      </div>

      {/* Countdown Timer Badge */}
      <div
        className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-xs border shadow-sm ${
          state === 'GREEN'
            ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
            : state === 'YELLOW'
            ? 'bg-amber-950/80 text-amber-300 border-amber-500/40 animate-pulse'
            : 'bg-rose-950/80 text-rose-400 border-rose-500/40'
        }`}
      >
        {remainingTime}s
      </div>
    </div>
  );
};
