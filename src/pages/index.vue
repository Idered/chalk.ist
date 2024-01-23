<script setup lang="ts">
import TheDetails from "~/components/TheDetails.vue";
import TheEditorFrame from "~/components/TheEditorFrame.vue";
import TheMenu from "~/components/TheMenu.vue";
</script>

<template>
  <main
    class="grid grid-rows-[auto_1fr_auto] sm:grid-rows-[49px_1fr] sm:grid-cols-[264px_1fr_264px] overflow-hidden h-screen max-h-screen"
  >
    <TheMenu class="sm:col-span-3" />
    <TheManager class="hidden sm:grid overflow-hidden" />
    <TheEditorFrame />
    <TheDetails />
    <ExportOptions />
  </main>
</template>
