import {
  ChalkTheme,
  createMonacoTheme,
  trimHSL,
} from "~/composables/theme-utils";

export const dawn: ChalkTheme = {
  key: "dawn",
  name: "Dawn",
  shadow: trimHSL("hsl(8, 45%, 13%)"),
  background: "linear-gradient(140deg, hsl(33, 60%, 50%), #a13e37, #281a29)",
  monaco: createMonacoTheme({
    foreground: "#b28075",
    comments: "#744d25",
    keywords: "#d66a34",
    delimiters: "#c7bad9",
    strings: "#c7bad9",
    numbers: "#eeebf2",
  }),
};
