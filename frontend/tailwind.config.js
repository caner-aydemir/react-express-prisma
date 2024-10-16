/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ], theme: {
    screens: {
      xs: { max: '897px' },
      md: { min: '898px', max: '1199px' },
      lg: { min: '1200px ' },
      xl: { min: `1900px` }
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

