<script setup lang="ts">
import IconTwitterCircle from "./IconTwitterCircle.vue";
import { computed } from "vue";
import { preview, store } from "~/composables/store";

const author = computed(() => {
  return preview.value ? preview.value : store.value;
});
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="h-10" v-if="store.showWatermark">
      <div
        class="text-white z-10 absolute left-2 bottom-2 font-medium tracking-wide [text-shadow:0_1px_1px_black]"
        :style="{
          opacity: store.watermarkOpacity / 100,
        }"
      >
        {{ store.watermark }}
      </div>
    </div>
    <component
      :is="author.username ? 'a' : 'div'"
      :href="
        author.username ? `https://twitter.com/${author.username}` : undefined
      "
      class="relative z-10 ml-auto mt-4 flex items-center rounded-full bg-black/70 p-1 text-white"
      :class="{
        'hover:bg-black/50': author.username,
      }"
      v-if="
        (author.username || author.name || author.picture) &&
        author.showTwitterBadge
      "
    >
      <img
        v-if="author.picture"
        :src="author.picture"
        width="32"
        height="32"
        class="rounded-full"
        alt=""
      />
      <IconTwitterCircle v-else :width="32" />
      <div v-if="author.name || author.username" class="ml-2 pr-4">
        <div class="text-xs font-semibold" v-if="author.name">
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
