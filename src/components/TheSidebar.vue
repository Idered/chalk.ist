<script setup lang="ts">
import screenshotWorkerUrl from "modern-screenshot/worker?url";
import { Muxer, ArrayBufferTarget } from "mp4-muxer";
import { computed, nextTick, reactive, ref } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { addEditorBlock, isExporting, store } from "~/composables/store";
import * as themes from "~/themes";
import BaseSwitch from "./BaseSwitch.vue";
import BaseSelect from "./BaseSelect.vue";
import { AVAILABLE_FONTS, FRAME_STYLES, LIGATURE_FONTS } from "~/constants";
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import IconDownload from "./IconDownload.vue";
import IconClipboard from "./IconClipboard.vue";
import IconChevronDown from "./IconChevronDown.vue";
import { useElementSize } from "@vueuse/core";
import { Theme } from "~/composables/theme-utils";
import { exportState, ExportState } from "~/composables/export-state";
import { resizeImage, cropImage } from "~/composables/image";
import { WindowControls } from "~/types";
import { domToBlob, createContext, destroyContext, domToCanvas } from "modern-screenshot";

const isExpanded = ref(false);
const timeout = ref();
const expandableContent = ref();
const { height: expandableContentHeight } = useElementSize(expandableContent);

// const fontEmbedCSS = ref("");

// onMounted(async () => {
//   const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
//   if (!frame) return;
//   fontEmbedCSS.value = await htmlToImage.getFontEmbedCSS(frame);
// });

