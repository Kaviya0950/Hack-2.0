import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Junction,
  EmergencyStatus,
  EmergencyVehicleRecord,
  HourlyEmergencyPoint,
  WeeklyEmergencyPoint,
  ESP32SensorNode,
  AlertNotification,
  PredictionPoint,
  BoundingBox,
  ChatMessage,
  TrafficLevel,
  ThemeMode,
  UserAccount,
  UserRole,
  RegisterFormInput
} from '../types/traffic';
import {
  INITIAL_JUNCTIONS,
  INITIAL_EMERGENCY,
  INITIAL_EMERGENCY_RECORDS,
  INITIAL_HOURLY_EMERGENCY,
  INITIAL_WEEKLY_EMERGENCY,
  INITIAL_MONTHLY_EMERGENCY,
  INITIAL_ESP32_SENSORS,
  INITIAL_ALERTS,
  INITIAL_HOURLY_PREDICTIONS,
  INITIAL_BOUNDING_BOXES
} from '../services/api';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'emergency';
  title: string;
  message: string;
}

interface OverviewStats {
  vehiclesDetected: number;
  activeSignals: number;
  congestedRoads: number;
  emergencyVehicles: number;
  averageResponseTime: string;
}

export interface EmergencyDailyStats {
  todayTotal: number;
  ambulances: number;
  fireTrucks: number;
  police: number;
  avgResponseTime: string;
  avgSignalClearanceTime: string;
  corridorsActivated: number;
  successfulCorridors: number;
  routeSuccessRate: string;
}

interface TrafficContextType {
  // Authentication & User Profile (Requirements 2, 3, 6, 7, 8, 9, 10)
  isAuthenticated: boolean;
  currentUser: UserAccount | null;
  login: (identifier: string, password: string) => { success: boolean; message?: string; user?: UserAccount };
  register: (data: RegisterFormInput) => { success: boolean; message?: string };
  logout: () => void;

  // Theme (Requirement 1 & 15: Dark theme default)
  theme: ThemeMode;
  toggleTheme: () => void;

  // Navigation & View Mode
  activeSection: string;
  setActiveSection: (section: string) => void;
  viewMode: 'all' | 'page';
  setViewMode: (mode: 'all' | 'page') => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;

  // Global Demo Mode (Requirement 16 & 20)
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  toggleDemoMode: () => void;

  // Overview 5 Stats (Requirement 1)
  overviewStats: OverviewStats;

  // Live Traffic Hub (Requirement 2 & 13)
  trafficSummary: {
    totalVehicles: number;
    cars: number;
    bikes: number;
    buses: number;
    trucks: number;
    density: number;
    status: TrafficLevel;
  };

  // Junctions
  junctions: Junction[];
  selectedJunctionId: string;
  setSelectedJunctionId: (id: string) => void;
  selectedJunction: Junction;

  // AI Vehicle Detection (Requirement 3)
  isCameraRunning: boolean;
  startCamera: () => void;
  stopCamera: () => void;
  detectionData: {
    cameraName: string;
    status: 'ONLINE' | 'OFFLINE';
    fps: number;
    vehiclesDetected: number;
    avgConfidence: number;
    cars: number;
    bikes: number;
    buses: number;
    trucks: number;
    boxes: BoundingBox[];
  };

  // Smart Signal Control (Requirement 5)
  signalTimingApplied: boolean;
  applyAiSignalTiming: () => void;

  // Emergency Response & Centralized Analytics (Requirements 4-12, 18)
  emergency: EmergencyStatus;
  isEmergencyActive: boolean;
  simulateEmergency: () => void;
  endEmergencyPriority: () => void;
  emergencyStats: EmergencyDailyStats;
  emergencyHistory: EmergencyVehicleRecord[];
  hourlyEmergency: HourlyEmergencyPoint[];
  weeklyEmergency: WeeklyEmergencyPoint[];
  monthlyEmergency: { week: string; count: number }[];

  // Traffic Prediction (Requirement 7)
  predictionData: {
    hourlyData: PredictionPoint[];
    predictedDensity: number;
    confidence: number;
    peakTimeRange: string;
    alertMessage: string;
  };

