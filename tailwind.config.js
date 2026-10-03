/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070b16",
        surface: {
          DEFAULT: "#0d1527",
          card: "#101b33",
          border: "#1c2c4f",
          highlight: "#1e345e",
          glow: "rgba(56, 189, 248, 0.12)"
        },
        risk: {
          low: "#10b981",
          moderate: "#f59e0b",
          high: "#f97316",
          critical: "#ef4444",
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.35)',
        'glow-red': '0 0 25px -2px rgba(239, 68, 68, 0.45)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'tactical': '0 10px 30px -5px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar-sweep': 'radar 3.5s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'beacon': 'beacon 1.6s ease-in-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        beacon: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.18)' },
        }
      }
    },
  },
  plugins: [],
}
