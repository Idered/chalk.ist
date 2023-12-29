<script setup lang="ts">
import { useTextareaAutosize } from "@vueuse/core";
import { onMounted } from "vue";

defineProps<{
  start: number;
  end: number;
}>();

const { textarea, input } = useTextareaAutosize();

onMounted(() => {
  textarea.value.focus();
});
</script>

<template>
  <div class="bg-black border border-white/[.15] rounded px-2 py-1 relative z-10 flex leading-5">
    <div
      class="absolute bottom-full left-0 overflow-hidden w-full"
      :style="{
        left: `calc(${start} * var(--character-width) - 4px)`,
      }"
    >
      <div
        class="w-[10px] h-[10px] bg-black border-white/[.15] border origin-bottom-left pointer-events-none"
        :style="{
          left: `calc(${start} * var(--character-width) - 4px)`,
          transform: ' rotate(45deg)',
        }"
      />
    </div>
    <textarea
      ref="textarea"
      v-model="input"
      class="w-full block bg-transparent resize-none focus:outline-none"
      placeholder="Annotation..."
    />
    <!-- X icon -->
    <button
      @click.stop="$emit('remove')"
      class="flex items-center justify-center hover:opacity-100 opacity-50 transition-opacity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
        <path
          fill="currentColor"
          d="M208.5 191.5a12 12 0 0 1 0 17a12.1 12.1 0 0 1-17 0L128 145l-63.5 63.5a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L111 128L47.5 64.5a12 12 0 0 1 17-17L128 111l63.5-63.5a12 12 0 0 1 17 17L145 128Z"
        />
      </svg>
    </button>
  </div>
</template>
