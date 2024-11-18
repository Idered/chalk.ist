import { useStorage } from "@vueuse/core";
import { DEFAULT_CONTENT } from "./constants";
import { BlockType } from "./enums";
import type { Block } from "~/types";
import { v4 } from "uuid";

const blocks: Block[] = [
  {
    id: v4(),
    content: DEFAULT_CONTENT,
    language: "typescript",
    type: BlockType.Code,
    title: "",
    icon: "",
    columnSpan: 12,
    rowSpan: 1,
    mode: "edit",
    transformations: [],
  },
];

export const persistentState = useStorage("chalk-persistent-state", {
  expandBackdrops: true,
  expandCustomThemeOptions: false,
  expandPresets: true,
  expandTwitterOptions: false,
  expandGithubOptions: false,
  expandWatermarkOptions: false,
  lastCopyMethod: "download_png",
  showUI: true,
  blocks,
});
