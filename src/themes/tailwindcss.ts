import { ChalkTheme, createMonacoTheme, hslToHex, trimHSL } from "~/composables/theme-utils";

export const tailwindcss: ChalkTheme = {
  key: "tailwindcss",
  name: "Tailwind CSS",
  shadow: trimHSL(`hsl(198, 93%, 6%)`),
  background: `linear-gradient(140deg, hsl(198, 93%, 49%), hsl(198, 93%, 30%), hsl(198, 93%, 24%), hsl(198, 93%, 34%))`,
  monaco: createMonacoTheme({
    foreground: hslToHex(`hsl(198, 86%, 70%)`),
    comments: hslToHex(`hsl(198, 73%, 35%)`),
    keywords: hslToHex(`hsl(327, 67%, 64%)`),
    delimiters: hslToHex(`hsl(198, 16%, 47%)`),
    strings: hslToHex(`hsl(160, 86%, 70%)`),
    numbers: hslToHex(`hsl(160, 65%, 51%)`),
  }),
};
