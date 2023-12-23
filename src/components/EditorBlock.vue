<script setup lang="ts">
import TheEditor from "./TheEditor.vue";
import { ExportState, WindowControls } from "~/enums";
import { store, preview, moveBlock, removeBlock } from "~/composables/store";
import { exportState } from "~/composables/export-state";
import { useElementSize, useIntervalFn } from "@vueuse/core";
import { computed, ref } from "vue";
import { AVAILABLE_LANGUAGES, ROW_OPTIONS, COLUMN_OPTIONS } from "~/constants";
import BaseSelect from "./BaseSelect.vue";
import IconChevronDown from "./IconChevronDown.vue";
import { Backdrops } from "~/lib/backdrops";

const props = defineProps<{
  blockId: string;
}>();
const editorContainer = ref<HTMLDivElement>();
const { width: editorContainerWidth } = useElementSize(editorContainer);

const blockItem = computed(() => {
  return store.value.blocks.find((block) => block.id === props.blockId)!;
});

const setEditorLanguage = (language: string) => {
  if (!blockItem.value) return;
  blockItem.value.language = language;
};

const highlights = ref<
  {
    start: number;
    size: number;
    duration: number;
  }[]
>([]);

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

useIntervalFn(
  () => {
    highlights.value.push({
      start: randomBetween(0, 50),
      size: randomBetween(20, 200),
      duration: randomBetween(1000, 3000),
    });
  },
  1500,
  {
    immediate: true,
  }
);

const backdrop = computed(() => Backdrops[store.value.backdrop]);
</script>

