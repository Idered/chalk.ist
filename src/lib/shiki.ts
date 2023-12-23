import { HighlighterCore, getHighlighterCore } from "shikiji/core";
import { getWasmInlined } from "shikiji/wasm";
import { onMounted, ref } from "vue";
import { LANGUAGES } from "~/constants";
import { themes } from "~/lib/themes";

const shiki = ref<HighlighterCore>();

export function useShiki() {
  onMounted(async () => {
    if (!shiki.value)
      shiki.value = await getHighlighterCore({
        themes,
        langs: LANGUAGES.map((lang) => lang.lang),
        loadWasm: getWasmInlined,
      });
  });

  return shiki;
}
