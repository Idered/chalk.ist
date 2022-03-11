<template>
  <div id="editor" ref="container" class="-mb-3"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, watchEffect } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { theme } from "../composables/theme";

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
  `const btn = document.getElementById('btn')
let count = 0
function render() {
  btn.innerText = \`Count: \${count}\`
}
btn.addEventListener('click', () => {
  // Count from 1 to 10.
  if (count < 10) {
    count += 1
    render()
  }
})`
);

const isReady = ref(false);

defineExpose({
  editorRef,
  isReady,
});

onMounted(async () => {
  if (!container.value) return;

  const editor = monaco.editor.create(container.value, {
    value: content.value,
    language: "javascript",
    theme: "vs-dark",
    renderWhitespace: "none",
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
  editor.onDidBlurEditorWidget(() => {
    editor.setSelection(new monaco.Selection(0, 0, 0, 0));
  });
  editor.onDidContentSizeChange(updateHeight);
  updateHeight();

  watchEffect(() => {
    monaco.editor.defineTheme(theme.value.name, theme.value.monaco);
    monaco.editor.setTheme(theme.value.name);
  });

  await document.fonts.load("12px JetBrains Mono");
  monaco.editor.remeasureFonts();
  isReady.value = true;
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
