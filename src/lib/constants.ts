import { bundledLanguagesInfo } from "shiki";
import { CSSProperties } from "vue";

export const MAX_FRAME_WIDTH = 1600;
export const MIN_FRAME_WIDTH = 320;

export const MIN_INNER_PADDING_Y = 12;
export const MAX_INNER_PADDING_Y = 128;

export const MIN_INNER_PADDING_X = 20;
export const MAX_INNER_PADDING_X = 200;

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

export const COLUMN_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  label: `${i + 2}/12`,
  value: i + 2,
}));

export const ROW_OPTIONS = Array.from({ length: 6 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));
