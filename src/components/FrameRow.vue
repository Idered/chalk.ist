<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { FrameRecord } from "~/lib/records/FrameRecord";

const props = defineProps<{
  frame: FrameRecord;
}>();

const isRenaming = ref(false);
const newName = ref("");
const input = ref<HTMLInputElement>();

function handleDblClick() {
  isRenaming.value = true;
  newName.value = props.frame.name;
  nextTick(() => {
    input.value?.select();
  });
}

function handleCommit() {
  isRenaming.value = false;
  if (newName.value === props.frame.name || newName.value.trim() === "") {
    return;
  }
  props.frame.rename(newName.value);
}

function handleRemove() {
  props.frame.remove();
  props.frame.file.frames[0]?.select();
}

function handleCancel() {
  isRenaming.value = false;
  newName.value = "";
}
</script>

<template>
  <div class="item font-semibold group/frame" @click="frame.select">
    <div
      class="h-8 w-4 flex items-center justify-center"
      @click.stop="frame.toggleExpand"
    >
      <radix-icons:triangle-right
        class="w-3 h-3 -translate-y-px transition-transform"
        :class="{ 'rotate-90': frame.isExpanded }"
      />
    </div>
    <div class="w-4 flex items-center justify-center">
      <radix-icons:frame class="shrink-0 w-3 h-3 -translate-y-px" />
    </div>
    <div @dblclick="handleDblClick" class="pl-2 flex-1 pr-1.5 min-w-0">
      <input
        ref="input"
        v-if="isRenaming"
        v-model="newName"
        class="w-full bg-transparent text-white font-semibold outline-none focus:ring h-5 leading-5"
        @keydown.enter="handleCommit"
        @keydown.esc="handleCancel"
        @blur="handleCommit"
      />
      <div v-else class="truncate">{{ frame.name }}</div>
    </div>
    <div
      class="pr-2 opacity-0 group-hover/frame:opacity-100 flex w-0 group-hover/frame:w-auto"
    >
      <button
        class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
        @click.stop="frame.select().addEditorBlock()"
      >
        <radix-icons:plus class="shrink-0 w-4 h-4" />
      </button>
      <button
        class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
        @click.stop="handleRemove"
      >
        <radix-icons:cross-1 class="shrink-0 w-3 h-3" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.item {
  @apply relative flex h-8 items-center hover:after:pointer-events-none hover:after:absolute hover:after:inset-0 hover:after:border hover:after:border-blue-600;
}
</style>
