/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          50: "#fef2f2",
        },
      },
    },
  },
  plugins: [],
};

export default config;
