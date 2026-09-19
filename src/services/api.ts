import { 
  Junction, 
  EmergencyStatus, 
  ESP32SensorNode,
  AlertNotification, 
  PredictionPoint,
  BoundingBox,
  EmergencyVehicleRecord,
  HourlyEmergencyPoint,
  WeeklyEmergencyPoint
} from '../types/traffic';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || null;

export const INITIAL_JUNCTIONS: Junction[] = [
  {
    id: 'j4',
    name: 'Junction 04 - East Gateway & Ring Blvd',
    codeName: 'JUNCTION 04',
    density: 82,
    status: 'HIGH',
    vehicleCount: 146,
    avgSpeed: 18,
    roadNames: 'East Gateway Corridor & Metro Perimeter',
    aiPrediction: 'Heavy traffic expected',
    coordinates: { x: 75, y: 55 },
    signals: [
      { direction: 'East', vehicleCount: 67, density: 82, signal: 'GREEN', remainingTime: 27, waitingQueue: 18 },
      { direction: 'North', vehicleCount: 42, density: 55, signal: 'RED', remainingTime: 14, waitingQueue: 9 },
      { direction: 'South', vehicleCount: 18, density: 28, signal: 'RED', remainingTime: 20, waitingQueue: 4 },
      { direction: 'West', vehicleCount: 19, density: 31, signal: 'RED', remainingTime: 24, waitingQueue: 5 },
    ],
  },
  {
    id: 'j1',
    name: 'Junction 01 - North Ave & Central Blvd',
    codeName: 'North Junction',
    density: 48,
    status: 'MEDIUM',
    vehicleCount: 74,
    avgSpeed: 42,
    roadNames: 'North Expressway & 1st Avenue',
    aiPrediction: 'Steady throughput, slight ramp-up',
    coordinates: { x: 28, y: 35 },
    signals: [
      { direction: 'North', vehicleCount: 32, density: 48, signal: 'GREEN', remainingTime: 32, waitingQueue: 6 },
      { direction: 'South', vehicleCount: 20, density: 35, signal: 'RED', remainingTime: 18, waitingQueue: 4 },
      { direction: 'East', vehicleCount: 12, density: 24, signal: 'RED', remainingTime: 25, waitingQueue: 3 },
      { direction: 'West', vehicleCount: 10, density: 20, signal: 'RED', remainingTime: 28, waitingQueue: 2 },
    ],
  },
  {
    id: 'j2',
    name: 'Junction 02 - South Transit Cross',
    codeName: 'South Junction',
    density: 36,
    status: 'MEDIUM',
    vehicleCount: 58,
    avgSpeed: 48,
    roadNames: 'South Boulevard & Unity Parkway',
    aiPrediction: 'Normal fluid flow maintained',
    coordinates: { x: 40, y: 75 },
    signals: [
      { direction: 'South', vehicleCount: 26, density: 36, signal: 'GREEN', remainingTime: 25, waitingQueue: 3 },
      { direction: 'North', vehicleCount: 14, density: 24, signal: 'RED', remainingTime: 20, waitingQueue: 2 },
      { direction: 'East', vehicleCount: 10, density: 18, signal: 'RED', remainingTime: 22, waitingQueue: 2 },
      { direction: 'West', vehicleCount: 8, density: 15, signal: 'RED', remainingTime: 26, waitingQueue: 1 },
    ],
  },
  {
    id: 'j3',
    name: 'Junction 03 - West Tech Highway',
    codeName: 'West Junction',
    density: 68,
    status: 'HIGH',
    vehicleCount: 112,
    avgSpeed: 25,
    roadNames: 'West Innovation Corridor & Silicon Way',
    aiPrediction: 'Queue buildup on westbound approach',
    coordinates: { x: 18, y: 55 },
    signals: [
      { direction: 'West', vehicleCount: 52, density: 68, signal: 'GREEN', remainingTime: 30, waitingQueue: 12 },
      { direction: 'East', vehicleCount: 28, density: 42, signal: 'RED', remainingTime: 16, waitingQueue: 6 },
      { direction: 'North', vehicleCount: 18, density: 30, signal: 'RED', remainingTime: 24, waitingQueue: 4 },
      { direction: 'South', vehicleCount: 14, density: 22, signal: 'RED', remainingTime: 28, waitingQueue: 3 },
    ],
  },
  {
    id: 'j5',
    name: 'Junction 05 - Harbor Gateway Corridor',
    codeName: 'JUNCTION 05',
    density: 54,
    status: 'MEDIUM',
    vehicleCount: 84,
    avgSpeed: 38,
    roadNames: 'Docklands Bypass & Harbor Expressway',
    aiPrediction: 'Moderate commercial freight flow',
    coordinates: { x: 82, y: 30 },
    signals: [
      { direction: 'North', vehicleCount: 36, density: 54, signal: 'GREEN', remainingTime: 28, waitingQueue: 7 },
      { direction: 'South', vehicleCount: 24, density: 40, signal: 'RED', remainingTime: 18, waitingQueue: 5 },
      { direction: 'East', vehicleCount: 14, density: 25, signal: 'RED', remainingTime: 26, waitingQueue: 3 },
      { direction: 'West', vehicleCount: 10, density: 19, signal: 'RED', remainingTime: 24, waitingQueue: 2 },
    ],
  },
  {
    id: 'j6',
    name: 'Junction 06 - Civic Center Main Interchange',
    codeName: 'JUNCTION 06',
    density: 28,
    status: 'LOW',
    vehicleCount: 44,
    avgSpeed: 52,
    roadNames: 'Government Ring & Capitol Mall',
    aiPrediction: 'Low congestion, ideal priority channel',
    coordinates: { x: 50, y: 20 },
    signals: [
      { direction: 'East', vehicleCount: 18, density: 28, signal: 'GREEN', remainingTime: 35, waitingQueue: 2 },
      { direction: 'West', vehicleCount: 12, density: 20, signal: 'RED', remainingTime: 22, waitingQueue: 1 },
      { direction: 'North', vehicleCount: 8, density: 15, signal: 'RED', remainingTime: 28, waitingQueue: 1 },
      { direction: 'South', vehicleCount: 6, density: 12, signal: 'RED', remainingTime: 30, waitingQueue: 1 },
    ],
  },
];

