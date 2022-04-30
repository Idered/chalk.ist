<template>
  <div data-editor-frame-container ref="container" class="overflow-y-auto overflow-x-hidden grid p-1">
    <div
      class="grid justify-items-center items-start h-0"
      :style="{
        transform: frameWidth > containerWidth ? `scale(${containerWidth / frameWidth})` : undefined,
        transformOrigin: 'top left',
      }"
      :class="{
        'sm:items-center h-auto': frameWidth < containerWidth,
      }"
    >
      <div
        ref="editorFrame"
        data-editor-frame
        class="grid justify-items-center items-center relative"
        :style="{ width: `${frameWidth}px` }"
      >
        <BaseButton
          v-if="preview"
          class="px-4 absolute top-full left-0 mt-2 bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/40 group"
          @click="handleCopy"
        >
          <IconClipboard width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />

          {{ exportState === ExportState.JustCopiedContent ? "Copied!" : "Copy to Clipboard" }}
        </BaseButton>
        <div
          v-if="!preview"
          class="absolute bottom-full right-0 mb-2 bg-slate-700 text-white/75 text-[11px] uppercase font-bold tracking-wider px-2.5 h-6 transition grid items-center rounded"
        >
          {{ frameWidth }} x {{ store.frameHeight }}
        </div>

        <div
          v-if="exportState === ExportState.Idle && !preview"
          class="flex w-6 h-6 absolute top-1/2 z-50 -translate-y-3 -right-3 items-center justify-center group cursor-ew-resize select-none"
          @mousedown="startResize($event, 'right')"
        >
          <div
            class="pointer-events-none w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform"
          />
        </div>

        <div
          v-if="exportState === ExportState.Idle && !preview"
          class="flex w-6 h-6 absolute top-1/2 z-10 -translate-y-3 -left-3 items-center justify-center group cursor-ew-resize"
          @mousedown="startResize($event, 'left')"
        >
          <div
            class="pointer-events-none w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform"
          />
        </div>

        <div class="absolute inset-0 bg-slate-800 overflow-hidden">
          <div
            class="absolute bg-frame inset-0 transition"
            :class="{
              'opacity-0': !store.showBackground,
            }"
            :style="theme.backgroundStyle"
          />
        </div>

        <div
          class="overflow-clip"
          :style="{
            paddingLeft: `${preview ? preview.paddingX : store.paddingX}px`,
            paddingRight: `${preview ? preview.paddingX : store.paddingX}px`,
            paddingTop: `${preview ? preview.paddingY : store.paddingY}px`,
            paddingBottom: `${preview ? preview.paddingY : store.paddingY}px`,
          }"
        >
          <div
            class="bg-black/80 rounded-md px-5 relative"
            :class="{
              'bg-black/80': !theme.appStyle,
            }"
            :style="theme.appStyle"
          >
            <div
              class="absolute inset-0 transition-shadow rounded-md"
              :class="{
                'shadow-app': store.showBackground,
              }"
              :style="theme.shadowStyle"
            ></div>
            <!-- <div class="absolute inset-x-20 h-12 transition-shadow rounded-md bg-[#3208a7] -bottom-14 blur-3xl"></div> -->
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
            <div
              v-if="preview ? preview.showWindowControls : store.showWindowControls"
              class="pt-4 grid justify-start gap-x-2 grid-flow-col"
            >
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
            </div>
            <div class="py-6">
              <Editor ref="editor" />
            </div>
          </div>
          <div class="flex justify-end">
            <component
              :is="author.username ? 'a' : 'div'"
              :href="author.username ? `https://twitter.com/${author.username}` : undefined"
              class="rounded-full z-10 relative p-1 bg-black/70 text-white mt-4 flex items-center"
              :class="{
                'hover:bg-black/50': author.username,
              }"
              v-if="(author.username || author.name || author.picture) && author.showTwitterBadge"
            >
              <img v-if="author.picture" :src="author.picture" width="32" height="32" class="rounded-full" alt="" />
              <IconTwitterCircle v-else :width="32" />
              <div v-if="author.name || author.username" class="ml-2 pr-4">
                <div class="font-semibold text-xs" v-if="author.name">
                  {{ author.name }}
                </div>
                <div
                  class="font-medium leading-3"
                  v-if="author.username"
                  :class="{
                    'text-sm': !author.name,
                    'text-[11px] text-white/50': author.name,
                  }"
                >
                  @{{ author.username }}
                </div>
              </div>
            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "./TheEditor.vue";
import { useElementSize, useEventListener } from "@vueuse/core";
import { theme, store, preview } from "~/composables/store";
import { computed, ref, watch } from "vue";
import { MAX_FRAME_WIDTH, MIN_FRAME_WIDTH } from "~/constants";
import { ExportState, exportState } from "~/composables/export-state";
import BaseButton from "./BaseButton.vue";
import IconClipboard from "./IconClipboard.vue";
import IconTwitterCircle from "./IconTwitterCircle.vue";

const container = ref<HTMLDivElement>();
const editorFrame = ref<HTMLDivElement>();
const { width: containerWidth } = useElementSize(container);
const frameWidth = computed(() => (preview.value ? preview.value.frameWidth : store.value.frameWidth));
const resizeStartX = ref(0);
const resizeStartWidth = ref(0);
const activeResizeHandle = ref<"left" | "right" | null>(null);
const { height: frameHeight } = useElementSize(editorFrame);

const author = computed(() => {
  return preview.value ? preview.value : store.value;
});

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

const timeout = ref();

function handleCopy() {
  if (!preview.value) return;
  navigator.clipboard.writeText(preview.value.content);
  exportState.value = ExportState.JustCopiedContent;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    exportState.value = ExportState.Idle;
  }, 1000);
}
</script>

<style>
.shadow-app {
  /* prettier-ignore */
  box-shadow:
    5px 8.5px 3.3px -10px hsla(v-bind("theme.shadow") / 24%),
    8.7px 14.6px 8.7px -10px hsla(v-bind("theme.shadow") / 24%),
    12.1px 20.4px 18.2px -10px hsla(v-bind("theme.shadow") / 30%),
    18.8px 31.6px 36.5px -10px hsla(v-bind("theme.shadow") / 46%),
    60px 101px 90px -10px hsla(v-bind("theme.shadow") / 70%);
}

.bg-frame {
  background: v-bind("theme.background");
}
</style>
