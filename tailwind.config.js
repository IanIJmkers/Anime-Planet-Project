/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js,css}",
    "./src/**/*.{html,js,css}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  // darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")],
  plugins: [require("daisyui")],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  plugins: [require('flowbite/plugin')],
  plugins: [require("tw-elements/dist/plugin.cjs")],
}