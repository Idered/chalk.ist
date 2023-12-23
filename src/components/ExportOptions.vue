<script setup lang="ts">
import screenshotWorkerUrl from "modern-screenshot/worker?url";
import { Muxer, ArrayBufferTarget } from "mp4-muxer";
import { computed, nextTick, reactive, ref } from "vue";
import { exportState } from "~/composables/export-state";
import { isExporting, store } from "~/composables/store";
import { ExportState } from "~/enums";
import IconDownload from "./IconDownload.vue";
import IconClipboard from "./IconClipboard.vue";
import { domToBlob, createContext, destroyContext, domToCanvas } from "modern-screenshot";
import BaseButton from "./BaseButton.vue";
import IconChevronDown from "./IconChevronDown.vue";

defineProps<{
  isExpanded: boolean;
}>();

defineEmits<{
  "update:isExpanded": [boolean];
}>();

const timeout = ref();

const isFirefox = computed(() => {
  return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
});

const hideVideoExport = computed(() => typeof VideoEncoder === 'undefined');

const canDownloadVideo = computed(() => {
  const MAXIMUM_CODEC_AREA = 2_097_152;
  const w = (store.value.frameWidth + store.value.paddingX * 2) * 2;
  const h = (store.value.frameHeight + store.value.paddingY * 2) * 2;
  return store.value.showParticles && w * h < MAXIMUM_CODEC_AREA;
});

const downloadPng = (blob: Blob | null) => {
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
};

const videoExportProgress = reactive({
  currentFrame: 0,
  totalFrames: 0,
});

async function handleVideoExport() {
  const fps = 30;
  const durationInSeconds = 5;
  const frameCount = fps * durationInSeconds;
  const delayBetweenFrames = 1000 / fps;
  const frames = [] as HTMLCanvasElement[];
  exportState.value = ExportState.PreparingToDownloadVideo;
  videoExportProgress.totalFrames = fps * durationInSeconds;
  const element = document.querySelector<HTMLDivElement>("[data-editor-frame]")!;
  const context = await createContext(element, {
    workerUrl: screenshotWorkerUrl as unknown as string,
    scale: 2,
    workerNumber: 1,
    font: {
      preferredFormat: "woff2",
    },
    filter: (element) => {
      const el = element as HTMLElement;
      if (
        (el.tagName === "CANVAS" && !el.classList?.contains("particles-bg")) ||
        el.classList?.contains("minimap") ||
        el.classList?.contains("slider")
      ) {
        return false;
      }
      return true;
    },
  });

  const width = element.offsetWidth * 2;
  const height = element.offsetHeight * 2;

  let muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: {
      codec: "avc",
      width,
      height,
    },
  });

  let videoEncoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (error) => console.error(error),
  });

  videoEncoder.configure({
    codec: "avc1.640028",
    width,
    height,
    bitrate: 1e6,
    framerate: 30,
    latencyMode: "quality",
  });
  console.time("frames");
  for (let i = 0; i < frameCount; i++) {
    videoExportProgress.currentFrame = i;
    const start = performance.now();
    const image = await domToCanvas(context);
    const end = performance.now();
    frames.push(image);
    const domToCanvasTime = end - start;
    const adjustedDelay = Math.max(0, delayBetweenFrames - domToCanvasTime);
    await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
  }
  console.timeEnd("frames");

  destroyContext(context);

  for (let i = 0; i < frameCount; i++) {
    const frame = frames[i];
    const videoFrame = new VideoFrame(frame, { timestamp: (i * 1e6) / fps });
    videoEncoder.encode(videoFrame);
    videoFrame.close();
  }

  console.time("encode");
  await videoEncoder.flush();
  muxer.finalize();
  console.timeEnd("encode");

  let { buffer } = muxer.target;
  const blob = new Blob([buffer], { type: "video/mp4" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = url;
  a.download = "output.mp4";
  a.click();
  window.URL.revokeObjectURL(url);
  isExporting.value = false;
  exportState.value = ExportState.JustDownloadedVideo;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    exportState.value = ExportState.Idle;
  }, 1000);
}

