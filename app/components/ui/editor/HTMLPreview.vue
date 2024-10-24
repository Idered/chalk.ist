<script setup lang="ts">
import type { CodeBlock } from "~/types";
import { ref, onMounted, watch, nextTick } from "vue";

const props = defineProps<{
  block: CodeBlock;
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);

const updateIframeHeight = () => {
  if (iframeRef.value) {
    iframeRef.value.style.height = "auto";
    iframeRef.value.style.height =
      iframeRef.value.contentWindow?.document.body.scrollHeight + "px";
  }
};

onMounted(() => {
  updateIframeHeight();
});

watch(
  () => props.block.content,
  () => {
    // Use nextTick to ensure the content has been updated
    nextTick(updateIframeHeight);
  },
);
</script>

<template>
  <iframe
    ref="iframeRef"
    :srcdoc="block.content"
    sandbox="allow-scripts allow-same-origin"
    class="html-preview"
    @load="updateIframeHeight"
  ></iframe>
</template>

<style scoped>
.html-preview {
  width: 100%;
  border: none;
  overflow: hidden;
}
</style>
