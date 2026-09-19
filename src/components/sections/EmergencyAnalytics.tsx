import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Ambulance, 
  Flame, 
  Shield, 
  TrendingUp, 
  PieChart as PieIcon, 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Route, 
  Timer, 
  Sparkles, 
  Activity, 
  Zap, 
  Play, 
  Info 
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

export const EmergencyAnalytics: React.FC = () => {
  const { 
    emergencyStats, 
    emergencyHistory, 
    hourlyEmergency, 
    weeklyEmergency, 
    monthlyEmergency,
    simulateEmergency,
    isEmergencyActive,
    emergency 
  } = useTraffic();

  const [timeFilter, setTimeFilter] = useState<'Today' | '7 Days' | '30 Days'>('Today');
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState<'All' | 'Ambulance' | 'Fire Truck' | 'Police'>('All');

  // Donut chart data for Vehicle Distribution
  const typeDistributionData = [
    { name: 'Ambulance', value: emergencyStats.ambulances, color: '#ef4444' },
    { name: 'Fire Truck', value: emergencyStats.fireTrucks, color: '#f59e0b' },
    { name: 'Police', value: emergencyStats.police, color: '#3b82f6' },
  ];

  // Filtered emergency vehicle history
  const filteredHistory = emergencyHistory.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.route.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = vehicleFilter === 'All' || item.type === vehicleFilter;

    return matchesSearch && matchesType;
  });

  return (
    <section id="emergency-analytics" className="space-y-6 pt-4 pb-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-500/10 text-rose-500">
              <Ambulance className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              First Responder Performance Telemetry
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] dark:text-white tracking-tight mt-1">
            EMERGENCY VEHICLE ANALYTICS
          </h2>
        </div>

        {/* Action Controls: [ SIMULATE EMERGENCY ] and Time Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={simulateEmergency}
            disabled={isEmergencyActive}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 ${
              isEmergencyActive
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:brightness-110 shadow-rose-500/20'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>SIMULATE EMERGENCY</span>
          </button>

          {/* Time Filter Tabs */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
            {(['Today', '7 Days', '30 Days'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  timeFilter === filter
                    ? 'bg-[#0EA5A4] text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* REQUIREMENT 4: Main Statistics Card - EMERGENCY VEHICLES TODAY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Main 42 Card (7 cols) */}
        <div className="md:col-span-7 glass-panel p-6 rounded-3xl border border-rose-200 dark:border-rose-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
                METRIC SNAPSHOT
              </span>
              <h3 className="text-lg font-extrabold text-[#172033] dark:text-white mt-0.5">
                EMERGENCY VEHICLES TODAY
              </h3>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40">
              ● REAL-TIME DISPATCH
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="text-5xl sm:text-6xl font-black font-mono text-[#172033] dark:text-white tracking-tight flex items-center gap-3">
              <span className="text-4xl sm:text-5xl">🚑</span>
              <span>{emergencyStats.todayTotal}</span>
            </div>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Vehicles crossed today
            </span>
          </div>

          {/* Sub-breakdown: Ambulances 24, Fire Trucks 11, Police 7 */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                <Ambulance className="w-3.5 h-3.5" /> Ambulances
              </span>
              <span className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                {emergencyStats.ambulances}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Fire Trucks
              </span>
              <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                {emergencyStats.fireTrucks}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
              <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Police Vehicles
              </span>
              <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400 mt-1 block">
                {emergencyStats.police}
              </span>
            </div>
          </div>
        </div>

        {/* REQUIREMENT 10: Active Emergency Vehicle Telemetry Card (5 cols) */}
        <div className="md:col-span-5 glass-panel p-6 rounded-3xl border border-blue-200 dark:border-blue-500/30 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                🚑
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#172033] dark:text-white">
                  {emergency.vehicleId}
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Active Priority Tracking
                </span>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
              {emergency.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Current Location</span>
              <span className="font-bold text-[#172033] dark:text-white text-sm">{emergency.currentLocation}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Destination</span>
              <span className="font-bold text-[#0EA5A4] dark:text-cyan-400 text-sm">{emergency.destination || 'City Hospital'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">ETA</span>
              <span className="font-bold text-rose-500 text-sm">
                {Math.floor(emergency.etaSeconds / 60)}m {emergency.etaSeconds % 60}s
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Priority Tier</span>
              <span className="font-bold text-amber-500 text-sm">HIGH</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
            Route: <strong className="text-emerald-600 dark:text-emerald-400">Hospital → Junction 04 → Main Road</strong>
          </div>
        </div>
      </div>

      {/* REQUIREMENT 8: EMERGENCY RESPONSE PERFORMANCE (Statistic Cards) */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0EA5A4] dark:text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#172033] dark:text-white">
              EMERGENCY RESPONSE PERFORMANCE
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Corridor Clearance KPIs</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Emergency Vehicles</span>
            <span className="text-2xl font-mono font-black text-rose-600 dark:text-rose-400 mt-1 block">
              {emergencyStats.todayTotal}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Avg Response Time</span>
            <span className="text-xl font-mono font-black text-[#172033] dark:text-white mt-1 block">
              {emergencyStats.avgResponseTime}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Signal Clearance</span>
            <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {emergencyStats.avgSignalClearanceTime}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Corridors Activated</span>
            <span className="text-2xl font-mono font-black text-[#2563EB] dark:text-blue-400 mt-1 block">
              {emergencyStats.corridorsActivated}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Successful Corridors</span>
            <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {emergencyStats.successfulCorridors}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Route Success</span>
            <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {emergencyStats.routeSuccessRate}
            </span>
          </div>
        </div>
      </div>

      {/* REQUIREMENT 5 & 6: Charts Grid (Hourly Emergency Graph + Vehicle Type Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly / Weekly / Monthly Graph (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#172033] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-500" />
                Emergency Vehicles — {timeFilter}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Hover over bars to inspect vehicle modality breakdown
              </p>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Total: {emergencyStats.todayTotal}
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              {timeFilter === 'Today' ? (
                <BarChart data={hourlyEmergency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#ef4444',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: any, name: any, item: any) => {
                      const payload = item.payload;
                      return [
                        `Ambulance: ${payload.ambulance} | Fire: ${payload.fireTruck} | Police: ${payload.police} (Total: ${payload.total})`,
                        'Emergency Volume',
                      ];
                    }}
                  />
                  <Bar dataKey="total" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : timeFilter === '7 Days' ? (
                <BarChart data={weeklyEmergency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#ef4444',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val} Vehicles`, 'Crossed']}
                  />
                  <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={monthlyEmergency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="week" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#ef4444',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val} Vehicles`, 'Total Monthly']}
                  />
                  <Line type="monotone" dataKey="count" stroke="#0ea5a4" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Emergency Vehicle Distribution (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#172033] dark:text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#0EA5A4]" />
                Emergency Vehicle Distribution
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Share across First Responder Categories
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
              DEMO DATA
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeDistributionData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#0ea5a4',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val} vehicles (${Math.round((val / emergencyStats.todayTotal) * 100)}%)`, '']}
                />
                <Legend
                  formatter={(val: any) => <span className="text-slate-700 dark:text-slate-300 text-xs">{val}</span>}
                  wrapperStyle={{ paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* REQUIREMENT 9: EMERGENCY VEHICLE HISTORY Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#172033] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0EA5A4]" />
              EMERGENCY VEHICLE HISTORY
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Chronological log of priority corridor dispatches and response times
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#172033] dark:text-white focus:outline-none focus:border-[#0EA5A4]"
              />
            </div>

            <select
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Vehicles</option>
              <option value="Ambulance">Ambulances</option>
              <option value="Fire Truck">Fire Trucks</option>
              <option value="Police">Police Vehicles</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[11px] uppercase">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Time</th>
                <th className="pb-3 font-semibold">Vehicle Type</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">Route</th>
                <th className="pb-3 font-semibold">Response Time</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
              {filteredHistory.map((row) => {
                const isAmbulance = row.type === 'Ambulance';
                const isFire = row.type === 'Fire Truck';

                return (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                    <td className="py-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{row.date}</td>
                    <td className="py-3 text-[#172033] dark:text-white font-mono font-semibold">{row.time}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span>{isAmbulance ? '🚑' : isFire ? '🚒' : '🚓'}</span>
                        <span className={isAmbulance ? 'text-rose-600 dark:text-rose-400' : isFire ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}>
                          {row.type} #{row.id}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{row.location}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-400">{row.route}</td>
                    <td className="py-3 text-[#0EA5A4] dark:text-cyan-400 font-mono font-bold">{row.responseTime}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          row.status === 'Completed'
                            ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                            : 'bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/40 animate-pulse'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
