import { runStoreMigrations } from "./migrations";
import { useStorage } from "@vueuse/core";
import {
  DEFAULT_CONTENT,
  SHADOW_OVERLAY_MAPPING,
  WINDOW_STYLES,
} from "~/lib/constants";
import { BlockType, WindowControls } from "~/lib/enums";
import { Backdrops } from "~/lib/backdrops";
import { Block } from "~/types";

export const store = useStorage("chalk-store", {
  currentThemeSupportsWindowVariants: true,
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
  blocks: [
    {
      id: crypto.randomUUID(),
      content: DEFAULT_CONTENT,
      language: "typescript",
      type: BlockType.Code,
      title: "example.js",
      icon: "",
      columnSpan: 12,
      rowSpan: 1,
      mode: "edit",
      transformations: [],
    },
  ] as Block[],
  solidBackground: "hsl(0, 0%, 0%)",
  backdrop: "R3" as keyof typeof Backdrops,
  backdropNoise: false,
  colorTheme: "Vue",
  editMode: "code" as
    | "code"
    | "focus"
    | "add"
    | "remove"
    | "highlight"
    | "annotate",
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
  lastCopyMethod: "download_png",
  language: "typescript",
  lineHeight: 20,
  name: "",
  paddingX: 80,
  paddingY: 80,
  innerPaddingX: 20,
  innerPaddingY: 24,
  picture: "",
  reflection: true,
  useCustomTheme: false,
  showBackground: true,
  showLineNumbers: true,
  isResizingInnerPadding: false,
  showParticles: true,
  watermark: "chalk.ist",
  watermarkOpacity: 50,
  showWatermark: false,
  showTwitterBadge: false,
  username: "",
  windowControls: WindowControls.MacOutline,
  windowNoise: false,
  windowStyle: "variant-1",
  showWindow: true,
  shadowOverlay: "none" as keyof typeof SHADOW_OVERLAY_MAPPING,
  showUI: true,
});

runStoreMigrations();
