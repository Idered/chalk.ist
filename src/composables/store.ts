import { useStorage } from "@vueuse/core";
import * as themes from "~/themes";
import { computed, ref, watch } from "vue";
import { createTheme, Theme } from "./theme-utils";
import { DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";

export const preview = ref<{
  content: string;
  language: string;
  theme: string;
  name: string;
  username: string;
  paddingX: number;
  paddingY: number;
  frameWidth: number;
  picture: string;
  reflection: boolean;
  showTwitterBadge: boolean;
  showLineNumbers: boolean;
  showWindowControls: boolean;
} | null>(null);

export const store = useStorage("chalk-store", {
  currentTheme: DEFAULT_THEME,
  language: "typescript",
  name: "",
  username: "",
  diff: false,
  picture: "",
  showTwitterBadge: true,
  expandTwitterOptions: true,
  expandSupportSection: true,
  showBackground: true,
  reflection: true,
  showLineNumbers: true,
  showWindowControls: true,
  modifiedContent: "",
  paddingX: 72,
  paddingY: 64,
  frameHeight: 0,
  frameWidth: 720,
  content: DEFAULT_CONTENT,
});

export const editorWidth = computed(
  () =>
    (preview.value ? preview.value.frameWidth : store.value.frameWidth) -
    (preview.value ? preview.value.paddingX : store.value.paddingX) * 2 -
    20 * 2
);
export const isExporting = ref(false);
export const theme = ref(
  createTheme((themes as Record<string, Theme>)[preview.value ? preview.value.theme : store.value.currentTheme])
);

watch(
  () => store.value.currentTheme,
  (newTheme) => {
    theme.value = createTheme((themes as Record<string, Theme>)[newTheme]);
  }
);
// export let theme = computed(() => {
//   return createTheme((themes as Record<string, Theme>)[preview.value ? preview.value.theme : store.value.currentTheme]);
// });

// Data migrations
store.value.showLineNumbers = store.value.showLineNumbers ?? true;
store.value.showWindowControls = store.value.showWindowControls ?? true;
store.value.expandSupportSection = store.value.expandSupportSection ?? true;
store.value.paddingX = store.value.paddingX || 32;
store.value.paddingY = store.value.paddingY || 32;
store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;

if (import.meta.hot) {
  import.meta.hot.accept("../themes/index.ts", (newModule) => {
    theme.value = createTheme((newModule as Record<string, Theme>)[store.value.currentTheme]);
  });
}
