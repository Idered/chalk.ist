/**
 * @typedef {import('tailwindcss/types').Config} BaseConfig
 *
 * @type {BaseConfig}
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        pwa: { raw: "(display-mode: standalone)" },
      },
      keyframes: {
        "shine-r": {
          "0%": { right: "100%", opacity: 0 },
          "50%": { opacity: 1 },
          "90%": { right: "-10%" },
          "100%": { opacity: 0 },
        },
        "shine-b": {
          "0%": { bottom: "100%", opacity: 0 },
          "50%": { opacity: 1 },
          "90%": { bottom: "-10%" },
          "100%": { opacity: 0 },
        },
        "shine-l": {
          "0%": { left: "100%", opacity: 0 },
          "50%": { opacity: 1 },
          "90%": { left: "-10%" },
          "100%": { opacity: 0 },
        },
        "shine-t": {
          "0%": { top: "100%", opacity: 0 },
          "50%": { opacity: 1 },
          "90%": { top: "-10%" },
          "100%": { opacity: 0 },
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        slate: {
          500: "#7c7c83",
          600: "#6a6a71",
          700: "#1e1e25",
          800: "#101014",
          900: "#0b0b0d",
        },

        brand: {
          50: "#ebfef7",
          100: "#cefdea",
          200: "#a1f9da",
          300: "#64f1c8",
          400: "#27e0b1",
          500: "#02e1af",
          600: "#00a27f",
          700: "#008269",
          800: "#006654",
          900: "#005447",
        },
      },
    },
  },
  plugins: [require("tailwindcss-easing")],
};
