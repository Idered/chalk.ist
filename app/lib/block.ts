import { BlockType } from "~/lib/enums";
import type { CodeBlock } from "~/types";
import { persistentState } from "./persistent-state";

export function getCodeBlocks() {
  return persistentState.value.blocks.filter(
    (block): block is CodeBlock => block.type === BlockType.Code,
  );
}

export function getCodeBlock(id: string) {
  const block = persistentState.value.blocks.find((e) => e.id === id);

  if (block && block.type === BlockType.Code) {
    return block;
  }

  return null;
}

export function moveBlock(blockId: string, moveBy: number) {
  const blocks = persistentState.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  const newIndex = index + moveBy;
  if (newIndex < 0 || newIndex >= blocks.length) return;
  const [editor] = blocks.splice(index, 1);
  blocks.splice(newIndex, 0, editor);
}

export function addEditorBlock() {
  const lastCodeBlock = persistentState.value.blocks.filter(
    (item): item is CodeBlock => item.type === BlockType.Code,
  )[persistentState.value.blocks.length - 1];
  const language =
    lastCodeBlock?.language === "markdown"
      ? "typescript"
      : lastCodeBlock?.language || "typescript";
  persistentState.value.blocks.push({
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
  persistentState.value.blocks.push({
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
  persistentState.value.blocks.push({
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
  const blocks = persistentState.value.blocks;
  const index = blocks.findIndex((e) => e.id === blockId);
  blocks.splice(index, 1);
}
