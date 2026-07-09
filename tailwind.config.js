/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: '#050816',
        panel: '#0F172A',
        primary: '#7C3AED',
        secondary: '#06B6D4',
        accent: '#F43F5E'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 0 60px rgba(124,58,237,.28)',
        cyan: '0 0 48px rgba(6,182,212,.22)'
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(-8%, -4%, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(7%, 5%, 0) rotate(12deg)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        }
      },
      animation: {
        aurora: 'aurora 14s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite'
      }
    }
  },
  plugins: []
};
