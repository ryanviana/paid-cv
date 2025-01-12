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
            'jornadas-blue' : '#25e2cc',        
            'jornadas-blue-dark' : '#04caca',   
            'jornadas-blue-light' : '#79dcd7',      
        },
        fontFamily: {
            'montserrat': ['Montserrat', 'sans-serif'], 
            'questrial': ['Questrial', 'sans-serif'], 
        },
        boxShadow: {
          'my': '0 0 55px -15px rgba(0, 0, 0, 0)',
        }
    },
  },
  plugins: [],
}
