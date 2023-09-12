import { ref } from "vue";

export enum ExportState {
  Idle,
  PreparingToCopy,
  PreparingToDownload,
  JustCopied,
  JustCopiedLink,
  JustCopiedContent,
  JustDownloaded,
  CopyFailure,
}

export const exportState = ref(ExportState.PreparingToDownload);
