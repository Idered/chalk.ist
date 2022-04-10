import { ref } from "vue";

export enum ExportState {
  Idle,
  PreparingToCopy,
  PreparingToDownload,
  JustCopied,
  JustDownloaded,
  CopyFailure,
}

export const exportState = ref(ExportState.Idle);
