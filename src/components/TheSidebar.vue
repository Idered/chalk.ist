<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseSwitch from "./BaseSwitch.vue";
import IconChevronDown from "./IconChevronDown.vue";
import NumberInput from "./NumberInput.vue";
import { OnClickOutside } from "@vueuse/components";
import { useElementSize } from "@vueuse/core";
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "radix-vue";
import { computed, ref } from "vue";
import { ColorPicker } from "vue-color-kit";
import { cropImage, resizeImage } from "~/composables/image";
import { store } from "~/composables/store";
import {
  FONTS,
  FRAME_STYLES,
  LIGATURE_FONTS,
  SHADOW_OVERLAY_STYLES,
} from "~/constants";
import { WindowControls } from "~/enums";
import { Backdrops } from "~/lib/backdrops";
import { chalkistThemes, portedThemes, shikiThemes } from "~/lib/themes";

const isExpanded = ref(false);
const expandableContent = ref();
const { height: expandableContentHeight } = useElementSize(expandableContent);

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

const originalBackdrop = ref<string | number | null>(null);

const themeOptions = computed(() => [
  {
    group: "Chalk.ist Originals",
    children: chalkistThemes
      .map((item) => ({ value: item.name!, label: item.name! }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
  {
    group: "Other",
    children: shikiThemes
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
        class="fixed inset-x-0 bottom-0 z-10 max-h-screen content-start border-t border-zinc-800 bg-zinc-900 transition-[height] sm:static sm:!h-screen sm:w-[274px] sm:overflow-auto sm:border-r sm:border-t-0 sm:transition-none pwa:sm:border-t pwa:sm:border-t-black pwa:sm:shadow-[inset_0_1px_0_rgb(39_39_42)]"
        :style="{
          height: isExpanded ? `${expandableContentHeight + 57}px` : `57px`,
        }"
      >
        <div
          ref="expandableContent"
          class="max-h-[calc(30svh-48px)] overflow-auto sm:max-h-none"
        >
          <div class="grid gap-y-2 px-3 pt-4">
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
              >
                <!-- <template #item="{ item }">
                  <div class="flex items-center pl-6">
                    <div
                      v-for="{ key, color } in getThemePrimaryColors(
                        allThemes.find((theme) => theme.id === item.value),
                      )"
                      :key="key"
                      :style="{ backgroundColor: color }"
                      class="ml-[-5px] h-4 w-4 rounded-full shadow-[0_0_0_1px_rgba(0,0,0)]"
                    ></div>
                    <div
                      class="relative grid h-[24px] cursor-pointer items-center pl-2 text-[13px] font-medium transition-colors"
                    >
                      {{ item.label }}
                    </div>
                  </div>
                </template> -->
              </BaseSelect>
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
                  class="w-[118px] text-xs font-semibold [text-transform:capitalize]"
                  >{{ themeLabels[key] || key }}</label
                >
                <PopoverRoot>
                  <PopoverTrigger class="w-full">
                    <div
                      class="h-5 w-full rounded-sm border-2 border-slate-900 bg-slate-800 shadow-[0_0_0_1px_rgba(255,255,255,.17)]"
                      :style="{ backgroundColor }"
                    />
                  </PopoverTrigger>
                  <PopoverPortal>
                    <PopoverContent
                      :align-offset="-28"
                      :side-offset="-120"
                      side="right"
                      align="start"
                      class="z-[100000] rounded-md border border-slate-700 bg-slate-800 p-4 font-mono shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                    >
                      <PopoverArrow />
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

            <hr
              class="-mx-3 my-1.5 border-y border-b-zinc-800 border-t-black"
            />

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
                <NumberInput
                  id="fontSize"
                  class="-my-1"
                  :min="12"
                  :max="20"
                  v-model="store.fontSize"
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
                <NumberInput
                  id="lineHeight"
                  class="-my-1"
                  :min="20"
                  :max="40"
                  v-model="store.lineHeight"
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

            <hr
              class="-mx-3 my-1.5 border-y border-b-zinc-800 border-t-black"
            />

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
              class="-mx-0.5 flex flex-wrap items-center gap-0 sm:grid sm:grid-flow-row sm:grid-cols-7"
            >
              <button
                v-for="(item, key) in Backdrops"
                @mouseenter="
                  () => {
                    originalBackdrop = originalBackdrop ?? store.backdrop;
                    store.backdrop = key;
                  }
                "
                @mouseleave="
                  () => {
                    if (originalBackdrop) {
                      store.backdrop = originalBackdrop;
                      originalBackdrop = null;
                    }
                  }
                "
                @click="
                  () => {
                    store.backdrop = key;
                    originalBackdrop = null;
                  }
                "
                class="group border-2 border-transparent focus:outline-none"
                :title="`Use ${key} backdrop`"
              >
                <div
                  class="h-[30px] w-[30px] shrink-0 rounded ring-blue-800 transition group-hover:scale-105 group-hover:opacity-100 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] group-active:scale-95"
                  :style="{ background: item.backgroundStyle.background }"
                  :class="{
                    'shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] ring-[2px]':
                      store.backdrop === key,
                  }"
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
              class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
            >
              <div class="flex items-center">
                <label for="shadowOverlay" class="text-xs font-semibold"
                  >Shadow overlay</label
                >
              </div>
              <BaseSelect
                id="shadowOverlay"
                class="-my-1"
                preview-on-focus
                :model-value="store.shadowOverlay"
                @update:model-value="store.shadowOverlay = $event"
                :options="SHADOW_OVERLAY_STYLES"
              />
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
                <BaseSlider
                  class="w-[100px]"
                  id="paddingX"
                  :min="0"
                  :max="128"
                  :step="8"
                  v-model="store.paddingX"
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
                <BaseSlider
                  class="w-[100px]"
                  id="paddingY"
                  :min="0"
                  :max="128"
                  :step="8"
                  v-model="store.paddingY"
                />
              </div>
            </div>

            <hr
              class="-mx-3 my-1.5 border-y border-b-zinc-800 border-t-black"
            />

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

            <hr
              class="-mx-3 my-1.5 border-y border-b-zinc-800 border-t-black"
            />

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
                class="-my-1 grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
              >
                <label
                  class="cursor-pointer select-none text-xs font-semibold"
                  for="watermarkText"
                  >Watermark text</label
                >
                <BaseInput
                  class="w-[116px] placeholder:text-slate-600/75"
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
                  <BaseSlider
                    class="w-[100px]"
                    id="paddingX"
                    :min="0"
                    :max="100"
                    :step="1"
                    v-model="store.watermarkOpacity"
                  />
                </div>
              </div>
            </template>

            <!-- <hr
              class="-mx-3 my-1.5 hidden border-y border-b-zinc-800 border-t-black sm:block lg:hidden"
            /> -->

            <!-- <ExportOptions class="lg:hidden" /> -->

            <!-- <hr
              class="-mx-3 my-1.5 hidden border-y border-b-zinc-800 border-t-black sm:block pwa:hidden"
            /> -->
          </div>
        </div>

        <!-- <TheMeta /> -->

        <div class="h-3"></div>
      </div>
    </aside>

    <div
      class="fixed inset-x-0 bottom-0 z-10 grid grid-cols-[1fr_auto] gap-2 bg-zinc-900 px-3 py-2 sm:hidden"
    >
      <ExportToPNGButton />
      <BaseButton
        class="group w-10 justify-center bg-slate-700 text-slate-500 hover:bg-slate-700/80 sm:hidden"
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
    </div>
  </OnClickOutside>
</template>
