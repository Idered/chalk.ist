import { ref } from "vue";

export enum ExportState {
  Idle,
  PreparingToCopy,
  PreparingToDownload,
  PreparingToDownloadVideo,
  JustCopied,
  JustCopiedLink,
  JustCopiedContent,
  JustDownloaded,
  JustDownloadedVideo,
  CopyFailure,
}

export const exportState = ref(ExportState.Idle);
