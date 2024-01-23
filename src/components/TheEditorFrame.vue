<script setup lang="ts">
import EditorBlock from "./EditorBlock.vue";
import TheFrameBackground from "./TheFrameBackground.vue";
import TheFrameFooter from "./TheFrameFooter.vue";
import TheFrameResizer from "./TheFrameResizer.vue";
import TheParticlesBackground from "./TheParticlesBackground.vue";
import { useElementSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { store } from "~/composables/store";
import { BlockType } from "~/enums";
import { FrameRecord } from "~/lib/records/FrameRecord";

const container = ref<HTMLDivElement>();
const editorFrame = ref<HTMLDivElement>();
const { width: containerWidth, height: containerHeight } =
  useElementSize(container);
const { height: frameHeight } = useElementSize(editorFrame);
const frameWidth = computed(
  () => store.value.frameWidth + store.value.paddingX * 2,
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

const currentFrameBlocks = computed(() => {
  return FrameRecord.current?.blocks || [];
});
</script>

<template>
  <div
    data-editor-frame-container
    class="grid overflow-y-auto overflow-x-hidden font-sans"
  >
    <div
      ref="container"
      v-if="currentFrameBlocks.length > 0"
      class="grid grid-rows-[1fr_auto] pb-28 overflow-y-auto overflow-x-hidden relative"
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
            <TheFrameBackground />
            <TheParticlesBackground
              v-if="store.showParticles"
              :width="frameWidth - 16"
              :height="frameHeight"
            />

            <div
              class="overflow-hidden"
              :style="{
                paddingLeft: `${store.paddingX}px`,
                paddingRight: `${store.paddingX}px`,
                paddingTop: `${store.paddingY}px`,
                paddingBottom: `${store.paddingY}px`,
              }"
            >
              <div data-frame-group="2" class="grid grid-cols-12 gap-4">
                <div
                  v-for="block in currentFrameBlocks"
                  :data-block="block.id"
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
