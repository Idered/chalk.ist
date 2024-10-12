<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";
import { store } from "~/lib/store";
import { CodeBlock } from "~/types";

defineProps<{
  block: CodeBlock;
}>();

const editorContainer = ref<HTMLDivElement>();
const { width: editorContainerWidth } = useElementSize(editorContainer);
</script>

<template>
  <div
    class="overflow-hidden"
    ref="editorContainer"
    :style="{
      paddingTop: `${store.innerPaddingY}px`,
      paddingBottom: `${store.innerPaddingY}px`,
    }"
  >
    <Editor
      ref="editor"
      :block="block"
      :width="editorContainerWidth"
      v-if="block.mode === 'edit'"
    />
    <MarkdownPreview v-else-if="block.language === 'markdown'" :block="block" />
    <HTMLPreview v-else-if="block.language === 'html'" :block="block" />
  </div>
</template>
