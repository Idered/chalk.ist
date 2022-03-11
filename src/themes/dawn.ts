import { ChalkTheme } from "./types";

const trimHSL = (hsl: string) => hsl.slice(4).replace(/[\)\,]/g, "");

export const dawnTheme: ChalkTheme = {
  key: "dawnTheme",
  name: "Dawn",
  shadow: trimHSL("hsl(8, 45%, 13%)"),
  background: "linear-gradient(140deg, hsl(33, 60%, 50%), #A13E37, #281A29)",
  monaco: {
    base: "vs-dark",
    inherit: false,
    rules: [
      { token: "", foreground: "#b28075", background: "#000000" },
      { token: "invalid", foreground: "#000000" },
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },

      { token: "variable", foreground: "#000000" },
      { token: "variable.predefined", foreground: "#000000" },
      { token: "variable.parameter", foreground: "#000000" },
      { token: "constant", foreground: "#000000" },
      { token: "comment", foreground: "#744d25" },
      { token: "number", foreground: "#eeebf2" },
      { token: "number.hex", foreground: "#000000" },
      { token: "regexp", foreground: "#B68B55" },
      { token: "annotation", foreground: "#000000" },
      { token: "type", foreground: "#000000" },

      { token: "delimiter", foreground: "#B68B55" },
      { token: "delimiter.html", foreground: "#B68B55" },
      { token: "delimiter.xml", foreground: "#B68B55" },

      { token: "tag", foreground: "#000000" },
      { token: "tag.id.pug", foreground: "#000000" },
      { token: "tag.class.pug", foreground: "#000000" },
      { token: "meta.scss", foreground: "#000000" },
      { token: "meta.tag", foreground: "#000000" },
      { token: "metatag", foreground: "#000000" },
      { token: "metatag.content.html", foreground: "#000000" },
      { token: "metatag.html", foreground: "#000000" },
      { token: "metatag.xml", foreground: "#000000" },
      { token: "metatag.php", fontStyle: "bold" },

      { token: "key", foreground: "#000000" },
      { token: "string.key.json", foreground: "#000000" },
      { token: "string.value.json", foreground: "#000000" },

      { token: "attribute.name", foreground: "#000000" },
      { token: "attribute.value", foreground: "#000000" },
      { token: "attribute.value.number.css", foreground: "#000000" },
      { token: "attribute.value.unit.css", foreground: "#000000" },
      { token: "attribute.value.hex.css", foreground: "#000000" },

      { token: "string", foreground: "#C7BAD9" },
      { token: "string.sql", foreground: "#000000" },

      { token: "keyword", foreground: "#d66a34" },
      { token: "keyword.flow", foreground: "#000000" },
      { token: "keyword.json", foreground: "#000000" },
      { token: "keyword.flow.scss", foreground: "#000000" },

      { token: "operator.scss", foreground: "#000000" },
      { token: "operator.sql", foreground: "#000000" },
      { token: "operator.swift", foreground: "#000000" },
      { token: "predefined.sql", foreground: "#000000" },
    ],
    colors: {},
  },
};
