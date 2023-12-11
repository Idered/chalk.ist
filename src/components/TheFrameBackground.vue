<script setup lang="ts">
import { store } from "~/composables/store";
import { CompiledTheme } from "~/composables/theme-utils";

defineProps<{
  theme: CompiledTheme;
}>();
</script>

<template>
  <div
    class="absolute inset-0 overflow-hidden"
    :class="{
      'bg-slate-800': store.showBackground,
    }"
  >
    <div
      class="absolute bg-frame inset-0 transition"
      :class="{
        'opacity-0': !store.showBackground,
      }"
      :style="theme.backgroundStyle"
    />
  </div>
</template>
