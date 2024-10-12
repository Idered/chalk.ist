<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";
import { state } from "~/lib/state";
import { store } from "~/lib/store";
import { ExportState } from "~/lib/enums";

const resizeStartX = ref(0);
const resizeStartY = ref(0);
const resizeStartWidth = ref(0);
const resizeStartHeight = ref(0);
const activeResizeHandle = ref<"left" | "right" | "top" | "bottom" | null>(
  null,
);

useEventListener("mouseup", () => {
  activeResizeHandle.value = null;
});

useEventListener("mousemove", (event: MouseEvent) => {
  if (!activeResizeHandle.value) return;
  const direction =
    activeResizeHandle.value === "left"
      ? -1
      : activeResizeHandle.value === "right"
        ? 1
        : activeResizeHandle.value === "top"
          ? 1
          : -1;
  if (["left", "right"].includes(activeResizeHandle.value)) {
    const nextWidth =
      resizeStartWidth.value +
      2 * (event.clientX - resizeStartX.value) * direction;
    store.value.paddingX = Math.min(Math.max(nextWidth, 16), 128);
  } else {
    const nextHeight =
      resizeStartHeight.value +
      2 * (event.clientY - resizeStartY.value) * direction;
    store.value.paddingY = Math.min(Math.max(nextHeight, 16), 128);
  }
});

function startResize(
  event: MouseEvent,
  handle: "left" | "right" | "top" | "bottom",
) {
  event.preventDefault();
  activeResizeHandle.value = handle;
  resizeStartX.value = event.clientX;
  resizeStartWidth.value = store.value.paddingX;
  resizeStartY.value = event.clientY;
  resizeStartHeight.value = store.value.paddingY;
}
</script>

<template>
  <div v-if="state.exportState === ExportState.Idle">
    <div
      class="side opacity-0 transition-opacity duration-100 hover:opacity-100"
      v-for="side in ['left', 'right', 'top', 'bottom'] as const"
      :style="
        side === 'left'
          ? { width: `${store.paddingX}px`, top: 0, bottom: 0 }
          : side === 'right'
            ? { width: `${store.paddingX}px`, top: 0, bottom: 0, right: 0 }
            : side === 'top'
              ? { height: `${store.paddingY}px`, left: 0, right: 0, bottom: 0 }
              : { height: `${store.paddingY}px`, left: 0, right: 0 }
      "
    >
      <div
        class="handle-container group"
        @mousedown="startResize($event, side)"
        :style="{
          cursor: {
            left: 'col-resize',
            right: 'col-resize',
            top: 'row-resize',
            bottom: 'row-resize',
          }[side],
        }"
      >
        <div
          class="handle"
          :style="{
            width: side === 'left' || side === 'right' ? '3px' : '16px',
            height: side === 'top' || side === 'bottom' ? '3px' : '16px',
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.side {
  @apply absolute z-10 flex items-center justify-center bg-red-500/10;
}
.handle-container {
  @apply pointer-events-auto relative z-20 flex h-4 w-6 items-center justify-center;
}
.handle {
  @apply border border-white bg-red-900/90 shadow-[0_0_0_1px_rgba(0,0,0,.1),0_2px_8px_rgba(0,0,0,.2)] transition-transform group-hover:scale-150;
}
</style>
