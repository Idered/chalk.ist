<template>
  <div>
    <div
      id="diff-editor"
      ref="diffContainer"
      class="-mb-3"
      :class="{ hidden: !store.diff }"
    />
    <div
      id="editor"
      ref="container"
      class="-mb-3"
      :class="{ hidden: store.diff }"
    />
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JSONWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { isEditorReady, store, theme } from "~/composables/store";
import { DEFAULT_EDITOR_CONFIG } from "~/constants";

(self as any).MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (["typescript", "javascript"].includes(label)) {
      return new TsWorker();
    }
    if (["css", "scss"].includes(label)) {
      return new CssWorker();
    }
    if (["html"].includes(label)) {
      return new HtmlWorker();
    }
    if (["json"].includes(label)) {
      return new JSONWorker();
    }
    return new EditorWorker();
  },
};

const container = ref<HTMLDivElement>();
const diffContainer = ref<HTMLDivElement>();
const width = ref(510);

onMounted(async () => {
  if (!container.value) return;
  if (!diffContainer.value) return;

  const editor = monaco.editor.create(container.value, {
    ...DEFAULT_EDITOR_CONFIG,
  });
  const diffEditor = monaco.editor.createDiffEditor(
    diffContainer.value,
    DEFAULT_EDITOR_CONFIG
  );
  const activeContainer = computed(() =>
    store.value.diff ? diffContainer.value : container.value
  );
  const activeEditor = computed(() =>
    store.value.diff ? diffEditor.getModifiedEditor() : editor
  );
  const editorModel = monaco.editor.createModel(
    store.value.content,
    store.value.language
  );
  const diffEditorOriginalModel = monaco.editor.createModel(
    store.value.content,
    store.value.language
  );
  const diffEditorModifiedModel = monaco.editor.createModel(
    store.value.content,
    store.value.language
  );

  editor.setModel(editorModel);
  diffEditor.setModel({
    original: diffEditorOriginalModel,
    modified: diffEditorModifiedModel,
  });

  editor.updateOptions({ tabSize: 2 });
  diffEditor.getOriginalEditor().updateOptions({ tabSize: 2 });
  diffEditor.getModifiedEditor().updateOptions({ tabSize: 2 });

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  const autoHeight = () => {
    if (!activeContainer.value) return;
    const MAX_HEIGHT = Infinity;

    const contentHeight = Math.min(
      MAX_HEIGHT,
      activeEditor.value.getContentHeight() + 12
    );
    // const contentWidth = Math.max(
    //   400,
    //   activeEditor.value.getContentWidth() + 32
    // );
    activeContainer.value.style.width = `${width.value}px`;
    activeContainer.value.style.height = `${contentHeight}px`;
    activeEditor.value.layout({ width: width.value, height: contentHeight });
  };

  // activeEditor.value.onDidChangeModelContent((e) => {
  //   content.value = activeEditor.value.getModel()?.getValue();
  // });

  editor.onDidChangeModelContent(() => {
    store.value.content = editor.getModel()?.getValue() || "";
    diffEditorOriginalModel.setValue(store.value.content);
    diffEditorModifiedModel.setValue(store.value.content);
  });

  activeEditor.value.onDidBlurEditorWidget(() => {
    activeEditor.value.setSelection(new monaco.Selection(0, 0, 0, 0));
  });

  editor.onDidContentSizeChange(autoHeight);
  diffEditor.getModifiedEditor().onDidContentSizeChange(autoHeight);
  autoHeight();

  watch(() => store.value.diff, autoHeight);

  watchEffect(() => {
    monaco.editor.defineTheme(theme.value.name, theme.value.monaco);
    monaco.editor.setTheme(theme.value.name);
  });

  watchEffect(() => {
    monaco.editor.setModelLanguage(editorModel, store.value.language);
    monaco.editor.setModelLanguage(
      diffEditorOriginalModel,
      store.value.language
    );
    monaco.editor.setModelLanguage(
      diffEditorModifiedModel,
      store.value.language
    );
  });

  await document.fonts.load("12px JetBrains Mono");
  monaco.editor.remeasureFonts();
  isEditorReady.value = true;
});
</script>

<style>
.codicon-light-bulb,
.diffOverview {
  display: none !important;
}
.editor.modified {
  left: 0 !important;
}
.detected-link {
  text-decoration: none !important;
}
.original-in-monaco-diff-editor .overflow-guard {
  opacity: 0;
}
.codicon-diff-remove,
.codicon-diff-insert {
  height: 30px !important;
}
</style>
