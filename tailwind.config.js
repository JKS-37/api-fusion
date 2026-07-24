/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fusion: {
          bg: '#070a12',
          surface: '#0d1322',
          card: '#111827',
          border: '#1f293d',
          cyan: '#00e5ff',
          teal: '#0e7490',
          pink: '#ec4899',
          purple: '#8b5cf6',
          textMuted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 229, 255, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
