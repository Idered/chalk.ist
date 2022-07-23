<template>
  <div
    :style="{
      '--lineNumbersColor': theme.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
    } as any"
  >
    <div id="diff-editor" ref="diffContainer" class="-mb-3" :class="{ hidden: !store.diff }" />
    <div id="editor" ref="container" class="-mb-3" :class="{ hidden: store.diff }" />
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { computed, nextTick, onMounted, ref, watch, watchEffect } from "vue";

import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JSONWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { editorWidth, preview, store, theme } from "~/composables/store";
import { DEFAULT_EDITOR_CONFIG } from "~/constants";

(self as any).MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (["typescript", "javascript"].includes(label)) {
      return new TsWorker();
    }
    if (["css", "scss"].includes(label)) {
      return new CssWorker();
    }
    if (["html", "handlebars", "twig"].includes(label)) {
      return new HtmlWorker();
    }
    if (["json", "yaml"].includes(label)) {
      return new JSONWorker();
    }
    return new EditorWorker();
  },
};

const container = ref<HTMLDivElement>();
const diffContainer = ref<HTMLDivElement>();

onMounted(async () => {
  if (!container.value) return;
  if (!diffContainer.value) return;

  const editor = monaco.editor.create(container.value, {
    ...DEFAULT_EDITOR_CONFIG,
  });
  const diffEditor = monaco.editor.createDiffEditor(diffContainer.value, DEFAULT_EDITOR_CONFIG);
  const activeContainer = computed(() => (store.value.diff && !preview.value ? diffContainer.value : container.value));
  const activeEditor = computed(() => (store.value.diff && !preview.value ? diffEditor.getModifiedEditor() : editor));
  const editorModel = monaco.editor.createModel(store.value.content, store.value.language);
  const diffEditorOriginalModel = monaco.editor.createModel(store.value.content, store.value.language);
  const diffEditorModifiedModel = monaco.editor.createModel(store.value.content, store.value.language);

  editor.setModel(editorModel);
  diffEditor.setModel({
    original: diffEditorOriginalModel,
    modified: diffEditorModifiedModel,
  });

  editor.updateOptions({ tabSize: 2 });
  diffEditor.getOriginalEditor().updateOptions({ tabSize: 2 });
  diffEditor.getModifiedEditor().updateOptions({ tabSize: 2 });

  // monaco.languages
  //   .getLanguages()
  //   .find((l) => l.id === "javascript")
  //   ?.loader()
  //   .then(({ language }) => {
  //     monaco.languages.setMonarchTokensProvider("javascript", {
  //       ...language,
  //       tokenizer: {
  //         ...language.tokenizer,
  //         common: [[/\b(?:\w+(?=\())\b/, "function"], ...language.tokenizer.common],
  //       },
  //     });
  //   });

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

  const getEditorHeight = () => {
    if (!activeContainer.value) return 0;
    return activeEditor.value.getContentHeight() + 12;
  };

  const autoHeight = () => {
    if (!activeContainer.value) return;
    const contentHeight = getEditorHeight();
    activeContainer.value.style.width = `${editorWidth.value}px`;
    activeContainer.value.style.height = `${contentHeight}px`;
    activeEditor.value.layout({ width: editorWidth.value, height: contentHeight });
  };

  editor.onDidContentSizeChange(autoHeight);

  if (!preview.value) {
    watch(editorWidth, (width) => {
      if (!activeContainer.value) return;
      activeContainer.value.style.width = `${width}px`;
      activeEditor.value.layout({ width, height: parseInt(activeContainer.value.style.height, 10) });
    });

    editor.onDidChangeModelContent(() => {
      store.value.content = editor.getModel()?.getValue() || "";
      diffEditorOriginalModel.setValue(store.value.content);
      diffEditorModifiedModel.setValue(store.value.content);
    });

    activeEditor.value.onDidBlurEditorWidget(() => {
      activeEditor.value.setSelection(new monaco.Selection(0, 0, 0, 0));
    });

    diffEditor.getModifiedEditor().onDidContentSizeChange(autoHeight);
    autoHeight();

    watch(() => store.value.diff, autoHeight);

    watchEffect(() => {
      monaco.editor.defineTheme(`chalk-${theme.value.key}`, theme.value.monaco);
      monaco.editor.setTheme(`chalk-${theme.value.key}`);
    });

    watch(
      () => store.value.showLineNumbers,
      (show) => {
        editor.updateOptions({
          lineDecorationsWidth: show ? 16 : 0,
          lineNumbersMinChars: 1,
          lineNumbers: show ? "on" : "off",
        });
        diffEditor.updateOptions({
          lineDecorationsWidth: show ? 16 : 0,
          lineNumbersMinChars: 1,
          lineNumbers: show ? "on" : "off",
        });
      },
      { immediate: true }
    );

    watchEffect(() => {
      monaco.editor.setModelLanguage(editorModel, store.value.language);
      monaco.editor.setModelLanguage(diffEditorOriginalModel, store.value.language);
      monaco.editor.setModelLanguage(diffEditorModifiedModel, store.value.language);
    });
  }

  watch(
    preview,
    async (data) => {
      if (!data) return;
      editor.updateOptions({
        wordWrap: "off",
        lineNumbersMinChars: data.showLineNumbers ? 1 : 0,
        lineDecorationsWidth: data.showLineNumbers ? 16 : 0,
        lineNumbers: data.showLineNumbers ? "on" : "off",
      });
      editorModel.setValue(data.content);
      await nextTick();
      if (!activeContainer.value) return;
      const height = getEditorHeight();
      activeContainer.value.style.width = `${editorWidth.value}px`;
      activeContainer.value.style.height = `${height}px`;
      activeEditor.value.layout();
      monaco.editor.setModelLanguage(editorModel, data.language);
      monaco.editor.defineTheme(`chalk-${theme.value.key}`, theme.value.monaco);
      monaco.editor.setTheme(`chalk-${theme.value.key}`);
    },
    {
      immediate: true,
    }
  );

  await document.fonts.load("12px JetBrains Mono");

  monaco.editor.remeasureFonts();

  const source = container.value.querySelector(".monaco-editor");
  const diffSource = diffContainer.value.querySelector(".modified-in-monaco-diff-editor");
  const target = document.querySelector<HTMLDivElement>("[data-editor-frame-container]");
  const handleScroll = (event: Event): void => {
    if (!target) return;
    target.scrollTop += (event as WheelEvent).deltaY;
  };
  source?.addEventListener("wheel", handleScroll);
  diffSource?.addEventListener("wheel", handleScroll);
});
</script>

<style>
.iPadShowKeyboard,
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
.monaco-diff-editor .codicon-diff-remove,
.monaco-diff-editor .codicon-diff-insert {
  opacity: 0 !important;
}
.monaco-editor .line-numbers,
.monaco-editor .line-numbers.active-line-number {
  color: var(--lineNumbersColor) !important;
}
.monaco-editor .squiggly-error {
  display: none;
}
.monaco-editor .unicode-highlight {
  display: none;
}
</style>
