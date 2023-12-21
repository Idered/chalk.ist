<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { store, preview } from "~/composables/store";
import { computed, ref, watch } from "vue";
import { BlockType, ExportState } from "~/enums";
import { exportState } from "~/composables/export-state";
import BaseButton from "./BaseButton.vue";
import IconClipboard from "./IconClipboard.vue";
import EditorBlock from "./EditorBlock.vue";
import TheFooter from "./TheFooter.vue";
import TheFrameBackground from "./TheFrameBackground.vue";
import TheParticlesBackground from "./TheParticlesBackground.vue";
import TheFrameResizer from "./TheFrameResizer.vue";
import TheFrameMeta from "./TheFrameMeta.vue";

const timeout = ref();
const container = ref<HTMLDivElement>();
const editorFrame = ref<HTMLDivElement>();
const { width: containerWidth } = useElementSize(container);
const { height: frameHeight } = useElementSize(editorFrame);
const frameWidth = computed(() =>
  preview.value ? preview.value.frameWidth : store.value.frameWidth + store.value.paddingX * 2
);

watch(frameHeight, (value) => {
  store.value.frameHeight = Math.round(value);
});

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

<template>
  <div data-editor-frame-container ref="container" class="overflow-y-auto overflow-x-hidden grid p-1 font-sans">
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
      <div ref="editorFrame" data-editor-frame class="relative" :style="{ width: `${frameWidth}px` }">
        <BaseButton
          v-if="preview"
          class="px-4 absolute top-full left-0 mt-2 bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/40 group"
          @click="handleCopy"
        >
          <IconClipboard width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />

          {{ exportState === ExportState.JustCopiedContent ? "Copied!" : "Copy to Clipboard" }}
        </BaseButton>

        <TheFrameMeta :frame-width="frameWidth" />
        <TheFrameResizer />
        <TheFrameBackground />
        <TheParticlesBackground v-if="store.showParticles" :width="frameWidth" :height="frameHeight" />

        <div
          class="overflow-hidden"
          :style="{
            paddingLeft: `${preview ? preview.paddingX : store.paddingX}px`,
            paddingRight: `${preview ? preview.paddingX : store.paddingX}px`,
            paddingTop: `${preview ? preview.paddingY : store.paddingY}px`,
            paddingBottom: `${preview ? preview.paddingY : store.paddingY}px`,
          }"
        >
          <div data-frame-group="2" class="grid grid-cols-12 gap-4">
            <div
              v-for="block in store.blocks"
              :key="block.id"
              :style="{
                gridColumn: `span ${block.columnSpan}`,
                gridRow: `span ${block.rowSpan}`,
              }"
            >
              <EditorBlock v-if="block.type === BlockType.Code" class="h-full" :block-id="block.id" />
              <!-- <NoteBlock
                v-if="block.type === BlockType.Note"
                class="min-h-full relative"
                :block-id="block.id"
                :theme="theme"
              /> -->
            </div>
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  </div>
</template>
