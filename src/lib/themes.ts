import { createTheme } from "~/lib/create-theme";
import { bundledThemesInfo } from "shikiji/themes";

const excludedThemes = [
  "material-theme-darker",
  "material-theme-ocean",
  "material-theme-palenight",
  "dracula-soft",
  "rose-pine-moon",
  "vitesse-black",
];
export const shikijiThemes = bundledThemesInfo.filter(
  ({ type, id }) => type === "dark" && excludedThemes.includes(id) === false,
);
export const chalkistThemes = [
  createTheme("Vue", {
    comment: "#387156",
    foreground: "#dff3ea",
    function: "#42b883",
    keyword: "#667fff",
    number: "#cbd760",
    operator: "#c2c3b1",
    punctuation: "#c2c3b1",
    regexp: "#484a39",
    string: "#bde4a5",
    variable: "#e1e4e8",
  }),

  createTheme("Liveblocks", {
    comment: "#605d65",
    foreground: "#edecee",
    function: "#f76e99",
    keyword: "#9f8dfc",
    number: "#ffc266",
    operator: "#bf7af0",
    punctuation: "#9f8dfc",
    regexp: "#f76e99",
    string: "#70e1c8",
    variable: "#e1e4e8",
  }),

  createTheme("CodeSandbox", {
    comment: "#6F6F6F",
    foreground: "#fff",
    function: "#CDF861",
    keyword: "#A390FF",
    number: "#7AD9FB",
    operator: "#B3E8B4",
    punctuation: "#86897A",
    regexp: "#f76e99",
    string: "#BFD084",
    variable: "#fff",
  }),

  createTheme("Chrome", {
    comment: "#6f5884",
    foreground: "#cdad7a",
    function: "#ff6687",
    keyword: "#bd285c",
    number: "#efefef",
    operator: "#c2c3b1",
    punctuation: "#804d80",
    regexp: "#161312",
    string: "#e8c28c",
    variable: "#f1b555",
  }),

  createTheme("Tailwind CSS", {
    foreground: "#f8fafc",
    variable: "#71cdf4",
    comment: "#18739a",
    keyword: "#f472b6",
    punctuation: "#65808b",
    string: "#7dd3fc",
    number: "#31d39d",
    regexp: "#85e5c5",
    function: "#cbd5e1",
    operator: "#65808b",
  }),

  createTheme("Dawn", {
    foreground: "#e4c7c1",
    variable: `#e8917d`,
    comment: "#8c7c6c",
    keyword: "#d56a34",
    punctuation: "#c7bad9",
    string: "#c7bad9",
    number: "#efecf3",
    regexp: "#d29474",
    function: "#e8917d",
    operator: "#c7bad9",
  }),

  createTheme("Linear", {
    foreground: `#f18e55`,
    variable: `#ead4c8`,
    comment: `#645884`,
    keyword: `#c11071`,
    punctuation: `#4d5180`,
    string: `#e8ab8c`,
    number: `#ef8abe`,
    regexp: `#f1b546`,
    function: "#ff9e64",
    operator: "#d6deeb",
  }),
];
