<script setup lang="ts">
import { CodeBlock } from "~/types";

defineProps<{
  block: CodeBlock;
}>();
</script>

<template>
  <div v-html="block.content" />
</template>

<style></style>
