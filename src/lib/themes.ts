import { bundledThemesInfo } from "shiki";
import { createTheme } from "~/lib/create-theme";

const excludedThemes = [
  "material-theme-darker",
  "material-theme-ocean",
  "material-theme-palenight",
  "dracula-soft",
  "rose-pine-moon",
  "vitesse-black",
  "catppuccin-frappe",
  "catppuccin-macchiato",
];

export const shikiThemes = bundledThemesInfo.filter(
  ({ type, id }) => type === "dark" && excludedThemes.includes(id) === false,
);

export const portedThemes = [
  createTheme("Duotone - Dark Sea", {
    function: "#D6E9FF", // uno-1
    regexp: "#88B4E7", // uno-2
    foreground: "#88B4E7", // uno-2
    variable: "#88B4E7", // uno-2
    comment: "#444c55", // uno-5
    punctuation: "#444c55", // uno-5
    keyword: "#34febb", // duo-1
    string: "#34febb", // duo-1
    number: "#34febb", // duo-1
    operator: "#32AE85", // duo-2
  }),

  createTheme("Duotone - Dark Space", {
    function: "#bebeef", // uno-1
    regexp: "#8686cb", // uno-2
    foreground: "#8686cb", // uno-2
    variable: "#8686cb", // uno-2
    comment: "#49495a", // uno-5
    punctuation: "#49495a", // uno-5
    keyword: "#fe7732", // duo-1
    string: "#fe7732", // duo-1
    number: "#fe7732", // duo-1
    operator: "#b06845", // duo-2
  }),

  createTheme("Duotone - Dark Forest", {
    function: "#ddf8dd", // uno-1
    regexp: "#a9bca9", // uno-2
    foreground: "#a9bca9", // uno-2
    variable: "#a9bca9", // uno-2
    comment: "#585f58", // uno-5
    punctuation: "#585f58", // uno-5
    keyword: "#e7f98b", // duo-1
    string: "#e7f98b", // duo-1
    number: "#e7f98b", // duo-1
    operator: "#99a659", // duo-2
  }),

  createTheme("Duotone - Dark Sky", {
    function: "#f1ebff", // uno-1
    regexp: "#cab2fa", // uno-2
    foreground: "#cab2fa", // uno-2
    variable: "#cab2fa", // uno-2
    comment: "#544d60", // uno-5
    punctuation: "#544d60", // uno-5
    keyword: "#fec38f", // duo-1
    string: "#fec38f", // duo-1
    number: "#fec38f", // duo-1
    operator: "#b07745", // duo-2
  }),

  createTheme("Duotone - Dark Earth", {
    function: "#ffdac2", // uno-1
    regexp: "#bd987f", // uno-2
    foreground: "#bd987f", // uno-2
    variable: "#bd987f", // uno-2
    comment: "#564b43", // uno-5
    punctuation: "#564b43", // uno-5
    keyword: "#fecb52", // duo-1
    string: "#fecb52", // duo-1
    number: "#fecb52", // duo-1
    operator: "#b09045", // duo-2
  }),
];

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
    variable: "#e8917d",
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
    foreground: "#f18e55",
    variable: "#ead4c8",
    comment: "#645884",
    keyword: "#c11071",
    punctuation: "#4d5180",
    string: "#e8ab8c",
    number: "#ef8abe",
    regexp: "#f1b546",
    function: "#ff9e64",
    operator: "#d6deeb",
  }),

  createTheme("Monochrome", {
    foreground: "hsla(0, 0%, 100%, 0.7)",
    variable: "hsla(0, 0%, 100%, .4)",
    comment: "hsla(0, 0%, 100%, .3)",
    keyword: "hsla(0, 0%, 100%, .55)",
    punctuation: "hsla(0, 0%, 100%, .7)",
    string: "hsla(0, 0%, 100%, .5)",
    number: "hsla(0, 0%, 100%, .7)",
    regexp: "hsla(0, 0%, 100%, .7)",
    function: "hsla(0, 0%, 100%, .8)",
    operator: "hsla(0, 0%, 100%, .4)",
  }),

  // createTheme("Orchid", {
  //   foreground: "hsla(320, 80%, 70%, 0.7)",
  //   variable: "hsla(320, 0%, 70%, .4)",
  //   comment: "hsla(320, 0%, 70%, .3)",
  //   keyword: "hsla(320, 0%, 70%, .55)",
  //   punctuation: "hsla(320, 0%, 70%, .7)",
  //   string: "hsla(320, 50%, 80%, .5)",
  //   number: "hsla(320, 80%, 70%, .7)",
  //   regexp: "hsla(320, 0%, 70%, .7)",
  //   function: "hsla(320, 70%, 60%, .8)",
  //   operator: "hsla(320, 0%, 70%, .4)",
  // }),
];

export const themeLabels = {
  foreground: "text",
  variable: "variables",
  comment: "comments",
  keyword: "keywords",
  function: "functions",
  string: "strings",
  punctuation: "punctuations",
  operator: "operators",
  number: "numbers",
  regexp: "RegExp",
};

export const allThemes = [...chalkistThemes, ...portedThemes, ...shikiThemes];

export function getThemeColors(themeName: string) {
  return allThemes.find((theme) => theme.displayName === themeName)?.raw;
}
