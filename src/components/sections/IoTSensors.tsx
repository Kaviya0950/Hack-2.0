import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Cpu, 
  Radio, 
  Thermometer, 
  BatteryCharging, 
  Clock, 
  Car, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export const IoTSensors: React.FC = () => {
  const { esp32Sensors } = useTraffic();

  return (
    <section id="iot" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Embedded Microcontroller Grid
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            IoT SENSOR TELEMETRY
          </h2>
        </div>

        {/* Notice badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Protocol: MQTT v5.0 Broker (QoS 1)</span>
        </div>
      </div>

      {/* REQUIREMENT 9: Prominent SIMULATED IoT DATA Disclaimer */}
      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2.5">
        <Info className="w-4 h-4 shrink-0 text-cyan-400" />
        <span>
          <strong>SIMULATED IoT DATA:</strong> Sensor telemetry packets are generated using realistic microcontroller simulation routines for hackathon presentation purposes.
        </span>
      </div>

      {/* REQUIREMENT 9: Sensors ESP32-01, ESP32-02, ESP32-03, ESP32-04 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {esp32Sensors.map((sensor) => {
          const isOnline = sensor.status === 'ONLINE';

          return (
            <div
              key={sensor.id}
              className={`rounded-2xl glass-panel p-5 border transition-all duration-300 space-y-4 flex flex-col justify-between ${
                isOnline
                  ? 'border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                  : 'border-rose-500/40 bg-rose-950/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
              }`}
            >
              {/* Card Header: Node ID & Animated Connection Status */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-white text-base">{sensor.id}</h3>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{sensor.name}</span>
                    </div>
                  </div>

                  {/* Animated ONLINE / OFFLINE indicator */}
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                    <span className="relative flex h-2.5 w-2.5">
                      {isOnline && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      ></span>
                    </span>
                    <span className={isOnline ? 'text-emerald-400' : 'text-rose-400'}>
                      {sensor.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sensor Metrics: Temperature, Vehicle Count, IR Sensor Status, Battery, Last Updated */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                {/* Temperature */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temperature:
                  </span>
                  <span className="font-mono font-bold text-amber-300">{sensor.temperature}°C</span>
                </div>

                {/* IR Sensor Status */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" /> IR Sensor:
                  </span>
                  <span
                    className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded border ${
                      sensor.irSensorStatus === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {sensor.irSensorStatus}
                  </span>
                </div>

                {/* Vehicle Count */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-emerald-400" /> Vehicle Count:
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{sensor.vehicleCount}</span>
                </div>

                {/* Battery/Power */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-slate-400" /> Battery / Power:
                  </span>
                  <span className="font-mono text-slate-300 text-[11px] truncate max-w-[120px]">
                    {sensor.batteryPower}
                  </span>
                </div>
              </div>

              {/* Last Updated */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> Updated:
                </span>
                <span className="text-cyan-400">{sensor.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