export const INITIAL_EMERGENCY: EmergencyStatus = {
  active: false,
  vehicleId: 'AMBULANCE #A102',
  vehicleType: 'Advanced Life Support Ambulance',
  status: 'STANDBY',
  currentLocation: 'Junction 04',
  destination: 'City Hospital',
  recommendedRoute: ['Hospital', 'Junction 04', 'Main Road'],
  nextJunction: 'Junction 04',
  etaSeconds: 138, // 2 min 18 sec
  targetJunctionId: 'j4',
  corridorSignals: [
    { id: 'sig-04', name: 'Signal 04', state: 'GREEN' },
    { id: 'sig-05', name: 'Signal 05', state: 'GREEN' },
    { id: 'sig-06', name: 'Signal 06', state: 'GREEN' },
  ],
};

export const INITIAL_EMERGENCY_RECORDS: EmergencyVehicleRecord[] = [
  { id: "A102", date: "19 Sep 2026", time: "10:32 AM", type: "Ambulance", location: "Junction 04", destination: "City Hospital", route: "Hospital Road", responseTime: "3m 42s", status: "Completed" },
  { id: "F201", date: "19 Sep 2026", time: "11:15 AM", type: "Fire Truck", location: "Junction 02", destination: "Industrial Hub", route: "Main Road", responseTime: "4m 10s", status: "Completed" },
  { id: "P304", date: "19 Sep 2026", time: "12:48 PM", type: "Police", location: "Junction 06", destination: "Ring Road North", route: "Ring Road", responseTime: "2m 55s", status: "Completed" },
  { id: "A103", date: "19 Sep 2026", time: "01:20 PM", type: "Ambulance", location: "Junction 01", destination: "Trauma Care Center", route: "Central Blvd", responseTime: "3m 15s", status: "Completed" },
  { id: "F202", date: "19 Sep 2026", time: "02:10 PM", type: "Fire Truck", location: "Junction 03", destination: "Market Square", route: "West Highway", responseTime: "4m 45s", status: "Completed" },
  { id: "P305", date: "19 Sep 2026", time: "03:05 PM", type: "Police", location: "Junction 05", destination: "Docklands Port", route: "Bypass Arterial", responseTime: "2m 30s", status: "Completed" },
  { id: "A104", date: "19 Sep 2026", time: "04:15 PM", type: "Ambulance", location: "Junction 04", destination: "General Hospital ER", route: "East Gateway", responseTime: "3m 28s", status: "Completed" },
  { id: "A105", date: "19 Sep 2026", time: "05:00 PM", type: "Ambulance", location: "Junction 04", destination: "City Hospital", route: "Hospital → Junction 04 → Main Road", responseTime: "2m 18s", status: "Active" },
];

