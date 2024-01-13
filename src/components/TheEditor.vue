<script setup lang="ts">
import Annotation from "./Annotation.vue";
import { useElementSize, useEventListener } from "@vueuse/core";
import {
  transformerCompactLineOptions,
  transformerNotationDiff,
  transformerNotationFocus,
} from "shikiji-transformers";
import { ShikijiTransformer } from "shikiji/index.mjs";
import { computed, h, ref } from "vue";
import { store } from "~/composables/store";
import { BlockType } from "~/enums";
import { createTheme } from "~/lib/create-theme";
import { useShiki } from "~/lib/shiki";
import { CodeBlock } from "~/types";

const props = defineProps<{
  block: CodeBlock;
}>();

const shiki = useShiki();
const editor = ref<HTMLTextAreaElement>();
const formatted = ref<HTMLDivElement>();

function transformerLineNumbers(): ShikijiTransformer {
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

function transformerAnnotations(
  transformations: { type: string; line: number; character?: number }[],
): ShikijiTransformer {
  return {
    name: "annotations",
    line(line, index) {
      const lineTransformations = transformations.filter(
        (item) => item.line === index && item.type === "annotate",
      );
      if (lineTransformations.length === 0) return line;

      const annotations = lineTransformations.map(
        (item) =>
          ({
            type: "element",
            tagName: "Annotation",
            properties: {
              start: item.character,
              end: item.character,
              onRemove: (() => {
                const transformationIndex =
                  props.block.transformations.findIndex(
                    (item) =>
                      item.type === "annotate" &&
                      item.line === index &&
                      item.character === item.character,
                  );
                if (transformationIndex !== -1) {
                  props.block.transformations.splice(transformationIndex, 1);
                }
              }) as any,
              class: ["annotation", item.type],
            },
            children: [],
          }) satisfies typeof line,
      );

      const annotationContainer = {
        type: "element",
        tagName: "div",
        properties: {
          class: ["annotations"],
        },
        children: annotations,
      } satisfies typeof line;

      return {
        type: "element",
        tagName: "div",
        properties: {
          class: ["contents"],
        },
        children: [line, annotationContainer],
      };
    },
  };
}

const shikiContent = computed(() => {
  if (!shiki.value || !props.block || props.block.type !== BlockType.Code)
    return "";
  const classNames = ["shiki"];
  if (props.block.transformations.some((item) => item.type === "focus")) {
    classNames.push("has-focus");
  }
  if (store.value.showLineNumbers) {
    classNames.push("show-line-numbers");
  }
  const lineOptions = props.block.transformations.reduce(
    (mergedOptions, item) => {
      const existingOption = mergedOptions.find(
        (option) => option.line === item.line,
      );
      if (existingOption) {
        existingOption.classes.push(item.type);
      } else {
        mergedOptions.push({
          line: item.line,
          classes: [item.type],
        });
      }
      return mergedOptions;
    },
    [] as { line: number; classes: string[] }[],
  );

  const hast = shiki.value.codeToHast(props.block.content, {
    lang: props.block.language,
    theme: store.value.useCustomTheme
      ? createTheme("Custom", store.value.customTheme)
      : store.value.colorTheme,
    transformers: [
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerLineNumbers(),
      transformerAnnotations(props.block.transformations),
      transformerCompactLineOptions(lineOptions),
    ],
    meta: {
      class: classNames.join(" "),
      tabindex: "-1",
    },
  });

  return shikijiHastToVueH(hast);
});

const components: { [key: string]: any } = {
  Annotation,
};

function shikijiHastToVueH(node: any) {
  if (node.type === "root") {
    return node.children.map(shikijiHastToVueH);
  }
  if (node.type === "text") {
    return node.value;
  }
  if (node.type === "element") {
    const children = node.children.map(shikijiHastToVueH);
    if (node.tagName in components) {
      return h(components[node.tagName], node.properties, () => children);
    }
    return h(node.tagName, node.properties, children);
  }
  return "";
}

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
        textarea.value =
          val.substring(0, start - tabSize) + val.substring(start);
        textarea.selectionStart = textarea.selectionEnd = start - tabSize;
      }
    } else {
      // Handle tab to indent
      textarea.value =
        val.substring(0, start) + " ".repeat(tabSize) + val.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + tabSize;
    }
    textarea.dispatchEvent(new Event("input"));
  } else if (metaKey && (key === "]" || key === "[")) {
    e.preventDefault();
    if (key === "]") {
      // Handle CMD + ] to indent
      textarea.value =
        val.substring(0, startOfLine) +
        " ".repeat(tabSize) +
        val.substring(startOfLine);
      textarea.selectionStart = textarea.selectionEnd = start + tabSize; // Shifting cursor to the right
    } else if (key === "[") {
      // Handle CMD + [ to de-indent
      if (
        val.substring(startOfLine, startOfLine + tabSize) ===
        " ".repeat(tabSize)
      ) {
        textarea.value =
          val.substring(0, startOfLine) + val.substring(startOfLine + tabSize);
        textarea.selectionStart = textarea.selectionEnd = start - tabSize; // Shifting cursor to the left
      }
    }
    textarea.dispatchEvent(new Event("input"));
  }
});

