<script setup lang="ts">
import { moveBlock, removeBlock } from "~/lib/block";
import { state } from "~/lib/state";
import { COLUMN_OPTIONS, LANGUAGES, ROW_OPTIONS } from "~/lib/constants";
import { ExportState } from "~/lib/enums";
import type { CodeBlock } from "~/types";
import type { BundledLanguage } from "shiki/langs";
import { persistentState } from "~/lib/persistent-state";

const props = defineProps<{
  block: CodeBlock;
}>();

const setEditorLanguage = (language: BundledLanguage) => {
  props.block.language = language;
  props.block.mode = "edit";
};
</script>

<template>
  <div
    v-if="
      [ExportState.Idle, ExportState.JustCopied].includes(state.exportState) &&
      block
    "
    class="relative z-10 flex flex-wrap gap-1 rounded-b-md p-1"
    :style="{
      background: block.mode === 'preview' ? '#03000ADD' : 'transparent',
    }"
  >
    <Select
      class="w-28"
      use-opaque-background
      :model-value="block.columnSpan"
      @update:model-value="block.columnSpan = $event"
      :label="(option) => `${option.value} columns`"
      :options="COLUMN_OPTIONS"
    />

    <Select
      class="w-[5.5rem]"
      :model-value="block.rowSpan"
      use-opaque-background
      @update:model-value="block.rowSpan = $event"
      :label="
        (option) =>
          `${option.value} ${
            typeof option.value === 'number' && option.value > 1
              ? 'rows'
              : 'row'
          }`
      "
      :options="ROW_OPTIONS"
    />

    <Select
      class="w-32"
      use-opaque-background
      :model-value="block.language"
      @update:model-value="setEditorLanguage"
      :options="LANGUAGES"
    />

    <button
      @click="() => moveBlock(block.id, -1)"
      class="btn"
      type="button"
      title="Move left"
      :disabled="persistentState.blocks.indexOf(block) === 0"
    >
      <IconChevronDown title="Move left" class="w-2.5 rotate-90" />
    </button>

    <button
      @click="() => moveBlock(block.id, 1)"
      class="btn"
      type="button"
      title="Move right"
      :disabled="
        persistentState.blocks.indexOf(block) ===
        persistentState.blocks.length - 1
      "
    >
      <IconChevronDown title="Move right" class="w-2.5 -rotate-90" />
    </button>

    <button
      @click="() => removeBlock(block.id)"
      class="btn select-none"
      type="button"
      title="Remove"
      :disabled="persistentState.blocks.length === 1"
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

    <button
      v-if="['markdown', 'html'].includes(block.language)"
      @click="
        () => (block.mode = block.mode === 'preview' ? 'edit' : 'preview')
      "
      class="btn"
      type="button"
      title="Remove"
    >
      <div class="flex items-center" v-if="block.mode === 'edit'">
        <i-ph:eye class="w-4" />
        <span class="ml-2">Render</span>
      </div>
      <div class="flex items-center" v-else>
        <i-ph:eye-closed class="w-4" />
        <span class="ml-2">Edit</span>
      </div>
    </button>
  </div>
</template>
