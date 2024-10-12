<script setup lang="ts">
import { store } from "~/lib/store";
</script>

<template>
  <main
    class="grid h-screen grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr] sm:grid-rows-1"
    :style="{
      '--solid-background': store.solidBackground,
    }"
  >
    <Canvas class="sm:col-start-2 sm:min-h-screen" />
    <Sidebar class="sm:col-start-1" />
  </main>
</template>
