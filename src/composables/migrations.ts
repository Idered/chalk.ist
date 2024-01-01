import { store } from "./store";
import { v4 } from "uuid";
import { DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";
import { BlockType, WindowControls } from "~/enums";
import { CodeBlock } from "~/types";

export function runStoreMigrations() {
  store.value.blocks = store.value.blocks ?? [
    {
      id: v4(),
      content: DEFAULT_CONTENT,
      language: "typescript",
      type: BlockType.Code,
      title: "",
      columnSpan: 12,
      rowSpan: 1,
      mode: "edit",
      transformations: [],
    } satisfies CodeBlock,
  ];
  store.value.blocks = store.value.blocks.map((block) => {
    if (block.type === BlockType.Code) {
      return {
        ...block,
        mode: block.mode ?? "edit",
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
  store.value.fontSize = store.value.fontSize ?? 13;
  store.value.showLineNumbers = store.value.showLineNumbers ?? true;
  store.value.windowControls =
    store.value.windowControls ?? WindowControls.MacOutline;
  store.value.expandBackdrops = store.value.expandBackdrops ?? true;
  store.value.paddingX = store.value.paddingX || 32;
  store.value.paddingY = store.value.paddingY || 32;
  store.value.lineHeight = store.value.lineHeight || 20;
  store.value.windowStyle = store.value.windowStyle || "variant-1";
  store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
  store.value.showParticles = store.value.showParticles || true;
  store.value.fontFamily = store.value.fontFamily || "JetBrains Mono";
  store.value.fontLigatures = store.value.fontLigatures || true;
  store.value.currentTheme = ["vercel", "redline"].includes(
    store.value.currentTheme,
  )
    ? DEFAULT_THEME
    : store.value.currentTheme;
}
