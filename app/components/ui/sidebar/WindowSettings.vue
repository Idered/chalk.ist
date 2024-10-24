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
