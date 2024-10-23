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
  <div
    class="relative z-10 flex rounded border border-white/[.15] bg-black px-2 py-1 leading-5"
  >
    <div
      class="absolute bottom-full left-0 w-full overflow-hidden"
      :style="{
        left: `calc(${start} * var(--character-width) - 4px)`,
      }"
    >
      <div
        class="pointer-events-none h-[10px] w-[10px] origin-bottom-left border border-white/[.15] bg-black"
        :style="{
          left: `calc(${start} * var(--character-width) - 4px)`,
          transform: ' rotate(45deg)',
        }"
      />
    </div>
    <textarea
      ref="textarea"
      v-model="input"
      class="block w-full resize-none bg-transparent focus:outline-none"
      placeholder="Annotation..."
    />
    <!-- X icon -->
    <button
      @click.stop="$emit('remove')"
      class="flex items-center justify-center opacity-50 transition-opacity hover:opacity-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M208.5 191.5a12 12 0 0 1 0 17a12.1 12.1 0 0 1-17 0L128 145l-63.5 63.5a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L111 128L47.5 64.5a12 12 0 0 1 17-17L128 111l63.5-63.5a12 12 0 0 1 17 17L145 128Z"
        />
      </svg>
    </button>
  </div>
</template>
