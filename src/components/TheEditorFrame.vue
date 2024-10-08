<script setup lang="ts">
import EditorBlock from "./EditorBlock.vue";
import TheFrameBackground from "./TheFrameBackground.vue";
import TheFrameFooter from "./TheFrameFooter.vue";
import TheFrameResizer from "./TheFrameResizer.vue";
import TheMenu from "./TheMenu.vue";
import TheParticlesBackground from "./TheParticlesBackground.vue";
import { useElementSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { preview, store } from "~/composables/store";
import { BlockType } from "~/enums";

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
    class="grid grid-rows-[auto_1fr] overflow-y-auto overflow-x-hidden font-sans"
  >
    <TheMenu :frame-width="frameWidth" />

    <div
      ref="container"
      class="relative grid grid-rows-[1fr_auto] overflow-y-auto overflow-x-hidden"
    >
      <div
        class="grid origin-[center_left] content-center items-start justify-items-center"
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
              :width="frameWidth - 16"
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
                  data-block
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
                </div>
              </div>
              <TheFrameFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
