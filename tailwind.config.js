/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        "sm": "375px",
        "md": "768px",
        "lg": "1440px",
      },

      colors: {
        "d-background": "#FAFAFA",
        "n-background" : "#171823",
        "line-color": "#E3E4F1",
        "line-color-dark" : "#393A4B",
        "instruction-color": "#9495A5",
        "buttonColor": "#3A7CFD",
        "darkmode" : "#25273D",
        "listcolor" : "#494C6B",
        "listcolordark" : "#C8CBE7",
        "clearcolor" : "#9495A5",
        "clearcolordark" : "#5B5E7E",
        "completedcolor" : "#D1D2DA",
        "completedcolordark" : "#4D5067",
        "inputdark" : "#767992",
        "borderdark" : "#393A4B",
      },

      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },

      screens: {
        "sm": "375px",
        "xl": "1440px",
      },

      boxShadow: {
        "customshadow": "0px 35px 50px -15px rgba(194, 195, 214, 0.5)",
        "customshadowdark": "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}

