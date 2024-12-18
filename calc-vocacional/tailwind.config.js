/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
            'jornadas-logo': "url('/jornadas-logo.png')",
        },
        from: {
            'jornadas-logo': "url('/jornadas-logo.png')",
        },
        colors: {
            'jornadas-blue' : '#06fdfd',        
            'jornadas-blue-dark' : '#04caca',        
        },
        fontFamily: {
            'montserrat': ['Montserrat', 'sans-serif'], 
            'questrial': ['Questrial', 'sans-serif'], 
        },
    },
  },
  plugins: [],
}
