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

export const FRAME_STYLES = [
  { value: "none", label: "None" },
  { value: "variant-1", label: "Variant 1" },
  { value: "variant-2", label: "Variant 2" },
  { value: "variant-3", label: "Variant 3" },
  { value: "variant-4", label: "Variant 4" },
  { value: "variant-5", label: "Variant 5" },
];
export const MAX_FRAME_WIDTH = 1600;
export const MIN_FRAME_WIDTH = 320;
export const DEFAULT_THEME = "chrome";
export const AVAILABLE_FONTS = ["Fira Code", "Geist Mono", "IBM Plex Mono", "JetBrains Mono", "Nova", "Source Code Pro"]
  .map((font) => ({ value: font, label: font }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const LIGATURE_FONTS = ["Fira Code", "JetBrains Mono", "Nova", "Geist Mono"];

export const AVAILABLE_LANGUAGES = [
  {
    group: "Data",
    children: [
      { value: "json", label: "JSON", lang: () => import("shikiji/langs/json.mjs") },
      { value: "yaml", label: "YAML", lang: () => import("shikiji/langs/yaml.mjs") },
    ],
  },
  {
    group: "Markup",
    children: [
      { value: "blade", label: "Blade", lang: () => import("shikiji/langs/blade.mjs") },
      { value: "handlebars", label: "Handlebars", lang: () => import("shikiji/langs/handlebars.mjs") },
      { value: "html", label: "HTML", lang: () => import("shikiji/langs/html.mjs") },
      { value: "markdown", label: "Markdown", lang: () => import("shikiji/langs/markdown.mjs") },
      { value: "twig", label: "Twig", lang: () => import("shikiji/langs/twig.mjs") },
    ],
  },
  {
    group: "Code",
    children: [
      { value: "go", label: "Go", lang: () => import("shikiji/langs/go.mjs") },
      { value: "python", label: "Python", lang: () => import("shikiji/langs/python.mjs") },
      { value: "php", label: "PHP", lang: () => import("shikiji/langs/php.mjs") },
      { value: "csharp", label: "C#", lang: () => import("shikiji/langs/csharp.mjs") },
      { value: "javascript", label: "JavaScript", lang: () => import("shikiji/langs/javascript.mjs") },
      { value: "typescript", label: "TypeScript", lang: () => import("shikiji/langs/typescript.mjs") },
      { value: "kotlin", label: "Kotlin", lang: () => import("shikiji/langs/kotlin.mjs") },
      { value: "java", label: "Java", lang: () => import("shikiji/langs/java.mjs") },
      { value: "ruby", label: "Ruby", lang: () => import("shikiji/langs/ruby.mjs") },
      { value: "rust", label: "Rust", lang: () => import("shikiji/langs/rust.mjs") },
      { value: "solidity", label: "Solidity", lang: () => import("shikiji/langs/solidity.mjs") },
      { value: "jsx", label: "JSX", lang: () => import("shikiji/langs/jsx.mjs") },
      { value: "tsx", label: "TSX", lang: () => import("shikiji/langs/tsx.mjs") },
      { value: "vue", label: "Vue", lang: () => import("shikiji/langs/vue.mjs") },
    ],
  },
  {
    group: "Style",
    children: [
      { value: "css", label: "CSS", lang: () => import("shikiji/langs/css.mjs") },
      { value: "scss", label: "SCSS", lang: () => import("shikiji/langs/scss.mjs") },
    ],
  },
  {
    group: "Console",
    children: [
      { value: "shell", label: "Bash", lang: () => import("shikiji/langs/bat.mjs") },
      { value: "powershell", label: "PowerShell", lang: () => import("shikiji/langs/powershell.mjs") },
    ],
  },
]; //.sort((a, b) => a.label.localeCompare(b.label));

export const LANGUAGES = AVAILABLE_LANGUAGES.flatMap((group) => group.children);

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
