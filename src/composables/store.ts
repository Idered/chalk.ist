import { useStorage } from "@vueuse/core";
import { ref } from "vue";
import { BlockType, DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";
import { WindowControls } from "~/types";
import { v4 } from "uuid";

export const preview = ref<{
  content: string;
  language: string;
  theme: string;
  fontFamily: string;
  name: string;
  title: string;
  windowStyle: string;
  username: string;
  paddingX: number;
  paddingY: number;
  frameWidth: number;
  picture: string;
  reflection: boolean;
  showTwitterBadge: boolean;
  showLineNumbers: boolean;
  windowControls: WindowControls;
} | null>(null);

export const store = useStorage("chalk-store", {
  currentThemeSupportsWindowVariants: true,
  currentTheme: DEFAULT_THEME,
  useAltBackground: false,
  blocks: [
    {
      id: v4(),
      content: DEFAULT_CONTENT,
      language: "typescript",
      type: BlockType.Code,
      title: "",
      columnSpan: 12,
      rowSpan: 1,
    },
  ],
  language: "typescript",
  name: "",
  username: "",
  windowStyle: "variant-1",
  fontFamily: "JetBrains Mono",
  fontLigatures: true,
  diff: false,
  picture: "",
  title: "",
  showTwitterBadge: true,
  expandTwitterOptions: true,
  expandSupportSection: true,
  showBackground: true,
  reflection: true,
  showLineNumbers: true,
  windowControls: WindowControls.MacOutline,
  modifiedContent: "",
  paddingX: 16,
  paddingY: 16,
  frameHeight: 0,
  frameWidth: 720,
  content: DEFAULT_CONTENT,
});

export const isExporting = ref(false);

// Data migrations
store.value.blocks = store.value.blocks ?? [
  {
    content: DEFAULT_CONTENT,
    language: "typescript",
    title: "",
    columnSpan: 12,
    rowSpan: 1,
  },
];
store.value.showLineNumbers = store.value.showLineNumbers ?? true;
store.value.windowControls = store.value.windowControls ?? WindowControls.MacOutline;
store.value.expandSupportSection = store.value.expandSupportSection ?? true;
store.value.paddingX = store.value.paddingX || 32;
store.value.paddingY = store.value.paddingY || 32;
store.value.windowStyle = store.value.windowStyle || "variant-1";
store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
store.value.title = store.value.title || "";
store.value.fontFamily = store.value.fontFamily || "JetBrains Mono";
store.value.fontLigatures = store.value.fontLigatures || true;
store.value.currentTheme = ["vercel", "redline"].includes(store.value.currentTheme)
  ? DEFAULT_THEME
  : store.value.currentTheme;

export function moveBlock(blockId: string, moveBy: number) {
  const blocks = store.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  const newIndex = index + moveBy;
  if (newIndex < 0 || newIndex >= blocks.length) return;
  const [editor] = blocks.splice(index, 1);
  blocks.splice(newIndex, 0, editor);
}

export function addEditorBlock() {
  store.value.blocks.push({
    id: v4(),
    content: DEFAULT_CONTENT,
    type: BlockType.Code,
    language: "typescript",
    title: "",
    columnSpan: 12,
    rowSpan: 1,
  });
}

export function removeBlock(blockId: string) {
  const blocks = store.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  blocks.splice(index, 1);
}
