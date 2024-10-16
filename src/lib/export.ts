import { domToBlob } from "modern-screenshot";
import { nextTick } from "vue";
import { state } from "~/lib/state";
import { persistentState } from "~/lib/persistent-state";
import { ExportState } from "~/lib/enums";

let timeout: NodeJS.Timeout;

export async function downloadPNG() {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  persistentState.value.lastCopyMethod = "download_png";
  umami.track("Download PNG");
  state.exportState = ExportState.PreparingToDownload;
  await nextTick();
  const blob = await domToBlob(frame, {
    scale: 4,
    width: frame.offsetWidth,
    height: frame.offsetHeight,
  });

  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "screenshot.png";
  link.click();
  state.exportState = ExportState.JustDownloaded;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    state.exportState = ExportState.Idle;
  }, 1000);
}

export function copyPngToClipboard() {
  persistentState.value.lastCopyMethod = "copy_png";
  navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve) => {
        const frame = document.querySelector<HTMLDivElement>(
          "[data-editor-frame]",
        );
        if (!frame) return;
        umami.track("Copy PNG to Clipboard");
        state.exportState = ExportState.PreparingToCopy;
        await nextTick();
        domToBlob(frame, {
          scale: 4,
          width: frame.offsetWidth,
          height: frame.offsetHeight,
          filter: (element) => {
            const el = element as HTMLElement;
            if (
              (el.tagName === "CANVAS" &&
                !el.classList?.contains("particles-bg")) ||
              el.classList?.contains("minimap") ||
              el.classList?.contains("slider")
            ) {
              return false;
            }
            return true;
          },
        })
          .then((blob) => {
            state.exportState = ExportState.JustCopied;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              state.exportState = ExportState.Idle;
            }, 1000);
            resolve(blob);
          })
          .catch(() => {
            state.exportState = ExportState.CopyFailure;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              state.exportState = ExportState.Idle;
            }, 1000);
          });
      }),
    }),
  ]);
}
