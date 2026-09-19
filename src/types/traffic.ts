export type TrafficLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type LightState = 'GREEN' | 'YELLOW' | 'RED';
export type ThemeMode = 'light' | 'dark';

export interface BoundingBox {
  id: string;
  type: 'Car' | 'Motorcycle' | 'Bus' | 'Truck';
  x: number; // percentage
  y: number; // percentage
  w: number;
  h: number;
  confidence: number;
  speed: number;
  plate?: string;
}

export interface DirectionSignal {
  direction: 'North' | 'South' | 'East' | 'West';
  vehicleCount: number;
  density: number;
  signal: LightState;
  remainingTime: number; // in seconds
  waitingQueue: number;
}

export interface Junction {
  id: string;
  name: string;
  codeName?: string; // e.g. "JUNCTION 04" or "East Junction"
  density: number; // 0-100%
  status: TrafficLevel;
  vehicleCount: number;
  avgSpeed: number; // km/h
  coordinates: { x: number; y: number }; // Relative map positioning
  roadNames: string;
  aiPrediction?: string;
  signals: DirectionSignal[];
}

export interface EmergencyStatus {
  active: boolean;
  vehicleId: string;
  vehicleType: string;
  status: 'APPROACHING' | 'PRIORITY CORRIDOR ACTIVE' | 'ACTIVE_PRIORITY' | 'PASSING' | 'CLEARED' | 'STANDBY';
  currentLocation: string;
  destination?: string;
  recommendedRoute: string[];
  nextJunction: string;
  etaSeconds: number;
  targetJunctionId: string;
  corridorSignals: { id: string; name: string; state: LightState }[];
}

export interface EmergencyVehicleRecord {
  id: string;
  date: string;
  time: string;
  type: 'Ambulance' | 'Fire Truck' | 'Police';
  location: string;
  destination: string;
  route: string;
  responseTime: string;
  status: 'Completed' | 'Active' | 'En Route';
}

export interface HourlyEmergencyPoint {
  time: string;
  ambulance: number;
  fireTruck: number;
  police: number;
  total: number;
}

export interface WeeklyEmergencyPoint {
  day: string;
  count: number;
}

export interface ESP32SensorNode {
  id: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  temperature: number; // °C
  vehicleCount: number;
  irSensorStatus: 'ACTIVE' | 'CALIBRATING' | 'INACTIVE';
  batteryPower: string;
  lastUpdated: string;
}

export interface AlertNotification {
  id: string;
  type: 'HIGH_TRAFFIC' | 'EMERGENCY' | 'TRAFFIC_UPDATE' | 'NORMALIZED' | 'HARDWARE' | 'SIGNAL_OPTIMIZED';
  level: 'red' | 'yellow' | 'green' | 'blue';
  title: string;
  location?: string;
  message: string;
  timestamp: string;
  junctionId?: string;
  read: boolean;
}

export interface PredictionPoint {
  time: string;
  density: number;
  vehicleCount: number;
  avgSpeed: number;
  isPeak?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export type UserRole = 'Admin' | 'Traffic Operator' | 'Traffic Analyst' | 'Viewer';

export interface UserAccount {
  fullName: string;
  email: string;
  username: string;
  password?: string;
  phoneNumber: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisterFormInput {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: UserRole;
  agreeTerms: boolean;
}
