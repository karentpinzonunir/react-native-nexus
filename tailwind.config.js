/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],  // ← esto faltaba
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#1e293b",
        muted: "#64748b",
        bgLight: "#f8fafc",
        card: "#ffffff",
      },
      fontFamily: {
        inter: ["Inter-Regular"],
        interBold: ["Inter-Bold"],
        headingBold: ["Merriweather-Bold"],
      },
      borderRadius: {
        nexus: 16,
      },
    },
  },
  plugins: [],
};