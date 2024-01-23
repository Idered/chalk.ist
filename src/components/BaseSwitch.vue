<template>
  <button
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    class="h-5 w-8 cursor-pointer relative inline-flex items-center select-none rounded-full ring-blue-800 transition focus:outline-none focus-visible:ring-[3px]"
    :class="{
      'cursor-not-allowed opacity-50': disabled,
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="absolute w-[inherit] h-3 mx-auto pointer-events-none rounded-full"
      :class="{
        'bg-slate-600': !modelValue,
        'bg-blue-700': modelValue,
        'cursor-not-allowed opacity-50': disabled,
      }"
    ></span>
    <span
      class="h-4 w-4 rounded-full bg-white transition absolute left-0 inline-block border border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,.25)]"
      :class="{
        'translate-x-4': modelValue,
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
