<script setup lang="ts">
import { isClient } from "@vueuse/core";
import { store } from "~/lib/store";

const isSafari =
  typeof window !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
</script>

<template>
  <ClientOnly>
    <main
      class="grid h-screen"
      :class="{
        'layout-safari': isSafari,
        'layout-not-safari': !isSafari,
      }"
      :style="{
        '--solid-background': store.solidBackground,
        '--custom-background': store.background,
      }"
    >
      <div
        v-if="isSafari"
        class="flex h-10 items-center justify-center border-b border-zinc-800 bg-zinc-900 px-3 text-[13px] text-slate-300 shadow-[inset_0_-1px_0_theme('colors.zinc.950')] [grid-area:notification]"
      >
        <i-ph:warning class="mr-2 text-yellow-500" />
        Safari is not supported. For the best experience, please use any other
        browser.
      </div>
      <Menu class="[grid-area:menu]" />
      <Canvas class="[grid-area:canvas]" />
      <Sidebar class="[grid-area:sidebar]" />
    </main>
  </ClientOnly>
</template>

<style scoped>
.layout-safari {
  grid-template-rows: auto auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "notification notification"
    "sidebar menu"
    "sidebar canvas";
}

.layout-not-safari {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "sidebar menu"
    "sidebar canvas";
}
</style>
