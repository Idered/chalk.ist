import { createSharedComposable } from "@vueuse/core";
import {
  type HighlighterCore,
  createHighlighterCore,
  createOnigurumaEngine,
  bundledLanguages,
  type BundledLanguage,
} from "shiki";
import { onMounted, ref } from "vue";
import { chalkistThemes, portedThemes, shikiThemes } from "~/lib/themes";

const shiki = ref<HighlighterCore>();
const engine = createOnigurumaEngine(import("shiki/wasm"));
const themes = [
  ...chalkistThemes,
  ...portedThemes,
  ...shikiThemes.map((theme) => theme.import),
];

const loadedLanguages = ref<Set<string>>(new Set());
const loadingLanguages = ref<Set<string>>(new Set());
const isReady = ref(false);

export const useShiki = createSharedComposable(() => {
  onMounted(async () => {
    if (!shiki.value) {
      shiki.value = await createHighlighterCore({ engine, themes });
      isReady.value = true;
    }
  });

  async function loadLanguage(lang: string) {
    if (!shiki.value || loadedLanguages.value.has(lang)) return;
    if (loadingLanguages.value.has(lang)) {
      // Wait for language to finish loading
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (!loadingLanguages.value.has(lang)) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      });
      return;
    }

    try {
      loadingLanguages.value.add(lang);
      const bundledLang = bundledLanguages[lang as BundledLanguage];

      if (!bundledLang) {
        console.warn(`Language ${lang} not found in bundled languages`);
        return;
      }
      await shiki.value.loadLanguage(bundledLang);
      loadedLanguages.value.add(lang);
    } catch (err) {
      console.error(`Error loading language ${lang}:`, err);
      throw err;
    } finally {
      loadingLanguages.value.delete(lang);
    }
  }

  function isLanguageLoaded(lang: string) {
    return loadedLanguages.value.has(lang);
  }

  function isLanguageLoading(lang: string) {
    return loadingLanguages.value.has(lang);
  }

  return {
    shiki,
    loadLanguage,
    isLanguageLoaded,
    isLanguageLoading,
    isReady,
  };
});
