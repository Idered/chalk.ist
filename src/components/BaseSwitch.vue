<template>
  <button
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    class="cursor-pointer rounded-full select-none focus:outline-none focus-visible:ring-[3px] ring-blue-800 w-8 h-5 transition"
    :class="{
      'bg-slate-600': !modelValue,
      'bg-blue-700': modelValue,
      'opacity-50 cursor-not-allowed': disabled,
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="transition w-4 h-4 bg-white block rounded-full"
      :class="{
        'translate-x-[2px]': !modelValue,
        'translate-x-[14px]': modelValue,
        'opacity-50': disabled,
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
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
