<script setup lang="ts">
import { preview, store } from "~/composables/store";
import { CompiledTheme } from "~/composables/theme-utils";

defineProps<{
  theme: CompiledTheme;
  frameWidth: number;
}>();
</script>

<template>
  <div v-if="!preview" class="absolute bottom-full right-0 mb-2 flex space-x-2">
    <a
      :href="`${theme.inspirationUrl}?ref=chalk.ist`"
      target="_blank"
      v-if="theme.inspiration"
      class="bg-slate-700 text-white/75 hover:text-white text-[11px] font-bold px-2.5 h-6 transition flex space-x-1 rounded items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="16"
        height="16"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="#888888"
          d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
        ></path>
      </svg>
      <div>Theme inspired by {{ theme.inspiration }}</div>
    </a>
    <div
      class="bg-slate-700 text-white/75 text-[11px] uppercase font-bold tracking-wider px-2.5 h-6 transition grid items-center rounded"
    >
      {{ frameWidth }} x {{ store.frameHeight }}
    </div>
  </div>
</template>
