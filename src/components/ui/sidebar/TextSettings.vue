<script setup lang="ts">
import { FONTS, LIGATURE_FONTS } from "~/lib/constants";
import { store } from "~/lib/store";
</script>

<template>
  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label for="fontFamily" class="text-xs font-semibold">Font</label>
    <Select
      class="-my-1"
      id="fontFamily"
      preview-on-focus
      v-model="store.fontFamily"
      :options="FONTS"
    />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="fontLigatures"
      >Font ligatures</label
    >
    <Switch
      :disabled="!LIGATURE_FONTS.includes(store.fontFamily)"
      v-model="store.fontLigatures"
      id="fontLigatures"
    />
  </div>

  <div
    class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="fontSize"
      >Font size</label
    >
    <div class="grid grid-flow-col gap-x-2 text-sm">
      <NumberInput
        id="fontSize"
        class="-my-1"
        :min="12"
        :max="40"
        v-model="store.fontSize"
      />
    </div>
  </div>

  <div
    class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="lineHeight"
      >Line height</label
    >
    <div class="grid grid-flow-col gap-x-2 text-sm">
      <NumberInput
        id="lineHeight"
        class="-my-1"
        :min="20"
        :max="64"
        v-model="store.lineHeight"
      />
    </div>
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showLineNumbers"
      >Line numbers</label
    >
    <Switch v-model="store.showLineNumbers" id="showLineNumbers" />
  </div>
</template>
