import { useShiki } from "./shiki";
import markdownit from "markdown-it";
import { fromHighlighter } from "@shikijs/markdown-it";
import { computed } from "vue";
import { store } from "~/composables/store";

export function useMarkdown(content: string) {
  const shiki = useShiki();

  const md = computed(() => {
    if (!shiki.value) return;
    const m = markdownit({
      html: true,
    });
    return m.use(
      fromHighlighter(shiki.value as any, {
        theme: store.value.colorTheme,
        meta: {
          class: [].join(" "),
          tabindex: "-1",
        },
      }),
    );
  });

  return computed(() => md.value?.render(content));
}
