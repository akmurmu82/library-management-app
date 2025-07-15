/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable dark mode via class
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',       // blue-600
          dark: '#1e40af',          // blue-800
          light: '#3b82f6',         // blue-500
        },
        secondary: {
          DEFAULT: '#10b981',       // emerald-500
          dark: '#059669',          // emerald-600
          light: '#34d399',         // emerald-400
        },
        textPrimary: '#111827',     // gray-900
        textSecondary: '#6b7280',   // gray-500
        backgroundLight: '#ffffff',
        backgroundDark: '#1f2937',  // gray-800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // or your preferred font
      },
    },
  },
  plugins: [],
};
