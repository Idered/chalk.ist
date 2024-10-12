<script setup lang="ts">
import { ref } from "vue";
import { exportState } from "~/lib/export-state";
import { store } from "~/lib/store";
import { ExportState } from "~/enums";

const timeout = ref();

const handleCopyLink = async () => {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  // umami.trackEvent("Copy Link", "export");

  // copy location.href to clipboard
  //   const { content } = store.value;
  const str = window.btoa(
    JSON.stringify({
      //   c: encodeURIComponent(content),
      t: store.value.currentTheme,
      l: store.value.language,
      px: store.value.paddingX,
      py: store.value.paddingY,
      w: store.value.frameWidth,
      n: store.value.name,
      u: store.value.username,
      b: store.value.showTwitterBadge,
      r: store.value.reflection,
      ln: store.value.showLineNumbers,
      wc: store.value.windowControls,
    }),
  );
  const url = `${window.location.origin}/share/${str}`;
  navigator.clipboard.writeText(url);

  exportState.value = ExportState.JustCopiedLink;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    exportState.value = ExportState.Idle;
  }, 1000);
};
</script>

<template>
  <Button
    class="group w-full bg-blue-600/30 px-4 text-blue-500 hover:bg-blue-600/40"
    @click="handleCopyLink"
  >
    <IconClipboardLink
      width="16"
      class="transition-transform group-hover:rotate-6 group-hover:scale-110"
    />
    <span class="truncate">
      {{
        exportState === ExportState.JustCopiedLink
          ? "Copied!"
          : "Copy Link to Clipboard"
      }}
    </span>
  </Button>
</template>
