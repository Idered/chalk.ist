import { bundledLanguagesInfo } from "shiki";
import { CSSProperties } from "vue";

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
];
export const SHADOW_OVERLAY_STYLES = [
  { value: "none", label: "None" },
  { value: "variant-1", label: "Variant 1" },
  { value: "variant-2", label: "Variant 2" },
  { value: "variant-3", label: "Variant 3" },
  { value: "variant-4", label: "Variant 4" },
];
export const SHADOW_OVERLAY_MAPPING: Record<
  string,
  {
    image: string;
    blendMode: CSSProperties["mixBlendMode"];
  }
> = {
  none: {
    image: "none",
    blendMode: "normal",
  },
  "variant-1": {
    image: "url(/shadows/shadow-8.png)",
    blendMode: "multiply",
  },
  "variant-2": {
    image: "url(/shadows/shadow-10.png)",
    blendMode: "overlay",
  },
  "variant-3": {
    image: "url(/shadows/shadow-3.png)",
    blendMode: "overlay",
  },
  "variant-4": {
    image: "url(/shadows/shadow-13.png)",
    blendMode: "overlay",
  },
};
export const MAX_FRAME_WIDTH = 1600;
export const MIN_FRAME_WIDTH = 320;
export const DEFAULT_THEME = "chrome";
export const FONTS = [
  "Fira Code",
  "Geist Mono",
  "IBM Plex Mono",
  "JetBrains Mono",
  "Nova",
  "Source Code Pro",
]
  .map((font) => ({ value: font, label: font }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const LIGATURE_FONTS = [
  "Fira Code",
  "JetBrains Mono",
  "Nova",
  "Geist Mono",
];

export const LANGUAGES = bundledLanguagesInfo.map((lang) => ({
  value: lang.id,
  label: lang.name,
}));

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
