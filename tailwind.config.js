/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        running: { DEFAULT: "#92E6A7", text: "#222222" },
        pending: { DEFAULT: "#FFD885", text: "#222222" },
        crashloop: { DEFAULT: "#FFAC6B", text: "#222222" },
        succeeded: { DEFAULT: "#B1B7FC", text: "#222222" },
        failed: { DEFAULT: "#FF7E7E", text: "#222222" },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
