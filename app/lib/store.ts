import { runMigrations } from "./migrations";
import { useStorage } from "@vueuse/core";
import { SHADOW_OVERLAY_MAPPING } from "~/lib/constants";
import { WindowControls } from "~/lib/enums";
import { Backdrops } from "~/lib/backdrops";

const customTheme = {
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
};

export const store = useStorage("chalk-store", {
  backdrop: "R3" as keyof typeof Backdrops,
  backdropNoise: false,
  colorTheme: "Vue",
  customTheme,
  fontFamily: "JetBrains Mono",
  fontLigatures: true,
  fontSize: 13,
  frameHeight: 0,
  frameWidth: 720,
  innerPaddingX: 20,
  innerPaddingY: 24,
  lineHeight: 20,
  name: "",
  paddingX: 80,
  paddingY: 80,
  picture: "",
  reflection: true,
  shadowOverlay: "none" as keyof typeof SHADOW_OVERLAY_MAPPING,
  showBackground: true,
  showLineNumbers: true,
  showParticles: true,
  showTwitterBadge: false,
  socialIcon: "x",
  showWatermark: false,
  showWindow: true,
  solidBackground: "hsl(0, 0%, 0%)",
  useCustomTheme: false,
  username: "",
  watermark: "chalk.ist",
  watermarkOpacity: 50,
  windowControls: WindowControls.MacOutline,
  windowBackgroundOpacity: 90,
  windowHighlights: 29,
  windowShadows: 100,
  windowBorderRadius: 6,
  windowNoise: false,
  windowStyle: "variant-1",
  lightWindowStyle: "variant-1",
});

runMigrations();

export type Store = typeof store.value;
