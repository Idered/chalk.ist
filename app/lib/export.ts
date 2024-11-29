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
  window.umami?.track("Download PNG");
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
        window.umami?.track("Copy PNG to Clipboard");
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

export function copyTextToClipboard(text: string) {
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied successfully");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  // Alternative approach using textarea element
  function copyToClipboardFallback(text: string) {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Make it invisible
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    // Add to document
    document.body.appendChild(textarea);

    // Select the text
    textarea.select();

    try {
      // Execute copy command
      document.execCommand("copy");
      console.log("Text copied successfully");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }

    // Remove the temporary element
    document.body.removeChild(textarea);
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied successfully");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // Try fallback if Clipboard API fails
        copyToClipboardFallback(text);
      });
  } else {
    // Use fallback for browsers that don't support Clipboard API
    copyToClipboardFallback(text);
  }
}
