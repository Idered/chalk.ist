import { v4 } from "uuid";
import { DEFAULT_CONTENT } from "~/constants";
import { BlockType } from "~/enums";
import {
  BlockRecordSchema,
  EditorBlockRecordSchema,
} from "~/lib/records/BlockRecord";
import { FileRecordSchema } from "~/lib/records/FileRecord";
import { FrameRecordSchema } from "~/lib/records/FrameRecord";

const fileId = v4();
const frameId = v4();

export const initialFiles = [
  { id: fileId, name: "Untitled", isExpanded: true },
] as FileRecordSchema[];

export const initialFrames = [
  { id: frameId, name: "Untitled", isExpanded: true, fileId },
] as FrameRecordSchema[];

export const initialBlocks = [
  {
    id: v4(),
    frameId,
    content: DEFAULT_CONTENT,
    language: "typescript",
    type: BlockType.Code,
    title: "",
    columnSpan: 12,
    rowSpan: 1,
    mode: "edit",
    transformations: [],
  },
] as (BlockRecordSchema | EditorBlockRecordSchema)[];
