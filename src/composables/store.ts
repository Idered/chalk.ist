import { initialBlocks, initialFiles, initialFrames } from "./initial-data";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { DEFAULT_THEME } from "~/constants";
import { WindowControls } from "~/enums";
import { Backdrops } from "~/lib/backdrops";

type EditMode = "code" | "focus" | "add" | "remove" | "highlight" | "annotate";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      files: useStorage("files", initialFiles),
      frames: useStorage("frames", initialFrames),
      blocks: useStorage("blocks", initialBlocks),
      current_file: useStorage("files.active", initialFiles[0].id),
      current_frame: useStorage("frames.active", initialFrames[0].id),
      current_block: useStorage("blocks.active", ""),
    };
  },
});

export const store = useStorage("chalk-store", {
  currentThemeSupportsWindowVariants: true,
  currentTheme: DEFAULT_THEME,
  customTheme: {
    foreground: "hsla(0, 0%, 100%, 0.7)",
    variable: "hsla(0, 0%, 100%, .4)",
    comment: "hsla(0, 0%, 100%, .3)",
    keyword: "hsla(0, 0%, 100%, .55)",
    punctuation: "hsla(0, 0%, 100%, .7)",
    string: "hsla(0, 0%, 100%, .5)",
    number: "hsla(0, 0%, 100%, .7)",
    regexp: "hsla(0, 0%, 100%, .7)",
    function: "hsla(0, 0%, 100%, .8)",
    operator: "hsla(0, 0%, 100%, .4)",
  },
  useAltBackground: false,
  backdrop: "Vue" as keyof typeof Backdrops,
  backdropNoise: false,
  colorTheme: "Vue",
  editMode: "code" as EditMode,
  expandBackdrops: true,
  expandTwitterOptions: false,
  expandCustomThemeOptions: false,
  expandWatermarkOptions: false,
  fontFamily: "JetBrains Mono",
  fontSize: 13,
  fontLigatures: true,
  frameHeight: 0,
  frameWidth: 720,
  showAlternatives: true,
  language: "typescript",
  lineHeight: 20,
  name: "",
  paddingX: 16,
  paddingY: 16,
  picture: "",
  reflection: true,
  useCustomTheme: false,
  showBackground: true,
  showLineNumbers: true,
  showParticles: true,
  watermark: "chalk.ist",
  watermarkOpacity: 50,
  showWatermark: true,
  showTwitterBadge: true,
  username: "",
  windowControls: WindowControls.MacOutline,
  windowNoise: false,
  windowStyle: "variant-1",
});
