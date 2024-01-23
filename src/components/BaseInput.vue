<script setup lang="ts">
import { twMerge } from "tailwind-merge";

defineEmits(["update:modelValue"]);
defineProps({
  class: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <input
    :class="
      twMerge(
        'h-7 w-full rounded-md border border-slate-700 bg-slate-900 px-2 font-mono text-[12px] ring-blue-900/20 transition-colors hover:border-slate-600/40 focus:border-blue-800 focus:outline-none focus:ring-[3px]',
        $props.class,
      )
    "
    type="text"
    autocomplete="off"
    spellcheck="false"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
