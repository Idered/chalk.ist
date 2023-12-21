import { ThemeRegistrationRaw } from "shikiji/core";
import { hslToHex } from "./colors";

type Colors = {
  /**
   * Color of comments
   * @example // Hello World
   */
  comment: string;
  /**
   * Color of text
   * @example Hello World
   */
  foreground: string;
  /**
   * Color of function names
   * @example helloWorld
   */
  function: string;
  /**
   * Color of variable names
   * @example helloWorld
   */
  variable: string;
  /**
   * Color of language keywords
   * @example if, else, for, while, return, export, function
   */
  keyword: string;
  /**
   * Color of numbers
   * @example 123
   */
  number: string;
  /**
   * Color of operators
   * @example +, -, *, /, %, =, ==, ===, !=, !==, &&, ||, !
   */
  operator: string;
  /**
   * Color of regular expressions
   */
  regexp: string;
  /**
   * Color of delimiters and brackets
   * @example (), [], {}, ",", .
   */
  punctuation: string;
  /**
   * Color of strings
   * @example "Hello World"
   */
  string: string;
  // /**
  //  * Color of HTML tags
  //  * @example div, button
  //  */
  // tag: string;
  invalid?: string;
  bracketHighlight?: string;
  diffDeletedBg?: string;
  diffInsertedBg?: string;
  diffChangedBg?: string;
  diffIgnoredBg?: string;
  carriageReturn?: string;
};

