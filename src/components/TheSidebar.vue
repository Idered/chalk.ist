<template>
  <div
    class="border-r p-4 border-slate-700 bg-slate-800 grid gap-y-5 content-start min-w-[250px] border-t border-t-slate-900 shadow-[inset_0_1px_0_rgb(30_30_37)]"
  >
    <div class="grid gap-y-2 justify-start">
      <label class="font-semibold text-xs">Theme</label>
      <div class="grid grid-flow-col items-center gap-x-2">
        <button
          v-for="theme in themes"
          class="w-6 h-6 rounded-full transition hover:scale-105 active:scale-95 hover:opacity-100"
          :title="`Use ${theme.name} theme`"
          :style="{ backgroundImage: theme.background }"
          @click="store.currentTheme = theme.key"
          :class="{
            'opacity-50': store.currentTheme !== theme.key,
          }"
        ></button>
      </div>
    </div>

    <div class="grid gap-y-1">
      <label for="language" class="font-semibold text-xs">Language</label>
      <BaseSelect v-model="store.language" :options="AVAILABLE_LANGUAGES" />
    </div>

    <div class="grid gap-y-1">
      <label for="username" class="font-semibold text-xs">Username</label>
      <input
        class="border font-mono border-slate-700 mask bg-slate-900 rounded-md focus:outline-none px-2 py-1 text-[13px]"
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
        <input type="checkbox" v-model="store.diff" id="diff" class="sr-only" />
        <BaseToggle v-model="store.diff" />
      </div>
      <div
        class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2"
      >
        <label
          class="font-semibold text-xs select-none cursor-pointer"
          for="reflection"
          >Reflection</label
        >
        <input
          type="checkbox"
          v-model="store.reflection"
          id="reflection"
          class="sr-only"
        />
        <BaseToggle v-model="store.reflection" />
      </div>
    </div>

    <div class="grid gap-y-2">
      <label class="font-semibold text-xs">Export</label>
      <button
        class="bg-brand-600/30 text-brand-500 h-10 rounded font-semibold grid justify-start px-4 grid-flow-col gap-x-3 items-center text-xs hover:bg-brand-600/40 group transition"
        @click="handleCopy"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--radix-icons group-hover:scale-110 transition-transform group-hover:rotate-6"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M5 2V1h5v1H5Zm-.25-2A.75.75 0 0 0 4 .75V1h-.5A1.5 1.5 0 0 0 2 2.5v10A1.5 1.5 0 0 0 3.5 14H7v-1H3.5a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H4v.25c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75V2h.5a.5.5 0 0 1 .5.5V7h1V2.5A1.5 1.5 0 0 0 11.5 1H11V.75a.75.75 0 0 0-.75-.75h-5.5ZM9 8.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm2.5-.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm-.5 2.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm0 2a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm-6-4a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0ZM8.5 15a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm2.5-.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{
          state === State.PreparingToCopy
            ? "..."
            : state === State.JustCopied
            ? "Copied!"
            : state === State.CopyFailure
            ? "Error! Try to download"
            : "Copy to Clipboard"
        }}
      </button>

      <button
        class="bg-rose-500/30 text-rose-300 h-10 rounded font-semibold grid justify-start pl-4 grid-flow-col gap-x-3 items-center text-xs hover:bg-rose-500/40 group transition"
        @click="handleDownload"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--radix-icons group-hover:scale-110 transition-transform group-hover:rotate-6"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7.5 1.05a.45.45 0 0 1 .45.45v6.914l2.232-2.232a.45.45 0 1 1 .636.636l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 1 1 .636-.636L7.05 8.414V1.5a.45.45 0 0 1 .45-.45ZM2.5 10a.5.5 0 0 1 .5.5V12c0 .554.446 1 .996 1h7.005A.999.999 0 0 0 12 12v-1.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-1.999 2H3.996A1.997 1.997 0 0 1 2 12v-1.5a.5.5 0 0 1 .5-.5Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{
          state === State.PreparingToDownload
            ? "..."
            : state === State.JustDownloaded
            ? "Downloaded!"
            : "Download PNG"
        }}
      </button>
    </div>
    <TheTwitterFollowButton />
  </div>
</template>

<script setup lang="ts">
import html2canvas from "html2canvas";
import { nextTick, ref } from "vue";
import { isExporting, store } from "~/composables/store";
import * as themes from "~/themes";
import BaseToggle from "./BaseToggle.vue";
import BaseSelect from "./BaseSelect.vue";
import { AVAILABLE_LANGUAGES } from "~/constants";
import TheTwitterFollowButton from "./TheTwitterFollowButton.vue";

enum State {
  Idle,
  PreparingToCopy,
  PreparingToDownload,
  JustCopied,
  JustDownloaded,
  CopyFailure,
}

const state = ref(State.Idle);
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