  // IoT Sensor Telemetry (Requirement 9)
  esp32Sensors: ESP32SensorNode[];

  // Alerts & Events (Requirement 10)
  alerts: AlertNotification[];
  dismissAlert: (id: string) => void;
  clearAllAlerts: () => void;
  triggerSampleAlert: () => void;

  // AI Traffic Assistant (Requirement 12)
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  toggleAssistant: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (userText: string) => void;

  // Audio & Toast Feedback
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  systemOnline: boolean;
}

const TrafficContext = createContext<TrafficContextType | undefined>(undefined);

// Web Audio API synth
function playSound(type: 'beep' | 'alarm' | 'success', enabled: boolean) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'alarm') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(960, ctx.currentTime + 0.25);
      osc.frequency.linearRampToValueAtTime(640, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      osc.start();
      osc.stop(ctx.currentTime + 0.55);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch {
    // ignore
  }
}

// Default Demo Admin Account
const DEMO_ADMIN: UserAccount = {
  fullName: 'System Administrator',
  email: 'admin@smartcity.gov',
  username: 'admin',
  phoneNumber: '+1 (555) 019-2834',
  role: 'Admin',
  createdAt: '2026-01-01T00:00:00.000Z',
};

// Helper to safely load registered users from localStorage
const getStoredUsers = (): UserAccount[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('smartcity_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const TrafficProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Requirement 1 & 16: Authentication & User Profile state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('smartcity_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('smartcity_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    if (localStorage.getItem('smartcity_auth') === 'true') {
      return DEMO_ADMIN;
    }
    return null;
  });

  // Requirement 1 & 15: Theme state (DEFAULT TO DARK MODE)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('smartcity_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('smartcity_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const [activeSection, setActiveSection] = useState('landing');
  const [viewMode, setViewMode] = useState<'all' | 'page'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [systemOnline] = useState(true);

  // Global Demo Mode
  const [demoMode, setDemoMode] = useState(true);

  // Overview 5 Stats (Requirement 1)
  const [overviewStats, setOverviewStats] = useState<OverviewStats>({
    vehiclesDetected: 1248,
    activeSignals: 24,
    congestedRoads: 6,
    emergencyVehicles: 2,
    averageResponseTime: '18 sec',
  });

  // Live Traffic Summary (Requirement 2)
  const [trafficSummary, setTrafficSummary] = useState({
    totalVehicles: 1248,
    cars: 742,
    bikes: 284,
    buses: 98,
    trucks: 124,
    density: 82,
    status: 'HIGH' as TrafficLevel,
  });

  // Junctions
  const [junctions, setJunctions] = useState<Junction[]>(INITIAL_JUNCTIONS);
  const [selectedJunctionId, setSelectedJunctionId] = useState<string>('j4');

  // AI Vehicle Detection Camera Panel
  const [isCameraRunning, setIsCameraRunning] = useState(true);
  const [detectionData, setDetectionData] = useState({
    cameraName: 'CAM-04',
    status: 'ONLINE' as 'ONLINE' | 'OFFLINE',
    fps: 30,
    vehiclesDetected: 146,
    avgConfidence: 94,
    cars: 82,
    bikes: 34,
    buses: 12,
    trucks: 18,
    boxes: INITIAL_BOUNDING_BOXES,
  });

  // Smart Signal Control
  const [signalTimingApplied, setSignalTimingApplied] = useState(false);

  // Emergency Response (Requirement 6)
  const [emergency, setEmergency] = useState<EmergencyStatus>(INITIAL_EMERGENCY);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  // Requirement 4, 8, 12, 18: Centralized Emergency Daily Statistics & Records
  const [emergencyStats, setEmergencyStats] = useState<EmergencyDailyStats>({
    todayTotal: 42,
    ambulances: 24,
    fireTrucks: 11,
    police: 7,
    avgResponseTime: '4 min 18 sec',
    avgSignalClearanceTime: '18 sec',
    corridorsActivated: 16,
    successfulCorridors: 15,
    routeSuccessRate: '94%',
  });

  const [emergencyHistory, setEmergencyHistory] = useState<EmergencyVehicleRecord[]>(INITIAL_EMERGENCY_RECORDS);
  const [hourlyEmergency, setHourlyEmergency] = useState<HourlyEmergencyPoint[]>(INITIAL_HOURLY_EMERGENCY);
  const [weeklyEmergency] = useState<WeeklyEmergencyPoint[]>(INITIAL_WEEKLY_EMERGENCY);
  const [monthlyEmergency] = useState(INITIAL_MONTHLY_EMERGENCY);

  // Traffic Prediction
  const [predictionData] = useState({
    hourlyData: INITIAL_HOURLY_PREDICTIONS,
    predictedDensity: 86,
    confidence: 91,
    peakTimeRange: '5:30 PM – 7:30 PM',
    alertMessage: 'High congestion expected between 5:30 PM – 7:30 PM.',
  });

  // IoT Sensors (ESP32-01 to ESP32-04)
  const [esp32Sensors, setEsp32Sensors] = useState<ESP32SensorNode[]>(INITIAL_ESP32_SENSORS);

  // Alerts & Events
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);

  // Chatbot Assistant
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Hello! I am your AI Traffic Assistant. Ask me about congestion hotspots, signal optimizations, or active emergency vehicles.',
      timestamp: 'Just now',
    },
  ]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Requirement 2, 7, 8: Login with Username or Email for Admin and Registered Users
  const login = useCallback(
    (identifier: string, password: string) => {
      const cleanId = identifier.trim().toLowerCase();
      const cleanPass = password.trim();

      // 1. Check Demo Admin Account
      if ((cleanId === 'admin' || cleanId === 'admin@smartcity.gov') && cleanPass === 'admin123') {
        setIsAuthenticated(true);
        setCurrentUser(DEMO_ADMIN);
        localStorage.setItem('smartcity_auth', 'true');
        localStorage.setItem('smartcity_user', JSON.stringify(DEMO_ADMIN));
        playSound('success', true);
        addToast({
          type: 'success',
          title: 'Authentication Successful',
          message: `Welcome back, ${DEMO_ADMIN.fullName}!`,
        });
        return { success: true, user: DEMO_ADMIN };
      }

      // 2. Check Registered Accounts from localStorage
      const registeredUsers = getStoredUsers();
      const matchedUser = registeredUsers.find(
        (u) => (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) && u.password === cleanPass
      );

      if (matchedUser) {
        const safeUser: UserAccount = {
          fullName: matchedUser.fullName,
          email: matchedUser.email,
          username: matchedUser.username,
          phoneNumber: matchedUser.phoneNumber,
          role: matchedUser.role,
          createdAt: matchedUser.createdAt,
        };
        setIsAuthenticated(true);
        setCurrentUser(safeUser);
        localStorage.setItem('smartcity_auth', 'true');
        localStorage.setItem('smartcity_user', JSON.stringify(safeUser));
        playSound('success', true);
        addToast({
          type: 'success',
          title: 'Authentication Successful',
          message: `Welcome back, ${safeUser.fullName}!`,
        });
        return { success: true, user: safeUser };
      }

      return { success: false, message: 'Invalid username/email or password.' };
    },
    [addToast]
  );

  // Requirement 3, 4, 5, 6: Sign Up / Account Creation with Frontend Validation
  const register = useCallback(
    (data: RegisterFormInput) => {
      // Validate Full Name
      if (!data.fullName || data.fullName.trim().length < 3) {
        return { success: false, message: 'Full Name must be at least 3 characters.' };
      }
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRegex.test(data.email.trim())) {
        return { success: false, message: 'Please enter a valid email address.' };
      }
      // Validate Username
      if (!data.username || data.username.trim().length < 4) {
        return { success: false, message: 'Username must be at least 4 characters.' };
      }
      // Validate Password: min 8 chars, uppercase, lowercase, number, special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
      if (!data.password || !passwordRegex.test(data.password)) {
        return {
          success: false,
          message:
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
        };
      }
      // Validate Confirm Password
      if (data.password !== data.confirmPassword) {
        return { success: false, message: 'Passwords do not match.' };
      }
      // Validate Phone Number
      const phoneDigits = data.phoneNumber.replace(/\D/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        return { success: false, message: 'Please enter a valid contact phone number.' };
      }
      // Validate Role
      if (!data.role) {
        return { success: false, message: 'Please select an assigned role.' };
      }
      // Validate Terms
      if (!data.agreeTerms) {
        return { success: false, message: 'You must agree to the Terms & Conditions.' };
      }

      const existingUsers = getStoredUsers();
      const normalizedUsername = data.username.trim().toLowerCase();
      const normalizedEmail = data.email.trim().toLowerCase();

      if (normalizedUsername === 'admin' || normalizedEmail === 'admin@smartcity.gov') {
        return { success: false, message: 'This username or email is reserved for system administration.' };
      }

      const conflict = existingUsers.some(
        (u) => u.username.toLowerCase() === normalizedUsername || u.email.toLowerCase() === normalizedEmail
      );
      if (conflict) {
        return { success: false, message: 'An account with this username or email already exists.' };
      }

      const newUser: UserAccount = {
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        username: data.username.trim(),
        password: data.password,
        phoneNumber: data.phoneNumber.trim(),
        role: data.role,
        createdAt: new Date().toISOString(),
      };

      const updated = [...existingUsers, newUser];
      localStorage.setItem('smartcity_users', JSON.stringify(updated));
      playSound('success', true);
      addToast({
        type: 'success',
        title: 'Account Created Successfully!',
        message: `Account created for ${newUser.fullName}. You can now sign in.`,
      });
      return { success: true };
    },
    [addToast]
  );

  // Requirement 10: Logout & Session Invalidation
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('smartcity_auth');
    localStorage.removeItem('smartcity_user');
    playSound('beep', true);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out of the Smart City Control Center.',
    });
  }, [addToast]);

  const selectedJunction = useMemo(() => {
    return junctions.find((j) => j.id === selectedJunctionId) || junctions[0];
  }, [junctions, selectedJunctionId]);

  const toggleDemoMode = useCallback(() => {
    setDemoMode((prev) => {
      const next = !prev;
      addToast({
        type: next ? 'success' : 'info',
        title: next ? 'Demo Mode Enabled' : 'Demo Mode Paused',
        message: next
          ? 'Autonomous simulation of traffic, signals, and sensor streams active.'
          : 'Simulation paused on static snapshot values.',
      });
      return next;
    });
  }, [addToast]);

  const toggleAssistant = useCallback(() => {
    setIsAssistantOpen((prev) => !prev);
  }, []);

  // Camera Start/Stop
  const startCamera = useCallback(() => {
    setIsCameraRunning(true);
    setDetectionData((prev) => ({ ...prev, status: 'ONLINE', fps: 30 }));
    playSound('beep', soundEnabled);
    addToast({
      type: 'success',
      title: 'Camera Feed Started',
      message: 'CAM-04 live stream initialized at 30 FPS with AI inference overlay.',
    });
  }, [soundEnabled, addToast]);

  const stopCamera = useCallback(() => {
    setIsCameraRunning(false);
    setDetectionData((prev) => ({ ...prev, status: 'OFFLINE', fps: 0 }));
    playSound('beep', soundEnabled);
    addToast({
      type: 'info',
      title: 'Camera Feed Stopped',
      message: 'CAM-04 stream paused. Inference engine set to standby.',
    });
  }, [soundEnabled, addToast]);

  // Apply AI Signal Timing
  const applyAiSignalTiming = useCallback(() => {
    setSignalTimingApplied(true);
    playSound('success', soundEnabled);

    setJunctions((prevJunctions) =>
      prevJunctions.map((j) => {
        if (j.id === 'j4' || j.id === selectedJunctionId) {
          const updatedSignals = j.signals.map((sig) => {
            if (sig.direction === 'East') {
              return { ...sig, signal: 'GREEN' as const, remainingTime: 55 };
            }
            return { ...sig, signal: 'RED' as const, remainingTime: 25 };
          });
          return { ...j, signals: updatedSignals };
        }
        return j;
      })
    );

    addToast({
      type: 'success',
      title: 'AI Signal Timing Applied',
      message: 'AI signal timing applied successfully. Green phase extended to 55 sec for East corridor.',
    });
  }, [selectedJunctionId, soundEnabled, addToast]);

  // Requirement 11 & 12: Simulate Emergency with Centralized State Synchronization!
  const simulateEmergency = useCallback(() => {
    setIsEmergencyActive(true);
    playSound('alarm', soundEnabled);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newVehicleId = `A${100 + Math.floor(Math.random() * 899)}`;

    setEmergency((prev) => ({
      ...prev,
      active: true,
      vehicleId: `AMBULANCE #${newVehicleId}`,
      status: 'PRIORITY CORRIDOR ACTIVE',
      etaSeconds: 138, // 2 min 18 sec
    }));

    // Override Signal 04, 05, 06 to GREEN
    setJunctions((prev) =>
      prev.map((junc) => {
        if (junc.id === 'j4' || junc.id === 'j5' || junc.id === 'j6') {
          return {
            ...junc,
            signals: junc.signals.map((s, idx) => ({
              ...s,
              signal: idx === 0 || s.direction === 'East' || s.direction === 'North' ? 'GREEN' : 'RED',
              remainingTime: 138,
            })),
          };
        }
        return junc;
      })
    );

    // REQUIREMENT 11 & 12: Centralized Counter Increment! (42 -> 43, Ambulance +1, Corridors +1)
    setEmergencyStats((prev) => ({
      ...prev,
      todayTotal: prev.todayTotal + 1,
      ambulances: prev.ambulances + 1,
      corridorsActivated: prev.corridorsActivated + 1,
    }));

    // REQUIREMENT 11 & 12: Add event to Emergency Vehicle History table
    const newRecord: EmergencyVehicleRecord = {
      id: newVehicleId,
      date: '19 Sep 2026',
      time: timeStr,
      type: 'Ambulance',
      location: 'Junction 04',
      destination: 'City Hospital',
      route: 'Hospital → Junction 04 → Main Road',
      responseTime: '2m 18s',
      status: 'Active',
    };
    setEmergencyHistory((prev) => [newRecord, ...prev]);

    // Update hourly chart
    setHourlyEmergency((prev) =>
      prev.map((pt, idx) => {
        if (idx === prev.length - 1 || pt.time === '5 PM' || pt.time === '6 PM') {
          return {
            ...pt,
            ambulance: pt.ambulance + 1,
            total: pt.total + 1,
          };
        }
        return pt;
      })
    );

    // Update Overview Stats emergency vehicles count
    setOverviewStats((prev) => ({
      ...prev,
      emergencyVehicles: prev.emergencyVehicles + 1,
    }));

    // Add alert
    const emgAlert: AlertNotification = {
      id: `alt-emg-${Date.now()}`,
      type: 'EMERGENCY',
      level: 'red',
      title: 'EMERGENCY VEHICLE DETECTED',
      location: 'Junction 04',
      message: `Ambulance ${newVehicleId} detected near Junction 04. Priority corridor activated. 3 traffic signals optimized. ETA: 2 min 18 sec.`,
      timestamp: 'Just now',
      junctionId: 'j4',
      read: false,
    };
    setAlerts((prev) => [emgAlert, ...prev]);

    addToast({
      type: 'emergency',
      title: 'EMERGENCY VEHICLE DETECTED',
      message: `Ambulance ${newVehicleId} detected near Junction 04. Priority corridor activated. 3 traffic signals optimized. ETA: 2 min 18 sec.`,
    });
  }, [soundEnabled, addToast]);

  const endEmergencyPriority = useCallback(() => {
    setIsEmergencyActive(false);
    setEmergency((prev) => ({
      ...prev,
      active: false,
      status: 'STANDBY',
      etaSeconds: 138,
    }));

    // Mark current active record in history as Completed
    setEmergencyHistory((prev) =>
      prev.map((rec) => (rec.status === 'Active' ? { ...rec, status: 'Completed' } : rec))
    );

    // Restore signals
    setJunctions((prev) =>
      prev.map((junc) => ({
        ...junc,
        signals: junc.signals.map((s) => ({
          ...s,
          remainingTime: Math.floor(15 + Math.random() * 20),
        })),
      }))
    );

    addToast({
      type: 'info',
      title: 'Emergency Priority Ended',
      message: 'Signals returned to automated smart city schedule.',
    });
  }, [addToast]);

  // Chatbot response logic
  const sendChatMessage = useCallback(
    (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed) return;

      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: trimmed,
        timestamp: 'Just now',
      };

      setChatMessages((prev) => [...prev, userMsg]);
      playSound('beep', soundEnabled);

      setTimeout(() => {
        let aiReply = '';
        const lower = trimmed.toLowerCase();

        if (lower.includes('highest traffic') || lower.includes('most congested') || lower.includes('which road')) {
          aiReply = `East Junction currently has the highest traffic density at ${trafficSummary.density}%. AI recommends increasing the green signal duration by 25 seconds.`;
        } else if (lower.includes('current traffic density') || lower.includes('density')) {
          aiReply = `Citywide average traffic density is currently 68%, while East Junction is peaking at ${trafficSummary.density}% (${trafficSummary.status} congestion level).`;
        } else if (lower.includes('emergency') || lower.includes('ambulance')) {
          if (isEmergencyActive) {
            aiReply = `Yes! Priority corridor is ACTIVE for ${emergency.vehicleId} at ${emergency.currentLocation}. ETA: ${Math.floor(emergency.etaSeconds / 60)}m ${emergency.etaSeconds % 60}s. Signals 04, 05, 06 are held at GREEN.`;
          } else {
            aiReply = `Currently ${emergencyStats.todayTotal} emergency vehicles crossed the network today (${emergencyStats.ambulances} Ambulances, ${emergencyStats.fireTrucks} Fire Trucks, ${emergencyStats.police} Police). Fleet is on standby.`;
          }
        } else if (lower.includes('optimization') || lower.includes('signal')) {
          aiReply = `Junction A (East Corridor) is currently recommended for optimization. AI suggests extending the green cycle from 30s to 55s to clear the 67 approaching vehicles.`;
        } else {
          aiReply = `I am monitoring 24 active signals, ${trafficSummary.totalVehicles.toLocaleString()} vehicles, and 4 ESP32 telemetry nodes. All systems are operating normally under automated AI coordination.`;
        }

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: aiReply,
          timestamp: 'Just now',
        };
        setChatMessages((prev) => [...prev, aiMsg]);
        playSound('beep', soundEnabled);
      }, 500);
    },
    [trafficSummary, isEmergencyActive, emergency, emergencyStats, soundEnabled]
  );

  // Demo Mode live simulation loop
  useEffect(() => {
    if (!demoMode) return;

    const timer = setInterval(() => {
      // 1. Overview 5 stats slight jitter
      setOverviewStats((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const newVehicles = Math.max(1230, Math.min(1270, prev.vehiclesDetected + delta));
        return {
          ...prev,
          vehiclesDetected: newVehicles,
        };
      });

      // 2. Traffic summary jitter
      setTrafficSummary((prev) => {
        const drift = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return {
          ...prev,
          totalVehicles: Math.max(1230, Math.min(1270, prev.totalVehicles + drift)),
          cars: Math.max(730, Math.min(760, prev.cars + drift)),
        };
      });

      // 3. Decrement signal countdown timers
      setJunctions((prevJunctions) =>
        prevJunctions.map((junc) => {
          const updatedSignals = junc.signals.map((sig) => {
            let nextTime = sig.remainingTime - 1;
            let nextSignal = sig.signal;

            if (nextTime <= 0) {
              if (sig.signal === 'GREEN') {
                nextSignal = 'YELLOW';
                nextTime = 4;
              } else if (sig.signal === 'YELLOW') {
                nextSignal = 'RED';
                nextTime = 25;
              } else {
                nextSignal = 'GREEN';
                nextTime = 30;
              }
            }
            return {
              ...sig,
              remainingTime: nextTime,
              signal: nextSignal,
            };
          });
          return { ...junc, signals: updatedSignals };
        })
      );

      // 4. Camera bounding boxes slight drift if camera is running
      if (isCameraRunning) {
        setDetectionData((prev) => {
          const updatedBoxes = prev.boxes.map((box) => {
            let nextX = box.x + (box.speed > 35 ? 0.35 : 0.2);
            let nextY = box.y + Math.sin(box.x / 10) * 0.15;
            if (nextX > 85) nextX = 10;
            if (nextY > 80) nextY = 25;

            return {
              ...box,
              x: Math.round(nextX * 10) / 10,
              y: Math.round(nextY * 10) / 10,
            };
          });
          return {
            ...prev,
            boxes: updatedBoxes,
          };
        });
      }

      // 5. ESP32 temperature and count fluctuations
      setEsp32Sensors((prevSensors) =>
        prevSensors.map((sensor) => {
          if (sensor.status === 'OFFLINE') return sensor;
          const drift = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          return {
            ...sensor,
            vehicleCount: Math.max(20, sensor.vehicleCount + drift),
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [demoMode, isCameraRunning]);

  // Emergency countdown loop
  useEffect(() => {
    if (!isEmergencyActive) return;

    const timer = setInterval(() => {
      setEmergency((prev) => {
        if (prev.etaSeconds <= 1) {
          setIsEmergencyActive(false);
          playSound('success', soundEnabled);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#06b6d4', '#3b82f6'],
          });
          addToast({
            type: 'success',
            title: 'Emergency Vehicle Cleared',
            message: `${prev.vehicleId} safely passed Junction 04. Signals restored to normal schedule.`,
          });
          setEmergencyHistory((h) =>
            h.map((rec) => (rec.status === 'Active' ? { ...rec, status: 'Completed' } : rec))
          );
          return {
            ...prev,
            active: false,
            status: 'STANDBY',
            etaSeconds: 138,
          };
        }

        return {
          ...prev,
          etaSeconds: prev.etaSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEmergencyActive, soundEnabled, addToast]);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
    addToast({
      type: 'info',
      title: 'Alerts Cleared',
      message: 'All notifications have been dismissed.',
    });
  }, [addToast]);

  const triggerSampleAlert = useCallback(() => {
    const sample: AlertNotification = {
      id: `alt-dyn-${Date.now()}`,
      type: 'HIGH_TRAFFIC',
      level: 'yellow',
      title: 'TRAFFIC SURGE DETECTED',
      location: 'West Tech Highway',
      message: 'Approaching density increased to 74% due to peak transit flow.',
      timestamp: 'Just now',
      junctionId: 'j3',
      read: false,
    };
    setAlerts((prev) => [sample, ...prev]);
    addToast({
      type: 'warning',
      title: sample.title,
      message: sample.message,
    });
  }, [addToast]);

  return (
    <TrafficContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        register,
        logout,
        theme,
        toggleTheme,
        activeSection,
        setActiveSection,
        viewMode,
        setViewMode,
        isSidebarOpen,
        setIsSidebarOpen,
        demoMode,
        setDemoMode,
        toggleDemoMode,
        overviewStats,
        trafficSummary,
        junctions,
        selectedJunctionId,
        setSelectedJunctionId,
        selectedJunction,
        isCameraRunning,
        startCamera,
        stopCamera,
        detectionData,
        signalTimingApplied,
        applyAiSignalTiming,
        emergency,
        isEmergencyActive,
        simulateEmergency,
        endEmergencyPriority,
        emergencyStats,
        emergencyHistory,
        hourlyEmergency,
        weeklyEmergency,
        monthlyEmergency,
        predictionData,
        esp32Sensors,
        alerts,
        dismissAlert,
        clearAllAlerts,
        triggerSampleAlert,
        isAssistantOpen,
        setIsAssistantOpen,
        toggleAssistant,
        chatMessages,
        sendChatMessage,
        toasts,
        addToast,
        removeToast,
        soundEnabled,
        setSoundEnabled,
        systemOnline,
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};
