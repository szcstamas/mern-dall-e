/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4357FF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeInOut: 'fadeInOut 1s ease-in-out infinite',
        fadeText: 'fadeText 5000ms ease-in-out infinite',
        levitate: 'levitate 4s ease-in-out infinite',
        changeColor: 'changeColor 4s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeText: {
          '0%' : { opacity: "1", transform: "translateY(-100%)" },
          '10%' : { opacity: "1", transform: "translateY(0%)" },
          '90%' : { opacity: "1", transform: "translateY(0%)" },
          '100%' : { opacity: "1", transform: "translateY(100%)" }
        },
        levitate: {
          '0%' : { transform: "translateY(0px)" },
          '50%' : { transform: "translateY(-10px)" },
          '100%' : { transform: "translateY(0px)" }
        },
        changeColor: {
          '0%' : { backgroundColor: "#4357FF" },
          '50%' : { backgroundColor: "#5624d0" },
          '100%' : { backgroundColor : "#4357FF" }
        }
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
}
