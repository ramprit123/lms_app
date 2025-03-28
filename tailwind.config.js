/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FDFA', // Very light teal
          100: '#CCFBF1', // Light teal
          200: '#99F6E4', // Softer teal
          300: '#5EEAD4', // Mid-tone teal
          400: '#2DD4BF', // Base primary teal (main color)
          500: '#14B8A6', // Slightly darker
          600: '#0D9488', // Darker teal
          700: '#0F766E', // Deep teal
          800: '#115E59', // Very deep teal
          900: '#134E4A', // Near-black teal
        },
        secondary: {
          50: '#EFF6FF', // Very light navy
          100: '#DBEAFE', // Light navy
          200: '#BFDBFE', // Softer navy
          300: '#93C5FD', // Mid-tone navy
          400: '#60A5FA', // Slightly bold navy
          500: '#1E3A8A', // Base secondary navy (main color)
          600: '#1E40AF', // Darker navy
          700: '#1E3A8A', // Deep navy
          800: '#1E2A78', // Very deep navy
          900: '#172554', // Near-black navy
        },
        udemy: {
          50: '#FDF2F8', // Very light pink
          100: '#FCE7F3', // Light pink
          200: '#FBCFE8', // Softer pink
          300: '#F9A8D4', // Mid-tone pink
          400: '#F472B6', // Slightly bold pink
          500: '#EC4899', // Base Udemy pink (main color)
          600: '#DB2777', // Darker pink
          700: '#BE185D', // Deep pink
          800: '#9D174D', // Very deep pink
          900: '#831843', // Near-black pink
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Default sans-serif fonts
        udemy: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Udemy-like font stack
      },
    },
  },
  plugins: [],
};
