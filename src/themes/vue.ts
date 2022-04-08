import { ChalkTheme, createMonacoTheme, hslToHex, trimHSL } from "~/composables/theme-utils";

export const vue: ChalkTheme = {
  key: "vue",
  name: "Vue",
  shadow: trimHSL("hsl(153, 50%, 6%)"),
  background: "linear-gradient(140deg, hsl(153, 47%, 49%), hsl(153, 47%, 30%), hsl(153, 47%, 24%), hsl(153, 47%, 34%))",
  monaco: createMonacoTheme({
    foreground: hslToHex("hsl(153, 47%, 49%)"),
    comments: hslToHex("hsl(152, 34%, 33%)"),
    keywords: hslToHex("hsl(230, 100%, 70%)"),
    delimiters: hslToHex("hsl(150, 13%, 91%)"),
    strings: hslToHex("hsl(97, 54%, 77%)"),
    numbers: hslToHex("hsl(66, 60%, 61%)"),
  }),
};
