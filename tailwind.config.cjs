/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "head-heavy": ["Gilroy-Heavy", "sans-serif"],
        "head-bold": ["Gilroy-Bold", "sans-serif"],
        "head-light": ["Gilroy-Light", "sans-serif"],
        head: ["Gilroy-Regular", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
