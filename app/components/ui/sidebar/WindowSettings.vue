<script setup lang="ts">
import {
  MAX_INNER_PADDING_X,
  MAX_INNER_PADDING_Y,
  MIN_INNER_PADDING_X,
  MIN_INNER_PADDING_Y,
  WINDOW_STYLES,
} from "~/lib/constants";
import { WindowControls } from "~/lib/enums";
import { store } from "~/lib/store";
</script>

<template>
  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showWindow"
      >Window</label
    >
    <Switch v-model="store.showWindow" id="showWindow" />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label for="windowStyle" class="text-xs font-semibold">Window style</label>
    <Select
      id="windowStyle"
      class="-my-1"
      preview-on-focus
      :model-value="store.windowStyle"
      @update:model-value="store.windowStyle = $event"
      :options="WINDOW_STYLES"
    />
  </div>

  <div
    v-if="['variant-1', 'variant-2', 'variant-3'].includes(store.windowStyle)"
    class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label for="windowBackgroundOpacity" class="text-xs font-semibold"
      >Window opacity</label
    >
    <SliderAlt
      id="windowBackgroundOpacity"
      class="-my-1"
      preview-on-focus
      :model-value="store.windowBackgroundOpacity"
      @update:model-value="store.windowBackgroundOpacity = $event"
      :min="80"
      :max="100"
      :step="1"
    />
  </div>

  <div
    v-if="['variant-1', 'variant-2', 'variant-3'].includes(store.windowStyle)"
    class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label for="windowBorderRadius" class="text-xs font-semibold"
      >Window rounding</label
    >
    <SliderAlt
      id="windowBorderRadius"
      class="-my-1"
      preview-on-focus
      :model-value="store.windowBorderRadius"
      @update:model-value="store.windowBorderRadius = $event"
      :min="0"
      :max="16"
      :step="1"
    />
  </div>

  <div
    v-if="['variant-1', 'variant-2'].includes(store.windowStyle)"
    class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label for="windowHighlights" class="text-xs font-semibold"
      >Window highlights</label
    >
    <SliderAlt
      id="windowHighlights"
      class="-my-1"
      preview-on-focus
      :model-value="store.windowHighlights"
      @update:model-value="store.windowHighlights = $event"
      :min="0"
      :max="50"
      :step="1"
    />
  </div>

  <div
    v-if="['variant-1', 'variant-2'].includes(store.windowStyle)"
    class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label for="windowShadows" class="text-xs font-semibold"
      >Window shadows</label
    >
    <SliderAlt
      id="windowShadows"
      class="-my-1"
      preview-on-focus
      :model-value="store.windowShadows"
      @update:model-value="store.windowShadows = $event"
      :min="0"
      :max="100"
      :step="1"
    />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label for="windowControls" class="text-xs font-semibold"
      >Window controls</label
    >
    <Select
      id="windowControls"
      class="-my-1"
      preview-on-focus
      :model-value="store.windowControls"
      @update:model-value="store.windowControls = $event"
      :options="[
        { label: 'None', value: WindowControls.None },
        { label: 'macOS - Color', value: WindowControls.MacColor },
        { label: 'macOS - Gray', value: WindowControls.MacGray },
        {
          label: 'macOS - Outline',
          value: WindowControls.MacOutline,
        },
        { label: 'Windows', value: WindowControls.Windows },
      ]"
    />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="windowNoise"
      >Window noise</label
    >
    <Switch v-model="store.windowNoise" id="windowNoise" />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="reflection"
      >Window reflection</label
    >
    <Switch v-model="store.reflection" id="reflection" />
  </div>

  <div
    class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="innerPaddingX"
      >Window Padding X</label
    >
    <div class="grid grid-flow-col gap-x-2 text-sm">
      <SliderAlt
        class="w-[100px]"
        id="innerPaddingX"
        :min="MIN_INNER_PADDING_X"
        :max="MAX_INNER_PADDING_X"
        :step="4"
        v-model="store.innerPaddingX"
      />
    </div>
  </div>

  <div
    class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="innerPaddingY"
      >Window Padding Y</label
    >
    <div class="grid grid-flow-col gap-x-2 text-sm">
      <SliderAlt
        class="w-[100px]"
        id="innerPaddingY"
        :min="MIN_INNER_PADDING_Y"
        :max="MAX_INNER_PADDING_Y"
        :step="4"
        v-model="store.innerPaddingY"
      />
    </div>
  </div>
</template>
