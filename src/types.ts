import { BundledLanguage } from "shiki/langs";
import { BlockType } from "./enums";

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
