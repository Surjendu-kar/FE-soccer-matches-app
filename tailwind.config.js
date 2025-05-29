/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "soccer-green": "#00B04F",
        "soccer-dark": "#1a1a1a",
      },
      fontFamily: {
        soccer: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
