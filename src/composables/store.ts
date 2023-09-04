import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";
import { WindowControls } from "~/types";

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
  language: "typescript",
  name: "",
  username: "",
  windowStyle: "variant-1",
  fontFamily: "JetBrains Mono",
  fontLigatures: true,
  diff: false,
  picture: "",
  title: "",
  showTwitterBadge: true,
  expandTwitterOptions: true,
  expandSupportSection: true,
  showBackground: true,
  reflection: true,
  showLineNumbers: true,
  windowControls: WindowControls.MacOutline,
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
// export const theme = ref(
//   createTheme((themes as Record<string, Theme>)[preview.value ? preview.value.theme : store.value.currentTheme])
// );

// watch(
//   () => store.value.currentTheme,
//   async (newTheme) => {
//     await nextTick();
//     theme.value = createTheme((themes as Record<string, Theme>)[newTheme]);
//   }
// );

// Data migrations
store.value.showLineNumbers = store.value.showLineNumbers ?? true;
store.value.windowControls = store.value.windowControls ?? WindowControls.MacOutline;
store.value.expandSupportSection = store.value.expandSupportSection ?? true;
store.value.paddingX = store.value.paddingX || 32;
store.value.paddingY = store.value.paddingY || 32;
store.value.windowStyle = store.value.windowStyle || "variant-1";
store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
store.value.title = store.value.title || "";
store.value.fontFamily = store.value.fontFamily || "JetBrains Mono";
store.value.fontLigatures = store.value.fontLigatures || true;

// if (import.meta.hot) {
//   import.meta.hot.accept("../themes/index.ts", (newModule) => {
//     theme.value = createTheme((newModule as Record<string, Theme>)[store.value.currentTheme]);
//   });
// }
