/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        smartcity: {
          bg: '#0B1120',
          bgSecondary: '#111827',
          card: '#151E2E',
          sidebar: '#0F172A',
          primary: '#22D3EE',
          secondary: '#34D399',
          blue: '#3B82F6',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          text: '#F8FAFC',
          textMuted: '#94A3B8',
          border: '#263449',
        },
        theme: {
          bg: '#F5F7FA',
          card: '#FFFFFF',
          primary: '#0EA5A4',
          secondary: '#2563EB',
          text: '#172033',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
        dark: {
          950: '#070b14',
          900: '#0b1120',
          850: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        cyber: {
          blue: '#00f0ff',
          cyan: '#06b6d4',
          emerald: '#10b981',
          lime: '#84cc16',
          amber: '#f59e0b',
          rose: '#f43f5e',
          red: '#ef4444',
          purple: '#8b5cf6',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'scan': 'scanLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanLine: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
