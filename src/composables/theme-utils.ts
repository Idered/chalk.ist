import * as monaco from "monaco-editor";
import { CSSProperties } from "vue";

export type ChalkTheme = ReturnType<typeof createTheme>;

export type Theme = {
  key: string;
  name: string;
  shadow: string;
  shadowStyle?: CSSProperties;
  mode: "light" | "dark";
  backgroundStyle?: CSSProperties;
  appStyle?: CSSProperties;
  background: string;
  backgroundAlt?: string;
  inspiration?: string;
  inspirationUrl?: string;
  monaco: CustomMonacoTheme;
};

export const createTheme = (theme: Theme) => {
  return {
    ...theme,
    shadow: trimHSL(theme.shadow),
    monaco: createMonacoTheme({
      foreground: hslToHex(theme.monaco.foreground),
      functions: theme.monaco.functions ? hslToHex(theme.monaco.functions) : undefined,
      comments: hslToHex(theme.monaco.comments),
      keywords: hslToHex(theme.monaco.keywords),
      delimiters: hslToHex(theme.monaco.delimiters),
      strings: hslToHex(theme.monaco.strings),
      numbers: hslToHex(theme.monaco.numbers),
      regexp: hslToHex(theme.monaco.regexp),
      selectionBackground: `${hslToHex(theme.monaco.selectionBackground || "hsl(0, 0%, 100%)")}33`,
    }),
  };
};

export const trimHSL = (hsl: string) => hsl.replace(/hsla?\(/, "").replace(/[\)\,]/g, "");

export function hslToHex(hsl: string) {
  let [h, s, l] = hsl
    .slice(4, -1)
    .split(",")
    .map((x) => parseInt(x, 10));
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

type CustomMonacoTheme = {
  comments: string;
  delimiters: string;
  foreground: string;
  functions?: string;
  keywords: string;
  strings: string;
  numbers: string;
  regexp: string;
  selectionBackground?: string;
};

export const createMonacoTheme = (
  theme: CustomMonacoTheme,
  rules = [] as monaco.editor.IStandaloneThemeData["rules"]
) =>
  ({
    base: "vs-dark",
    inherit: false,
    rules: [
      { token: "", foreground: theme.foreground, background: "#000000" },
      { token: "invalid", foreground: "#000000" },
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "400" },

      { token: "variable", foreground: theme.delimiters },
      { token: "variable.predefined", foreground: theme.delimiters },
      { token: "variable.parameter", foreground: theme.delimiters },
      { token: "constant", foreground: "#000000" },
      { token: "comment", foreground: theme.comments },
      { token: "number", foreground: theme.numbers },
      { token: "number.hex", foreground: theme.numbers },
      { token: "regexp", foreground: theme.regexp },
      { token: "annotation", foreground: "#000000" },
      { token: "type", foreground: theme.foreground },

      { token: "delimiter", foreground: theme.delimiters },
      { token: "delimiter.html", foreground: theme.delimiters },
      { token: "delimiter.xml", foreground: "#000000" },

      { token: "tag", foreground: theme.foreground },
      { token: "tag.id.pug", foreground: theme.foreground },
      { token: "tag.class.pug", foreground: theme.foreground },
      { token: "meta.scss", foreground: theme.foreground },
      { token: "meta.tag", foreground: theme.foreground },
      { token: "metatag", foreground: theme.keywords },
      { token: "metatag.content.html", foreground: theme.foreground },
      { token: "metatag.html", foreground: theme.keywords },
      { token: "metatag.xml", foreground: theme.keywords },
      { token: "metatag.php", fontStyle: "bold", foreground: theme.keywords },

      { token: "key", foreground: theme.foreground },
      { token: "string.key.json", foreground: theme.foreground },
      { token: "string.value.json", foreground: theme.strings },

      { token: "attribute.name", foreground: theme.keywords },
      { token: "attribute.value", foreground: theme.strings },
      { token: "attribute.value.number.css", foreground: theme.strings },
      { token: "attribute.value.unit.css", foreground: theme.strings },
      { token: "attribute.value.hex.css", foreground: theme.strings },

      { token: "string", foreground: theme.strings },
      { token: "string.sql", foreground: "#000000" },

      { token: "keyword", foreground: theme.keywords, fontStyle: "bold" },
      { token: "keyword.flow", foreground: "#000000" },
      { token: "keyword.json", foreground: theme.keywords },
      { token: "keyword.flow.scss", foreground: "#000000" },
      { token: "function", foreground: theme.functions },

      { token: "operator.scss", foreground: theme.delimiters },
      { token: "operator.sql", foreground: theme.delimiters },
      { token: "operator.swift", foreground: theme.delimiters },
      { token: "predefined.sql", foreground: theme.delimiters },

      ...rules,
    ],
    colors: {
      "editor.background": "#ffffff00",
      "editor.selectionBackground": theme.selectionBackground,
    },
  } as monaco.editor.IStandaloneThemeData);
