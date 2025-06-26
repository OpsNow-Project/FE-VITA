/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        running: {
          DEFAULT: "#A3BE8C", // 배경: bg-running
          text: "#000000", // 텍스트: text-running-text
        },
        pending: {
          DEFAULT: "#EBCB8B",
          text: "#000000",
        },
        crashloop: {
          DEFAULT: "#BF616A",
          text: "#ffffff",
        },
        chatblue: "#5E81AC",
        hoverchat: "#3C567B",
      },
    },
  },
  plugins: [],
};
