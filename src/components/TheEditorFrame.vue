<template>
  <div ref="container" class="overflow-y-auto overflow-x-hidden grid">
    <div
      class="grid justify-items-center items-start"
      :style="{
        transform:
          frameWidth > containerWidth && !isExporting
            ? `scale(${containerWidth / frameWidth})`
            : undefined,
        transformOrigin: 'left top',
      }"
      :class="{
        'sm:items-center': frameWidth < containerWidth,
      }"
    >
      <div
        ref="editorFrame"
        data-editor-frame
        class="bg-frame grid justify-items-center items-center"
        :style="{
          minHeight: `${(frameWidth / 16) * 9 + 1}px`,
        }"
      >
        <div class="p-8">
          <div class="bg-black/80 rounded-md px-4 shadow-app relative">
            <div
              v-if="store.reflection"
              class="absolute inset-0 overflow-hidden pointer-events-none"
            >
              <svg
                class="absolute left-0 top-0 w-3/6"
                viewBox="0 0 100 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0H100L47 172H0V0Z"
                  fill="url(#paint0_linear_47_2)"
                />
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
            <div class="pt-4 grid justify-start gap-x-2 grid-flow-col">
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
              <div class="w-3 h-3 bg-white/25 rounded-full"></div>
            </div>
            <div class="py-8">
              <Editor ref="editor" />
            </div>
          </div>
          <div class="flex justify-end">
            <div
              class="rounded-full z-10 relative p-1 pr-4 bg-black/70 text-white mt-4 flex items-center"
              v-if="store.username"
            >
              <IconTwitter :width="32" />
              <div class="font-semibold text-sm ml-2">
                @{{ store.username }}
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
import { useElementSize } from "@vueuse/core";
import { theme, store, isExporting } from "~/composables/store";
import { ref } from "vue";

const container = ref<HTMLDivElement>();
const editorFrame = ref<HTMLDivElement>();
const { width: containerWidth } = useElementSize(container);
const { width: frameWidth } = useElementSize(editorFrame);
</script>

<style>
.shadow-app {
  box-shadow: 0px 0.6px 0.7px hsl(v-bind("theme.shadow") / 0.3),
    0px 3.5px 4px -0.3px hsl(v-bind("theme.shadow") / 0.31),
    0px 6.4px 7.4px -0.7px hsl(v-bind("theme.shadow") / 0.32),
    0px 10.4px 12px -1px hsl(v-bind("theme.shadow") / 0.32),
    0px 16.3px 18.8px -1.3px hsl(v-bind("theme.shadow") / 0.33),
    0px 25.2px 29.1px -1.6px hsl(v-bind("theme.shadow") / 0.33),
    0px 37.9px 43.8px -2px hsl(v-bind("theme.shadow") / 0.34),
    0px 55.6px 64.2px -2.3px hsl(v-bind("theme.shadow") / 0.35);
}
.bg-frame {
  background: v-bind("theme.background");
}
</style>
