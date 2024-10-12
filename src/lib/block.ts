import { store } from "./store";
import { BlockType } from "~/lib/enums";
import { CodeBlock } from "~/types";

export function getCodeBlocks() {
  return store.value.blocks.filter(
    (block): block is CodeBlock => block.type === BlockType.Code,
  );
}

export function getCodeBlock(id: string) {
  const block = store.value.blocks.find((e) => e.id === id);

  if (block && block.type === BlockType.Code) {
    return block;
  }

  return null;
}

export function moveBlock(blockId: string, moveBy: number) {
  const blocks = store.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  const newIndex = index + moveBy;
  if (newIndex < 0 || newIndex >= blocks.length) return;
  const [editor] = blocks.splice(index, 1);
  blocks.splice(newIndex, 0, editor);
}

export function addEditorBlock() {
  const lastCodeBlock = store.value.blocks.filter(
    (item): item is CodeBlock => item.type === BlockType.Code,
  )[store.value.blocks.length - 1];
  const language =
    lastCodeBlock?.language === "markdown"
      ? "typescript"
      : lastCodeBlock?.language || "typescript";
  store.value.blocks.push({
    id: crypto.randomUUID(),
    content: "",
    type: BlockType.Code,
    language,
    title: "",
    icon: "",
    columnSpan: 12,
    rowSpan: 1,
    mode: "edit",
    transformations: [],
  });
}

export function addMarkdownBlock() {
  store.value.blocks.push({
    id: crypto.randomUUID(),
    content: "",
    type: BlockType.Code,
    language: "markdown",
    title: "",
    icon: "markdown",
    columnSpan: 12,
    rowSpan: 1,
    mode: "edit",
    transformations: [],
  });
}

export function addNoteBlock() {
  store.value.blocks.push({
    id: crypto.randomUUID(),
    content: "",
    type: BlockType.Note,
    columnSpan: 12,
    mode: "edit",
    rowSpan: 1,
    fontColor: "#ffffff",
    fontSize: "20",
  });
}

export function removeBlock(blockId: string) {
  const blocks = store.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  blocks.splice(index, 1);
}