const gutter = computed(() => {
  const len = props.block.content.split("\n").length;
  if (!store.value.showLineNumbers) return "20px";
  return len >= 100
    ? "calc(6.5ch + 4px)"
    : len >= 10
      ? "calc(5.5ch + 4px)"
      : "calc(4.5ch + 4px)";
});

const fontFeatureSettings = computed(() => {
  if (!store.value.fontLigatures) return '"liga" 0, "calt" 0';
  return '"liga", "calt"';
});

const fontFamily = computed(() => {
  return `"${store.value.fontFamily}", Menlo, Monaco, "Courier New", monospace`;
});

const characterWidth = computed(() => {
  const el = document.createElement("div");
  el.style.fontFamily = fontFamily.value;
  el.style.fontSize = "13px";
  el.style.position = "absolute";
  el.style.opacity = "0";
  el.id = Math.random().toString(16).slice(2);
  el.innerText = "a";
  document.body.appendChild(el);
  const width = el.getBoundingClientRect().width;
  document.body.removeChild(el);
  return width;
});

useEventListener(formatted, "click", (event) => {
  const el = (event.target as HTMLElement).closest(".line") as HTMLSpanElement;
  const mode = store.value.editMode;
  if (mode === "code") return;
  if (!el?.classList?.contains("line")) {
    return;
  }
  const line = parseInt(el.dataset.line!);
  const index = props.block.transformations.findIndex(
    (item) => item.type === mode && item.line === line,
  );
  if (index === -1) {
    if (mode === "add") {
      const index = props.block.transformations.findIndex(
        (item) => item.type === "remove" && item.line === line,
      );
      if (index !== -1) {
        props.block.transformations.splice(index, 1);
      }
    } else if (mode === "remove") {
      const index = props.block.transformations.findIndex(
        (item) => item.type === "add" && item.line === line,
      );
      if (index !== -1) {
        props.block.transformations.splice(index, 1);
      }
    } else if (mode === "highlight") {
      // remove "add" and "remove" transformations
      const index = props.block.transformations.findIndex(
        (item) => ["add", "remove"].includes(item.type) && item.line === line,
      );
      if (index !== -1) {
        props.block.transformations.splice(index, 1);
      }
    }
    props.block.transformations.push({
      type: mode,
      line,
    });
  } else {
    props.block.transformations.splice(index, 1);
  }
});

function addCharacterTransformer(line: number, character: number) {
  const index = props.block.transformations.findIndex(
    (item) =>
      item.type === "annotate" &&
      item.line === line &&
      item.character === character,
  );
  if (index === -1) {
    props.block.transformations.push({
      type: "annotate",
      line,
      character,
    });
  } else {
    props.block.transformations.splice(index, 1);
  }
}

const { width: editorWidth } = useElementSize(editor);
const charactersPerLine = computed(() =>
  Math.floor(editorWidth.value / characterWidth.value),
);
</script>

