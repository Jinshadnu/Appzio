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
          purple: '#5221B5',
          blue: '#2365E8',
          violet: '#7435D5',
          cyan: '#16B9E8',
          dark: '#111116',
          'dark-card': '#1B1B24',
          'dark-border': '#282838',
          light: '#F8F9FD',
          'light-subtle': '#F0F3FA',
          'light-card': '#FFFFFF',
          'light-border': '#E4E8F4',
          'text-dark': '#111116',
          'text-primary': '#161622',
          'text-secondary': '#555D66',
          'text-muted': '#8E95A5',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2365E8 0%, #5221B5 50%, #7435D5 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #16B9E8 0%, #2365E8 50%, #5221B5 100%)',
        'brand-radial': 'radial-gradient(circle at 50% 0%, rgba(82, 33, 181, 0.12) 0%, rgba(35, 101, 232, 0.08) 35%, transparent 70%)',
        'glow-accent': 'radial-gradient(circle, rgba(22, 185, 232, 0.12) 0%, transparent 65%)',
        'hero-mesh-light': 'radial-gradient(at 0% 0%, rgba(35, 101, 232, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(82, 33, 181, 0.12) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(22, 185, 232, 0.06) 0px, transparent 60%)',
      },
      boxShadow: {
        'glow-sm': '0 4px 15px -3px rgba(82, 33, 181, 0.3)',
        'glow': '0 8px 30px -5px rgba(82, 33, 181, 0.45)',
        'glow-cyan': '0 8px 25px -4px rgba(22, 185, 232, 0.35)',
        'card': '0 10px 30px -5px rgba(82, 33, 181, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 40px -10px rgba(82, 33, 181, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
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
