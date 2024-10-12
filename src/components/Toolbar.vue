<script setup lang="ts">
import { getCodeBlocks } from "~/lib/block";
import { store } from "~/lib/store";
import { BlockType } from "~/enums";

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
        <BaseButton
          @click="store.editMode = 'code'"
          class="h-6 rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              store.editMode === 'code',
          }"
        >
          Edit
        </BaseButton>

        <!-- <BaseButton
        @click="store.editMode = 'annotate'"
        class="h-6 px-2 rounded-full hover:text-slate-100"
        :class="{ 'bg-slate-50 text-slate-900 hover:text-slate-900': store.editMode === 'annotate' }"
      >
        Annotate
      </BaseButton> -->

        <BaseButton
          @click="store.editMode = 'highlight'"
          class="h-6 rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              store.editMode === 'highlight',
          }"
        >
          Highlight
        </BaseButton>

        <BaseButton
          @click="store.editMode = 'focus'"
          class="h-6 rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              store.editMode === 'focus',
          }"
        >
          Focus
        </BaseButton>

        <BaseButton
          @click="store.editMode = 'add'"
          class="h-6 whitespace-nowrap rounded-full px-2 hover:text-slate-100"
          :class="{
            'bg-slate-50 text-slate-900 hover:text-slate-900':
              store.editMode === 'add',
          }"
        >
          Diff: Add
        </BaseButton>

        <BaseButton
          @click="store.editMode = 'remove'"
          class="h-6 whitespace-nowrap rounded-full px-2 hover:text-slate-100"
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
          class="h-6 rounded-full px-2 enabled:hover:text-slate-100 disabled:opacity-50"
          :disabled="
            getCodeBlocks().every((item) => item.transformations.length === 0)
          "
        >
          Clear
        </BaseButton>
      </div>
    </div>
  </div>
</template>
