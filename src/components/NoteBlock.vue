<script setup lang="ts">
// import { computed, watch } from "vue";
// import { exportState } from "~/composables/export-state";
// import { moveBlock, removeBlock, store } from "~/composables/store";
// import IconChevronDown from "./IconChevronDown.vue";
// import BaseInput from "./BaseInput.vue";
// import { useTextareaAutosize } from "@vueuse/core";
// import { BlockType, ExportState } from "~/enums";

// const props = defineProps<{
//   blockId: string;
// }>();

// const blockItem = computed(() => {
//   return store.value.blocks.find((block) => block.id === props.blockId)!;
// });
// const { textarea, triggerResize } = useTextareaAutosize();

// watch(
//   () => blockItem.value.content,
//   () => {
//     triggerResize();
//   }
// );
</script>

<template>
  <div></div>
  <!-- <div class="grid gap-y-2" v-if="blockItem.type === BlockType.Note">
    <div
      v-if="[ExportState.Idle, ExportState.JustCopied].includes(exportState) && blockItem"
      class="flex gap-1 flex-wrap absolute opacity-20 hover:opacity-100 transition-opacity bottom-0"
    >
      <div>
        <BaseInput type="number" v-model="blockItem.fontSize" placeholder="Font Size" />
      </div>

      <input
        type="color"
        v-model="blockItem.fontColor"
        class="border-none outline-none bg-transparent p-0 m-0 appearance-none"
      />

      <BaseSelect
        class="w-28"
        use-opaque-background
        :model-value="blockItem.columnSpan"
        @update:model-value="blockItem.columnSpan = $event"
        :label="(option) => `${option.value} columns`"
        :options="COLUMN_OPTIONS"
      />

      <button
        @click="() => moveBlock(blockItem.id, -1)"
        class="btn"
        type="button"
        title="Move left"
        :disabled="store.blocks.indexOf(blockItem) === 0"
      >
        <IconChevronDown title="Move left" class="w-2.5 rotate-90" />
      </button>

      <button
        @click="() => moveBlock(blockItem.id, 1)"
        class="btn"
        type="button"
        title="Move right"
        :disabled="store.blocks.indexOf(blockItem) === store.blocks.length - 1"
      >
        <IconChevronDown title="Move right" class="w-2.5 -rotate-90" />
      </button>

      <button
        @click="() => removeBlock(blockItem.id)"
        class="btn"
        type="button"
        title="Remove"
        :disabled="store.blocks.length === 1"
      >
        <svg title="Remove" class="w-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
          />
        </svg>
      </button>
    </div>

    <textarea
      ref="textarea"
      class="bg-transparent resize-none"
      v-model="blockItem.content"
      :style="{ fontSize: `${blockItem.fontSize}px`, color: blockItem.fontColor }"
    ></textarea>
  </div> -->
</template>
