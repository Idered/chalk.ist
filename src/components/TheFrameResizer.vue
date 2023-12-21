<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";
import { exportState } from "~/composables/export-state";
import { preview, store } from "~/composables/store";
import { MAX_FRAME_WIDTH, MIN_FRAME_WIDTH } from "~/constants";
import { ExportState } from "~/enums";

const resizeStartX = ref(0);
const resizeStartWidth = ref(0);
const activeResizeHandle = ref<"left" | "right" | null>(null);

useEventListener("mouseup", () => {
  activeResizeHandle.value = null;
});

useEventListener("mousemove", (event: MouseEvent) => {
  if (!activeResizeHandle.value) return;
  const direction = activeResizeHandle.value === "left" ? -1 : 1;
  const nextWidth = resizeStartWidth.value + 2 * (event.clientX - resizeStartX.value) * direction;
  store.value.frameWidth = Math.min(Math.max(nextWidth, MIN_FRAME_WIDTH), MAX_FRAME_WIDTH);
});

function startResize(event: MouseEvent, handle: "left" | "right") {
  event.preventDefault();
  activeResizeHandle.value = handle;
  resizeStartX.value = event.clientX;
  resizeStartWidth.value = store.value.frameWidth;
}
</script>

<template>
  <div
    v-if="exportState === ExportState.Idle && !preview"
    class="flex w-6 h-6 absolute top-1/2 z-50 -translate-y-3 -right-3 items-center justify-center group cursor-col-resize select-none"
    @mousedown="startResize($event, 'right')"
  >
    <div
      class="shadow-[0_0_0_1px_rgba(0,0,0,.1),0_2px_8px_rgba(0,0,0,.2)] pointer-events-none w-2 h-6 bg-white/90 rounded group-hover:scale-150 transition-transform"
    />
  </div>

  <div
    v-if="exportState === ExportState.Idle && !preview"
    class="flex w-6 h-6 absolute top-1/2 z-10 -translate-y-3 -left-3 items-center justify-center group cursor-col-resize"
    @mousedown="startResize($event, 'left')"
  >
    <div
      class="shadow-[0_0_0_1px_rgba(0,0,0,.1),0_2px_8px_rgba(0,0,0,.2)] pointer-events-none w-2 h-6 bg-white/90 rounded group-hover:scale-150 transition-transform"
    />
  </div>
</template>
