<template>
  <button
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    class="h-5 w-8 cursor-pointer select-none rounded-full ring-blue-800 transition focus:outline-none focus-visible:ring-[3px]"
    :class="{
      'bg-slate-600': !modelValue,
      'bg-blue-700': modelValue,
      'cursor-not-allowed opacity-50': disabled,
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="block h-4 w-4 rounded-full bg-white transition"
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
