import { Collection } from "../collection";
import { FrameRecord } from "./FrameRecord";
import { v4 } from "uuid";
import { useDataStore } from "~/composables/store";

export interface FileRecordSchema {
  id: string;
  name: string;
  isExpanded: boolean;
}

export class FileRecord implements FileRecordSchema {
  id: string;
  name: string;
  isExpanded: boolean;

  $model = FileRecord;

  constructor(data: FileRecordSchema) {
    this.id = data.id;
    this.name = data.name;
    this.isExpanded = data.isExpanded;
  }

  static all() {
    return useDataStore().files.map((file) => new FileRecord(file));
  }

  static first() {
    return useDataStore().files.length
      ? new FileRecord(useDataStore().files[0])
      : null;
  }

  static find(id: string) {
    const file = useDataStore().files.find((file) => file.id === id);
    if (file) {
      return new FileRecord(file);
    }
    return null;
  }

  static create(data?: FileRecordSchema) {
    const record = new FileRecord(
      data ? data : { id: v4(), name: "Untitled", isExpanded: true },
    );
    useDataStore().files.push(record);
    return record;
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

  toggleExpandAllFrames() {
    const isExpanded = !this.hasEveryFrameExpanded;

    for (const frame of this.frames) {
      frame.isExpanded = isExpanded;
      frame.save();
    }
  }

  addFrame(name?: string) {
    const frame = new FrameRecord({
      id: v4(),
      name: name || "Untitled",
      fileId: this.id,
      isExpanded: true,
    });
    const store = useDataStore();
    store.frames.push(frame);
    frame.addEditorBlock();
    return frame;
  }

  rename(name: string) {
    Object.assign(this, { name });
    return this.save();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    return this.save();
  }

  select() {
    useDataStore().current_file = this.id;
    useDataStore().current_frame = this.frames[0]?.id;
    return this;
  }

  save() {
    const store = useDataStore();
    const index = store.files.findIndex((item) => item.id === this.id);
    if (index > -1) {
      store.files[index] = this;
    } else {
      store.files.push(this);
    }
    return this;
  }

  remove() {
    const store = useDataStore();
    const index = store.files.findIndex((file) => file.id === this.id);
    if (index <= -1) {
      return this;
    }
    for (const frame of this.frames) {
      frame.remove();
    }
    store.files.splice(index, 1)[0];
    return this;
  }

  get hasEveryFrameExpanded() {
    return this.frames.every((frame) => frame.isExpanded);
  }

  get frames() {
    return Collection(FrameRecord.whereFile(this.id));
  }
}
