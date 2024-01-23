<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { BlockRecord } from "~/lib/records/BlockRecord";

const props = defineProps<{
  block: BlockRecord;
}>();

const isRenaming = ref(false);
const newName = ref("");
const input = ref<HTMLInputElement>();

function handleDblClick() {
  isRenaming.value = true;
  newName.value = props.block.title;
  nextTick(() => {
    input.value?.select();
  });
}

function handleCommit() {
  isRenaming.value = false;
  if (newName.value === props.block.title || newName.value.trim() === "") {
    return;
  }
  props.block.rename(newName.value);
}

function handleCancel() {
  isRenaming.value = false;
  newName.value = "";
}

async function handleRowClick() {
  props.block.frame.select();
  await nextTick();
  const editor = document.querySelector<HTMLDivElement>(
    `[data-block="${props.block.id}"] .editor`,
  );
  editor?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  editor?.focus();
}
</script>

<template>
  <div
    class="item pl-9 group/block"
    @click="handleRowClick"
    @dblclick="handleDblClick"
  >
    <div class="w-4 flex items-center justify-center">
      <radix-icons:box class="shrink-0 w-3 h-3" />
    </div>
    <div class="pl-2 flex-1 pr-1.5 min-w-0">
      <input
        ref="input"
        v-if="isRenaming"
        v-model="newName"
        class="w-full bg-transparent text-white font-semibold outline-none focus:ring h-5 leading-5"
        @keydown.enter="handleCommit"
        @keydown.esc="handleCancel"
        @blur="handleCommit"
      />
      <div v-else class="truncate">{{ block.title || "Block" }}</div>
    </div>
    <div
      class="pr-2 opacity-0 group-hover/block:opacity-100 w-0 group-hover/block:w-auto"
    >
      <button
        class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
        @click.stop="block.remove"
      >
        <radix-icons:cross-1 class="shrink-0 w-3 h-3" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.item {
  @apply relative flex h-8 items-center pl-9 hover:after:pointer-events-none hover:after:absolute hover:after:inset-0 hover:after:border hover:after:border-blue-600;
}
</style>
