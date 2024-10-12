<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { store } from "~/lib/store";
import { BlockType } from "~/enums";

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
</script>

<template>
  <div
    data-editor-frame-container
    class="grid grid-rows-[auto_1fr] overflow-y-auto overflow-x-hidden font-sans"
  >
    <Menu :frame-width="frameWidth" />

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
        <div class="relative px-2">
          <FrameResizer />
          <div
            ref="editorFrame"
            data-editor-frame
            class="relative"
            :style="{ width: `${frameWidth - 16}px` }"
          >
            <WindowResizer />
            <FrameBackground />
            <FrameParticlesBackground
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
                  v-for="block in store.blocks"
                  data-block
                  :key="block.id"
                  :style="{
                    gridColumn: `span ${block.columnSpan}`,
                    gridRow: `span ${block.rowSpan}`,
                  }"
                >
                  <Window v-if="block.type === BlockType.Code" :block="block" />
                </div>
              </div>
              <FrameFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
