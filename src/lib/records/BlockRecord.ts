import { FrameRecord } from "./FrameRecord";
import { v4 } from "uuid";
import { useDataStore } from "~/composables/store";
import { BlockType } from "~/enums";

export interface BlockRecordSchema {
  id: string;
  frameId: string;
  type?: BlockType.Code;
}

type EditorBlockTransformation = {
  line: number;
  character?: number;
  type: "add" | "remove" | "focus" | "highlight" | "annotate";
};

export interface EditorBlockRecordSchema extends BlockRecordSchema {
  columnSpan: number;
  content: string;
  frameId: string;
  id: string;
  language: string;
  mode: "edit" | "preview";
  rowSpan: number;
  title: string;
  transformations: EditorBlockTransformation[];
  type: BlockType.Code;
}

export class BlockRecord implements BlockRecordSchema {
  id: string;
  frameId: string;
  type?: BlockType.Code;

  constructor(data: BlockRecordSchema) {
    this.id = data.id;
    this.frameId = data.frameId;
  }

  static whereFrame(frameId: string) {
    return useDataStore()
      .blocks.filter((block) => block.frameId === frameId)
      .map((block) => new EditorBlockRecord(block as EditorBlockRecordSchema));
  }

  update(data: Partial<BlockRecordSchema>) {
    Object.assign(this, data);
    return this.save();
  }

  rename(title: string) {
    Object.assign(this, { title });
    return this.save();
  }

  save() {
    const store = useDataStore();
    const index = store.blocks.findIndex((item) => item.id === this.id);
    if (index > -1) {
      store.blocks[index] = this;
    } else {
      store.blocks.push(this);
    }
    return this;
  }

  remove() {
    const store = useDataStore();
    const index = store.blocks.findIndex((block) => block.id === this.id);
    if (index <= -1) {
      return;
    }
    return store.blocks.splice(index, 1)[0];
  }

  move(moveBy: number) {
    const store = useDataStore();
    const index = store.blocks.findIndex((block) => block.id === this.id);
    const newIndex = index + moveBy;
    if (newIndex < 0 || newIndex >= store.blocks.length) return;
    const [editor] = store.blocks.splice(index, 1);
    store.blocks.splice(newIndex, 0, editor);
    return this;
  }

  get frame() {
    return FrameRecord.find(this.frameId)!;
  }
}

export class EditorBlockRecord extends BlockRecord {
  columnSpan: number;
  content: string;
  frameId: string;
  id: string;
  language: string;
  mode: "edit" | "preview";
  rowSpan: number;
  title: string;
  transformations: EditorBlockTransformation[];
  type: BlockType.Code;

  constructor(
    data: Partial<EditorBlockRecordSchema> &
      Pick<EditorBlockRecordSchema, "frameId">,
  ) {
    const id = data.id || v4();
    super({
      id,
      ...data,
    });
    this.id = id;
    this.frameId = data.frameId;
    this.columnSpan = data.columnSpan || 12;
    this.rowSpan = data.rowSpan || 1;
    this.content = data.content || "";
    this.language = data.language || "typescript";
    this.mode = data.mode || "edit";
    this.title = data.title || "";
    this.transformations = data.transformations || [];
    this.type = BlockType.Code;
  }

  static all() {
    return useDataStore()
      .blocks.filter((block) => block.type === BlockType.Code)
      .map((block) => new EditorBlockRecord(block as EditorBlockRecordSchema));
  }

  static create(data: EditorBlockRecordSchema) {
    const record = new EditorBlockRecord(data);
    const store = useDataStore();
    store.blocks.push(record);
    return record;
  }

  rename(title: string) {
    Object.assign(this, { title });
    return this.save();
  }

  update(data: Partial<EditorBlockRecordSchema>) {
    Object.assign(this, data);
    return this.save();
  }
}