<template>
  <div
    v-if="blockItem"
    class="relative grid grid-rows-[auto_1fr_auto]"
    :class="{
      'rounded-md': store.paddingX !== 0 && store.paddingY !== 0,
      // 'bg-black/80': !theme.appStyle,
    }"
    :style="[
      {
        backgroundColor: '#03000ADD',
        backgroundImage: store.windowNoise ? 'url(/noise.png)' : undefined,
        backgroundSize: '182px',
      },
      store.paddingX !== 0 && store.paddingY !== 0
        ? {
            none: '',
            'variant-1': {
              boxShadow: `
                0 0 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
                inset 0 0 0 1px rgba(255,255,255,${backdrop.lightsOpacity}),
                0 0 18px 1px rgba(0,0,0,.6)
              `,
            },
            'variant-2': {
              boxShadow: `
                0px 0px 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
                inset 0 1px 0 rgba(255,255,255,${backdrop.lightsOpacity}),
                0px 0px 18px 1px rgba(0,0,0,.6)
              `,
            },
            'variant-3': {
              boxShadow: `
                0 0 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
                0 0 18px 1px rgba(0,0,0,.6)
              `,
            },
            'variant-4': {
              boxShadow: (() => {
                const hsl = backdrop.shadow?.slice(4).replace(/\)$/, '');
                return backdrop.shadow
                  ? `
                  5px 8.5px 3.3px -10px hsla(${hsl}, 0.24),
                  8.7px 14.6px 8.7px -10px hsla(${hsl}, 0.24),
                  12.1px 20.4px 18.2px -10px hsla(${hsl}, 0.30),
                  18.8px 31.6px 36.5px -10px hsla(${hsl}, 0.46),
                  60px 101px 90px -10px hsla(${hsl}, 0.7)
                `
                  : '';
              })(),
            },
            'variant-5': {
              boxShadow: (() => {
                const hsl = backdrop.shadow?.slice(4).replace(/\)$/, '');
                return backdrop.shadow
                  ? `
                0px 4px 12px -2px hsla(${hsl},0.2), 
                0px 10px 18px -4px hsla(${hsl},0.2), 
                0px 40px 44px -16px hsla(${hsl},0.5)  
              `
                  : '';
              })(),
            },
          }[store.windowStyle] || {}
        : {},
      backdrop.appStyle || {},
    ]"
  >
    <div class="absolute inset-0 [--base-delay:0] overflow-hidden rounded-md pointer-events-none">
      <!-- <div
        v-if="store.windowStyle === 'variant-1' || store.windowStyle === 'variant-2'"
        v-for="item in highlights"
        :style="{
          '--start': item.start,
          '--size': item.size,
          '--duration': `${item.duration}ms`,
        }"
        class="right-[calc(1%*var(--start))] top-0 h-px w-[calc(1px*var(--size))] delay-[calc(var(--base-delay)+400ms)] bg-gradient-to-r from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.4)] animate-[shine-r_var(--duration)_cubic-bezier(.4,0,.6,1)] absolute duration-[--duration]"
        @animationend="($event.target as HTMLDivElement)?.remove()"
      ></div> -->

      <!-- <div
        v-for="item in highlights"
        :style="{
          '--start': item.start,
          '--size': item.size,
          '--duration': `${item.duration}ms`,
        }"
        class="right-[calc(1%*var(--start))] bottom-0 h-px w-[calc(1px*var(--size))] delay-[calc(var(--base-delay)+400ms)] bg-gradient-to-l from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.4)] animate-[shine-l_var(--duration)_cubic-bezier(.4,0,.6,1)] absolute duration-[--duration]"
        @animationend="($event.target as HTMLDivElement)?.remove()"
      ></div> -->

      <!-- <div
        v-for="item in highlights"
        :style="{
          '--start': item.start,
          '--size': item.size,
          '--duration': `${item.duration}ms`,
        }"
        class="top-[calc(1%*var(--start))] left-0 w-px h-[calc(1px*var(--size))] delay-[calc(var(--base-delay)+400ms)] bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.4)] animate-[shine-t_var(--duration)_cubic-bezier(.4,0,.6,1)] absolute duration-[--duration]"
        @animationend="($event.target as HTMLDivElement)?.remove()"
      ></div> -->

      <!-- <div
        v-for="item in highlights"
        :style="{
          '--start': item.start,
          '--size': item.size,
          '--duration': `${item.duration}ms`,
        }"
        class="bottom-[calc(1%*var(--start))] right-0 w-px h-[calc(1px*var(--size))] delay-[calc(var(--base-delay)+400ms)] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.4)] animate-[shine-b_var(--duration)_cubic-bezier(.4,0,.6,1)] absolute duration-[--duration]"
        @animationend="($event.target as HTMLDivElement)?.remove()"
      ></div> -->
    </div>

    <div
      class="absolute inset-0 overflow-hidden pointer-events-none rounded-md transition"
      :class="{
        'opacity-0': !store.reflection,
      }"
    >
      <svg class="absolute left-0 top-0 w-3/6" viewBox="0 0 100 172" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H100L47 172H0V0Z" fill="url(#paint0_linear_47_2)" />
        <defs>
          <linearGradient id="paint0_linear_47_2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop stop-color="white" stop-opacity=".035" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div
      class="grid grid-cols-[62px_auto_62px] items-center px-5"
      :class="{
        'grid-cols-[62px_auto_62px]': (preview || store).windowControls !== WindowControls.Windows,
        'grid-cols-[auto_124px] -mx-5': (preview || store).windowControls === WindowControls.Windows,
      }"
    >
      <div
        class="grid grid-flow-col justify-start gap-x-2 pt-4"
        v-if="(preview || store).windowControls === WindowControls.MacColor"
      >
        <div class="h-3 w-3 rounded-full bg-[#EC6A5E]"></div>
        <div class="h-3 w-3 rounded-full bg-[#F3BF4F]"></div>
        <div class="h-3 w-3 rounded-full bg-[#61C554]"></div>
      </div>

      <div
        class="grid grid-flow-col justify-start gap-x-2 pt-4"
        v-if="(preview || store).windowControls === WindowControls.MacGray"
      >
        <div
          v-for="_i in [1, 2, 3]"
          class="h-3 w-3 rounded-full bg-white/25"
          :class="{
            // 'bg-white/25': theme.mode === 'dark',
            // 'bg-black/25': theme.mode === 'light',
          }"
        />
      </div>

      <div
        class="grid grid-flow-col justify-start gap-x-2 pt-4"
        v-if="(preview || store).windowControls === WindowControls.MacOutline"
      >
        <div
          v-for="_i in [1, 2, 3]"
          class="h-3 w-3 rounded-full border border-white/25"
          :class="{
            // 'border-white/25': theme.mode === 'dark',
            // 'border-black/25': theme.mode === 'light',
          }"
        />
      </div>

      <div v-if="(preview || store).windowControls === WindowControls.None"></div>

      <input
        v-if="[ExportState.Idle, ExportState.JustCopied].includes(exportState) || blockItem.title.trim()"
        :value="blockItem.title"
        @input="blockItem.title = ($event.target as HTMLInputElement).value"
        placeholder="Untitled"
        spellcheck="false"
        autocomplete="off"
        :class="{
          // 'text-white/60 placeholder:text-white/30 ': theme.mode === 'dark',
          // 'text-black/60 placeholder:text-black/30': theme.mode === 'light',
          'mt-4 text-center': (preview || store).windowControls !== WindowControls.Windows,
          'pl-3': (preview || store).windowControls === WindowControls.Windows,
        }"
        class="bg-transparent z-10 border-none text-xs w-full focus:outline-none"
      />
      <div v-else></div>

      <div class="grid grid-flow-col justify-end" v-if="(preview || store).windowControls === WindowControls.Windows">
        <div
          class="h-8 w-10 flex items-center justify-center"
          :class="{
            // 'text-white': theme.mode === 'dark',
            // 'text-black': theme.mode === 'light',
          }"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="10" height="1" fill="currentColor" fill-opacity="0.5" />
          </svg>
        </div>

        <div
          class="h-8 w-10 flex items-center justify-center"
          :class="{
            // 'text-white': theme.mode === 'dark',
            // 'text-black': theme.mode === 'light',
          }"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 1H9V7H8V8H10V0H2V2H3V1Z" fill="currentColor" fill-opacity="0.5" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 2.00002H8V10H0V2.00002ZM7 3.00002H1V9.00002H7V3.00002Z"
              fill="currentColor"
              fill-opacity="0.5"
            />
          </svg>
        </div>

        <div
          class="h-8 w-11 flex items-center justify-center"
          :class="{
            // 'text-white': theme.mode === 'dark',
            // 'text-black': theme.mode === 'light',
          }"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.14645 4.85355L0 0.707107L0.707107 0L4.85355 4.14645L9 0L9.70711 0.707107L5.56066 4.85355L9.70711 9L9 9.70711L4.85355 5.56066L0.707107 9.70711L0 9L4.14645 4.85355Z"
              fill="currentColor"
              fill-opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="py-6 overflow-hidden" ref="editorContainer">
      <TheEditor ref="editor" :block-id="blockId" :width="editorContainerWidth" />
    </div>

    <div
      v-if="[ExportState.Idle, ExportState.JustCopied].includes(exportState) && blockItem"
      class="flex mb-1 gap-1 -mx-4 flex-wrap px-5"
    >
      <BaseSelect
        class="w-28"
        use-opaque-background
        :model-value="blockItem.columnSpan"
        @update:model-value="blockItem.columnSpan = $event"
        :label="(option) => `${option.value} columns`"
        :options="COLUMN_OPTIONS"
      />

      <BaseSelect
        class="w-[5.5rem]"
        :model-value="blockItem.rowSpan"
        use-opaque-background
        @update:model-value="blockItem.rowSpan = $event"
        :label="(option) => `${option.value} ${typeof option.value === 'number' && option.value > 1 ? 'rows' : 'row'}`"
        :options="ROW_OPTIONS"
      />

      <BaseSelect
        class="w-32"
        use-opaque-background
        :model-value="blockItem.language"
        @update:model-value="setEditorLanguage"
        :options="AVAILABLE_LANGUAGES"
      />

      <button
        @click="() => moveBlock(blockItem.id, -1)"
        class="btn"
        type="button"
        title="Move left"
        :disabled="store.blocks.indexOf(blockItem) === 0"
      >
        <IconChevronDown title="Move left" class="w-2.5 rotate-90" />
      </button>

      <button
        @click="() => moveBlock(blockItem.id, 1)"
        class="btn"
        type="button"
        title="Move right"
        :disabled="store.blocks.indexOf(blockItem) === store.blocks.length - 1"
      >
        <IconChevronDown title="Move right" class="w-2.5 -rotate-90" />
      </button>

      <button
        @click="() => removeBlock(blockItem.id)"
        class="btn"
        type="button"
        title="Remove"
        :disabled="store.blocks.length === 1"
      >
        <svg title="Remove" class="w-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
