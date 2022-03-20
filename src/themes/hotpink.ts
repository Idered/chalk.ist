import {
  ChalkTheme,
  createMonacoTheme,
  trimHSL,
} from "~/composables/theme-utils";
import { hslToHex } from "~/composables/color";

const hue = 326;

export const hotpink: ChalkTheme = {
  key: "hotpink",
  name: "Hot Pink",
  shadow: trimHSL(`hsl(${hue}, 93%, 6%)`),
  background: `linear-gradient(140deg, hsl(${hue}, 93%, 49%), hsl(${hue}, 93%, 30%), hsl(${hue}, 93%, 24%), hsl(${hue}, 93%, 34%))`,
  monaco: {
    ...createMonacoTheme({
      foreground: hslToHex(`hsl(323, 92%, 40%)`),
      comments: hslToHex(`hsl(323, 64%, 30%)`),
      keywords: hslToHex(`hsl(300, 79%, 59%)`),
      delimiters: hslToHex(`hsl(327, 36%, 26%)`),
      strings: hslToHex(`hsl(326, 100%, 79%)`),
      numbers: hslToHex(`hsl(323, 84%, 67%)`),
    }),
  },
};
