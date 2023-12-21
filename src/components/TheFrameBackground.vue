<script setup lang="ts">
import { computed } from "vue";
import { store } from "~/composables/store";
import { Backdrops } from "~/lib/backdrops";

const backdrop = computed(() => Backdrops[store.value.backdrop]);
</script>

<template>
  <div
    class="absolute inset-0 overflow-hidden"
    :class="{
      'bg-slate-800': store.showBackground,
    }"
  >
    <div
      class="absolute inset-0 transition"
      :class="{
        'opacity-0': !store.showBackground,
      }"
      :style="{
        ...backdrop.backgroundStyle,
        background: store.backdropNoise
          ? `url(/noise.png), ${backdrop.backgroundStyle.background}`
          : backdrop.backgroundStyle.background,
      }"
    />
  </div>
</template>
