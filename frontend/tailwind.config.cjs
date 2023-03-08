/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "mobile":{"min":"0px","max":"540px"},
        "large":{"min":"540px","max":"1000px"},
        "wide":{"min":"540px","max":"880px"}
      }
    },
  },
  plugins: [require("daisyui")],
}