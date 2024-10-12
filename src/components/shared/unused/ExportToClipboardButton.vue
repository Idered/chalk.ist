<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";
import { state } from "~/lib/state";
import { ExportState } from "~/lib/enums";
import { copyPngToClipboard } from "~/lib/export";

const isFirefox = computed(() => {
  return navigator.userAgent.toLowerCase().includes("firefox");
});
</script>

<template>
  <Button
    v-if="!isFirefox"
    :class="
      twMerge(
        'group w-full shrink-0 bg-emerald-600/30 px-4 text-emerald-500 hover:bg-emerald-600/40 sm:flex lg:w-[204px]',
        $attrs.class as string,
      )
    "
    @click="copyPngToClipboard"
  >
    <IconClipboard
      width="16"
      class="transition-transform group-hover:rotate-6 group-hover:scale-110"
    />
    <span class="truncate whitespace-nowrap lg:overflow-visible">
      {{
        state.exportState === ExportState.PreparingToCopy
          ? "..."
          : state.exportState === ExportState.JustCopied
            ? "Copied!"
            : state.exportState === ExportState.CopyFailure
              ? "Error! Try to download"
              : "Copy image to clipboard"
      }}
    </span>
  </Button>
</template>
