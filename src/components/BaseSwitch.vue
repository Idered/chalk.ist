<template>
  <button
    role="switch"
    :aria-checked="modelValue"
    class="cursor-pointer rounded-full select-none focus:outline-none focus:ring-[3px] ring-blue-800 w-8 h-5 transition"
    :class="{
      'bg-slate-600': !modelValue,
      'bg-blue-700': modelValue,
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="transition w-4 h-4 bg-white block rounded-full"
      :class="{
        'translate-x-[2px]': !modelValue,
        'translate-x-[14px]': modelValue,
      }"
    />
  </button>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
</script>
