import monaco from "monaco-editor";

export const registerPHPSnippetLanguage = (languages: typeof monaco.languages) => {
  const languageId = "php-snippet";

  languages.register({ id: languageId });

  languages.setLanguageConfiguration(languageId, {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,

    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"],
    },

    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],

    autoClosingPairs: [
      { open: "{", close: "}", notIn: ["string"] },
      { open: "[", close: "]", notIn: ["string"] },
      { open: "(", close: ")", notIn: ["string"] },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],

    folding: {
      markers: {
        start: new RegExp("^\\s*(#|//)region\\b"),
        end: new RegExp("^\\s*(#|//)endregion\\b"),
      },
    },
  });

  languages.setMonarchTokensProvider(languageId, {
    defaultToken: "",
    tokenPostfix: "",

    tokenizer: {
      root: [
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@phpKeywords": { token: "keyword.php" },
              "@phpCompileTimeConstants": { token: "constant.php" },
              "@default": "identifier.php",
            },
          },
        ],
        [
          /[$a-zA-Z_]\w*/,
          {
            cases: {
              "@phpPreDefinedVariables": {
                token: "variable.predefined.php",
              },
              "@default": "variable.php",
            },
          },
        ],

        // brackets
        [/[{}]/, "delimiter.bracket.php"],
        [/[\[\]]/, "delimiter.array.php"],
        [/[()]/, "delimiter.parenthesis.php"],

        // whitespace
        [/[ \t\r\n]+/] as any,

        // comments
        [/(#|\/\/)$/, "comment.php"],
        [/(#|\/\/)/, "comment.php", "@phpLineComment"],

        // block comments
        [/\/\*/, "comment.php", "@phpComment"],

        // strings
        [/"/, "string.php", "@phpDoubleQuoteString"],
        [/'/, "string.php", "@phpSingleQuoteString"],

        // delimiters
        [/[\+\-\*\%\&\|\^\~\!\=\<\>\/\?\;\:\.\,\@]/, "delimiter.php"],

        // numbers
        [/\d*\d+[eE]([\-+]?\d+)?/, "number.float.php"],
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float.php"],
        [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, "number.hex.php"],
        [/0[0-7']*[0-7]/, "number.octal.php"],
        [/0[bB][0-1']*[0-1]/, "number.binary.php"],
        [/\d[\d']*/, "number.php"],
        [/\d/, "number.php"],
      ],

      phpComment: [
        [/\*\//, "comment.php", "@pop"],
        [/[^*]+/, "comment.php"],
        [/./, "comment.php"],
      ],

      phpLineComment: [
        [/\?>/, { token: "@rematch", next: "@pop" }],
        [/.$/, "comment.php", "@pop"],
        [/[^?]+$/, "comment.php", "@pop"],
        [/[^?]+/, "comment.php"],
        [/./, "comment.php"],
      ],

      phpDoubleQuoteString: [
        [/[^\\"]+/, "string.php"],
        [/@escapes/, "string.escape.php"],
        [/\\./, "string.escape.invalid.php"],
        [/"/, "string.php", "@pop"],
      ],

      phpSingleQuoteString: [
        [/[^\\']+/, "string.php"],
        [/@escapes/, "string.escape.php"],
        [/\\./, "string.escape.invalid.php"],
        [/'/, "string.php", "@pop"],
      ],
    },

    phpKeywords: [
      "abstract",
      "and",
      "array",
      "as",
      "break",
      "callable",
      "case",
      "catch",
      "cfunction",
      "class",
      "clone",
      "const",
      "continue",
      "declare",
      "default",
      "do",
      "else",
      "elseif",
      "enddeclare",
      "endfor",
      "endforeach",
      "endif",
      "endswitch",
      "endwhile",
      "extends",
      "false",
      "final",
      "for",
      "foreach",
      "function",
      "global",
      "goto",
      "if",
      "implements",
      "interface",
      "instanceof",
      "insteadof",
      "namespace",
      "new",
      "null",
      "object",
      "old_function",
      "or",
      "private",
      "protected",
      "public",
      "resource",
      "static",
      "switch",
      "throw",
      "trait",
      "try",
      "true",
      "use",
      "var",
      "while",
      "xor",
      "die",
      "echo",
      "empty",
      "exit",
      "eval",
      "include",
      "include_once",
      "isset",
      "list",
      "require",
      "require_once",
      "return",
      "print",
      "unset",
      "yield",
      "__construct",
    ],

    phpCompileTimeConstants: [
      "__CLASS__",
      "__DIR__",
      "__FILE__",
      "__LINE__",
      "__NAMESPACE__",
      "__METHOD__",
      "__FUNCTION__",
      "__TRAIT__",
    ],

    phpPreDefinedVariables: [
      "$GLOBALS",
      "$_SERVER",
      "$_GET",
      "$_POST",
      "$_FILES",
      "$_REQUEST",
      "$_SESSION",
      "$_ENV",
      "$_COOKIE",
      "$php_errormsg",
      "$HTTP_RAW_POST_DATA",
      "$http_response_header",
      "$argc",
      "$argv",
    ],

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  });
};
