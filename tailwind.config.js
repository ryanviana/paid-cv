/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "jornadas-logo": "url('/jornadas-logo.png')",
      },
      colors: {
        "jornadas-blue": "#03fcfc", // Corrected main blue
        "jornadas-blue-dark": "#02dede", // Adjusted darker shade
        "jornadas-blue-light": "#66ffff", // Adjusted lighter shade
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        questrial: ["Questrial", "sans-serif"],
      },
      boxShadow: {
        my: "0 0 55px -15px rgba(0, 0, 0, 0)",
      },
    },
  },
  plugins: [],
};
