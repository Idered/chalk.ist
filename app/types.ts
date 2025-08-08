import type { BundledLanguage } from "shiki/langs";
import { BlockType } from "./lib/enums";

export type CodeBlock = {
  id: string;
  content: string;
  language: BundledLanguage;
  type: BlockType.Code;
  title: string;
  icon: string;
  columnSpan: number;
  mode: "edit" | "preview";
  rowSpan: number;
  transformations: {
    line: number;
    character?: number;
    type: "add" | "remove" | "focus" | "highlight" | "annotate";
  }[];
  marks?: Record<
    number,
    Array<{
      start: number;
      end: number;
      kind: "error" | "warning";
    }>
  >;
};

export type NoteBlock = {
  id: string;
  type: BlockType.Note;
  content: string;
  columnSpan: number;
  mode: "edit" | "preview";
  rowSpan: number;
  fontColor: string;
  fontSize: string;
};

export type Block = CodeBlock | NoteBlock;
export type EditMode =
  | "code"
  | "focus"
  | "add"
  | "remove"
  | "highlight"
  | "annotate";

export type Preset = {
  id: string;
  name: string;
  settings: Record<string, any>;
};
