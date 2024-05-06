<script setup lang="ts">
import { track } from "@vercel/analytics";
import { domToBlob } from "modern-screenshot";
import { twMerge } from "tailwind-merge";
import { ref } from "vue";
import { computed } from "vue";
import { nextTick } from "vue";
import { exportState } from "~/composables/export-state";
import { store } from "~/composables/store";
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
    v-if="isFirefox"
    :class="
      twMerge(
        'group w-full shrink-0 bg-emerald-600/30 px-4 text-emerald-500 hover:bg-emerald-600/40 sm:flex lg:w-[204px] ',
        $attrs.class as string,
      )
    "
    @click="handleCopy"
  >
    <IconClipboard
      width="16"
      class="transition-transform group-hover:rotate-6 group-hover:scale-110"
    />
    <span class="truncate whitespace-nowrap lg:overflow-visible">
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
