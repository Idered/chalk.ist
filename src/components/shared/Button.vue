<script setup lang="ts">
import { twMerge } from "tailwind-merge";

defineProps({
  square: {
    type: String,
    default: "",
  },
  is: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <component
    :is="is"
    type="button"
    :class="[
      twMerge(
        'grid grid-flow-col items-center gap-x-3 rounded text-xs font-semibold ring-blue-600/30 transition focus:outline-none focus-visible:ring-[3px]',
        $props.class as string,
      ),
      {
        'h-10': !($attrs.class as string)?.match(/h-\d+/),
        'justify-start': !($attrs.class as string)?.match(/justify-\w+/),
      },
    ]"
  >
    <slot />
  </component>
</template>
