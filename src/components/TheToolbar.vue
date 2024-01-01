<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import { getCodeBlocks } from "~/composables/block";
import { preview, store } from "~/composables/store";
import { BlockType } from "~/enums";

defineProps<{
  frameWidth: number;
}>();
</script>

<template>
  <div
    v-if="!preview"
    class="sticky top-0 z-[100] -mx-1 flex items-center justify-between border-b border-slate-700 bg-slate-800 px-3 py-3 pwa:sm:border-t pwa:sm:border-t-slate-900 pwa:sm:shadow-[inset_0_1px_0_rgb(30_30_37)]"
  >
    <div class="flex max-w-[100vw] flex-wrap items-center space-x-1">
      <BaseButton
        @click="store.editMode = 'code'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{
          'bg-slate-50 text-slate-900 hover:text-slate-900':
            store.editMode === 'code',
        }"
      >
        Edit
      </BaseButton>

      <!-- <BaseButton
        @click="store.editMode = 'annotate'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'annotate' }"
      >
        Annotate
      </BaseButton> -->

      <BaseButton
        @click="store.editMode = 'highlight'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{
          'bg-slate-50 text-slate-900 hover:text-slate-900':
            store.editMode === 'highlight',
        }"
      >
        Highlight
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'focus'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{
          'bg-slate-50 text-slate-900 hover:text-slate-900':
            store.editMode === 'focus',
        }"
      >
        Focus
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'add'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{
          'bg-slate-50 text-slate-900 hover:text-slate-900':
            store.editMode === 'add',
        }"
      >
        Diff: Add
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'remove'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{
          'bg-slate-50 text-slate-900 hover:text-slate-900':
            store.editMode === 'remove',
        }"
      >
        Diff: Remove
      </BaseButton>

      <BaseButton
        @click="
          store.blocks.forEach((item) => {
            if (item.type !== BlockType.Code) {
              return;
            }

            item.transformations = [];
          })
        "
        class="h-6 px-2 enabled:hover:text-slate-100 disabled:opacity-50"
        :disabled="
          getCodeBlocks().every((item) => item.transformations.length === 0)
        "
      >
        Clear
      </BaseButton>
    </div>

    <div
      class="hidden h-6 items-center whitespace-nowrap rounded bg-slate-700 px-2.5 text-[11px] font-bold uppercase tracking-wider text-white/75 transition lg:grid"
    >
      {{ frameWidth }} x {{ store.frameHeight }}
    </div>
  </div>
</template>
