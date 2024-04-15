<script setup lang="ts">
import { computed } from "vue";
import { store } from "~/composables/store";
import { SHADOW_OVERLAY_MAPPING } from "~/constants";
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
    <div
      :class="{
        'opacity-0': store.shadowOverlay === 'none',
      }"
      class="absolute inset-0 bg-cover transition-opacity"
      :style="{
        backgroundImage: SHADOW_OVERLAY_MAPPING[store.shadowOverlay]?.image,
        mixBlendMode: SHADOW_OVERLAY_MAPPING[store.shadowOverlay]?.blendMode,
      }"
    />
    <!-- <div
      class="absolute mix-blend-overlay inset-0 bg-cover"
      :style="{
        backgroundImage: 'url(/shadows/shadow-1.png)',
      }"
    /> -->
    <!-- <div
      class="bg-gradient-to-tl from-blue-700 from-10% to-10% to-transparent absolute inset-0"
      :style="{
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
      }"
    ></div>
    <div
      class="bg-gradient-to-tr from-sky-700 from-10% to-10% to-transparent absolute inset-0"
      :style="{
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
      }"
    ></div> -->
    <!-- <div
      class="bg-gradient-to-r from-orange-500 bg-white to-blue-500 absolute inset-x-0 bottom-0 top-1/2"
      :style="{
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
      }"
    ></div> -->
  </div>
</template>
