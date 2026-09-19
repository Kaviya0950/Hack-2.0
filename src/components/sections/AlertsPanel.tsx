import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Ambulance, 
  Trash2, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap
} from 'lucide-react';

export const AlertsPanel: React.FC = () => {
  const { 
    alerts, 
    dismissAlert, 
    clearAllAlerts, 
    triggerSampleAlert,
    setSelectedJunctionId, 
    setActiveSection,
    viewMode
  } = useTraffic();

  const [filterLevel, setFilterLevel] = useState<'all' | 'red' | 'yellow' | 'green'>('all');

  const filteredAlerts = alerts.filter((alert) => {
    if (filterLevel === 'all') return true;
    return alert.level === filterLevel;
  });

  const getAlertIcon = (alert: typeof alerts[0]) => {
    if (alert.type === 'EMERGENCY') {
      return <Ambulance className="w-5 h-5 text-rose-400 animate-pulse" />;
    }
    switch (alert.level) {
      case 'red':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'yellow':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'green':
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleJunctionJump = (junctionId?: string) => {
    if (junctionId) {
      setSelectedJunctionId(junctionId);
      setActiveSection('dashboard');
      if (viewMode === 'all') {
        const el = document.getElementById('dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="alerts" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-500/10 text-rose-400">
              <Bell className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
              Urban Dispatch Log
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            ALERTS & EVENTS
          </h2>
        </div>

        {/* Action Controls: Severity Filter, Trigger Event & Clear All */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dynamic Sample Alert Button */}
          <button
            onClick={triggerSampleAlert}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 text-xs font-semibold transition"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulate New Event</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterLevel === 'all'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilterLevel('red')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                filterLevel === 'red'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <span>🔴</span> Critical
            </button>
            <button
              onClick={() => setFilterLevel('yellow')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                filterLevel === 'yellow'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              <span>🟡</span> Warning
            </button>
            <button
              onClick={() => setFilterLevel('green')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                filterLevel === 'green'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <span>🟢</span> Normal
            </button>
          </div>

          {alerts.length > 0 && (
            <button
              onClick={clearAllAlerts}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
              title="Clear all alerts"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center border border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">All Events Cleared</h4>
            <p className="text-xs text-slate-400">No active incidents matching the selected filter criteria.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isRed = alert.level === 'red';
            const isYellow = alert.level === 'yellow';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl glass-panel border transition-all flex items-start justify-between gap-4 ${
                  isRed
                    ? 'border-rose-500/40 bg-rose-950/10 hover:border-rose-500/70 shadow-[0_0_15px_rgba(244,63,94,0.08)]'
                    : isYellow
                    ? 'border-amber-500/40 bg-amber-950/10 hover:border-amber-500/70'
                    : 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl border mt-0.5 shrink-0 ${
                      isRed
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                        : isYellow
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    {getAlertIcon(alert)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm tracking-wide font-mono">
                        {alert.title}
                      </span>
                      {alert.location && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                          {alert.location}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> {alert.timestamp}
                      </span>
                      {alert.junctionId && (
                        <button
                          onClick={() => handleJunctionJump(alert.junctionId)}
                          className="text-cyan-400 hover:text-cyan-300 font-semibold font-sans flex items-center gap-0.5"
                        >
                          <span>Inspect Node</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition shrink-0"
                  title="Dismiss alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
