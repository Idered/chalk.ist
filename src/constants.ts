import * as monaco from "monaco-editor";

export const FRAME_STYLES = [
  { value: "none", label: "None" },
  { value: "variant-1", label: "Variant 1" },
  { value: "variant-2", label: "Variant 2" },
  { value: "variant-3", label: "Variant 3" },
  { value: "variant-4", label: "Variant 4" },
];
export const MAX_FRAME_WIDTH = 980;
export const MIN_FRAME_WIDTH = 520;
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
  fontLigatures: true,
  selectionHighlight: false,
  scrollBeyondLastLine: false,
  fontFamily: "JetBrains Mono",
  fontWeight: "400",
  fontSize: 13,
  quickSuggestions: false,
  renderLineHighlight: "none",
  wordWrap: "on",
  renderSideBySide: false,
  wrappingStrategy: "advanced",
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

export const AVAILABLE_FONTS = ["JetBrains Mono", "Fira Code", "Source Code Pro", "IBM Plex Mono"]
  .map((font) => ({ value: font, label: font }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const LIGATURE_FONTS = ["Fira Code", "JetBrains Mono"];

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
