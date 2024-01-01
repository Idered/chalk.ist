<script setup lang="ts">
import { CodeBlock } from "~/types";
import { useMarkdown } from "~/lib/markdown";

const props = defineProps<{
  block: CodeBlock;
}>();

const content = useMarkdown(props.block.content);
</script>

<template>
  <div class="prose markdown prose-blue px-5 prose-a:no-underline mx-auto" v-html="content" />
</template>

<style>
.markdown > :first-child {
  margin-top: 0;
}

.markdown > :last-child,
.markdown > :last-child > * {
  margin-bottom: 0;
}

.markdown pre {
  background: hsl(258, 80%, 5%) !important;
}

.markdown h1 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown p {
  margin-top: 1rem;
}

.markdown h2 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.markdown h3 {
  font-size: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1rem;
}
.markdown h4 {
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.markdown a {
  /* color: #007bff; */
}

/* .markdown code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
} */

.markdown hr {
  border: none;
  border-top: 1px solid #dee2e6;
  margin: 1rem 0;
}
/* 
.markdown table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

.markdown table th,
.markdown table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.markdown table th {
  font-weight: bold;
  background-color: #f8f9fa;
}

.markdown table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.markdown table-striped tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
} */

.markdown img {
  max-width: 100%;
  border-radius: 4px;
  height: auto;
  margin-top: 0;
}
</style>
