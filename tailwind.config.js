/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./scripts/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FFD15B",
        "secondary": "#1B1B1B",
        "tertiary": "#7A7A7A"
      },
    },
    fontFamily: {
      "anton": ["Anton", "sans-serif"],
    },
  },
  plugins: [],
}

