/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#0f172a',
        bgLight: '#f8fafc',
        card: '#ffffff',
        muted: '#64748b',
        darkBg: '#020617',
        darkSecondary: '#f8fafc',
        darkCard: '#0f172a',
        darkMuted: '#94a3b8',
        darkBorder: '#1e293b',
      },
      borderRadius: {
        nexus: '12px',
      },
      boxShadow: {
        nexus: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        inter: ['Inter-Regular'],
        interBold: ['Inter-Bold'],
        heading: ['Merriweather-Regular'],
        headingBold: ['Merriweather-Bold'],
      },
    },
  },
  plugins: [],
};