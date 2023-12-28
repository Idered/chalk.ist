<script setup lang="ts">
import { preview, store } from "~/composables/store";
import BaseButton from "./BaseButton.vue";
import { BlockType } from "~/enums";

defineProps<{
  frameWidth: number;
}>();
</script>

<template>
  <div
    v-if="!preview"
    class="flex items-center justify-between -mx-1 px-3 py-3 border-b border-slate-700 bg-slate-800 sticky top-0 z-10"
  >
    <div class="flex flex-wrap items-center space-x-1 max-w-[100vw]">
      <BaseButton
        @click="store.editMode = 'code'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'code' }"
      >
        Edit
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'highlight'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'highlight' }"
      >
        Highlight
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'focus'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'focus' }"
      >
        Focus
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'add'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'add' }"
      >
        Diff: Add
      </BaseButton>

      <BaseButton
        @click="store.editMode = 'remove'"
        class="h-6 px-2 hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'remove' }"
      >
        Diff: Remove
      </BaseButton>

      <BaseButton
        @click="
          store.blocks = store.blocks.map((item) =>
            item.type === BlockType.Code ? { ...item, transformations: [] } : item
          )
        "
        class="h-6 px-2 disabled:opacity-50 enabled:hover:text-slate-100"
        :disabled="store.blocks.every((item) => item.transformations.length === 0)"
      >
        Clear
      </BaseButton>
    </div>

    <div
      class="bg-slate-700 text-white/75 text-[11px] uppercase font-bold tracking-wider px-2.5 h-6 transition hidden lg:grid items-center rounded whitespace-nowrap"
    >
      {{ frameWidth }} x {{ store.frameHeight }}
    </div>
  </div>
</template>
