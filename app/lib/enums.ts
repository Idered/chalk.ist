export enum WindowControls {
  None = "none",
  MacColor = "mac-color",
  MacGray = "mac-gray",
  MacOutline = "mac-outline",
  Windows = "windows-transparent",
}

export enum BlockType {
  Code = "code",
  Image = "image",
  Note = "note",
}

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
