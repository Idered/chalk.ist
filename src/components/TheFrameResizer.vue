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
  const nextWidth =
    resizeStartWidth.value +
    2 * (event.clientX - resizeStartX.value) * direction;
  store.value.frameWidth = Math.min(
    Math.max(nextWidth, MIN_FRAME_WIDTH),
    MAX_FRAME_WIDTH,
  );
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
    class="sticky top-1/2 z-10 flex justify-between -mt-6"
  >
    <div
      class="group flex h-6 w-6 -translate-y-3 -translate-x-1/2 cursor-col-resize items-center justify-center"
      @mousedown="startResize($event, 'left')"
    >
      <div
        class="pointer-events-none h-6 w-2 rounded bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,.1),0_2px_8px_rgba(0,0,0,.2)] transition-transform group-hover:scale-150"
      />
    </div>

    <div
      class="group flex h-6 w-6 translate-x-1/2 -translate-y-3 cursor-col-resize select-none items-center justify-center"
      @mousedown="startResize($event, 'right')"
    >
      <div
        class="pointer-events-none h-6 w-2 rounded bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,.1),0_2px_8px_rgba(0,0,0,.2)] transition-transform group-hover:scale-150"
      />
    </div>
  </div>
</template>
