<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { store } from "~/lib/store";
import { BlockType } from "~/lib/enums";

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

// New computed properties
const marginBlock = computed(() => {
  if (frameHeight.value <= containerHeight.value) return 0;
  return `${-((frameHeight.value - scale.value * frameHeight.value) / 2)}px`;
});

const transform = computed(() => {
  if (frameWidth.value > containerWidth.value) {
    return `scale(${containerWidth.value / frameWidth.value})`;
  }
  return undefined;
});

const editorFrameStyle = computed(() => ({
  width: `${frameWidth.value - 16}px`,
}));

const paddingStyle = computed(() => ({
  paddingLeft: `${store.value.paddingX}px`,
  paddingRight: `${store.value.paddingX}px`,
  paddingTop: `${store.value.paddingY}px`,
  paddingBottom: `${store.value.paddingY}px`,
}));
</script>

<template>
  <div
    ref="container"
    class="relative grid grid-rows-[1fr_auto] overflow-y-auto overflow-x-hidden"
  >
    <div
      class="grid origin-[center_left] content-center items-start justify-items-center"
      :style="{ marginBlock, transform }"
    >
      <div class="relative px-2">
        <FrameResizer />
        <div
          ref="editorFrame"
          data-editor-frame
          class="relative"
          :style="editorFrameStyle"
        >
          <WindowResizer />
          <FrameBackground />
          <FrameParticlesBackground
            :width="frameWidth - 16"
            :height="frameHeight"
          />

          <div class="overflow-hidden" :style="paddingStyle">
            <div class="grid grid-cols-12 gap-4">
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
</template>
