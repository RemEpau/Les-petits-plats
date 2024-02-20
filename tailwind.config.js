/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./scripts/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "yellow": "#FFD15B",
        "black": "#1B1B1B",
        "grey": "#7A7A7A",
        "light-grey": "#C6C6C6",
      },
    },
    fontFamily: {
      "anton": ["Anton", "sans-serif"],
    },
  },
  plugins: [],
}

