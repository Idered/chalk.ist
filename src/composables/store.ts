import { useStorage } from "@vueuse/core";
import * as themes from "~/themes";
import { computed, ref } from "vue";
import { ChalkTheme } from "./theme-utils";
import { DEFAULT_CONTENT, DEFAULT_THEME } from "~/constants";

export const store = useStorage("chalk-store", {
  currentTheme: DEFAULT_THEME,
  language: "typescript",
  name: "",
  username: "",
  diff: false,
  picture: "",
  showTwitterBadge: true,
  expandTwitterOptions: true,
  enableTwitterFlyout: true,
  showBackground: true,
  reflection: true,
  modifiedContent: "",
  content: DEFAULT_CONTENT,
});

export const showTwitterFlyout = ref(false);
export const isExporting = ref(false);
export const theme = computed(
  () => (themes as Record<string, ChalkTheme>)[store.value.currentTheme]
);
