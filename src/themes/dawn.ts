import { ChalkTheme, createMonacoTheme, hslToHex, trimHSL } from "~/composables/theme-utils";

export const dawn: ChalkTheme = {
  key: "dawn",
  name: "Dawn",
  shadow: trimHSL("hsl(8, 45%, 13%)"),
  background: "linear-gradient(140deg, hsl(33, 60%, 50%), #a13e37, #281a29)",
  monaco: createMonacoTheme({
    foreground: hslToHex("hsl(11, 28%, 58%)"),
    comments: hslToHex("hsl(30, 52%, 30%)"),
    keywords: hslToHex("hsl(20, 66%, 52%)"),
    delimiters: hslToHex("hsl(265, 29%, 79%)"),
    strings: hslToHex("hsl(265, 29%, 79%)"),
    numbers: hslToHex("hsl(266, 21%, 94%)"),
    regexp: hslToHex("hsl(20, 51%, 64%)"),
  }),
};
