import * as monaco from "monaco-editor";

export type ChalkTheme = {
  key: string;
  name: string;
  shadow: string;
  background: string;
  monaco: monaco.editor.IStandaloneThemeData;
};

export const trimHSL = (hsl: string) => hsl.slice(4).replace(/[\)\,]/g, "");

export const createMonacoTheme = (theme: {
  comments: string;
  delimiters: string;
  foreground: string;
  keywords: string;
  strings: string;
  numbers: string;
}) =>
  ({
    base: "vs-dark",
    inherit: false,
    rules: [
      { token: "", foreground: theme.foreground, background: "#000000" },
      { token: "invalid", foreground: "#000000" },
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },

      { token: "variable", foreground: theme.delimiters },
      { token: "variable.predefined", foreground: theme.delimiters },
      { token: "variable.parameter", foreground: theme.delimiters },
      { token: "constant", foreground: "#000000" },
      { token: "comment", foreground: theme.comments },
      { token: "number", foreground: theme.numbers },
      { token: "number.hex", foreground: theme.numbers },
      { token: "regexp", foreground: "#000000" },
      { token: "annotation", foreground: "#000000" },
      { token: "type", foreground: theme.foreground },

      { token: "delimiter", foreground: theme.delimiters },
      { token: "delimiter.html", foreground: theme.delimiters },
      { token: "delimiter.xml", foreground: "#000000" },

      { token: "tag", foreground: theme.foreground },
      { token: "tag.id.pug", foreground: "#000000" },
      { token: "tag.class.pug", foreground: "#000000" },
      { token: "meta.scss", foreground: theme.foreground },
      { token: "meta.tag", foreground: "#000000" },
      { token: "metatag", foreground: "#000000" },
      { token: "metatag.content.html", foreground: "#000000" },
      { token: "metatag.html", foreground: "#000000" },
      { token: "metatag.xml", foreground: "#000000" },
      { token: "metatag.php", fontStyle: "bold" },

      { token: "key", foreground: "#000000" },
      { token: "string.key.json", foreground: theme.foreground },
      { token: "string.value.json", foreground: theme.strings },

      { token: "attribute.name", foreground: theme.keywords },
      { token: "attribute.value", foreground: theme.strings },
      { token: "attribute.value.number.css", foreground: theme.strings },
      { token: "attribute.value.unit.css", foreground: theme.strings },
      { token: "attribute.value.hex.css", foreground: theme.strings },

      { token: "string", foreground: theme.strings },
      { token: "string.sql", foreground: "#000000" },

      { token: "keyword", foreground: theme.keywords },
      { token: "keyword.flow", foreground: "#000000" },
      { token: "keyword.json", foreground: theme.keywords },
      { token: "keyword.flow.scss", foreground: "#000000" },

      { token: "operator.scss", foreground: theme.delimiters },
      { token: "operator.sql", foreground: theme.delimiters },
      { token: "operator.swift", foreground: theme.delimiters },
      { token: "predefined.sql", foreground: theme.delimiters },
    ],
    colors: {
      "editor.background": "#ffffff00",
      "editor.selectionBackground": "#FFFFFF1A",
    },
  } as monaco.editor.IStandaloneThemeData);
