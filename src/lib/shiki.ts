import { HighlighterCore, getHighlighterCore } from "shikiji/core";
import { getWasmInlined } from "shikiji/wasm";
import { onMounted, ref } from "vue";
import { LANGUAGES } from "~/constants";
import { chalkistThemes, shikijiThemes } from "~/lib/themes";

const shiki = ref<HighlighterCore>();

export function useShiki() {
  onMounted(async () => {
    if (!shiki.value) {
      shiki.value = await getHighlighterCore({
        themes: [...chalkistThemes, ...shikijiThemes.map((theme) => theme.import)],
        langs: LANGUAGES.map((lang) => lang.lang),
        loadWasm: getWasmInlined,
      });
    }
  });

  return shiki;
}
