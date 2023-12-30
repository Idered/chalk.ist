<script setup lang="ts">
import { computed, ref } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { store } from "~/composables/store";
import BaseSwitch from "./BaseSwitch.vue";
import BaseSelect from "./BaseSelect.vue";
import { FONTS, FRAME_STYLES, LIGATURE_FONTS } from "~/constants";
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import IconChevronDown from "./IconChevronDown.vue";
import { useElementSize } from "@vueuse/core";
import { resizeImage, cropImage } from "~/composables/image";
import { WindowControls } from "~/enums";
import { Backdrops } from "~/lib/backdrops";
import { shikijiThemes, chalkistThemes } from "~/lib/themes";
import ExportOptions from "./ExportOptions.vue";

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
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
]);
</script>

<template>
  <OnClickOutside @trigger="isExpanded = false">
    <aside>
      <div class="sm:hidden" :style="{ height: '57px' }"></div>
      <div
        class="fixed bottom-0 inset-x-0 border-t border-slate-700 sm:border-t-0 pwa:sm:border-t pwa:sm:border-t-slate-900 pwa:sm:shadow-[inset_0_1px_0_rgb(30_30_37)] sm:border-r content-start transition-[height] sm:transition-none sm:!h-screen sm:w-[270px] sm:static bg-slate-800 sm:overflow-auto max-h-screen"
        :style="{
          height: isExpanded ? `${expandableContentHeight + 57}px` : `57px`,
        }"
      >
        <div ref="expandableContent" class="max-h-[calc(50svh-48px)] sm:max-h-none overflow-auto">
          <div class="grid gap-y-2 px-3 py-4">
            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label for="colorTheme" class="font-semibold text-xs">Color theme</label>
              <BaseSelect
                id="colorTheme"
                class="-my-1"
                preview-on-focus
                :model-value="store.colorTheme"
                @update:model-value="store.colorTheme = $event"
                :options="themeOptions"
              />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label for="fontFamily" class="font-semibold text-xs">Font</label>
              <BaseSelect
                class="-my-1"
                id="fontFamily"
                preview-on-focus
                :model-value="store.fontFamily"
                @update:model-value="setFontFamily"
                :options="FONTS"
              />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="fontLigatures">Font ligatures</label>
              <BaseSwitch
                :disabled="!LIGATURE_FONTS.includes(store.fontFamily)"
                v-model="store.fontLigatures"
                id="fontLigatures"
              />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="showLineNumbers">Line numbers</label>
              <BaseSwitch v-model="store.showLineNumbers" id="showLineNumbers" />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2 h-5">
              <label class="font-semibold text-xs select-none cursor-pointer" for="lineHeight">Line height</label>
              <div class="grid gap-x-2 grid-flow-col text-sm">
                <input
                  id="lineHeight"
                  class="accent-blue-700 w-full"
                  type="range"
                  min="20"
                  max="30"
                  step="1"
                  :value="store.lineHeight"
                  @input="store.lineHeight = parseInt(($event.target as HTMLInputElement).value)"
                />
              </div>
            </div>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />

            <div class="grid grid-cols-[1fr_auto_auto] gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="showBackground">Backdrop</label>

              <BaseButton
                class="text-blue-500 px-2.5 font-semibold text-xs bg-blue-600/30 hover:bg-blue-600/40 h-5 rounded"
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
              class="flex flex-wrap sm:grid items-center gap-2 sm:grid-flow-row sm:grid-cols-5"
            >
              <button
                v-for="(item, key) in Backdrops"
                @click="store.backdrop = key"
                class="group rounded-full focus:outline-none"
                :title="`Use ${key} backdrop`"
              >
                <div
                  class="h-10 sm:h-6 rounded group-hover:opacity-100 transition group-hover:scale-105 group-active:scale-95 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] ring-blue-800"
                  :style="{ background: item.backgroundStyle.background }"
                ></div>
              </button>
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="backdropNoise">Backdrop noise</label>
              <BaseSwitch v-model="store.backdropNoise" id="backdropNoise" :disabled="!store.showBackground" />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="showParticles"
                >Backdrop particles</label
              >
              <BaseSwitch v-model="store.showParticles" id="showParticles" />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2 h-5">
              <label class="font-semibold text-xs select-none cursor-pointer" for="paddingX">Padding X</label>
              <div class="grid gap-x-2 grid-flow-col text-sm">
                <input
                  id="paddingX"
                  class="accent-blue-700 w-full"
                  type="range"
                  min="0"
                  max="128"
                  step="8"
                  :value="store.paddingX"
                  @input="store.paddingX = parseInt(($event.target as HTMLInputElement).value)"
                />
              </div>
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2 h-5">
              <label class="font-semibold text-xs select-none cursor-pointer" for="paddingY">Padding Y</label>
              <div class="grid gap-x-2 grid-flow-col text-sm">
                <input
                  id="paddingY"
                  class="accent-blue-700 w-full"
                  type="range"
                  min="0"
                  max="128"
                  step="8"
                  :value="store.paddingY"
                  @input="store.paddingY = parseInt(($event.target as HTMLInputElement).value)"
                />
              </div>
            </div>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label for="windowStyle" class="font-semibold text-xs">Window style</label>
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

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label for="windowControls" class="font-semibold text-xs">Window controls</label>
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
                  { label: 'macOS - Outline', value: WindowControls.MacOutline },
                  { label: 'Windows', value: WindowControls.Windows },
                ]"
              />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="windowNoise">Window noise</label>
              <BaseSwitch v-model="store.windowNoise" id="windowNoise" />
            </div>

            <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="reflection">Window reflection</label>
              <BaseSwitch v-model="store.reflection" id="reflection" />
            </div>

            <hr class="border-y border-b-slate-700 border-t-slate-900" />

            <div class="grid grid-flow-col gap-y-2 items-center grid-cols-[1fr_auto_auto] gap-x-2">
              <label class="font-semibold text-xs select-none cursor-pointer" for="showTwitterBadge"
                >Twitter badge</label
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
                      <path d="M5.757 7.172a1 1 0 1 1 1.415-1.415l7.07 7.071a1 1 0 0 1-1.414 1.415l-7.07-7.071Z"></path>
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
            <hr class="border-y border-b-slate-700 border-t-slate-900" />
          </div>
        </div>

        <ExportOptions :is-expanded="isExpanded" @update:is-expanded="isExpanded = $event" />

        <div
          class="pwa:hidden sm:grid grid-cols-[1fr_auto_1fr] sm:grid-cols-1 gap-2 bg-slate-800 hidden sm:static sm:bg-transparent sm:px-3 sm:py-0 mt-4"
        >
          <div class="text-xs hidden sm:block text-center">
            <span class="opacity-75">Made by</span>
            <a
              href="https://twitter.com/Idered"
              class="hover:text-white transition outline-none font-medium focus:text-white"
            >
              Idered
            </a>
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
    </aside>
  </OnClickOutside>
</template>
