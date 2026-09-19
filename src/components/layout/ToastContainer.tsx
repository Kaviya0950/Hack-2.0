import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { CheckCircle, AlertTriangle, Info, ShieldAlert, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTraffic();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isEmergency = toast.type === 'emergency';
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isEmergency
                ? 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                : isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/60 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                : 'bg-slate-900/95 border-cyan-500/40 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isEmergency && <ShieldAlert className="w-5 h-5 text-rose-400 animate-bounce" />}
              {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 text-xs">
              <div className="font-bold tracking-wide text-white">{toast.title}</div>
              <div className="mt-1 opacity-90 leading-relaxed">{toast.message}</div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 transition shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