export const INITIAL_HOURLY_EMERGENCY: HourlyEmergencyPoint[] = [
  { time: '10 AM', ambulance: 2, fireTruck: 1, police: 1, total: 4 },
  { time: '11 AM', ambulance: 3, fireTruck: 2, police: 1, total: 6 },
  { time: '12 PM', ambulance: 2, fireTruck: 0, police: 1, total: 3 },
  { time: '1 PM', ambulance: 3, fireTruck: 1, police: 1, total: 5 },
  { time: '2 PM', ambulance: 2, fireTruck: 1, police: 1, total: 4 },
  { time: '3 PM', ambulance: 4, fireTruck: 2, police: 1, total: 7 },
  { time: '4 PM', ambulance: 3, fireTruck: 1, police: 1, total: 5 },
  { time: '5 PM', ambulance: 3, fireTruck: 1, police: 2, total: 6 },
  { time: '6 PM', ambulance: 2, fireTruck: 1, police: 0, total: 3 },
  { time: '7 PM', ambulance: 1, fireTruck: 0, police: 0, total: 1 },
];

export const INITIAL_WEEKLY_EMERGENCY: WeeklyEmergencyPoint[] = [
  { day: 'Monday', count: 35 },
  { day: 'Tuesday', count: 42 },
  { day: 'Wednesday', count: 38 },
  { day: 'Thursday', count: 47 },
  { day: 'Friday', count: 51 },
  { day: 'Saturday', count: 29 },
  { day: 'Sunday', count: 24 },
];

export const INITIAL_MONTHLY_EMERGENCY = [
  { week: 'Week 1 (1-7 Sep)', count: 268 },
  { week: 'Week 2 (8-14 Sep)', count: 284 },
  { week: 'Week 3 (15-21 Sep)', count: 295 },
  { week: 'Week 4 (22-28 Sep)', count: 274 },
];

