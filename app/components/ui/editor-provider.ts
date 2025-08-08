import { provide, inject } from "vue";
import type { Ref } from "vue";

const editorSymbol = Symbol("editor");

type EditorProvider = {
  register: (editor: Ref<HTMLTextAreaElement | undefined>) => void;
  get: () => Ref<HTMLTextAreaElement | undefined>;
};

export function setEditorProvider(value: EditorProvider) {
  return provide(editorSymbol, value);
}

export function getEditorProvider() {
  return inject<EditorProvider>(editorSymbol);
}
