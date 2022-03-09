<template>
  <main
    class="bg-slate-900 h-screen grid justify-center grid-rows-[1fr_auto] items-center"
  >
    <div
      class="aqua-spray p-8 grid overflow-hidden justify-items-end"
      ref="frame"
    >
      <div class="bg-black/80 rounded-md px-4 shadow-app">
        <div class="pt-4 grid justify-start gap-x-2 grid-flow-col">
          <div class="w-3 h-3 bg-white/30 rounded-full"></div>
          <div class="w-3 h-3 bg-white/30 rounded-full"></div>
          <div class="w-3 h-3 bg-white/30 rounded-full"></div>
        </div>
        <div class="py-8">
          <Editor ref="editor" />
        </div>
      </div>

      <div
        class="rounded-full p-1 pr-4 bg-black/70 text-white mt-4 flex items-center"
        v-if="username"
      >
        <IconTwitter :width="32" />
        <div class="font-semibold text-sm ml-2">@{{ username }}</div>
      </div>
    </div>

    <div
      class="border p-4 mb-12 text-sm rounded-md items-center border-slate-700 bg-slate-800 grid grid-flow-col justify-start gap-x-4"
    >
      <label for="" class="font-medium">Twitter username</label>
      <input
        class="border border-slate-700 bg-slate-900 rounded-md focus:outline-none px-2 py-1"
        type="text"
        autocomplete="off"
        spellcheck="false"
        v-model="username"
      />
      <button
        class="font-semibold hover:text-white transition hover:[text-shadow:0_1px_8px_rgba(255,255,255,.1)]"
        @click="handleCopy"
      >
        Copy
      </button>
      <button
        class="font-semibold hover:text-white transition hover:[text-shadow:0_1px_8px_rgba(255,255,255,.1)]"
        @click="handleDownload"
      >
        Download
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import Editor from "./components/Editor.vue";
import html2canvas from "html2canvas";
import { ref } from "vue";
import IconTwitter from "./components/IconTwitter.vue";
import { useLocalStorage } from "@vueuse/core";

const frame = ref<HTMLDivElement>();
const editor = ref<HTMLDivElement>();
const username = useLocalStorage("username", "");

const downloadPng = (canvas: HTMLCanvasElement) => {
  canvas.toBlob(function (blob) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "screenshot.png";
    link.click();
  });
};

const copyToClipboard = (canvas: HTMLCanvasElement) => {
  canvas.toBlob(function (blob) {
    if (!blob) return;
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  }, "image/png");
};

const handleCopy = async () => {
  if (!frame.value) return;
  html2canvas(frame.value).then((canvas) => {
    copyToClipboard(canvas);
  });
};
const handleDownload = async () => {
  if (!frame.value) return;
  html2canvas(frame.value).then((canvas) => {
    downloadPng(canvas);
  });
};
</script>

<style>
:root {
  --shadow-color: 36deg 87% 33%;
  /* --shadow-color: 235deg 65% 53%; */
  --shadow-elevation-low: 0px 0.6px 0.7px hsl(var(--shadow-color) / 0.31),
    0px 0.9px 1px -1.2px hsl(var(--shadow-color) / 0.33),
    0px 2.2px 2.5px -2.3px hsl(var(--shadow-color) / 0.35);
  --shadow-elevation-medium: 0px 0.6px 0.7px hsl(var(--shadow-color) / 0.33),
    0px 1.9px 2.2px -0.8px hsl(var(--shadow-color) / 0.34),
    0px 4.7px 5.4px -1.5px hsl(var(--shadow-color) / 0.35),
    0px 11.2px 12.9px -2.3px hsl(var(--shadow-color) / 0.37);
  --shadow-elevation-high: 0px 0.6px 0.7px hsl(var(--shadow-color) / 0.3),
    0px 3.5px 4px -0.3px hsl(var(--shadow-color) / 0.31),
    0px 6.4px 7.4px -0.7px hsl(var(--shadow-color) / 0.32),
    0px 10.4px 12px -1px hsl(var(--shadow-color) / 0.32),
    0px 16.3px 18.8px -1.3px hsl(var(--shadow-color) / 0.33),
    0px 25.2px 29.1px -1.6px hsl(var(--shadow-color) / 0.33),
    0px 37.9px 43.8px -2px hsl(var(--shadow-color) / 0.34),
    0px 55.6px 64.2px -2.3px hsl(var(--shadow-color) / 0.35);
}
.shadow-app {
  box-shadow: var(--shadow-elevation-high);
}
.dusty-cactus {
  background: linear-gradient(90deg, #fcff9e 0%, #c67700 100%);
}
.aqua-spray {
  background: linear-gradient(90deg, #00d2ff 0%, hsl(235, 65%, 53%) 100%);
}
.aqua-spray {
  background: linear-gradient(140deg, #ffcf73, #ff7a2f);
}
</style>
