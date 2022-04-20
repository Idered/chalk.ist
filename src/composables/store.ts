import { useStorage } from "@vueuse/core";
import * as themes from "~/themes";
import { computed, ref } from "vue";
import { ChalkTheme } from "./theme-utils";
import { DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";

export const store = useStorage("chalk-store", {
  currentTheme: DEFAULT_THEME,
  language: "typescript",
  name: "",
  username: "",
  diff: false,
  picture: "",
  showTwitterBadge: true,
  expandTwitterOptions: true,
  showBackground: true,
  reflection: true,
  showWindowControls: true,
  modifiedContent: "",
  paddingX: 72,
  paddingY: 64,
  frameHeight: 0,
  frameWidth: 720,
  content: DEFAULT_CONTENT,
});

export const editorWidth = computed(() => store.value.frameWidth - store.value.paddingX * 2 - 20 * 2);
export const isExporting = ref(false);
export const theme = computed(() => (themes as Record<string, ChalkTheme>)[store.value.currentTheme]);

// Data migrations
store.value.showWindowControls = store.value.showWindowControls ?? true;
store.value.paddingX = store.value.paddingX || 32;
store.value.paddingY = store.value.paddingY || 32;
store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
