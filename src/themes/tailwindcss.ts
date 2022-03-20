import {
  ChalkTheme,
  createMonacoTheme,
  trimHSL,
} from "~/composables/theme-utils";
import { hslToHex } from "~/composables/color";

const hue = 198;
const hueAlt = 329;

export const tailwindcss: ChalkTheme = {
  key: "tailwindcss",
  name: "Tailwind CSS",
  shadow: trimHSL(`hsl(${hue}, 93%, 6%)`),
  background: `linear-gradient(140deg, hsl(${hue}, 93%, 49%), hsl(${hue}, 93%, 30%), hsl(${hue}, 93%, 24%), hsl(${hue}, 93%, 34%))`,
  monaco: createMonacoTheme({
    foreground: hslToHex(`hsl(${hueAlt}, 86%, 70%)`),
    comments: hslToHex(`hsl(${hue}, 85%, 27%)`),
    keywords: hslToHex(`hsl(${hue}, 27%, 84%)`),
    delimiters: hslToHex(`hsl(${hue}, 16%, 47%)`),
    strings: hslToHex(`hsl(${hue}, 86%, 70%)`),
    numbers: hslToHex(`hsl(${hue}, 65%, 51%)`),
  }),
};
