import { useStorage } from "@vueuse/core";
import { ref } from "vue";
import { DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";
import { WindowControls, BlockType } from "~/enums";
import { v4 } from "uuid";
import { Backdrops } from "~/lib/backdrops";

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
  lineHeight: number;
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
      transformations: [],
    },
  ] as {
    id: string;
    content: string;
    language: string;
    type: BlockType.Code;
    title: string;
    columnSpan: number;
    rowSpan: number;
    transformations: {
      line: number;
      type: "add" | "remove" | "focus" | "highlight";
    }[];
  }[],
  // | {
  //     id: string;
  //     type: BlockType.Note;
  //     content: string;
  //     columnSpan: number;
  //     rowSpan: number;
  //     fontColor: string;
  //     fontSize: string;
  //   }
  language: "typescript",
  name: "",
  username: "",
  backdrop: "Vue" as keyof typeof Backdrops,
  backdropNoise: false,
  windowNoise: false,
  colorTheme: "Vue",
  windowStyle: "variant-1",
  fontFamily: "JetBrains Mono",
  fontLigatures: true,
  diff: false,
  editMode: "code" as "code" | "focus" | "add" | "remove" | "highlight",
  picture: "",
  title: "",
  showTwitterBadge: true,
  expandBackdrops: true,
  expandTwitterOptions: true,
  expandSupportSection: true,
  showBackground: true,
  reflection: true,
  showLineNumbers: true,
  showParticles: true,
  windowControls: WindowControls.MacOutline,
  modifiedContent: "",
  paddingX: 16,
  paddingY: 16,
  lineHeight: 20,
  frameHeight: 0,
  frameWidth: 720,
  content: DEFAULT_CONTENT,
});

export const isExporting = ref(false);

// Data migrations
store.value.blocks = store.value.blocks ?? [
  {
    id: v4(),
    content: DEFAULT_CONTENT,
    language: "typescript",
    type: BlockType.Code,
    title: "",
    columnSpan: 12,
    rowSpan: 1,
    transformations: [],
  },
];
store.value.blocks = store.value.blocks.map((block) => {
  if (block.type === BlockType.Code) {
    return {
      ...block,
      transformations: block.transformations || [],
    };
  }
  return block;
});
store.value.editMode = store.value.editMode ?? "code";
store.value.backdrop = store.value.backdrop ?? "Vue";
store.value.backdropNoise = store.value.backdropNoise ?? false;
store.value.windowNoise = store.value.windowNoise ?? false;
store.value.colorTheme = store.value.colorTheme ?? "Vue";
store.value.showLineNumbers = store.value.showLineNumbers ?? true;
store.value.windowControls = store.value.windowControls ?? WindowControls.MacOutline;
store.value.expandBackdrops = store.value.expandBackdrops ?? true;
store.value.expandSupportSection = store.value.expandSupportSection ?? true;
store.value.paddingX = store.value.paddingX || 32;
store.value.paddingY = store.value.paddingY || 32;
store.value.lineHeight = store.value.lineHeight || 20;
store.value.windowStyle = store.value.windowStyle || "variant-1";
store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
store.value.showParticles = store.value.showParticles || true;
store.value.diff = false;
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
    transformations: [],
  });
}

// export function addNoteBlock() {
//   store.value.blocks.push({
//     id: v4(),
//     content: "",
//     type: BlockType.Note,
//     columnSpan: 12,
//     rowSpan: 1,
//     fontColor: "#ffffff",
//     fontSize: "20",
//   });
// }

export function removeBlock(blockId: string) {
  const blocks = store.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  blocks.splice(index, 1);
}
