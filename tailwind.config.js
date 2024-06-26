import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        aliceblue: "#F0F8FF",
      },
      keyframes: {
        "slide-in-top": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-in-top": "slide-in-top .5s forwards ease-in-out",
        "slide-in-right": "slide-in-right .5s forwards ease-in-out",
        "slide-in-bottom": "slide-in-bottom .5s forwards ease-in-out",
        "slide-in-left": "slide-in-left .5s forwards ease-in-out",
      },
    },
  },
  plugins: [],
};
