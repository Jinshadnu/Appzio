/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#16BDEB',
          blue: '#2364D8',
          'deep-blue': '#252B9B',
          purple: '#6326C5',
          'deep-purple': '#42158D',
          dark: '#17191F',
          'dark-surface': '#1F222B',
          'dark-card': '#242733',
          'dark-border': '#2E3242',
          light: '#F8F9FD',
          'light-subtle': '#F0F3FA',
          'light-card': '#FFFFFF',
          'light-border': '#E2E6F2',
          'text-dark': '#111116',
          'text-primary': '#17191F',
          'text-secondary': '#5A6275',
          'text-muted': '#8E95A8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'Space Grotesk', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
        'brand-gradient-hover': 'linear-gradient(120deg, #16BDEB 0%, #2364D8 40%, #42158D 100%)',
        'brand-gradient-subtle': 'linear-gradient(120deg, rgba(22, 189, 235, 0.08) 0%, rgba(35, 100, 216, 0.08) 50%, rgba(99, 38, 197, 0.08) 100%)',
        'dark-mesh': 'radial-gradient(at 0% 0%, rgba(22, 189, 235, 0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(99, 38, 197, 0.15) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(37, 43, 155, 0.1) 0px, transparent 50%)',
        'light-mesh': 'radial-gradient(at 0% 0%, rgba(22, 189, 235, 0.06) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(99, 38, 197, 0.06) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(35, 100, 216, 0.04) 0px, transparent 50%)',
      },
      boxShadow: {
        'brand-sm': '0 4px 20px -2px rgba(35, 100, 216, 0.25)',
        'brand': '0 8px 32px -4px rgba(99, 38, 197, 0.35)',
        'cyan': '0 8px 30px -4px rgba(22, 189, 235, 0.35)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 20px 40px -10px rgba(99, 38, 197, 0.2), 0 0 0 1px rgba(22, 189, 235, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
