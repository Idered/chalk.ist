import { runStoreMigrations } from "./migrations";
import { useStorage } from "@vueuse/core";
import { v4 } from "uuid";
import { ref } from "vue";
import { DEFAULT_CONTENT, DEFAULT_THEME } from "~/constants";
import { BlockType, WindowControls } from "~/enums";
import { Backdrops } from "~/lib/backdrops";
import { Block } from "~/types";

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
      id: v4(),
      content: DEFAULT_CONTENT,
      language: "typescript",
      type: BlockType.Code,
      title: "",
      columnSpan: 12,
      rowSpan: 1,
      mode: "edit",
      transformations: [],
    },
  ] as Block[],
  backdrop: "Vue" as keyof typeof Backdrops,
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
  expandTwitterOptions: true,
  expandCustomThemeOptions: true,
  expandWatermarkOptions: true,
  fontFamily: "JetBrains Mono",
  fontSize: 13,
  fontLigatures: true,
  frameHeight: 0,
  frameWidth: 720,
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

runStoreMigrations();
