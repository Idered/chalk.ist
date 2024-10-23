<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: number;
  min: number;
  max: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const input = ref<HTMLInputElement>();

function increment() {
  emit("update:modelValue", Math.min(props.modelValue + 1, props.max));
  input.value?.focus();
}

function decrement() {
  emit("update:modelValue", Math.max(props.modelValue - 1, props.min));
  input.value?.focus();
}

function handleChange(event: Event) {
  const value = parseInt((event.target as HTMLInputElement).value);
  if (isNaN(value)) {
    return;
  }
  emit("update:modelValue", value);
}

function handleBlur() {
  emit("update:modelValue", Math.max(props.modelValue, props.min));
}
</script>

<template>
  <div
    class="flex h-7 group rounded-md border border-opacity-0 has-[:focus]:border-slate-600/40 has-[:focus]:border-opacity-100 border-slate-700 hover:bg-slate-800 has-[:focus]:bg-slate-800 has-[:focus]:shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px] hover:shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px] font-mono text-[13px] ring-blue-900/20 transition-colors hover:border-slate-600/40 focus:border-blue-800 focus:outline-none focus:ring-[3px] overflow-hidden"
  >
    <button
      tabindex="-1"
      @click="decrement"
      class="w-7 flex justify-center items-center hover:bg-slate-700 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <i-radix-icons:minus />
    </button>
    <button
      tabindex="-1"
      @click="increment"
      class="w-7 flex justify-center items-center hover:bg-slate-700 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <i-radix-icons:plus />
    </button>
    <input
      ref="input"
      :value="modelValue"
      :size="2"
      @change="handleChange"
      @blur="handleBlur"
      @keydown.up.prevent="increment"
      @keydown.down.prevent="decrement"
      class="bg-transparent w-8 appearance-none focus:outline-none text-right px-2"
    />
  </div>
</template>