function handleCopy() {
  navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve) => {
        const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
        if (!frame) return;
        umami.trackEvent("Copy to Clipboard", "export");
        exportState.value = ExportState.PreparingToCopy;
        isExporting.value = true;
        await nextTick();
        domToBlob(frame, {
          scale: 2,
          filter: (element) => {
            const el = element as HTMLElement;
            if (
              (el.tagName === "CANVAS" && !el.classList?.contains("particles-bg")) ||
              el.classList?.contains("minimap") ||
              el.classList?.contains("slider")
            ) {
              return false;
            }
            return true;
          },
        })
          .then((blob) => {
            isExporting.value = false;
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

async function handleDownload() {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  umami.trackEvent("Download PNG", "export");
  exportState.value = ExportState.PreparingToDownload;
  isExporting.value = true;
  await nextTick();
  const blob = await domToBlob(frame, { scale: 2 });
  isExporting.value = false;
  downloadPng(blob);
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-[1fr_auto] sm:grid-cols-1 gap-2 fixed inset-x-0 bottom-0 pb-2 px-3 bg-slate-800 sm:static sm:bg-transparent sm:px-3 sm:py-0"
    >
      <!-- <p class="text-[10px] uppercase font-bold tracking-wider items-center mt-2 hidden sm:flex">
            <hr class="border-y flex-1 mr-2 border-b-slate-700 border-t-slate-900">
            <span>Export</span> 
            <hr class="border-y flex-1 ml-2 border-b-slate-700 border-t-slate-900">
          </p> -->

      <!-- <BaseButton
            class="px-4 w-full bg-blue-600/30 text-blue-500 hover:bg-blue-600/40 group"
            @click="handleCopyLink"
          >
            <IconClipboardLink width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
            <span class="truncate">
              {{ exportState === ExportState.JustCopiedLink ? "Copied!" : "Copy Link to Clipboard" }}
            </span>
          </BaseButton> -->

      <BaseButton
        v-if="!isFirefox"
        class="px-4 w-full hidden sm:flex bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/40 group"
        @click="handleCopy"
      >
        <IconClipboard width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
        <span class="truncate">
          {{
            exportState === ExportState.PreparingToCopy
              ? "..."
              : exportState === ExportState.JustCopied
              ? "Copied!"
              : exportState === ExportState.CopyFailure
              ? "Error! Try to download"
              : "Copy Image to Clipboard"
          }}
        </span>
      </BaseButton>

      <BaseButton
        class="px-4 w-full bg-rose-500/30 text-rose-300 hover:bg-rose-500/40 justify-center sm:justify-start"
        @click="handleDownload"
      >
        <IconDownload width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
        <span class="truncate">
          {{
            exportState === ExportState.PreparingToDownload
              ? "..."
              : exportState === ExportState.JustDownloaded
              ? "Downloaded!"
              : "Download PNG"
          }}
        </span>
      </BaseButton>

      <BaseButton
        class="bg-slate-700 text-slate-500 hover:bg-slate-700/80 group sm:hidden w-10 justify-center"
        @click="$emit('update:isExpanded', !isExpanded)"
        square="w-10"
      >
        <IconChevronDown
          width="16"
          class="transition"
          :class="{
            'rotate-180': !isExpanded,
          }"
        />
      </BaseButton>

      <BaseButton
        v-if="!hideVideoExport"
        class="px-4 w-full bg-blue-500/30 text-blue-300 hover:bg-blue-500/40 group disabled:bg-blue-300/10 disabled:text-blue-300/40 disabled:cursor-not-allowed hidden sm:flex"
        @click="handleVideoExport"
        :disabled="!canDownloadVideo"
      >
        <IconDownload width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />

        <template v-if="exportState === ExportState.PreparingToDownloadVideo">
          <span v-if="videoExportProgress.currentFrame + 1 !== videoExportProgress.totalFrames" class="truncate">
            Preparing frames
            {{ Math.round(((videoExportProgress.currentFrame + 1) / videoExportProgress.totalFrames) * 100) }}%
          </span>
          <span v-else class="truncate">Encoding...</span>
        </template>
        <span v-else-if="exportState === ExportState.JustDownloadedVideo" class="truncate">Downloaded!</span>
        <span v-else class="truncate"
          >Download MP4
          <span
            v-if="canDownloadVideo"
            class="uppercase text-[11px] tracking-wider bg-blue-400 px-1 rounded-sm ml-2 text-blue-900"
            >Beta</span
          ></span
        >
      </BaseButton>
    </div>
  </div>
</template>
