<template>
  <main
    class="grid h-screen grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr] sm:grid-rows-1"
  >
    <TheEditorFrame class="sm:col-start-2 sm:min-h-screen" />
    <TheSidebar class="sm:col-start-1" />
  </main>
</template>

<script setup lang="ts">
import TheEditorFrame from "~/components/TheEditorFrame.vue";
import TheSidebar from "~/components/TheSidebar.vue";
</script>
