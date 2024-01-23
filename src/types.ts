import { BlockType } from "./enums";

export type CodeBlock = {
  id: string;
  frameId: string;
  content: string;
  language: string;
  type: BlockType.Code;
  title: string;
  columnSpan: number;
  mode: "edit" | "preview";
  rowSpan: number;
  transformations: {
    line: number;
    character?: number;
    type: "add" | "remove" | "focus" | "highlight" | "annotate";
  }[];
};

export type NoteBlock = {
  id: string;
  frameId: string;
  type: BlockType.Note;
  content: string;
  columnSpan: number;
  mode: "edit" | "preview";
  rowSpan: number;
  fontColor: string;
  fontSize: string;
};

export type Block = CodeBlock;
