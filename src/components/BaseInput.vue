<template>
  <input
    class="border font-mono transition-colors hover:border-slate-600/40 focus:outline-none focus:ring-[3px] focus:border-blue-800 ring-blue-900/20 border-slate-700 bg-slate-900 rounded-md px-2 h-7 text-[13px] w-full"
    type="text"
    autocomplete="off"
    spellcheck="false"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
</script>
