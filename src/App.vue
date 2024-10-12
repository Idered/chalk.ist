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
    <div
      class="grid grid-rows-[auto_1fr] overflow-y-auto overflow-x-hidden sm:col-start-2 sm:min-h-screen"
    >
      <Menu />
      <Canvas />
    </div>

    <Sidebar class="sm:col-start-1" />
  </main>
</template>
