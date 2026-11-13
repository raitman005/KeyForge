/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFDF',
        sand: '#EEE5D3',
        ink: '#34291F',
        muted: '#766958',
        accent: {
          DEFAULT: '#BD7045',
          dark: '#9C5A34',
          light: '#D9936A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(52, 41, 31, 0.25)',
        lift: '0 22px 45px -18px rgba(52, 41, 31, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bump: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-1.5deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        bump: 'bump 0.35s ease-out',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 28s linear infinite',
      },
    },
  },
  plugins: [],
};
