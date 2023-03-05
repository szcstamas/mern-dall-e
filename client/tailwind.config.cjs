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
        fadeText: "fadeText 1s ease-in-out infinite"
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
          "0%" : { opacity: 0 },
          "2%" : { opacity: 1, content: 'beautiful' },
          "23%" : { opacity: 1, content: 'beautiful' },
          "25%" : { opacity: 0 },
          "27%" : { opacity: 1, content: 'legendary' },
          "48%" : { opacity: 1, content: 'legendary' },
          "50%" : { opacity: 0 },
          "52%" : { opacity: 1, content: 'creative' },
          "73%" : { opacity: 1, content: 'creative' },
          "75%" : { opacity: 0 },
          "77%" : { opacity: 1, content: 'unique' },
          "98%" : { opacity: 1, content: 'unique' },
          "100%" : { opacity: 0 },
        }
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
}
