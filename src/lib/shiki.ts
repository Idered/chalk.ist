import { Highlighter, bundledLanguages, getHighlighter } from "shiki";
import { onMounted, ref } from "vue";
import { chalkistThemes, portedThemes, shikiThemes } from "~/lib/themes";

const shiki = ref<Highlighter>();

export function useShiki() {
  onMounted(async () => {
    if (!shiki.value) {
      shiki.value = await getHighlighter({
        themes: [
          ...chalkistThemes,
          ...portedThemes,
          ...shikiThemes.map((theme) => theme.import),
        ],
        langs: Object.keys(bundledLanguages),
      });
    }
  });

  return shiki;
}
