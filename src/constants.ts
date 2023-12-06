import * as monaco from "monaco-editor";

export enum BlockType {
  Code = "code",
  Image = "image",
}

export const FRAME_STYLES = [
  { value: "none", label: "None" },
  { value: "variant-1", label: "Variant 1" },
  { value: "variant-2", label: "Variant 2" },
  { value: "variant-3", label: "Variant 3" },
  { value: "variant-4", label: "Variant 4" },
];
export const MAX_FRAME_WIDTH = 1600;
export const MIN_FRAME_WIDTH = 320;
export const DEFAULT_THEME = "chrome";
export const DEFAULT_CONTENT = `const btn = document.getElementById('btn')
let count = 0
function render() {
  btn.innerText = \`Count: \${count}\`
}
btn.addEventListener('click', () => {
  // Count from 1 to 10.
  if (count < 10) {
    count += 1
    render()
  }
})`;
export const DEFAULT_EDITOR_CONFIG: monaco.editor.IStandaloneDiffEditorConstructionOptions = {
  theme: "vs-dark",
  renderWhitespace: "none",
  // automaticLayout: true,
  fontLigatures: true,
  selectionHighlight: false,
  // @ts-ignore
  "bracketPairColorization.enabled": false,
  scrollBeyondLastLine: false,
  fontFamily: "JetBrains Mono",
  fontWeight: "400",
  fontSize: 13,
  quickSuggestions: false,
  renderLineHighlight: "none",
  wordWrap: "on",
  wrappingStrategy: "advanced",
  renderSideBySide: false,
  codeLens: false,
  folding: false,
  matchBrackets: "never",
  occurrencesHighlight: false,
  definitionLinkOpensInPeek: false,
  contextmenu: false,
  overviewRulerLanes: 0,
  guides: { indentation: false },
  hover: { enabled: false },
  lightbulb: { enabled: false },
  minimap: { enabled: false },
  scrollbar: { vertical: "hidden" },
};

export const AVAILABLE_FONTS = ["JetBrains Mono", "Fira Code", "Source Code Pro", "IBM Plex Mono", "Nova"]
  .map((font) => ({ value: font, label: font }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const LIGATURE_FONTS = ["Fira Code", "JetBrains Mono", "Nova"];

export const AVAILABLE_LANGUAGES = [
  {
    group: "Data",
    children: [
      { value: "json", label: "JSON" },
      { value: "yaml", label: "YAML" },
    ],
  },
  {
    group: "Markup",
    children: [
      { value: "handlebars", label: "Handlebars" },
      { value: "html", label: "HTML" },
      { value: "markdown", label: "Markdown" },
      { value: "twig", label: "Twig" },
    ],
  },
  {
    group: "Code",
    children: [
      { value: "go", label: "Go" },
      { value: "python", label: "Python" },
      { value: "php-snippet", label: "PHP" },
      { value: "csharp", label: "C#" },
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "kotlin", label: "Kotlin" },
      { value: "java", label: "Java" },
      { value: "ruby", label: "Ruby" },
      { value: "rust", label: "Rust" },
      { value: "sol", label: "Solidity" },
    ],
  },
  {
    group: "Style",
    children: [
      { value: "css", label: "CSS" },
      { value: "scss", label: "SCSS" },
    ],
  },
  {
    group: "Console",
    children: [
      { value: "shell", label: "Bash" },
      { value: "powershell", label: "PowerShell" },
    ],
  },
]; //.sort((a, b) => a.label.localeCompare(b.label));

export const COLUMN_OPTIONS = [
  {
    label: "2/12",
    value: 2,
  },
  {
    label: "3/12",
    value: 3,
  },
  {
    label: "4/12",
    value: 4,
  },
  {
    label: "5/12",
    value: 5,
  },
  {
    label: "6/12",
    value: 6,
  },
  {
    label: "7/12",
    value: 7,
  },
  {
    label: "8/12",
    value: 8,
  },
  {
    label: "9/12",
    value: 9,
  },
  {
    label: "10/12",
    value: 10,
  },
  {
    label: "11/12",
    value: 11,
  },
  {
    label: "12/12",
    value: 12,
  },
];

export const ROW_OPTIONS = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "6",
    value: 6,
  },
];
