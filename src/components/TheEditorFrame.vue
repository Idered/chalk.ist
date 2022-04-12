<template>
  <div data-editor-frame-container ref="container" class="overflow-y-auto overflow-x-hidden grid p-1">
    <div
      class="grid justify-items-center items-start h-0"
      :style="{
        transform:
          store.frameWidth > containerWidth && !isExporting ? `scale(${containerWidth / store.frameWidth})` : undefined,
        transformOrigin: 'left top',
      }"
      :class="{
        'sm:items-center h-auto': store.frameWidth < containerWidth,
      }"
    >
      <div
        ref="editorFrame"
        data-editor-frame
        class="grid justify-items-center items-center relative"
        :style="{
          width: `${store.frameWidth}px`,
          // minHeight: `${(store.frameWidth / 16) * 9 + 1}px`,
        }"
      >
        <div
          class="absolute bottom-full right-0 mb-2 bg-slate-700 text-white/75 text-[11px] uppercase font-bold tracking-wider px-2.5 h-6 transition grid items-center rounded"
        >
          {{ store.frameWidth }} x {{ store.frameHeight }}
        </div>
        <div
          v-if="exportState === ExportState.Idle"
          class="flex w-6 h-6 absolute top-1/2 z-50 -translate-y-3 -right-3 items-center justify-center group cursor-ew-resize select-none"
          @mousedown="startResize($event, 'right')"
        >
          <div
            class="pointer-events-none w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform"
          />
        </div>

        <div
          v-if="exportState === ExportState.Idle"
          class="flex w-6 h-6 absolute top-1/2 z-10 -translate-y-3 -left-3 items-center justify-center group cursor-ew-resize"
          @mousedown="startResize($event, 'left')"
        >
          <div
            class="pointer-events-none w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform"
          />
        </div>

        <div
          class="absolute bg-frame inset-0 transition"
          :class="{
            'opacity-0': !store.showBackground,
          }"
        ></div>
        <div
          :style="{
            paddingLeft: `${store.paddingX}px`,
            paddingRight: `${store.paddingX}px`,
            paddingTop: `${store.paddingY}px`,
            paddingBottom: `${store.paddingY}px`,
          }"
        >
          <div
            class="bg-black/80 rounded-md px-5 relative transition-shadow"
            :class="{
              'shadow-app': store.showBackground,
            }"
          >
            <div
              class="absolute inset-0 overflow-hidden pointer-events-none rounded-md transition"
              :class="{
                'opacity-0': !store.reflection,
              }"
            >
              <svg
                class="absolute left-0 top-0 w-3/6"
                viewBox="0 0 100 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H100L47 172H0V0Z" fill="url(#paint0_linear_47_2)" />
                <defs>
                  <linearGradient
                    id="paint0_linear_47_2"
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0.035" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div v-if="store.showWindowControls" class="pt-4 grid justify-start gap-x-2 grid-flow-col">
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
            </div>
            <div class="py-6">
              <Editor ref="editor" />
            </div>
          </div>
          <div class="flex justify-end">
            <div
              class="rounded-full z-10 relative p-1 bg-black/70 text-white mt-4 flex items-center"
              v-if="(store.username || store.name || store.picture) && store.showTwitterBadge"
            >
              <img v-if="store.picture" :src="store.picture" width="32" height="32" class="rounded-full" alt="" />
              <IconTwitter v-else :width="32" />
              <div v-if="store.name || store.username" class="ml-2 pr-4">
                <div class="font-semibold text-xs" v-if="store.name">
                  {{ store.name }}
                </div>
                <div
                  class="font-medium leading-3"
                  v-if="store.username"
                  :class="{
                    'text-sm': !store.name,
                    'text-[11px] text-white/50': store.name,
                  }"
                >
                  @{{ store.username }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "./TheEditor.vue";
import IconTwitter from "./IconTwitter.vue";
import { useElementSize, useEventListener } from "@vueuse/core";
import { theme, store, isExporting } from "~/composables/store";
import { ref, watch } from "vue";
import { MAX_FRAME_WIDTH, MIN_FRAME_WIDTH } from "~/constants";
import { ExportState, exportState } from "~/composables/export-state";

const container = ref<HTMLDivElement>();
const editorFrame = ref<HTMLDivElement>();
const { width: containerWidth } = useElementSize(container);
const resizeStartX = ref(0);
const resizeStartWidth = ref(0);
const activeResizeHandle = ref<"left" | "right" | null>(null);
const { height: frameHeight } = useElementSize(editorFrame);

function startResize(event: MouseEvent, handle: "left" | "right") {
  event.preventDefault();
  activeResizeHandle.value = handle;
  resizeStartX.value = event.clientX;
  resizeStartWidth.value = store.value.frameWidth;
}

watch(frameHeight, (value) => {
  store.value.frameHeight = Math.round(value);
});

useEventListener("mouseup", () => {
  activeResizeHandle.value = null;
});

useEventListener("mousemove", (event: MouseEvent) => {
  if (!editorFrame.value || !activeResizeHandle.value) return;
  const direction = activeResizeHandle.value === "left" ? -1 : 1;
  const nextWidth = resizeStartWidth.value + 2 * (event.clientX - resizeStartX.value) * direction;
  store.value.frameWidth = Math.min(Math.max(nextWidth, MIN_FRAME_WIDTH), MAX_FRAME_WIDTH);
});
</script>

<style>
.shadow-app {
  box-shadow: 0px 0.6px 0.7px hsl(v-bind("theme.shadow") / 0.3), 0px 3.5px 4px -0.3px hsl(v-bind("theme.shadow") / 0.31),
    0px 6.4px 7.4px -0.7px hsl(v-bind("theme.shadow") / 0.32), 0px 10.4px 12px -1px hsl(v-bind("theme.shadow") / 0.32),
    0px 16.3px 18.8px -1.3px hsl(v-bind("theme.shadow") / 0.33),
    0px 25.2px 29.1px -1.6px hsl(v-bind("theme.shadow") / 0.33),
    0px 37.9px 43.8px -2px hsl(v-bind("theme.shadow") / 0.34),
    0px 55.6px 64.2px -2.3px hsl(v-bind("theme.shadow") / 0.35);
}
.bg-frame {
  background: v-bind("theme.background");
}
</style>
