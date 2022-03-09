/**
 * @typedef {import('tailwindcss/stubs/defaultConfig.stub')} BaseConfig
 * @typedef {{theme: {extend: BaseConfig['theme']}}} ExtendedTheme
 * @typedef {{variants: {extend: BaseConfig['variants']}}} ExtendedVariants
 *
 * @type {BaseConfig & ExtendedTheme & ExtendedVariants}
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#6b9fff",
          100: "#5c9dff",
          200: "#4281ff",
          300: "#2166fd",
          400: "#073ded",
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
  plugins: [],
};
