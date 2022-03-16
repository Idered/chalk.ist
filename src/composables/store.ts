import { useStorage } from "@vueuse/core";
import * as themes from "~/themes";
import { computed, ref } from "vue";
import { ChalkTheme } from "./theme-utils";
import { DEFAULT_CONTENT, DEFAULT_THEME } from "~/constants";

export const store = useStorage("chalk-store", {
  currentTheme: DEFAULT_THEME,
  language: "typescript",
  username: "",
  diff: false,
  hideTwitterFollow: false,
  reflection: true,
  modifiedContent: "",
  content: DEFAULT_CONTENT,
});

export const isEditorReady = ref(false);
export const theme = computed(
  () => (themes as Record<string, ChalkTheme>)[store.value.currentTheme]
);
