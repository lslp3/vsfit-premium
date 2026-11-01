/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")], // <--- ESTA LINHA É OBRIGATÓRIA NO NW v4
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#18181b',
        primary: '#dc2626',
        accent: '#f97316',
        success: '#10b981',
      },
    },
  },
  plugins: [],
}