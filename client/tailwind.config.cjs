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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeInOut: 'fadeInOut 1s ease-in-out infinite',
        fadeText: "fadeText 5000ms ease-in-out infinite"
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
          '100%' : { opacity: "1", transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
}
