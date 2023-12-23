<script setup lang="ts">
import IconTwitterCircle from "./IconTwitterCircle.vue";
import { computed } from "vue";
import { store, preview, addEditorBlock } from "~/composables/store";
import BaseButton from "./BaseButton.vue";
import { exportState } from "~/composables/export-state";
import { ExportState } from "~/enums";

const author = computed(() => {
  return preview.value ? preview.value : store.value;
});
</script>

<template>
  <div class="flex justify-between">
    <BaseButton
      v-if="exportState === ExportState.Idle && !preview"
      class="pl-2 pr-4 z-10 relative border rounded-full text-white bg-black/80 mt-4 border-slate-600/30 text-slate-500 hover:bg-black/90 hover:border-slate-600/40 group"
      @click="() => addEditorBlock()"
      :disabled="store.blocks.length >= 16"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
        <path
          fill="currentColor"
          d="M128 20a108 108 0 1 0 108 108A108.1 108.1 0 0 0 128 20Zm0 192a84 84 0 1 1 84-84a84.1 84.1 0 0 1-84 84Zm52-84a12 12 0 0 1-12 12h-28v28a12 12 0 0 1-24 0v-28H88a12 12 0 0 1 0-24h28V88a12 12 0 0 1 24 0v28h28a12 12 0 0 1 12 12Z"
        />
      </svg>
      Add block
    </BaseButton>

    <component
      :is="author.username ? 'a' : 'div'"
      :href="author.username ? `https://twitter.com/${author.username}` : undefined"
      class="rounded-full z-10 relative p-1 bg-black/70 text-white mt-4 flex items-center"
      :class="{
        'hover:bg-black/50': author.username,
      }"
      v-if="(author.username || author.name || author.picture) && author.showTwitterBadge"
    >
      <img v-if="author.picture" :src="author.picture" width="32" height="32" class="rounded-full" alt="" />
      <IconTwitterCircle v-else :width="32" />
      <div v-if="author.name || author.username" class="ml-2 pr-4">
        <div class="font-semibold text-xs" v-if="author.name">
          {{ author.name }}
        </div>
        <div
          class="font-medium leading-3"
          v-if="author.username"
          :class="{
            'text-sm': !author.name,
            'text-[11px] text-white/50': author.name,
          }"
        >
          @{{ author.username }}
        </div>
      </div>
    </component>
  </div>
</template>
