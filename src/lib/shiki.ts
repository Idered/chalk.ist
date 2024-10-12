import {
  HighlighterCore,
  createHighlighterCore,
  createOnigurumaEngine,
} from "shiki";
import { onMounted, ref } from "vue";
import { chalkistThemes, portedThemes, shikiThemes } from "~/lib/themes";

const shiki = ref<HighlighterCore>();

export function useShiki() {
  onMounted(async () => {
    if (!shiki.value) {
      shiki.value = await createHighlighterCore({
        engine: createOnigurumaEngine(import("shiki/wasm")),
        themes: [
          ...chalkistThemes,
          ...portedThemes,
          ...shikiThemes.map((theme) => theme.import),
        ],
      });
    }
  });

  return shiki;
}
