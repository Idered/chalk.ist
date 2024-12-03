import { store } from "./store";
import { MIN_FRAME_WIDTH } from "~/lib/constants";
import { BlockType, WindowControls } from "~/lib/enums";
import { persistentState } from "./persistent-state";

export function runMigrations() {
  if ((store.value as any).blocks) {
    persistentState.value.blocks = (store.value as any).blocks;
    persistentState.value.expandBackdrops = (
      store.value as any
    ).expandBackdrops;
    persistentState.value.expandCustomThemeOptions = (
      store.value as any
    ).expandCustomThemeOptions;
    persistentState.value.expandPresets = (store.value as any).expandPresets;
    persistentState.value.expandTwitterOptions = (
      store.value as any
    ).expandTwitterOptions;
    persistentState.value.expandWatermarkOptions = (
      store.value as any
    ).expandWatermarkOptions;
    persistentState.value.lastCopyMethod = (store.value as any).lastCopyMethod;
    persistentState.value.showUI = (store.value as any).showUI;
    delete (store.value as any).blocks;
    delete (store.value as any).editMode;
    delete (store.value as any).expandBackdrops;
    delete (store.value as any).currentThemeSupportsWindowVariants;
    delete (store.value as any).isResizingInnerPadding;
    delete (store.value as any).language;
    delete (store.value as any).expandCustomThemeOptions;
    delete (store.value as any).showAlternatives;
    delete (store.value as any).useAltBackground;
    delete (store.value as any).expandPresets;
    delete (store.value as any).expandTwitterOptions;
    delete (store.value as any).expandWatermarkOptions;
    delete (store.value as any).lastCopyMethod;
    delete (store.value as any).showUI;
  }

  store.value.backdrop = store.value.backdrop ?? "Vue";
  store.value.backdropNoise = store.value.backdropNoise ?? false;
  store.value.colorTheme = store.value.colorTheme ?? "Vue";
  store.value.fontFamily = store.value.fontFamily || "JetBrains Mono";
  store.value.fontLigatures = store.value.fontLigatures ?? true;
  store.value.fontSize = store.value.fontSize ?? 13;
  store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
  store.value.innerPaddingX = store.value.innerPaddingX ?? 20;
  store.value.innerPaddingY = store.value.innerPaddingY ?? 24;
  store.value.lineHeight = store.value.lineHeight || 20;
  store.value.paddingX = store.value.paddingX ?? 32;
  store.value.paddingY = store.value.paddingY ?? 32;
  store.value.shadowOverlay = store.value.shadowOverlay || "none";
  store.value.showLineNumbers = store.value.showLineNumbers ?? true;
  store.value.socialIcon = store.value.socialIcon ?? "x";
  store.value.showParticles = store.value.showParticles ?? true;
  store.value.showWatermark = store.value.showWatermark ?? true;
  store.value.showWindow = store.value.showWindow ?? true;
  store.value.solidBackground = store.value.solidBackground ?? "hsl(0, 0%, 0%)";
  store.value.useCustomTheme = store.value.useCustomTheme ?? false;
  store.value.watermark = store.value.watermark ?? "chalk.ist";
  store.value.watermarkOpacity = store.value.watermarkOpacity || 50;
  store.value.windowNoise = store.value.windowNoise ?? false;
  store.value.windowStyle = store.value.windowStyle || "variant-1";
  store.value.windowBackgroundOpacity =
    store.value.windowBackgroundOpacity ?? 90;
  store.value.windowShadows = store.value.windowShadows ?? 100;
  store.value.windowHighlights = store.value.windowHighlights ?? 29;
  store.value.windowBorderRadius = store.value.windowBorderRadius ?? 6;
  store.value.windowControls =
    store.value.windowControls ?? WindowControls.MacOutline;
  store.value.customTheme = store.value.customTheme || {
    foreground: "hsla(0, 2%, 18%, 0.7)",
    variable: "hsla(0, 0%, 100%, .4)",
    comment: "hsla(0, 0%, 100%, .3)",
    keyword: "hsla(0, 0%, 100%, .55)",
    punctuation: "hsla(0, 0%, 100%, .7)",
    string: "hsla(0, 0%, 100%, .5)",
    number: "hsla(0, 0%, 100%, .7)",
    regexp: "hsla(0, 0%, 100%, .7)",
    function: "hsla(0, 0%, 100%, .8)",
    operator: "hsla(0, 0%, 100%, .4)",
  };
  persistentState.value.blocks = persistentState.value.blocks.map((block) => {
    if (block.type === BlockType.Code) {
      return {
        ...block,
        mode: block.mode ?? "edit",
        icon: block.icon === undefined ? "" : block.icon,
        transformations: block.transformations || [],
      };
    }
    return block;
  });
}