export const INITIAL_ESP32_SENSORS: ESP32SensorNode[] = [
  {
    id: 'ESP32-01',
    name: 'ESP32-01 (East Junction Core)',
    status: 'ONLINE',
    temperature: 31,
    vehicleCount: 42,
    irSensorStatus: 'ACTIVE',
    batteryPower: '3.96V (98%)',
    lastUpdated: 'Just now',
  },
  {
    id: 'ESP32-02',
    name: 'ESP32-02 (Junction 02 North)',
    status: 'ONLINE',
    temperature: 34,
    vehicleCount: 68,
    irSensorStatus: 'ACTIVE',
    batteryPower: '4.02V (100%)',
    lastUpdated: 'Just now',
  },
  {
    id: 'ESP32-03',
    name: 'ESP32-03 (West Perimeter Node)',
    status: 'OFFLINE',
    temperature: 45,
    vehicleCount: 0,
    irSensorStatus: 'INACTIVE',
    batteryPower: '3.12V (Critical 12%)',
    lastUpdated: '8 minutes ago',
  },
  {
    id: 'ESP32-04',
    name: 'ESP32-04 (Hospital Corridor Gateway)',
    status: 'ONLINE',
    temperature: 29,
    vehicleCount: 36,
    irSensorStatus: 'ACTIVE',
    batteryPower: '3.98V (95%)',
    lastUpdated: 'Just now',
  },
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    type: 'HIGH_TRAFFIC',
    level: 'red',
    title: 'HIGH TRAFFIC DETECTED',
    location: 'East Junction',
    message: 'Saturation at 82% with 146 vehicles queued. Queue length exceeding 180m.',
    timestamp: '2 minutes ago',
    junctionId: 'j4',
    read: false,
  },
  {
    id: 'alt-2',
    type: 'EMERGENCY',
    level: 'red',
    title: 'AMBULANCE DETECTED',
    location: 'Junction 04',
    message: 'Emergency vehicle detected approaching Junction 04. Green wave corridor standby.',
    timestamp: '1 minute ago',
    junctionId: 'j4',
    read: false,
  },
  {
    id: 'alt-3',
    type: 'SIGNAL_OPTIMIZED',
    level: 'green',
    title: 'SIGNAL TIMING OPTIMIZED',
    location: 'Junction 02',
    message: 'AI timing adjustment allocated +25s green phase. Congestion reduced by 14%.',
    timestamp: '5 minutes ago',
    junctionId: 'j2',
    read: false,
  },
  {
    id: 'alt-4',
    type: 'HARDWARE',
    level: 'yellow',
    title: 'SENSOR OFFLINE',
    location: 'ESP32-03',
    message: 'Telemetry lost. Low battery voltage (3.12V) reported prior to disconnection.',
    timestamp: '8 minutes ago',
    read: false,
  },
];

export const INITIAL_HOURLY_PREDICTIONS: PredictionPoint[] = [
  { time: '10 AM', density: 35, vehicleCount: 520, avgSpeed: 45 },
  { time: '11 AM', density: 48, vehicleCount: 680, avgSpeed: 40 },
  { time: '12 PM', density: 62, vehicleCount: 890, avgSpeed: 32 },
  { time: '1 PM', density: 58, vehicleCount: 840, avgSpeed: 35 },
  { time: '2 PM', density: 64, vehicleCount: 920, avgSpeed: 30 },
  { time: '3 PM', density: 70, vehicleCount: 1010, avgSpeed: 26 },
  { time: '4 PM', density: 76, vehicleCount: 1120, avgSpeed: 22 },
  { time: '5 PM', density: 84, vehicleCount: 1210, avgSpeed: 18, isPeak: true },
  { time: '6 PM', density: 88, vehicleCount: 1280, avgSpeed: 16, isPeak: true },
  { time: '7 PM', density: 72, vehicleCount: 1040, avgSpeed: 24 },
];

export const INITIAL_BOUNDING_BOXES: BoundingBox[] = [
  { id: 'b1', type: 'Car', x: 22, y: 38, w: 22, h: 22, confidence: 96.2, speed: 40, plate: 'CA-8892' },
  { id: 'b2', type: 'Truck', x: 52, y: 24, w: 28, h: 36, confidence: 95.8, speed: 28, plate: 'TX-4410' },
  { id: 'b3', type: 'Motorcycle', x: 42, y: 62, w: 14, h: 18, confidence: 93.4, speed: 45, plate: 'MC-109' },
  { id: 'b4', type: 'Bus', x: 18, y: 56, w: 32, h: 28, confidence: 97.1, speed: 32, plate: 'CT-770' },
  { id: 'b5', type: 'Car', x: 68, y: 50, w: 20, h: 20, confidence: 94.8, speed: 38, plate: 'NY-5021' },
];

export const trafficApi = {
  async getTrafficData() {
    return {
      vehiclesDetected: 1248,
      activeSignals: 24,
      congestedRoads: 6,
      emergencyVehicles: 2,
      averageResponseTime: '18 sec',
      currentDensity: 82,
      densityStatus: 'HIGH TRAFFIC',
      predictions: INITIAL_HOURLY_PREDICTIONS,
    };
  },
};
