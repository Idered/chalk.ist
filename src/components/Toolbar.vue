<script setup lang="ts">
import { getCodeBlocks } from "~/lib/block";
import { persistentState } from "~/lib/persistent-state";
import { BlockType } from "~/lib/enums";
import { state } from "~/lib/state";

defineProps<{
  frameWidth: number;
}>();
</script>

<template>
  <div
    class="flex items-center justify-center overflow-hidden px-2 pt-2 pwa:sm:border-t pwa:sm:border-t-slate-900 pwa:sm:shadow-[inset_0_1px_0_rgb(30_30_37)]"
  >
    <div
      class="overflow-auto rounded-full border border-slate-700 bg-slate-800 px-3 py-2"
    >
      <div class="flex max-w-[100vw] items-center space-x-1">
        <Button
          @click="state.editMode = 'code'"
          class="h-6 rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              state.editMode === 'code',
          }"
        >
          Edit
        </Button>

        <Button
          @click="state.editMode = 'highlight'"
          class="h-6 rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              state.editMode === 'highlight',
          }"
        >
          Highlight
        </Button>

        <Button
          @click="state.editMode = 'focus'"
          class="h-6 rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              state.editMode === 'focus',
          }"
        >
          Focus
        </Button>

        <Button
          @click="state.editMode = 'add'"
          class="h-6 whitespace-nowrap rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              state.editMode === 'add',
          }"
        >
          Diff: Add
        </Button>

        <Button
          @click="state.editMode = 'remove'"
          class="h-6 whitespace-nowrap rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              state.editMode === 'remove',
          }"
        >
          Diff: Remove
        </Button>

        <Button
          @click="
            persistentState.blocks.forEach((item) => {
              if (item.type !== BlockType.Code) {
                return;
              }

              item.transformations = [];
            })
          "
          class="h-6 rounded-full px-2 enabled:hover:text-slate-100 disabled:opacity-50"
          :disabled="
            getCodeBlocks().every((item) => item.transformations.length === 0)
          "
        >
          Clear
        </Button>
      </div>
    </div>
  </div>
</template>
