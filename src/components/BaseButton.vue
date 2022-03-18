<template>
  <button
    class="focus:outline-none focus:ring-[3px] ring-blue-600/30 h-10 rounded font-semibold grid grid-flow-col gap-x-3 text-xs transition items-center"
    :class="[
      square,
      {
        'justify-center': square,
        'justify-start': !square,
      },
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  square: {
    type: String,
    default: "",
  },
});
</script>
