import {
  type HighlighterCore,
  createHighlighterCore,
  createOnigurumaEngine,
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

export function useShiki() {
  onMounted(async () => {
    if (!shiki.value) {
      shiki.value = await createHighlighterCore({
        engine,
        themes,
      });
    }
  });

  return shiki;
}
