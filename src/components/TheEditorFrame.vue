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

        <div v-if="!preview" class="absolute bottom-full right-0 mb-2 flex space-x-2">
          <a
            :href="`${theme.inspirationUrl}?ref=chalk.ist`"
            target="_blank"
            v-if="theme.inspiration"
            class="bg-slate-700 text-white/75 hover:text-white text-[11px] font-bold px-2.5 h-6 transition flex space-x-1 rounded items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="16"
              height="16"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="#888888"
                d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
              ></path>
            </svg>
            <div>Theme inspired by {{ theme.inspiration }}</div>
          </a>
          <div
            class="bg-slate-700 text-white/75 text-[11px] uppercase font-bold tracking-wider px-2.5 h-6 transition grid items-center rounded"
          >
            {{ frameWidth }} x {{ store.frameHeight }}
          </div>
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
                class="h-3 w-3 rounded-full"
                :class="{
                  'bg-white/25': theme.mode === 'dark',
                  'bg-black/25': theme.mode === 'light',
                }"
              />
            </div>

            <div
              class="grid grid-flow-col justify-start gap-x-2 pt-4"
              v-if="(preview || store).windowControls === WindowControls.MacOutline"
            >
              <div
                v-for="_i in [1, 2, 3]"
                class="h-3 w-3 rounded-full border"
                :class="{
                  'border-white/25': theme.mode === 'dark',
                  'border-black/25': theme.mode === 'light',
                }"
              />
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
import { WindowControls } from "~/types";

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
  background: v-bind("store.useAltBackground ? theme.backgroundAlt : theme.background");
}
</style>
