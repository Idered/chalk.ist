<template>
  <div id="editor" ref="container" class="-mb-3"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import {
  emmetHTML,
  emmetCSS,
  emmetJSX,
  expandAbbreviation,
} from "emmet-monaco-es";

const clearDiagnostics = {
  noSuggestionDiagnostics: true,
  noSemanticValidation: true,
  noSyntaxValidation: true,
};
const container = ref<HTMLDivElement>();
const width = ref(520);
const editorRef = ref<monaco.editor.IStandaloneCodeEditor>();
const content = useLocalStorage(
  "content",
  `<template>
  <span
    class="text-[#497AFB] bg-[#ECF0FB] font-semibold inline-block px-1 py-px rounded leading-5 mx-px"
    >
    <slot />
  </span>
</template>`
);

defineExpose({
  editorRef,
});

onMounted(async () => {
  emmetHTML(monaco, ["html"]);
  if (!container.value) return;
  await document.fonts.load("12px JetBrains Mono");
  monaco.editor.remeasureFonts();

  const editor = monaco.editor.create(container.value, {
    value: content.value,
    //     value: `module.exports = leftpad;

    // function leftpad(str, len, ch) {
    //   str = String(str);
    //   var i = -1;

    //   if (!ch && ch !== 0) ch = ' ';

    //   len = len - str.length;

    //   while (i++ < len) {
    //     str = ch + str;
    //   }
    //   return str;
    // }`,
    language: "html",
    theme: "vs-dark",
    fontLigatures: true,
    selectionHighlight: false,
    scrollBeyondLastLine: false,
    fontFamily: "JetBrains Mono",
    fontSize: 14,
    quickSuggestions: false,
    renderLineHighlight: "none",
    wordWrap: "on",
    wrappingStrategy: "advanced",
    codeLens: false,
    folding: false,
    matchBrackets: "never",
    occurrencesHighlight: false,
    definitionLinkOpensInPeek: false,
    lineDecorationsWidth: 0,
    contextmenu: false,
    overviewRulerLanes: 0,
    lineNumbers: "off",
    guides: { indentation: false },
    hover: { enabled: false },
    lightbulb: { enabled: false },
    minimap: { enabled: false },
  });

  editorRef.value = editor;

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
    clearDiagnostics
  );
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
    clearDiagnostics
  );

  let ignoreUpdateEvent = false;
  const updateHeight = () => {
    if (!container.value) return;
    const contentHeight = Math.min(1000, editor.getContentHeight() + 12);
    container.value.style.width = `${width}px`;
    container.value.style.height = `${contentHeight}px`;
    try {
      ignoreUpdateEvent = true;
      editor.layout({ width: width.value, height: contentHeight });
    } finally {
      ignoreUpdateEvent = false;
    }
  };

  editor.onDidChangeModelContent((e) => {
    content.value = editor.getModel()?.getValue();
  });

  editor.onDidContentSizeChange(updateHeight);
});
</script>

<style>
.monaco-editor .margin,
.monaco-editor,
.monaco-editor-background,
.monaco-editor .inputarea.ime-input {
  background: transparent !important;
}
</style>
