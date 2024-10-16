<script setup lang="ts">
import { ColorPicker } from "vue-color-kit";
import { persistentState } from "~/lib/persistent-state";
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "radix-vue";
import { ref } from "vue";
import { Backdrops } from "~/lib/backdrops";
import { SHADOW_OVERLAY_STYLES } from "~/lib/constants";
import { state } from "~/lib/state";
import { store } from "~/lib/store";
const originalBackdrop = ref<string | number | null>(null);
</script>

<template>
  <div
    class="grid grid-cols-[1fr_auto_auto] items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showBackground"
      >Backdrop</label
    >

    <Button
      class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
      @click="
        persistentState.expandBackdrops = !persistentState.expandBackdrops
      "
    >
      <IconChevronDown
        width="12"
        class="transition-transform"
        :class="{
          'rotate-180': persistentState.expandBackdrops,
        }"
      />
    </Button>
    <Switch v-model="store.showBackground" id="showBackground" />
  </div>

  <div
    v-if="persistentState.expandBackdrops"
    class="-mx-0.5 flex flex-wrap items-center gap-0 sm:grid sm:grid-flow-row sm:grid-cols-7"
  >
    <PopoverRoot>
      <PopoverTrigger
        class="group col-span-2 border-2 border-transparent focus:outline-none"
        :title="`Use Solid backdrop`"
        @mouseenter="
          () => {
            originalBackdrop = originalBackdrop ?? store.backdrop;
            store.backdrop = 'Solid';
          }
        "
        @mouseleave="
          () => {
            if (originalBackdrop) {
              store.backdrop = originalBackdrop;
              originalBackdrop = null;
            }
          }
        "
        @click="
          () => {
            store.backdrop = 'Solid';
            originalBackdrop = null;
          }
        "
      >
        <div
          class="flex h-[30px] shrink-0 items-center justify-center rounded ring-blue-800 transition group-hover:scale-105 group-hover:opacity-100 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] group-active:scale-95"
          :style="{ backgroundColor: 'var(--solid-background)' }"
          :class="{
            'shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] ring-[2px]':
              store.backdrop === 'Solid',
          }"
        >
          <div
            class="rounded-[3px] bg-black/40 px-1 text-[10px] font-bold uppercase tracking-wider text-white"
          >
            Custom
          </div>
        </div>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          :align-offset="8"
          :side-offset="-12"
          side="bottom"
          align="start"
          class="z-[100000] rounded-md border border-slate-700 bg-slate-800 p-4 font-mono shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
        >
          <PopoverArrow />
          <ColorPicker
            class="box-content"
            :color="store.solidBackground"
            @changeColor="
              store.solidBackground = `rgba(${[
                $event.rgba.r,
                $event.rgba.g,
                $event.rgba.b,
                $event.rgba.a,
              ].join(',')})`
            "
          />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <button
      v-for="(item, key) in Backdrops"
      :class="{
        hidden: key === 'Solid',
      }"
      @mouseenter="
        () => {
          originalBackdrop = originalBackdrop ?? store.backdrop;
          store.backdrop = key;
        }
      "
      @mouseleave="
        () => {
          if (originalBackdrop) {
            store.backdrop = originalBackdrop;
            originalBackdrop = null;
          }
        }
      "
      @click="
        () => {
          store.backdrop = key;
          console.log(Backdrops[key]);
          originalBackdrop = null;
        }
      "
      class="group border-2 border-transparent focus:outline-none"
      :title="`Use ${key} backdrop`"
    >
      <div
        class="h-[30px] w-[30px] shrink-0 rounded ring-blue-800 transition group-hover:scale-105 group-hover:opacity-100 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] group-active:scale-95"
        :style="{ background: item.backgroundStyle.background }"
        :class="{
          'shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] ring-[2px]':
            store.backdrop === key,
        }"
      ></div>
    </button>
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="backdropNoise"
      >Backdrop noise</label
    >
    <Switch
      v-model="store.backdropNoise"
      id="backdropNoise"
      :disabled="!store.showBackground"
    />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showParticles"
      >Backdrop particles</label
    >
    <Switch
      v-model="store.showParticles"
      id="showParticles"
      :disabled="!state.supported.particles"
    />
  </div>

  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <div class="flex items-center">
      <label for="shadowOverlay" class="text-xs font-semibold"
        >Shadow overlay</label
      >
    </div>
    <Select
      id="shadowOverlay"
      class="-my-1"
      preview-on-focus
      :model-value="store.shadowOverlay"
      @update:model-value="store.shadowOverlay = $event"
      :options="SHADOW_OVERLAY_STYLES"
    />
  </div>

  <div
    class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="paddingX"
      >Padding X</label
    >
    <div class="grid grid-flow-col gap-x-2 text-sm">
      <SliderAlt
        class="w-[100px]"
        id="paddingX"
        :min="0"
        :max="128"
        :step="8"
        v-model="store.paddingX"
      />
    </div>
  </div>

  <div
    class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="paddingY"
      >Padding Y</label
    >
    <div class="grid grid-flow-col gap-x-2 text-sm">
      <SliderAlt
        class="w-[100px]"
        id="paddingY"
        :min="0"
        :max="128"
        :step="8"
        v-model="store.paddingY"
      />
    </div>
  </div>
</template>
