import * as monaco from "monaco-editor";

export const DEFAULT_THEME = "dawn";
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
  fontSize: 14,
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
  lineDecorationsWidth: 0,
  contextmenu: false,
  overviewRulerLanes: 0,
  lineNumbers: "off",
  guides: { indentation: false },
  hover: { enabled: false },
  lightbulb: { enabled: false },
  minimap: { enabled: false },
  scrollbar: { vertical: "hidden" },
};

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
    group: "Script",
    children: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
    ],
  },
  {
    group: "Style",
    children: [
      { value: "css", label: "CSS" },
      { value: "scss", label: "SCSS" },
    ],
  },
]; //.sort((a, b) => a.label.localeCompare(b.label));
