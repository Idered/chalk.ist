import {
  ChalkTheme,
  createMonacoTheme,
  trimHSL,
} from "../composables/theme-utils";

export const vue: ChalkTheme = {
  key: "vue",
  name: "Vue",
  shadow: trimHSL("hsl(153, 50%, 6%)"),
  background:
    "linear-gradient(140deg, hsl(153, 47%, 49%), hsl(153, 47%, 30%), hsl(153, 47%, 24%), hsl(153, 47%, 34%))",
  monaco: createMonacoTheme({
    foreground: "#42b883",
    comments: "#376f55",
    keywords: "#647eff",
    delimiters: "#e5ebe8",
    strings: "#bde4a4",
    numbers: "#cbd75f",
  }),
};