const canDownloadVideo = computed(() => {
  const MAXIMUM_CODEC_AREA = 2097152;
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

const handleVideoExport = async () => {
  const fps = 30;
  const durationInSeconds = 5;
  videoExportProgress.totalFrames = fps * durationInSeconds;
  const frameCount = fps * durationInSeconds;
  const delayBetweenFrames = 1000 / fps;
  const frames = [] as HTMLCanvasElement[];
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

  exportState.value = ExportState.PreparingToDownloadVideo;

  for (let i = 0; i < frameCount; i++) {
    videoExportProgress.currentFrame = i;
    const image = await domToCanvas(context);
    frames.push(image);
    await new Promise((resolve) => setTimeout(resolve, delayBetweenFrames));
  }

  destroyContext(context);

  for (let i = 0; i < frameCount; i++) {
    const frame = frames[i];
    const videoFrame = new VideoFrame(frame, { timestamp: (i * 1e6) / fps });
    videoEncoder.encode(videoFrame);
    videoFrame.close();
  }

  await videoEncoder.flush();
  muxer.finalize();

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
};

const handleCopy = () => {
  navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve) => {
        const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
        if (!frame) return;
        umami.trackEvent("Copy to Clipboard", "export");
        exportState.value = ExportState.PreparingToCopy;
        isExporting.value = true;
        await nextTick();
        console.time("domToBlob");
        domToBlob(frame, {
          scale: 2,
        })
          .then((blob) => {
            console.timeEnd("domToBlob");
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
};

// const handleCopyLink = async () => {
//   const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
//   if (!frame) return;
//   umami.trackEvent("Copy Link", "export");

//   // copy location.href to clipboard
//   const { content } = store.value;
//   const str = window.btoa(
//     JSON.stringify({
//       c: encodeURIComponent(content),
//       t: store.value.currentTheme,
//       tt: store.value.title,
//       l: store.value.language,
//       px: store.value.paddingX,
//       py: store.value.paddingY,
//       w: store.value.frameWidth,
//       n: store.value.name,
//       u: store.value.username,
//       b: store.value.showTwitterBadge,
//       r: store.value.reflection,
//       ln: store.value.showLineNumbers,
//       wc: store.value.windowControls,
//     })
//   );
//   const url = `${window.location.origin}/share/${str}`;
//   navigator.clipboard.writeText(url);

//   exportState.value = ExportState.JustCopiedLink;
//   clearTimeout(timeout.value);
//   timeout.value = setTimeout(() => {
//     exportState.value = ExportState.Idle;
//   }, 1000);
// };

const handleDownload = async () => {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  umami.trackEvent("Download PNG", "export");
  exportState.value = ExportState.PreparingToDownload;
  isExporting.value = true;
  await nextTick();
  domToBlob(frame, {
    scale: 2,
  }).then((blob) => {
    isExporting.value = false;
    downloadPng(blob);
  });
};

function handlePicture(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const croppedImage = await cropImage(reader.result as string, 1);
      const resizedImage = await resizeImage(croppedImage, 56 * 2);
      store.value.picture = resizedImage.toDataURL(file.type);
    };
    reader.readAsDataURL(file);
  }
}

function setTheme(theme: Theme, event: MouseEvent) {
  store.value.currentTheme = theme.key;
  store.value.useAltBackground = event.altKey;
}

function setFontFamily(fontFamily: string) {
  store.value.fontFamily = fontFamily;
}
</script>

<template>
  <OnClickOutside @trigger="isExpanded = false">
    <aside>
      <div class="sm:hidden" :style="{ height: '57px' }"></div>
      <div
        class="fixed bottom-0 inset-x-0 border-t border-slate-700 sm:border-t-0 pwa:sm:border-t pwa:sm:border-t-slate-900 pwa:sm:shadow-[inset_0_1px_0_rgb(30_30_37)] sm:border-r content-start transition-[height] sm:transition-none sm:!h-screen sm:w-[240px] sm:static bg-slate-800 sm:overflow-auto"
        :style="{
          height: isExpanded ? `${expandableContentHeight + 57}px` : `57px`,
        }"
      >
        <div ref="expandableContent">
          <div class="grid gap-y-5 px-3 py-4">
            <div class="grid gap-y-2 justify-start">
              <label class="font-semibold text-xs">Theme</label>
              <div class="grid items-center gap-2 grid-flow-col sm:grid-flow-row sm:grid-cols-4">
                <button
                  v-for="theme in themes"
                  @click="setTheme(theme, $event)"
                  class="group rounded-full focus:outline-none"
                  :title="`Use ${theme.name} theme`"
                >
                  <div
                    class="w-12 h-6 rounded group-hover:opacity-100 transition group-hover:scale-105 group-active:scale-95 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] ring-blue-800"
                    :class="{
                      'opacity-50': store.currentTheme !== theme.key,
                    }"
                    :style="{ background: theme.background }"
                  ></div>
                </button>
              </div>
            </div>

            <div class="grid gap-y-2.5">
              <!-- <div class="grid gap-y-1">
                <label for="language" class="font-semibold text-xs">Language</label>
                <BaseSelect
                  id="language"
                  :model-value="store.language"
                  @update:model-value="setLanguage"
                  :options="AVAILABLE_LANGUAGES"
                />
              </div> -->

              <div class="grid gap-1">
                <label class="font-semibold text-xs">Layout</label>
                <!-- <button
                class="h-7 flex items-center justify-center disabled:opacity-50 disabled:text-white/40 text-white/60 bg-slate-800 border hover:border-slate-600/40 focus:outline-none focus:ring-[3px] focus:border-blue-800 ring-blue-900/20 border-slate-700 px-2 rounded-md shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px] text-[13px] font-mono"
                type="button"
                >
              </button> -->
                <BaseButton
                  class="px-4 w-full border border-slate-600/30 text-slate-500 hover:bg-slate-700/10 hover:border-slate-600/40 group"
                  @click="() => addEditorBlock()"
                  :disabled="store.blocks.length >= 16"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                    <path
                      fill="currentColor"
                      d="M128 20a108 108 0 1 0 108 108A108.1 108.1 0 0 0 128 20Zm0 192a84 84 0 1 1 84-84a84.1 84.1 0 0 1-84 84Zm52-84a12 12 0 0 1-12 12h-28v28a12 12 0 0 1-24 0v-28H88a12 12 0 0 1 0-24h28V88a12 12 0 0 1 24 0v28h28a12 12 0 0 1 12 12Z"
                    />
                  </svg>
                  Add editor
                </BaseButton>
                <!-- <button
                  @click="() => addEditorBlock()"
                  class="h-7 flex items-center justify-center disabled:opacity-50 disabled:text-white/40 text-white/60 bg-slate-800 border hover:border-slate-600/40 focus:outline-none focus:ring-[3px] focus:border-blue-800 ring-blue-900/20 border-slate-700 px-2 rounded-md shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px] text-[13px] font-mono"
                  type="button"
                  title="Remove"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 mr-1" viewBox="0 0 256 256">
                    <path
                      fill="currentColor"
                      d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"
                    />
                  </svg>
                  Add image
                </button> -->
              </div>

              <div class="grid gap-y-1">
                <label for="windowStyle" class="font-semibold text-xs">Window style</label>
                <BaseSelect
                  id="windowStyle"
                  preview-on-focus
                  :disabled="!store.currentThemeSupportsWindowVariants"
                  :model-value="store.windowStyle"
                  @update:model-value="store.windowStyle = $event"
                  :options="FRAME_STYLES"
                />
              </div>

              <div class="grid gap-y-1">
                <label for="windowControls" class="font-semibold text-xs">Window controls</label>
                <BaseSelect
                  id="windowControls"
                  preview-on-focus
                  :model-value="store.windowControls"
                  @update:model-value="store.windowControls = $event"
                  :options="[
                    { label: 'None', value: WindowControls.None },
                    { label: 'macOS - Color', value: WindowControls.MacColor },
                    { label: 'macOS - Gray', value: WindowControls.MacGray },
                    { label: 'macOS - Outline', value: WindowControls.MacOutline },
                    { label: 'Windows', value: WindowControls.Windows },
                  ]"
                />
              </div>

              <div class="grid gap-y-1">
                <label for="fontFamily" class="font-semibold text-xs">Font</label>
                <BaseSelect
                  id="fontFamily"
                  preview-on-focus
                  :model-value="store.fontFamily"
                  @update:model-value="setFontFamily"
                  :options="AVAILABLE_FONTS"
                />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="fontLigatures"
                  >Font Ligatures</label
                >
                <BaseSwitch
                  :disabled="!LIGATURE_FONTS.includes(store.fontFamily)"
                  v-model="store.fontLigatures"
                  id="fontLigatures"
                />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center grid-cols-[1fr_auto_auto] gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="showTwitterBadge"
                  >Twitter Badge</label
                >
                <BaseButton
                  class="text-blue-500 px-2.5 font-semibold text-xs bg-blue-600/30 hover:bg-blue-600/40 h-5 rounded"
                  @click="store.expandTwitterOptions = !store.expandTwitterOptions"
                >
                  <IconChevronDown
                    width="12"
                    class="transition-transform"
                    :class="{
                      'rotate-180': store.expandTwitterOptions,
                    }"
                  />
                </BaseButton>
                <BaseSwitch v-model="store.showTwitterBadge" id="showTwitterBadge" />
              </div>

              <div class="grid gap-y-1 gap-x-2 items-start grid-cols-[auto_1fr]" v-if="store.expandTwitterOptions">
                <div v-if="store.picture" class="row-start-1 row-end-3 relative group">
                  <BaseButton
                    @click="store.picture = ''"
                    class="h-5 w-5 absolute right-0 top-0 group-hover:opacity-100 opacity-0 bg-red-600/80 hover:bg-red-600 transition rounded-full justify-center text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      width="16"
                      height="16"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 20"
                    >
                      <g fill="currentColor">
                        <path
                          d="M7.172 14.243a1 1 0 1 1-1.415-1.415l7.071-7.07a1 1 0 0 1 1.415 1.414l-7.071 7.07Z"
                        ></path>
                        <path
                          d="M5.757 7.172a1 1 0 1 1 1.415-1.415l7.07 7.071a1 1 0 0 1-1.414 1.415l-7.07-7.071Z"
                        ></path>
                      </g>
                    </svg>
                  </BaseButton>
                  <img
                    :src="store.picture"
                    alt=""
                    class="w-14 h-14 border border-slate-700 bg-slate-700/30 rounded-full"
                  />
                </div>
                <label
                  v-else
                  class="w-14 h-14 border border-slate-700 bg-slate-700/30 hover:bg-slate-700/50 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer rounded-full flex items-center justify-center row-start-1 row-end-3"
                >
                  <input type="file" class="sr-only" @change="handlePicture" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M172 56a4 4 0 0 1 4-4h20V32a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V60h-20a4 4 0 0 1-4-4Zm54.8 56.2A104.1 104.1 0 0 1 228 128a99.6 99.6 0 0 1-32.7 73.9l-.8.8a99.9 99.9 0 0 1-132.9 0a3.6 3.6 0 0 1-.9-.8A100 100 0 0 1 128 28a104.1 104.1 0 0 1 15.8 1.2a4 4 0 0 1 3.3 4.6a4 4 0 0 1-4.6 3.3A100 100 0 0 0 128 36a92 92 0 0 0-65.2 156.9a75.8 75.8 0 0 1 44.5-34.1a44 44 0 1 1 41.4 0a75.8 75.8 0 0 1 44.5 34.1A92.1 92.1 0 0 0 220 128a99 99 0 0 0-1.1-14.5a4 4 0 0 1 3.3-4.6a4 4 0 0 1 4.6 3.3ZM128 156a36 36 0 1 0-36-36a36 36 0 0 0 36 36Zm0 64a91.3 91.3 0 0 0 59.1-21.6a68 68 0 0 0-118.2 0A91.3 91.3 0 0 0 128 220Z"
                    ></path>
                  </svg>
                </label>

                <div class="grid gap-y-1 col-start-2">
                  <BaseInput
                    class="placeholder:text-slate-600/75"
                    type="text"
                    id="name"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="Name"
                    v-model="store.name"
                  />
                </div>

                <div class="grid gap-y-1 col-start-2">
                  <BaseInput
                    class="placeholder:text-slate-600/75"
                    type="text"
                    id="username"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="Username"
                    v-model="store.username"
                  />
                </div>
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="showLineNumbers"
                  >Line numbers</label
                >
                <BaseSwitch v-model="store.showLineNumbers" id="showLineNumbers" />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="showParticles">Particles</label>
                <BaseSwitch v-model="store.showParticles" id="showParticles" />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="showBackground">Background</label>
                <BaseSwitch v-model="store.showBackground" id="showBackground" />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="reflection">Reflection</label>
                <BaseSwitch v-model="store.reflection" id="reflection" />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="paddingX">Padding X</label>
                <div class="grid gap-x-2 grid-flow-col text-sm">
                  <input
                    id="paddingX"
                    class="accent-blue-700"
                    type="range"
                    min="16"
                    max="128"
                    step="8"
                    :value="store.paddingX"
                    @input="store.paddingX = parseInt(($event.target as HTMLInputElement).value)"
                  />
                </div>
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="paddingY">Padding Y</label>
                <div class="grid gap-x-2 grid-flow-col text-sm">
                  <input
                    id="paddingY"
                    class="accent-blue-700"
                    type="range"
                    min="16"
                    max="128"
                    step="8"
                    :value="store.paddingY"
                    @input="store.paddingY = parseInt(($event.target as HTMLInputElement).value)"
                  />
                </div>
              </div>

              <!-- <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="diff">Diff</label>
                <BaseSwitch v-model="store.diff" id="diff" />
              </div> -->
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-1 gap-2 fixed inset-x-0 bottom-0 py-2 px-3 bg-slate-800 sm:static sm:bg-transparent sm:px-3 sm:py-0"
        >
          <label class="font-semibold text-xs hidden sm:block">Export</label>
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
            class="bg-slate-700 text-slate-500 hover:bg-slate-700/80 group sm:hidden w-10 justify-center"
            @click="isExpanded = !isExpanded"
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
            class="px-4 w-full bg-rose-500/30 text-rose-300 hover:bg-rose-500/40 group"
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
            class="px-4 w-full bg-blue-500/30 text-blue-300 hover:bg-blue-500/40 group disabled:bg-blue-300/10 disabled:text-blue-300/40 disabled:cursor-not-allowed"
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

        <div
          class="sm:grid grid-cols-[1fr_auto_1fr] sm:grid-cols-1 gap-2 bg-slate-800 hidden sm:static sm:bg-transparent sm:px-3 sm:py-0 mt-4"
        >
          <!-- <div class="grid grid-flow-col gap-y-2 items-center grid-cols-[1fr_auto] gap-x-2">
            <label
              class="font-semibold text-xs hidden sm:block"
              :class="{
                'opacity-0': !store.expandSupportSection,
              }"
              >Support</label
            >
            <BaseButton
              class="px-2.5 font-semibold text-xs hover:bg-blue-600/40 h-5 rounded"
              :class="{
                'bg-slate-700 ': !store.expandSupportSection,
                'bg-blue-600/30 text-blue-500': store.expandSupportSection,
              }"
              @click="store.expandSupportSection = !store.expandSupportSection"
            >
              <IconChevronDown
                width="12"
                class="transition-transform"
                :class="{
                  'rotate-180': store.expandSupportSection,
                }"
              />
            </BaseButton>
          </div> -->

          <div class="grid gap-y-2" v-if="store.expandSupportSection">
            <!-- <BaseButton
              is="a"
              class="px-4 w-full border border-[#1da1f2]/10 text-[#1da1f2]/90 hover:border-[#1da1f2]/40 group"
              href="https://twitter.com/intent/follow?screen_name=Idered"
              target="_blank"
            >
              <IconTwitter width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
              <span class="truncate text-slate-600">Follow on Twitter</span>
            </BaseButton> -->
            <!-- <BaseButton
              is="a"
              class="px-4 w-full border border-yellow-500/10 text-yellow-300/80 hover:border-yellow-400/40 hover:text- group"
              href="https://www.buymeacoffee.com/idered"
              target="_blank"
            >
              <IconCoffee width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
              <span class="truncate text-slate-600">Buy me a coffee</span>
            </BaseButton> -->
            <!-- <label
              class="font-semibold text-xs hidden sm:block mt-1"
              :class="{
                'opacity-0': !store.expandSupportSection,
              }"
              >Learn</label
            > -->
            <!-- <BaseButton
              is="a"
              class="px-4 w-full border border-slate-700 text-slate-600 hover:border-slate-600/40 group"
              href="https://github.com/Idered/chalk.ist"
              target="_blank"
            >
              <IconGithub width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
              <span class="truncate">View on GitHub</span>
            </BaseButton> -->
            <!-- <BaseButton
              is="a"
              class="px-4 w-full border border-slate-700 text-slate-600 hover:border-slate-600/40 group"
              href="https://umami.kasper.io/share/WCDyKkOU/chalk.ist"
              target="_blank"
            >
              <IconAnalytics width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
              <span class="truncate">View Analytics</span>
            </BaseButton> -->

            <div class="text-xs hidden sm:block text-center">
              <span class="opacity-75">Made by</span>
              <a
                href="https://twitter.com/Idered"
                class="hover:text-white transition outline-none font-medium focus:text-white"
              >
                Idered</a
              >
            </div>

            <div class="text-xs hidden sm:block text-center pb-4">
              <span class="opacity-75">Source on</span>
              <a
                href="https://github.com/Idered/chalk.ist"
                class="hover:text-white transition outline-none font-medium focus:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </OnClickOutside>
</template>
