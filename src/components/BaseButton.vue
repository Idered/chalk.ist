<template>
  <component
    :is="is"
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
  </component>
</template>

<script setup lang="ts">
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
