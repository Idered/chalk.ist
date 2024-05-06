<script setup lang="ts">
import { track } from "@vercel/analytics";
import { domToBlob } from "modern-screenshot";
import { ref } from "vue";
import { nextTick } from "vue";
import { exportState } from "~/composables/export-state";
import { store } from "~/composables/store";
import { ExportState } from "~/enums";

const timeout = ref();

function downloadPng(blob: Blob | null) {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "screenshot.png";
  link.click();
  exportState.value = ExportState.JustDownloaded;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    exportState.value = ExportState.Idle;
  }, 1000);
}

async function handleDownload() {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;

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
  downloadPng(blob);
}
</script>

<template>
  <BaseButton
    class="w-full justify-center bg-rose-500/30 px-4 text-rose-300 hover:bg-rose-500/40 sm:justify-start lg:w-[150px]"
    @click="handleDownload"
  >
    <IconDownload
      width="16"
      class="transition-transform group-hover:rotate-6 group-hover:scale-110"
    />
    <span class="whitespace-nowrap">
      {{
        exportState === ExportState.PreparingToDownload
          ? "..."
          : exportState === ExportState.JustDownloaded
            ? "Downloaded!"
            : "Download PNG"
      }}
    </span>
  </BaseButton>
</template>
