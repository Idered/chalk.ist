<template>
  <svg
    width="32"
    height="18"
    viewBox="0 0 32 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="cursor-pointer select-none"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <rect
      x="1"
      y="1"
      width="30"
      height="16"
      rx="8"
      class="transition"
      :class="{
        'fill-slate-600': !modelValue,
        'fill-blue-500': modelValue,
      }"
    />
    <circle
      cx="10"
      cy="9"
      r="5"
      fill="white"
      class="transition"
      :class="{
        'translate-x-3': modelValue,
      }"
    ></circle>
  </svg>
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
