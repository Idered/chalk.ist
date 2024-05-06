import { track } from "@vercel/analytics";
import { domToBlob } from "modern-screenshot";
import { nextTick } from "vue";
import { exportState } from "~/composables/export-state";
import { store } from "~/composables/store";
import { ExportState } from "~/enums";

let timeout: NodeJS.Timeout;

export async function downloadPNG() {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  store.value.lastCopyMethod = "download_png";
  track("Export PNG", {
    color_theme: store.value.useCustomTheme ? "custom" : store.value.colorTheme,
    backdrop: store.value.showBackground ? "none" : store.value.backdrop,
  });
  exportState.value = ExportState.PreparingToDownload;
  await nextTick();
  const blob = await domToBlob(frame, {
    scale: 2,
    width: frame.offsetWidth,
    height: frame.offsetHeight,
  });

  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "screenshot.png";
  link.click();
  exportState.value = ExportState.JustDownloaded;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    exportState.value = ExportState.Idle;
  }, 1000);
}

export function copyPngToClipboard() {
  store.value.lastCopyMethod = "copy_png";
  navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve) => {
        const frame = document.querySelector<HTMLDivElement>(
          "[data-editor-frame]",
        );
        if (!frame) return;
        track("Export to Clipboard", {
          color_theme: store.value.useCustomTheme
            ? "custom"
            : store.value.colorTheme,
          backdrop: store.value.showBackground ? store.value.backdrop : "none",
        });
        exportState.value = ExportState.PreparingToCopy;
        await nextTick();
        domToBlob(frame, {
          scale: 2,
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
            exportState.value = ExportState.JustCopied;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              exportState.value = ExportState.Idle;
            }, 1000);
            resolve(blob);
          })
          .catch(() => {
            exportState.value = ExportState.CopyFailure;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              exportState.value = ExportState.Idle;
            }, 1000);
          });
      }),
    }),
  ]);
}
