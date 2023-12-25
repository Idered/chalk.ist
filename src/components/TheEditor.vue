<script setup lang="ts">
import { computed, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { transformerCompactLineOptions, transformerNotationDiff, transformerNotationFocus } from "shikiji-transformers";

import { store } from "~/composables/store";
import { BlockType } from "~/enums";
import { useShiki } from "~/lib/shiki";
import { ShikijiTransformer } from "shikiji/index.mjs";

const props = defineProps<{
  blockId: string;
}>();

const shiki = useShiki();
const editor = ref<HTMLTextAreaElement>();
const formatted = ref<HTMLDivElement>();
const block = computed(() => store.value.blocks.find((block) => block.id === props.blockId)!);

function lineNumberTransformer(): ShikijiTransformer {
  return {
    name: "line-number",
    line(line, index) {
      line.properties = {
        ...line.properties,
        class: ["line"],
        "data-line": `${index}`,
      };
      line.children.unshift({
        type: "element",
        tagName: "span",
        properties: {
          class: ["line-number"],
        },
        children: [
          {
            type: "text",
            value: `${index}`,
          },
        ],
      });
      return line;
    },
  };
}

const shikiContent = computed(() => {
  if (!shiki.value || block.value.type !== BlockType.Code) return "";
  const classNames = ["shiki"];
  if (block.value.transformations.some((item) => item.type === "focus")) {
    classNames.push("has-focus");
  }
  const lineOptions = block.value.transformations.map((item) => {
    return {
      line: item.line,
      classes: [item.type],
    };
  });
  return shiki.value.codeToHtml(block.value.content, {
    lang: block.value.language,
    theme: store.value.colorTheme,
    transformers: [
      transformerNotationDiff(),
      transformerNotationFocus(),
      lineNumberTransformer(),
      transformerCompactLineOptions(lineOptions),
    ],
    meta: {
      class: classNames.join(" "),
      tabindex: "-1",
    },
  });
});

useEventListener(editor, "keydown", async (e) => {
  if (!editor.value) return;
  const key = e.key;
  const metaKey = e.metaKey;
  const shiftKey = e.shiftKey;
  const textarea = editor.value;
  const tabSize = 2; // Change this according to your preference
  const val = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const startOfLine = val.lastIndexOf("\n", start - 1) + 1;
  let endOfLine = val.indexOf("\n", end);
  if (endOfLine === -1) endOfLine = val.length;

  if (key === "Tab") {
    e.preventDefault();

    if (shiftKey) {
      // Handle shift + tab to de-indent
      if (val.substring(start - tabSize, start) === " ".repeat(tabSize)) {
        textarea.value = val.substring(0, start - tabSize) + val.substring(start);
        textarea.selectionStart = textarea.selectionEnd = start - tabSize;
      }
    } else {
      // Handle tab to indent
      textarea.value = val.substring(0, start) + " ".repeat(tabSize) + val.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + tabSize;
    }
    textarea.dispatchEvent(new Event("input"));
  } else if (metaKey && (key === "]" || key === "[")) {
    e.preventDefault();
    if (key === "]") {
      // Handle CMD + ] to indent
      textarea.value = val.substring(0, startOfLine) + " ".repeat(tabSize) + val.substring(startOfLine);
      textarea.selectionStart = textarea.selectionEnd = start + tabSize; // Shifting cursor to the right
    } else if (key === "[") {
      // Handle CMD + [ to de-indent
      if (val.substring(startOfLine, startOfLine + tabSize) === " ".repeat(tabSize)) {
        textarea.value = val.substring(0, startOfLine) + val.substring(startOfLine + tabSize);
        textarea.selectionStart = textarea.selectionEnd = start - tabSize; // Shifting cursor to the left
      }
    }
    textarea.dispatchEvent(new Event("input"));
  }
});

const gutter = computed(() => {
  const len = block.value.content.split("\n").length;
  if (!store.value.showLineNumbers) return "20px";
  return len >= 100 ? "6.5ch" : len >= 10 ? "5.5ch" : "4.5ch";
});

const fontFeatureSettings = computed(() => {
  if (!store.value.fontLigatures) return '"liga" 0, "calt" 0';
  return '"liga", "calt"';
});

const fontFamily = computed(() => {
  return `"${store.value.fontFamily}", Menlo, Monaco, "Courier New", monospace`;
});

useEventListener(formatted, "click", (event) => {
  const el = (event.target as HTMLElement).closest(".line") as HTMLSpanElement;
  if (!el.classList.contains("line")) {
    return;
  }
  const line = parseInt(el.dataset.line!);
  const index = block.value.transformations.findIndex((item) => item.type === "focus" && item.line === line);
  if (index === -1) {
    block.value.transformations.push({
      type: "focus",
      line,
    });
  } else {
    block.value.transformations.splice(index, 1);
  }
});
</script>

<template>
  <div
    class="px-px [grid-template:1fr/1fr] grid"
    :style="{
      '--line-numbers-color': 'rgba(255,255,255,0.25)',
    }"
  >
    <div
      class="formatted transition-opacity duration-500"
      v-html="shikiContent"
      ref="formatted"
      :style="{
        'line-height': store.lineHeight + 'px',
      }"
      :class="{
        'pointer-events-none': store.editMode === 'code',
        'show-line-numbers': store.showLineNumbers,
        'opacity-0': !shiki,
      }"
    />

    <textarea
      class="editor focus-visible:outline-none"
      ref="editor"
      v-model="block.content"
      spellcheck="false"
      :style="{
        'min-height': block.content.split('\n').length * store.lineHeight + 'px',
        'line-height': store.lineHeight + 'px',
      }"
    />
  </div>
</template>

<style>
.editor,
.formatted {
  font-variation-settings: normal;
  font-feature-settings: v-bind(fontFeatureSettings);
  font-family: v-bind(fontFamily);
  grid-column-start: 1;
  grid-row-start: 1;
  font-size: 13px;
  -moz-tab-size: 2;
  height: 100%;
  -o-tab-size: 2;
  tab-size: 2;
  white-space-collapse: collapse;
  white-space: pre-wrap;
}

.editor {
  resize: none;
  background: transparent;
  border: none;
  margin-inline-end: 20px;
  margin-inline-start: v-bind(gutter);
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  text-size-adjust: none;
  caret-color: white;
  outline: none;
}

.formatted {
  user-select: none;
  position: relative;
}

.formatted code,
.formatted pre {
  font-family: inherit;
  background-color: transparent !important;
}

.formatted code {
  display: grid;
}

.formatted .has-focus .line:not(.focus) {
  opacity: 0.5;
  filter: blur(0.8px);
}

.formatted .line {
  position: relative;
  padding-inline-end: 20px;
  padding-inline-start: v-bind(gutter);
  transition: padding 0.375s ease-in-out, opacity 0.375s ease-in-out, filter 0.375s ease-in-out;
}

.formatted .line:hover {
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

.formatted .line-number {
  float: left;
  margin-left: -4ch;
  width: 3ch;
  text-align: right;
  opacity: 0;
  user-select: none;
  transition: opacity 0.375s cubic-bezier(0.6, 0.6, 0, 1);
}

.formatted.show-line-numbers .line-number {
  opacity: 1;
}

.formatted .shiki:not(.has-focused) .line-number {
  color: var(--line-numbers-color);
}

.formatted .line span {
  white-space: pre-wrap;
}

.formatted .diff.remove {
  background-color: hsl(0, 52%, 20%);
}

.formatted .diff.add {
  background-color: hsl(106, 72%, 11%);
}
</style>
