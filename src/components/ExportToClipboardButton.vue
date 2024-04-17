<script setup lang="ts">
import { domToBlob } from "modern-screenshot";
import { twMerge } from "tailwind-merge";
import { ref } from "vue";
import { computed } from "vue";
import { nextTick } from "vue";
import { exportState } from "~/composables/export-state";
import { ExportState } from "~/enums";

const timeout = ref();

const isFirefox = computed(() => {
  return navigator.userAgent.toLowerCase().includes("firefox");
});

function handleCopy() {
  navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve) => {
        const frame = document.querySelector<HTMLDivElement>(
          "[data-editor-frame]",
        );
        if (!frame) return;
        // umami.trackEvent("Copy to Clipboard", "export");
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
            clearTimeout(timeout.value);
            timeout.value = setTimeout(() => {
              exportState.value = ExportState.Idle;
            }, 1000);
            resolve(blob);
          })
          .catch(() => {
            exportState.value = ExportState.CopyFailure;
            clearTimeout(timeout.value);
            timeout.value = setTimeout(() => {
              exportState.value = ExportState.Idle;
            }, 1000);
          });
      }),
    }),
  ]);
}
</script>

<template>
  <BaseButton
    v-if="!isFirefox"
    :class="
      twMerge(
        'group w-full bg-emerald-600/30 px-4 text-emerald-500 hover:bg-emerald-600/40 sm:flex ',
        $attrs.class as string,
      )
    "
    @click="handleCopy"
  >
    <IconClipboard
      width="16"
      class="transition-transform group-hover:rotate-6 group-hover:scale-110"
    />
    <span class="truncate">
      {{
        exportState === ExportState.PreparingToCopy
          ? "..."
          : exportState === ExportState.JustCopied
            ? "Copied!"
            : exportState === ExportState.CopyFailure
              ? "Error! Try to download"
              : "Copy image to clipboard"
      }}
    </span>
  </BaseButton>
</template>