<template>
  <div
    class="grid px-px [grid-template:1fr/1fr]"
    :style="{
      '--character-width': characterWidth + 'px',
    }"
  >
    <div
      class="formatted font-config transition-opacity duration-500"
      ref="formatted"
      :style="{
        'line-height': store.lineHeight + 'px',
        'font-size': store.fontSize + 'px',
      }"
      :class="{
        'pointer-events-none': store.editMode === 'code',
        'opacity-0': !shiki,
      }"
    >
      <component v-once :is="() => shikiContent" />
    </div>

    <div
      class="font-config character-grid relative grid content-start"
      v-if="store.editMode === 'annotate'"
    >
      <template
        v-for="line in Array.from({
          length: block.content.split('\n').length,
        }).map((_, i) => i + 1)"
        :key="line"
      >
        <div
          class="flex"
          :style="{
            paddingLeft: gutter,
          }"
        >
          <div
            @click="addCharacterTransformer(line, character)"
            v-for="character in Array.from({ length: charactersPerLine }).map(
              (_, i) => i,
            )"
            :key="character"
            :style="{
              height: `${store.lineHeight}px`,
              width: `${characterWidth}px`,
            }"
            class="border border-transparent transition-colors hover:scale-x-110 hover:border-white/10 hover:bg-white/10"
          />
        </div>
      </template>
    </div>

    <textarea
      rows="1"
      class="editor font-config focus-visible:outline-none"
      ref="editor"
      v-model="block.content"
      spellcheck="false"
      :class="{
        'pointer-events-none': store.editMode !== 'code',
      }"
      :style="{
        'min-height':
          block.content.split('\n').length * store.lineHeight + 'px',
        'line-height': store.lineHeight + 'px',
        'font-size': store.fontSize + 'px',
      }"
    />
  </div>
</template>

<style>
.font-config {
  font-variation-settings: normal;
  font-feature-settings: v-bind(fontFeatureSettings);
  font-family: v-bind(fontFamily);
  font-size: 13px;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  white-space-collapse: collapse;
  white-space: pre-wrap;
}

.editor,
.formatted,
.character-grid {
  grid-column-start: 1;
  grid-row-start: 1;
  height: 100%;
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
  transition:
    padding 0.375s ease-in-out,
    opacity 0.375s ease-in-out,
    filter 0.075s ease-in-out;
}

.formatted .line:hover {
  --highlight-opacity: 0.2;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.formatted .line-number {
  float: left;
  margin-left: calc(v-bind(gutter) * -1 - 4px);
  width: v-bind(gutter);
  padding-right: 0.5em;
  text-align: right;
  opacity: 0;
  user-select: none;
  transition:
    opacity 0.375s cubic-bezier(0.6, 0.6, 0, 1),
    0.375s cubic-bezier(0.6, 0.6, 0, 1);
}

.show-line-numbers .line-number {
  opacity: 1;
}

.formatted .line-number {
  color: rgba(255, 255, 255, 0.25);
}

.formatted .line span {
  white-space: pre-wrap;
}

.formatted .highlight {
  background: rgba(255, 255, 255, var(--highlight-opacity, 0.1));
}

.formatted .highlight .line-number,
.formatted .add .line-number,
.formatted .remove .line-number {
  color: rgba(255, 255, 255, 0.6);
}

.formatted .highlight .line-number {
  background: rgba(255, 255, 255, 0.1);
}

.formatted .line.add {
  background: rgba(0, 255, 0, var(--highlight-opacity, 0.15));
}

.formatted .add .line-number {
  background: rgba(0, 255, 0, var(--highlight-opacity, 0.1));
}

.formatted .line.remove {
  background: rgba(255, 0, 0, var(--highlight-opacity, 0.15));
}

.formatted .remove .line-number {
  background: rgba(255, 0, 0, var(--highlight-opacity, 0.1));
}

.annotation {
  margin-left: v-bind(gutter);
  position: relative;
  z-index: 100;
  margin-right: 20px;
}
</style>
