<script setup lang="ts">
import IconTwitterCircle from "./IconTwitterCircle.vue";
import { computed } from "vue";
import { store, preview } from "~/composables/store";

const author = computed(() => {
  return preview.value ? preview.value : store.value;
});
</script>

<template>
  <div class="flex">
    <component
      :is="author.username ? 'a' : 'div'"
      :href="author.username ? `https://twitter.com/${author.username}` : undefined"
      class="rounded-full z-10 relative p-1 bg-black/70 text-white mt-4 flex items-center ml-auto"
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
