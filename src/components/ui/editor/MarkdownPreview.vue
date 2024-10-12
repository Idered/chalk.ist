<script setup lang="ts">
import { useMarkdown } from "~/lib/markdown";
import { CodeBlock } from "~/types";

const props = defineProps<{
  block: CodeBlock;
}>();

const content = useMarkdown(props.block.content);
</script>

<template>
  <div
    class="markdown prose mx-auto px-5 prose-a:no-underline"
    v-html="content"
  />
</template>

<style>
.markdown {
  --h1-size: 2rem;
  --h2-size: 1.5rem;
  --h3-size: 1.25rem;
  --h4-size: 1rem;
  --h5-size: 0.875rem;
  --h6-size: 0.75rem;
  --body-font-size: 0.875rem;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  word-wrap: break-word;
}

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

.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown h1 {
  @apply border-b text-slate-800;
  font-size: var(--h1-size);
  padding-bottom: 0.3em;
}

.markdown h2 {
  @apply border-b text-slate-800;
  font-size: var(--h2-size);
  padding-bottom: 0.3em;
}

.markdown h3 {
  font-size: var(--h3-size);
}

.markdown h4 {
  font-size: var(--h4-size);
}

.markdown h5 {
  font-size: var(--h5-size);
}

.markdown h6 {
  font-size: var(--h6-size);
}

.markdown p {
  margin-top: 1rem;
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