export function createTheme(name: string, colors: Colors) {
  colors = {
    invalid: "#fdaeb7",
    bracketHighlight: "#d1d5da",
    diffDeletedBg: "#86181d",
    diffInsertedBg: "#144620",
    diffChangedBg: "#c24e00",
    diffIgnoredBg: "#2f363d",
    carriageReturn: "#24292e",
    ...colors,
  };
  colors = Object.entries(colors).reduce(
    (acc, [key, color]) => ({
      ...acc,
      [key]: color.startsWith("hsl") ? hslToHex(color) : color,
    }),
    {} as Colors
  );
  return {
    name,
    colors: {
      "editor.background": "#ff000000",
    },
    settings: [
      {
        scope: ["comment", "punctuation.definition.comment", "string.comment"],
        settings: {
          foreground: colors.comment,
        },
      },
      {
        scope: [
          "constant",
          "entity.name.constant",
          "variable.other.constant",
          "variable.other.member",
          "variable.other.enummember",
          "variable.language",
        ],
        settings: {
          foreground: colors.variable,
        },
      },
      {
        scope: ["entity", "entity.name"],
        settings: {
          foreground: colors.function,
        },
      },
      {
        scope: ["variable.parameter.function", "meta.object.member"],
        settings: {
          foreground: colors.variable,
        },
      },
      {
        scope: "entity.name.tag",
        settings: {
          foreground: colors.keyword,
        },
      },
      {
        scope: "keyword",
        settings: {
          foreground: colors.keyword,
        },
      },
      {
        scope: "keyword.operator",
        settings: {
          foreground: colors.operator,
        },
      },
      {
        scope: ["keyword.operator.word"],
        settings: {
          foreground: colors.keyword,
        },
      },
      {
        scope: ["storage", "storage.type"],
        settings: {
          foreground: colors.keyword,
        },
      },
      {
        scope: ["constant.numeric"],
        settings: {
          foreground: colors.number,
        },
      },
      {
        scope: ["storage.modifier.package", "storage.modifier.import", "storage.type.java"],
        settings: {
          foreground: colors.variable,
        },
      },
      {
        scope: ["string", "punctuation.definition.string", "string punctuation.section.embedded source"],
        settings: {
          foreground: colors.string,
        },
      },
      {
        scope: "support",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: "meta.property-name",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: colors.variable,
        },
      },
      {
        scope: "variable.other",
        settings: {
          foreground: colors.variable,
        },
      },
      {
        scope: "invalid.broken",
        settings: {
          fontStyle: "italic",
          foreground: colors.invalid,
        },
      },
      {
        scope: "invalid.deprecated",
        settings: {
          fontStyle: "italic",
          foreground: colors.invalid,
        },
      },
      {
        scope: "invalid.illegal",
        settings: {
          fontStyle: "italic",
          foreground: colors.invalid,
        },
      },
      {
        scope: "invalid.unimplemented",
        settings: {
          fontStyle: "italic",
          foreground: colors.invalid,
        },
      },
      {
        scope: "carriage-return",
        settings: {
          fontStyle: "italic underline",
          background: colors.keyword,
          foreground: colors.carriageReturn,
          // content: "^M",
        },
      },
      {
        scope: "message.error",
        settings: {
          foreground: colors.invalid,
        },
      },
      {
        scope: "string variable",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: ["source.regexp", "string.regexp"],
        settings: {
          foreground: colors.regexp,
        },
      },
      {
        scope: [
          "string.regexp.character-class",
          "string.regexp constant.character.escape",
          "string.regexp source.ruby.embedded",
          "string.regexp string.regexp.arbitrary-repitition",
        ],
        settings: {
          foreground: colors.regexp,
        },
      },
      {
        scope: "string.regexp constant.character.escape",
        settings: {
          fontStyle: "bold",
          foreground: colors.keyword,
        },
      },
      {
        scope: "support.constant",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: "support.variable",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: "meta.module-reference",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: "punctuation.definition.list.begin.markdown",
        settings: {
          foreground: colors.variable,
        },
      },
      {
        scope: ["markup.heading", "markup.heading entity.name"],
        settings: {
          fontStyle: "bold",
          foreground: colors.foreground,
        },
      },
      {
        scope: "markup.quote",
        settings: {
          foreground: colors.keyword,
        },
      },
      {
        scope: "markup.italic",
        settings: {
          fontStyle: "italic",
          foreground: colors.variable,
        },
      },
      {
        scope: "markup.bold",
        settings: {
          fontStyle: "bold",
          foreground: colors.variable,
        },
      },
      {
        scope: ["markup.underline"],
        settings: {
          fontStyle: "underline",
        },
      },
      {
        scope: ["markup.strikethrough"],
        settings: {
          fontStyle: "strikethrough",
        },
      },
      {
        scope: "markup.inline.raw",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: ["markup.deleted", "meta.diff.header.from-file", "punctuation.definition.deleted"],
        settings: {
          background: colors.diffDeletedBg,
          foreground: colors.invalid,
        },
      },
      {
        scope: ["markup.inserted", "meta.diff.header.to-file", "punctuation.definition.inserted"],
        settings: {
          background: colors.diffInsertedBg,
          foreground: colors.keyword,
        },
      },
      {
        scope: ["markup.changed", "punctuation.definition.changed"],
        settings: {
          background: colors.diffChangedBg,
          foreground: colors.variable,
        },
      },
      {
        scope: ["markup.ignored", "markup.untracked"],
        settings: {
          foreground: colors.diffIgnoredBg,
          background: colors.foreground,
        },
      },
      {
        scope: "meta.diff.range",
        settings: {
          foreground: colors.function,
          fontStyle: "bold",
        },
      },
      {
        scope: "meta.diff.header",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: "meta.separator",
        settings: {
          fontStyle: "bold",
          foreground: colors.foreground,
        },
      },
      {
        scope: "meta.output",
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: [
          "brackethighlighter.tag",
          "brackethighlighter.curly",
          "brackethighlighter.round",
          "brackethighlighter.square",
          "brackethighlighter.angle",
          "brackethighlighter.quote",
        ],
        settings: {
          foreground: colors.bracketHighlight,
        },
      },
      {
        scope: "brackethighlighter.unmatched",
        settings: {
          foreground: colors.invalid,
        },
      },
      {
        scope: ["constant.other.reference.link", "string.other.link"],
        settings: {
          foreground: colors.regexp,
          fontStyle: "underline",
        },
      },
      {
        scope: ["punctuation", "meta.brace.round"],
        settings: {
          foreground: colors.punctuation,
        },
      },
      {
        scope: ["text.html"],
        settings: {
          foreground: colors.foreground,
        },
      },
    ],
  } satisfies ThemeRegistrationRaw & {
    colors: Record<string, string>;
  };
}
