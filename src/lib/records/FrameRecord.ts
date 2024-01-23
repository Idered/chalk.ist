import { Collection } from "../collection";
import { EditorBlockRecord } from "./BlockRecord";
import { FileRecord } from "./FileRecord";
import { useDataStore } from "~/composables/store";

export interface FrameRecordSchema {
  id: string;
  fileId: string;
  name: string;
  isExpanded: boolean;
}

export class FrameRecord implements FrameRecordSchema {
  id: string;
  fileId: string;
  name: string;
  isExpanded: boolean;

  constructor(data: FrameRecordSchema) {
    this.id = data.id;
    this.fileId = data.fileId;
    this.name = data.name;
    this.isExpanded = data.isExpanded;
  }

  static all() {
    return useDataStore().frames.map((file) => new FrameRecord(file));
  }

  static whereFile(fileId: string) {
    return useDataStore()
      .frames.filter((frame) => frame.fileId === fileId)
      .map((frame) => new FrameRecord(frame));
  }

  static get current() {
    const store = useDataStore();
    const frame = store.frames.find(
      (frame) => frame.id === store.current_frame,
    );
    if (frame) {
      return new FrameRecord(frame);
    }
    return null;
  }

  get file() {
    return FileRecord.find(this.fileId)!;
  }

  static find(id: string) {
    const file = useDataStore().frames.find((file) => file.id === id);
    if (file) {
      return new FrameRecord(file);
    }
    return null;
  }

  remove() {
    const store = useDataStore();
    const index = store.frames.findIndex((frame) => frame.id === this.id);
    if (index <= -1) {
      return;
    }
    for (const block of this.blocks) {
      block.remove();
    }
    return store.frames.splice(index, 1)[0];
  }

  save() {
    const store = useDataStore();
    const index = store.frames.findIndex((item) => item.id === this.id);
    if (index > -1) {
      store.frames[index] = this;
    } else {
      store.frames.push(this);
    }
    return this;
  }

  rename(name: string) {
    Object.assign(this, { name });
    return this.save();
  }

  addEditorBlock() {
    const block = new EditorBlockRecord({
      frameId: this.id,
    });
    const store = useDataStore();
    store.blocks.push(block);
    return block;
  }

  addMarkdownBlock() {
    const block = new EditorBlockRecord({
      frameId: this.id,
      language: "markdown",
    });
    const store = useDataStore();
    store.blocks.push(block);
    return block;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    return this.save();
  }

  select() {
    useDataStore().current_frame = this.id;
    return this;
  }

  get blocks() {
    return Collection(EditorBlockRecord.whereFrame(this.id));
  }
}
