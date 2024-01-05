<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import EditorBlock from "./EditorBlock.vue";
import TheFooter from "./TheFooter.vue";
import TheFrameBackground from "./TheFrameBackground.vue";
import TheFrameResizer from "./TheFrameResizer.vue";
import TheParticlesBackground from "./TheParticlesBackground.vue";
import TheToolbar from "./TheToolbar.vue";
import { useElementSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { addEditorBlock, addMarkdownBlock } from "~/composables/block";
import { preview, store } from "~/composables/store";
import { BlockType } from "~/enums";

// const timeout = ref();
const container = ref<HTMLDivElement>();
const editorFrame = ref<HTMLDivElement>();
const { width: containerWidth, height: containerHeight } =
  useElementSize(container);
const { height: frameHeight } = useElementSize(editorFrame);
const frameWidth = computed(() =>
  preview.value
    ? preview.value.frameWidth
    : store.value.frameWidth + store.value.paddingX * 2,
);

watch(frameHeight, (value) => {
  store.value.frameHeight = Math.round(value);
});

// function handleCopy() {
//   if (!preview.value) return;
//   navigator.clipboard.writeText(preview.value.content);
//   exportState.value = ExportState.JustCopiedContent;
//   clearTimeout(timeout.value);
//   timeout.value = setTimeout(() => {
//     exportState.value = ExportState.Idle;
//   }, 1000);
// }
const scale = computed(() => {
  if (frameWidth.value > containerWidth.value) {
    return containerWidth.value / frameWidth.value;
  }
  return 1;
});
</script>

<template>
  <div
    data-editor-frame-container
    class="grid overflow-y-auto overflow-x-hidden font-sans grid-rows-[auto_1fr]"
  >
    <TheToolbar :frame-width="frameWidth" />

    <div
      ref="container"
      class="grid grid-rows-[1fr_auto] overflow-y-auto overflow-x-hidden relative"
    >
      <div
        class="grid items-start justify-items-center content-center origin-[center_left]"
        :style="{
          marginBlock:
            frameHeight <= containerHeight
              ? 0
              : `${-((frameHeight - scale * frameHeight) / 2)}px`,
          transform:
            frameWidth > containerWidth
              ? `scale(${containerWidth / frameWidth})`
              : undefined,
        }"
      >
        <div class="px-2">
          <TheFrameResizer />
          <div
            ref="editorFrame"
            data-editor-frame
            class="relative"
            :style="{ width: `${frameWidth - 16}px` }"
          >
            <!-- <BaseButton
              v-if="preview"
              class="group absolute left-0 top-full mt-2 bg-emerald-600/30 px-4 text-emerald-500 hover:bg-emerald-600/40"
              @click="handleCopy"
            >
              <IconClipboard
                width="16"
                class="transition-transform group-hover:rotate-6 group-hover:scale-110"
              />

              {{
                exportState === ExportState.JustCopiedContent
                  ? "Copied!"
                  : "Copy to Clipboard"
              }}
            </BaseButton> -->
            <TheFrameBackground />
            <TheParticlesBackground
              v-if="store.showParticles"
              :width="frameWidth"
              :height="frameHeight"
            />

            <div
              class="overflow-hidden"
              :style="{
                paddingLeft: `${preview ? preview.paddingX : store.paddingX}px`,
                paddingRight: `${
                  preview ? preview.paddingX : store.paddingX
                }px`,
                paddingTop: `${preview ? preview.paddingY : store.paddingY}px`,
                paddingBottom: `${
                  preview ? preview.paddingY : store.paddingY
                }px`,
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
                  <EditorBlock
                    v-if="block.type === BlockType.Code"
                    :block="block"
                  />
                  <!-- <NoteBlock v-if="block.type === BlockType.Note" :block="block" /> -->
                </div>
              </div>
              <TheFooter />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex space-x-2 border-t border-slate-700 bg-slate-800 px-2 py-2"
    >
      <BaseButton
        class="group relative z-10 rounded-md border border-slate-600/40 bg-black/40 pl-3 pr-4 text-white hover:border-slate-600/40 hover:bg-black/90"
        @click="addEditorBlock"
        :disabled="store.blocks.length >= 16"
      >
        <i-ph:plus />
        Code Block
      </BaseButton>

      <BaseButton
        class="group relative z-10 rounded-md border border-slate-600/40 bg-black/40 pl-3 pr-4 text-white hover:border-slate-600/40 hover:bg-black/90"
        @click="addMarkdownBlock"
        :disabled="store.blocks.length >= 16"
      >
        <i-ph:plus />
        Markdown Block
      </BaseButton>
    </div>
  </div>
</template>
