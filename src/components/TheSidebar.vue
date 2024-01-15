<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseSwitch from "./BaseSwitch.vue";
import ExportOptions from "./ExportOptions.vue";
import IconChevronDown from "./IconChevronDown.vue";
import { OnClickOutside } from "@vueuse/components";
import { useElementSize } from "@vueuse/core";
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "radix-vue";
import { computed, ref } from "vue";
import { ColorPicker } from "vue-color-kit";
import { cropImage, resizeImage } from "~/composables/image";
import { store } from "~/composables/store";
import { FONTS, FRAME_STYLES, LIGATURE_FONTS } from "~/constants";
import { WindowControls } from "~/enums";
import { Backdrops } from "~/lib/backdrops";
import { chalkistThemes, portedThemes, shikijiThemes } from "~/lib/themes";

const isExpanded = ref(false);
const expandableContent = ref();
const { height: expandableContentHeight } = useElementSize(expandableContent);

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

function handlePicture(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) {
    return;
  }
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

function setFontFamily(fontFamily: string) {
  store.value.fontFamily = fontFamily;
}

const themeOptions = computed(() => [
  {
    group: "Chalk.ist Originals",
    children: chalkistThemes
      .map((item) => ({ value: item.name!, label: item.name! }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
  {
    group: "Other",
    children: shikijiThemes
      .map((item) => ({ value: item.id, label: item.displayName }))
      .concat(
        ...portedThemes.map((item) => ({ value: item.name, label: item.name })),
      )
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
]);

const themeLabels = {
  foreground: "text",
  variable: "variables",
  comment: "comments",
  keyword: "keywords",
  function: "functions",
  string: "strings",
  punctuation: "punctuations",
  operator: "operators",
  number: "numbers",
  regexp: "RegExp",
};
</script>

<template>
  <OnClickOutside @trigger="isExpanded = false">
    <aside>
      <div class="sm:hidden" :style="{ height: '57px' }"></div>
      <div
        class="fixed z-10 inset-x-0 bottom-0 max-h-screen content-start border-t border-slate-700 bg-slate-800 transition-[height] sm:static sm:!h-screen sm:w-[270px] sm:overflow-auto sm:border-r sm:border-t-0 sm:transition-none pwa:sm:border-t pwa:sm:border-t-slate-900 pwa:sm:shadow-[inset_0_1px_0_rgb(30_30_37)]"
        :style="{
          height: isExpanded ? `${expandableContentHeight + 57}px` : `57px`,
        }"
      >
        <div
          ref="expandableContent"
          class="max-h-[calc(50svh-48px)] overflow-auto sm:max-h-none"
        >
          <div class="grid gap-y-2 px-3 py-4">
            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label for="colorTheme" class="text-xs font-semibold"
                >Color theme</label
              >
              <BaseSelect
                id="colorTheme"
                class="-my-1"
                preview-on-focus
                :model-value="store.colorTheme"
                @update:model-value="store.colorTheme = $event"
                :options="themeOptions"
              />
            </div>

            <div
              class="grid grid-cols-[1fr_auto_auto] items-center justify-between gap-x-2 gap-y-2"
            >
              <label for="useCustomTheme" class="text-xs font-semibold"
                >Custom theme</label
              >
              <BaseButton
                class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
                @click="
                  store.expandCustomThemeOptions =
                    !store.expandCustomThemeOptions
                "
              >
                <span
                  class="text-[10px] uppercase tracking-wider"
                  v-if="!store.expandCustomThemeOptions"
                  >Edit</span
                >
                <span v-else class="text-[10px] uppercase tracking-wider"
                  >Collapse</span
                >
              </BaseButton>
              <BaseSwitch v-model="store.useCustomTheme" id="useCustomTheme" />
            </div>

            <div v-if="store.expandCustomThemeOptions" class="contents">
              <div
                class="flex items-center gap-x-2 gap-y-2"
                v-for="(backgroundColor, key) in store.customTheme"
                :key="key"
              >
                <label
                  for="customTheme.keyword"
                  class="text-xs font-semibold [text-transform:capitalize] w-[118px]"
                  >{{ themeLabels[key] || key }}</label
                >
                <PopoverRoot>
                  <PopoverTrigger class="w-full">
                    <div
                      class="w-full h-5 rounded-sm border-2 border-slate-900 bg-slate-800 shadow-[0_0_0_1px_rgba(255,255,255,.17)]"
                      :style="{ backgroundColor }"
                    />
                  </PopoverTrigger>
                  <PopoverPortal>
                    <PopoverContent
                      :align-offset="-2"
                      :side-offset="-120"
                      side="right"
                      align="start"
                      class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded-md border border-slate-700 bg-slate-800 font-mono shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] p-4 z-[100000]"
                    >
                      <ColorPicker
                        class="box-content"
                        :color="backgroundColor"
                        @changeColor="
                          store.customTheme[key] = `rgba(${[
                            $event.rgba.r,
                            $event.rgba.g,
                            $event.rgba.b,
                            $event.rgba.a,
                          ].join(',')})`
                        "
                      />
                    </PopoverContent>
                  </PopoverPortal>
                </PopoverRoot>
              </div>
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label for="fontFamily" class="text-xs font-semibold">Font</label>
              <BaseSelect
                class="-my-1"
                id="fontFamily"
                preview-on-focus
                :model-value="store.fontFamily"
                @update:model-value="setFontFamily"
                :options="FONTS"
              />
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="fontLigatures"
                >Font ligatures</label
              >
              <BaseSwitch
                :disabled="!LIGATURE_FONTS.includes(store.fontFamily)"
                v-model="store.fontLigatures"
                id="fontLigatures"
              />
            </div>

            <div
              class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="fontSize"
                >Font size</label
              >
              <div class="grid grid-flow-col gap-x-2 text-sm">
                <input
                  id="fontSize"
                  class="w-full accent-blue-700"
                  type="range"
                  min="12"
                  max="18"
                  step="1"
                  :value="store.fontSize"
                  @input="
                    store.fontSize = parseInt(
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                />
              </div>
            </div>

            <div
              class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="lineHeight"
                >Line height</label
              >
              <div class="grid grid-flow-col gap-x-2 text-sm">
                <input
                  id="lineHeight"
                  class="w-full accent-blue-700"
                  type="range"
                  min="20"
                  max="30"
                  step="1"
                  :value="store.lineHeight"
                  @input="
                    store.lineHeight = parseInt(
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                />
              </div>
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="showLineNumbers"
                >Line numbers</label
              >
              <BaseSwitch
                v-model="store.showLineNumbers"
                id="showLineNumbers"
              />
            </div>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />

            <div
              class="grid grid-cols-[1fr_auto_auto] items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="showBackground"
                >Backdrop</label
              >

              <BaseButton
                class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
                @click="store.expandBackdrops = !store.expandBackdrops"
              >
                <IconChevronDown
                  width="12"
                  class="transition-transform"
                  :class="{
                    'rotate-180': store.expandBackdrops,
                  }"
                />
              </BaseButton>
              <BaseSwitch v-model="store.showBackground" id="showBackground" />
            </div>

            <div
              v-if="store.expandBackdrops"
              class="flex flex-wrap items-center gap-2 sm:grid sm:grid-flow-row sm:grid-cols-5"
            >
              <button
                v-for="(item, key) in Backdrops"
                @click="store.backdrop = key"
                class="group rounded-full focus:outline-none"
                :title="`Use ${key} backdrop`"
              >
                <div
                  class="h-10 rounded ring-blue-800 transition group-hover:scale-105 group-hover:opacity-100 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] group-active:scale-95 sm:h-6"
                  :style="{ background: item.backgroundStyle.background }"
                ></div>
              </button>
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="backdropNoise"
                >Backdrop noise</label
              >
              <BaseSwitch
                v-model="store.backdropNoise"
                id="backdropNoise"
                :disabled="!store.showBackground"
              />
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="showParticles"
                >Backdrop particles</label
              >
              <BaseSwitch v-model="store.showParticles" id="showParticles" />
            </div>

            <div
              class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="paddingX"
                >Padding X</label
              >
              <div class="grid grid-flow-col gap-x-2 text-sm">
                <input
                  id="paddingX"
                  class="w-full accent-blue-700"
                  type="range"
                  min="0"
                  max="128"
                  step="8"
                  :value="store.paddingX"
                  @input="
                    store.paddingX = parseInt(
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                />
              </div>
            </div>

            <div
              class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="paddingY"
                >Padding Y</label
              >
              <div class="grid grid-flow-col gap-x-2 text-sm">
                <input
                  id="paddingY"
                  class="w-full accent-blue-700"
                  type="range"
                  min="0"
                  max="128"
                  step="8"
                  :value="store.paddingY"
                  @input="
                    store.paddingY = parseInt(
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                />
              </div>
            </div>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label for="windowStyle" class="text-xs font-semibold"
                >Window style</label
              >
              <BaseSelect
                id="windowStyle"
                class="-my-1"
                preview-on-focus
                :disabled="!store.currentThemeSupportsWindowVariants"
                :model-value="store.windowStyle"
                @update:model-value="store.windowStyle = $event"
                :options="FRAME_STYLES"
              />
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label for="windowControls" class="text-xs font-semibold"
                >Window controls</label
              >
              <BaseSelect
                id="windowControls"
                class="-my-1"
                preview-on-focus
                :model-value="store.windowControls"
                @update:model-value="store.windowControls = $event"
                :options="[
                  { label: 'None', value: WindowControls.None },
                  { label: 'macOS - Color', value: WindowControls.MacColor },
                  { label: 'macOS - Gray', value: WindowControls.MacGray },
                  {
                    label: 'macOS - Outline',
                    value: WindowControls.MacOutline,
                  },
                  { label: 'Windows', value: WindowControls.Windows },
                ]"
              />
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="windowNoise"
                >Window noise</label
              >
              <BaseSwitch v-model="store.windowNoise" id="windowNoise" />
            </div>

            <div
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="reflection"
                >Window reflection</label
              >
              <BaseSwitch v-model="store.reflection" id="reflection" />
            </div>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />

            <div
              class="grid grid-flow-col grid-cols-[1fr_auto_auto] items-center gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="showTwitterBadge"
                >Twitter badge</label
              >
              <BaseButton
                class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
                @click="
                  store.expandTwitterOptions = !store.expandTwitterOptions
                "
              >
                <IconChevronDown
                  width="12"
                  class="transition-transform"
                  :class="{
                    'rotate-180': store.expandTwitterOptions,
                  }"
                />
              </BaseButton>
              <BaseSwitch
                v-model="store.showTwitterBadge"
                id="showTwitterBadge"
              />
            </div>

            <div
              class="grid grid-cols-[auto_1fr] items-start gap-x-2 gap-y-1"
              v-if="store.expandTwitterOptions"
            >
              <div
                v-if="store.picture"
                class="group relative row-start-1 row-end-3"
              >
                <BaseButton
                  @click="store.picture = ''"
                  class="absolute right-0 top-0 h-5 w-5 justify-center rounded-full bg-red-600/80 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
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
                  class="h-14 w-14 rounded-full border border-slate-700 bg-slate-700/30"
                />
              </div>
              <label
                v-else
                class="row-start-1 row-end-3 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-700/30 text-slate-600 transition-colors hover:bg-slate-700/50 hover:text-slate-400"
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

              <div class="col-start-2 grid gap-y-1">
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

              <div class="col-start-2 grid gap-y-1">
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
            <div
              class="grid grid-flow-col grid-cols-[1fr_auto_auto] items-center gap-x-2 gap-y-2"
            >
              <label
                class="cursor-pointer select-none text-xs font-semibold"
                for="showWatermark"
                >Watermark</label
              >
              <BaseButton
                class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
                @click="
                  store.expandWatermarkOptions = !store.expandWatermarkOptions
                "
              >
                <IconChevronDown
                  width="12"
                  class="transition-transform"
                  :class="{
                    'rotate-180': store.expandWatermarkOptions,
                  }"
                />
              </BaseButton>
              <BaseSwitch v-model="store.showWatermark" id="showWatermark" />
            </div>

            <template v-if="store.expandWatermarkOptions">
              <div
                class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2 -my-1"
              >
                <label
                  class="cursor-pointer select-none text-xs font-semibold"
                  for="watermarkText"
                  >Watermark text</label
                >
                <BaseInput
                  class="placeholder:text-slate-600/75"
                  type="text"
                  id="watermarkText"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Name"
                  v-model="store.watermark"
                />
              </div>

              <div
                class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
              >
                <label
                  class="cursor-pointer select-none text-xs font-semibold"
                  for="watermarkOpacity"
                  >Watermark opacity</label
                >
                <div class="grid grid-flow-col gap-x-2 text-sm">
                  <input
                    id="watermarkOpacity"
                    class="w-full accent-blue-700"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    :value="store.watermarkOpacity"
                    @input="
                      store.watermarkOpacity = parseInt(
                        ($event.target as HTMLInputElement).value,
                      )
                    "
                  />
                </div>
              </div>
            </template>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />
          </div>
        </div>

        <ExportOptions
          :is-expanded="isExpanded"
          @update:is-expanded="isExpanded = $event"
        />

        <div
          class="mt-4 hidden grid-cols-[1fr_auto_1fr] gap-2 bg-slate-800 sm:static sm:grid sm:grid-cols-1 sm:bg-transparent sm:px-3 sm:py-0 pwa:hidden"
        >
          <div class="hidden sm:flex justify-center items-center space-x-4">
            <Tooltip content="Follow Idered on X">
              <a
                href="https://twitter.com/Idered"
                class="font-medium outline-none transition hover:text-white focus:text-white"
              >
                <i-fa6-brands:x-twitter />
              </a>
            </Tooltip>

            <span class="opacity-20 skew">/</span>

            <Tooltip content="View source on GitHub">
              <a
                href="https://github.com/Idered/chalk.ist"
                class="font-medium outline-none transition hover:text-white focus:text-white"
              >
                <i-fa6-brands:github />
              </a>
            </Tooltip>

            <span class="opacity-20 skew">/</span>

            <Tooltip content="Buy me a coffee">
              <a
                href="https://www.buymeacoffee.com/idered"
                class="font-medium outline-none transition hover:text-white focus:text-white"
              >
                <i-ph:coffee />
              </a>
            </Tooltip>
          </div>

          <div
            class="hidden px-4 text-xs sm:block border rounded border-slate-700 py-3 mt-2 relative"
            v-if="store.showAlternatives"
          >
            <div class="opacity-60 text-center">
              Not happy with chalk.ist? <br />Try these alternatives:
            </div>

            <div class="flex space-x-2 justify-center mt-2">
              <a
                href="https://snappify.com/?ref=chalk.ist"
                class="font-medium outline-none transition hover:text-white focus:text-white"
                >snappify.com</a
              >
              <a
                href="https://ray.so/?ref=chalk.ist"
                class="font-medium outline-none transition hover:text-white focus:text-white"
                >ray.so</a
              >
              <a
                href="https://carbon.now.sh/?ref=chalk.ist"
                class="font-medium outline-none transition hover:text-white focus:text-white"
                >carbon.now.sh</a
              >
            </div>

            <div
              class="absolute top-2 right-2 transition hover:text-white focus:text-white cursor-pointer"
              @click="store.showAlternatives = false"
            >
              <i-ph:x-bold />
            </div>
          </div>

          <div class="h-4"></div>
        </div>
      </div>
    </aside>
  </OnClickOutside>
</template>
