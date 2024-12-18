/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
        'jornadas-blue' : '#06fdfd',        
    },
    fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'], 
        'questrial': ['Questrial', 'sans-serif'], 
    },
  },
  plugins: [],
}
