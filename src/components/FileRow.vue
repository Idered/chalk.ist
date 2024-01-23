<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { FileRecord } from "~/lib/records/FileRecord";

const props = defineProps<{
  file: FileRecord;
}>();

const isRenaming = ref(false);
const newName = ref("");
const input = ref<HTMLInputElement>();

function handleDblClick() {
  isRenaming.value = true;
  newName.value = props.file.name;
  nextTick(() => {
    input.value?.select();
  });
}

function handleCommit() {
  isRenaming.value = false;
  if (newName.value === props.file.name || newName.value.trim() === "") {
    return;
  }
  props.file.rename(newName.value);
}

function handleRemove() {
  props.file.remove().$model.first()?.select().frames.first()?.select();
  props.file.frames[0]?.select();
}

function handleCancel() {
  isRenaming.value = false;
  newName.value = "";
}
</script>

<template>
  <div class="">
    <div class="item font-semibold group/file" @click="file.select">
      <div class="w-4 flex items-center justify-center">
        <radix-icons:file class="shrink-0 w-3 h-3 -translate-y-px" />
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
        <div v-else class="truncate">{{ file.name }}</div>
      </div>
      <div
        class="pr-2 opacity-0 group-hover/file:opacity-100 flex w-0 group-hover/file:w-auto"
      >
        <button
          class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
          @click.stop="handleRemove"
        >
          <radix-icons:cross-1 class="shrink-0 w-3 h-3" />
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.item {
  @apply relative flex h-8 items-center pl-4 hover:after:pointer-events-none hover:after:absolute hover:after:inset-0 hover:after:border hover:after:border-blue-600;
}
</style>
