<template>
  <button
    type="button"
    class="focus:outline-none focus-visible:ring-[3px] ring-blue-600/30 rounded font-semibold grid grid-flow-col gap-x-3 text-xs transition items-center"
    :class="[
      {
        'h-10': !($attrs.class as string)?.match(/h-\d+/),
        'justify-start': !($attrs.class as string)?.match(/justify-\w+/),
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
