<template>
  <aside>
    <div class="sm:hidden" :style="{ height: '57px' }"></div>
    <div
      class="fixed bottom-0 inset-x-0 border-t border-slate-700 sm:border-t-0 sm:border-r content-start overflow-hidden transition-[height] sm:!h-screen sm:w-[240px] sm:static bg-slate-800"
      :style="{
        height: isExpanded ? `${287 + 57}px` : `57px`,
      }"
    >
      <!-- <div
      class="border-r p-4 border-slate-700 bg-slate-800 grid gap-y-5 content-start min-w-[250px] border-t border-t-slate-900 shadow-[inset_0_1px_0_rgb(30_30_37)] max-w-[100vw] h-full"
    > -->
      <div data-expandable-content class="grid gap-y-5 px-3 py-4">
        <div class="grid gap-y-2 justify-start">
          <label class="font-semibold text-xs">Theme</label>
          <div class="grid grid-flow-col items-center gap-x-2">
            <button
              v-for="theme in themes"
              @click="store.currentTheme = theme.key"
              class="group rounded-full focus:outline-none"
              :title="`Use ${theme.name} theme`"
            >
              <div
                class="w-6 h-6 rounded-full group-hover:opacity-100 transition group-hover:scale-105 group-active:scale-95 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] ring-blue-800"
                :class="{
                  'opacity-50': store.currentTheme !== theme.key,
                }"
                :style="{ backgroundImage: theme.background }"
              ></div>
            </button>
          </div>
        </div>
        <div class="grid gap-y-1">
          <label for="language" class="font-semibold text-xs">Language</label>
          <BaseSelect
            id="language"
            v-model="store.language"
            :options="AVAILABLE_LANGUAGES"
          />
        </div>
        <div class="grid gap-y-1">
          <label for="username" class="font-semibold text-xs">Username</label>
          <BaseInput
            class="border font-mono focus:outline-none focus:ring-[3px] focus:border-blue-800 ring-blue-900/20 border-slate-700 bg-slate-900 rounded-md px-2 py-1 text-[13px]"
            type="text"
            id="username"
            autocomplete="off"
            spellcheck="false"
            v-model="store.username"
          />
        </div>
        <div class="grid gap-y-2">
          <div
            class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2"
          >
            <label
              class="font-semibold text-xs select-none cursor-pointer"
              for="diff"
              >Diff</label
            >
            <BaseSwitch v-model="store.diff" id="diff" />
          </div>
          <div
            class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2"
          >
            <label
              class="font-semibold text-xs select-none cursor-pointer"
              for="reflection"
              >Reflection</label
            >
            <BaseSwitch v-model="store.reflection" id="reflection" />
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-1 gap-2 fixed inset-x-0 bottom-0 py-2 px-3 bg-slate-900 sm:static sm:bg-transparent sm:px-3 sm:py-0"
      >
        <label class="font-semibold text-xs hidden sm:block">Export</label>

        <BaseButton
          class="px-4 w-full bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/40 group"
          @click="handleCopy"
        >
          <IconClipboard
            width="16"
            class="group-hover:scale-110 transition-transform group-hover:rotate-6"
          />
          <span class="truncate">
            {{
              state === State.PreparingToCopy
                ? "..."
                : state === State.JustCopied
                ? "Copied!"
                : state === State.CopyFailure
                ? "Error! Try to download"
                : "Copy to Clipboard"
            }}
          </span>
        </BaseButton>

        <BaseButton
          class="bg-slate-700 text-slate-500 hover:bg-slate-700/80 group sm:hidden"
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
          <IconDownload
            width="16"
            class="group-hover:scale-110 transition-transform group-hover:rotate-6"
          />
          <span class="truncate">
            {{
              state === State.PreparingToDownload
                ? "..."
                : state === State.JustDownloaded
                ? "Downloaded!"
                : "Download PNG"
            }}
          </span>
        </BaseButton>
      </div>
      <!-- <TheTwitterFollowButton /> -->
    </div>
  </aside>
</template>

<script setup lang="ts">
import html2canvas from "html2canvas";
import { nextTick, ref } from "vue";
import { isExporting, store } from "~/composables/store";
import * as themes from "~/themes";
import BaseSwitch from "./BaseSwitch.vue";
import BaseSelect from "./BaseSelect.vue";
import { AVAILABLE_LANGUAGES } from "~/constants";
// import TheTwitterFollowButton from "./TheTwitterFollowButton.vue";
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import IconDownload from "./IconDownload.vue";
import IconClipboard from "./IconClipboard.vue";
import IconChevronDown from "./IconChevronDown.vue";

enum State {
  Idle,
  PreparingToCopy,
  PreparingToDownload,
  JustCopied,
  JustDownloaded,
  CopyFailure,
}

const state = ref(State.Idle);
const isExpanded = ref(false);
const timeout = ref();

const downloadPng = (canvas: HTMLCanvasElement) => {
  canvas.toBlob(function (blob) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "screenshot.png";
    link.click();
    state.value = State.JustDownloaded;
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      state.value = State.Idle;
    }, 1000);
  });
};

const copyToClipboard = (canvas: HTMLCanvasElement) => {
  canvas.toBlob(function (blob) {
    if (!blob) return;
    try {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
      state.value = State.JustCopied;
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
        state.value = State.Idle;
      }, 1000);
    } catch {
      state.value = State.CopyFailure;
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
        state.value = State.Idle;
      }, 1000);
    }
  }, "image/png");
};

const handleCopy = async () => {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  state.value = State.PreparingToCopy;
  isExporting.value = true;
  await nextTick();
  html2canvas(frame).then((canvas) => {
    isExporting.value = false;
    copyToClipboard(canvas);
  });
};

const handleDownload = async () => {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  state.value = State.PreparingToDownload;
  isExporting.value = true;
  await nextTick();
  html2canvas(frame).then((canvas) => {
    isExporting.value = false;
    downloadPng(canvas);
  });
};
</script>
