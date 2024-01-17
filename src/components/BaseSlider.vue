<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";

defineProps<{
  modelValue: number;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <!-- prettier-ignore -->
  <SliderRoot
    :modelValue="(modelValue as unknown as number[])"
    @update:modelValue="$emit('update:modelValue', $event)"
    class="relative flex items-center select-none touch-none w-[100px] h-5"
    :max="100"
    :step="1"
  >
    <SliderTrack class="bg-black relative grow rounded-full h-[3px]">
      <SliderRange class="absolute bg-blue-600 rounded-full h-full" />
    </SliderTrack>
    <SliderThumb
      class="h-4 w-4 rounded-full bg-white block border focus:outline-none border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,.25)] focus:shadow-[0_0_0_3px_rgba(255,255,255,.15)]"
    />
  </SliderRoot>
</template>
