<script setup lang="ts">
import markdownit from "markdown-it";
import { fromHighlighter } from "@shikijs/markdown-it";
import { computed } from "vue";
import { moveBlock, removeBlock } from "~/lib/block";
import { exportState } from "~/lib/export-state";
import { store } from "~/lib/store";
import { COLUMN_OPTIONS } from "~/constants";
import { ExportState } from "~/enums";
import { Backdrops } from "~/lib/backdrops";
import { useShiki } from "~/lib/shiki";
import { NoteBlock } from "~/types";

defineProps<{
  block: NoteBlock;
}>();

const shiki = useShiki();

const md = computed(() => {
  if (!shiki.value) return;
  const m = markdownit();
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

const backdrop = computed(() => Backdrops[store.value.backdrop]);
</script>

<template>
  <div
    class="relative grid gap-y-2 rounded-md text-white"
    :style="{
      backgroundColor: '#03000a',
      backgroundImage: store.windowNoise ? 'url(/noise.png)' : undefined,
      backgroundSize: '182px',
      boxShadow: `
        0 0 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
        inset 0 0 0 1px rgba(255,255,255,${backdrop.lightsOpacity}),
        0 0 18px 1px rgba(0,0,0,.6)
      `,
      ...(backdrop.appStyle || {}),
    }"
  >
    <div class="px-4 pt-3">
      <!-- :style="{ fontSize: `${block.fontSize}px`, color: block.fontColor }" -->
      <div class="markdown" v-if="md" v-html="md.render(block.content)"></div>
    </div>

    <div
      v-if="[ExportState.Idle, ExportState.JustCopied].includes(exportState)"
      class="flex flex-wrap gap-1 px-1 pb-1"
    >
      <div>
        <BaseInput
          type="number"
          v-model="block.fontSize"
          placeholder="Font Size"
        />
      </div>

      <input
        type="color"
        v-model="block.fontColor"
        class="m-0 appearance-none border-none bg-transparent p-0 outline-none"
      />

      <BaseSelect
        class="w-28"
        use-opaque-background
        :model-value="block.columnSpan"
        @update:model-value="block.columnSpan = $event"
        :label="(option) => `${option.value} columns`"
        :options="COLUMN_OPTIONS"
      />

      <button
        @click="() => moveBlock(block.id, -1)"
        class="btn"
        type="button"
        title="Move left"
        :disabled="store.blocks.indexOf(block) === 0"
      >
        <IconChevronDown title="Move left" class="w-2.5 rotate-90" />
      </button>

      <button
        @click="() => moveBlock(block.id, 1)"
        class="btn"
        type="button"
        title="Move right"
        :disabled="store.blocks.indexOf(block) === store.blocks.length - 1"
      >
        <IconChevronDown title="Move right" class="w-2.5 -rotate-90" />
      </button>

      <button
        @click="() => removeBlock(block.id)"
        class="btn"
        type="button"
        title="Remove"
        :disabled="store.blocks.length === 1"
      >
        <svg
          title="Remove"
          class="w-2.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
