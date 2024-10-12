<script setup lang="ts">
import { createContext, destroyContext, domToCanvas } from "modern-screenshot";
// import screenshotWorkerUrl from "modern-screenshot/worker?url";
import { ArrayBufferTarget, Muxer } from "mp4-muxer";
import { computed, reactive, ref } from "vue";
import { state } from "~/lib/state";
import { store } from "~/lib/store";
import { ExportState } from "~/lib/enums";

const timeout = ref();

const hideVideoExport = computed(() => typeof VideoEncoder === "undefined");

const canDownloadVideo = computed(() => {
  const MAXIMUM_CODEC_AREA = 2_097_152;
  const w = (store.value.frameWidth + store.value.paddingX * 2) * 2;
  const h = (store.value.frameHeight + store.value.paddingY * 2) * 2;
  return store.value.showParticles && w * h < MAXIMUM_CODEC_AREA;
});

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
  state.exportState = ExportState.PreparingToDownloadVideo;
  videoExportProgress.totalFrames = fps * durationInSeconds;
  const element = document.querySelector<HTMLDivElement>(
    "[data-editor-frame]",
  )!;
  const context = await createContext(element, {
    // workerUrl: screenshotWorkerUrl as unknown as string,
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
  state.exportState = ExportState.JustDownloadedVideo;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    state.exportState = ExportState.Idle;
  }, 1000);
}
</script>

<template>
  <Button
    v-if="!hideVideoExport"
    class="group hidden w-full bg-blue-500/30 px-4 text-blue-300 hover:bg-blue-500/40 disabled:cursor-not-allowed disabled:bg-blue-300/10 disabled:text-blue-300/40 sm:flex"
    @click="handleVideoExport"
    :disabled="!canDownloadVideo"
  >
    <IconDownload
      width="16"
      class="transition-transform group-hover:rotate-6 group-hover:scale-110"
    />

    <template v-if="state.exportState === ExportState.PreparingToDownloadVideo">
      <span
        v-if="
          videoExportProgress.currentFrame + 1 !==
          videoExportProgress.totalFrames
        "
        class="truncate"
      >
        Preparing frames ({{
          Math.round(
            ((videoExportProgress.currentFrame + 1) /
              videoExportProgress.totalFrames) *
              100,
          )
        }}%)
      </span>
      <span v-else class="truncate">Encoding...</span>
    </template>
    <span
      v-else-if="state.exportState === ExportState.JustDownloadedVideo"
      class="truncate"
      >Downloaded!</span
    >
    <span v-else class="truncate"
      >Download MP4
      <span
        v-if="canDownloadVideo"
        class="ml-2 rounded-sm bg-blue-400 px-1 text-[11px] uppercase tracking-wider text-blue-900"
        >Beta</span
      ></span
    >
  </Button>
</template>
