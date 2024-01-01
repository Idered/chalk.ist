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
  showBackground: true,
  showLineNumbers: true,
  showParticles: true,
  showTwitterBadge: true,
  username: "",
  windowControls: WindowControls.MacOutline,
  windowNoise: false,
  windowStyle: "variant-1",
});

runStoreMigrations();
