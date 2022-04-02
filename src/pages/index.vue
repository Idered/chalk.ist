<template>
  <main
    class="grid grid-rows-[1fr_auto] h-screen sm:grid-rows-1 sm:grid-cols-[auto_1fr]"
  >
    <TheEditorFrame class="sm:col-start-2 sm:min-h-screen" />
    <TheTwitterFlyout />
    <TheSidebar class="sm:col-start-1" />
  </main>
</template>

<script setup lang="ts">
import TheEditorFrame from "~/components/TheEditorFrame.vue";
import TheSidebar from "~/components/TheSidebar.vue";
import TheTwitterFlyout from "~/components/TheTwitterFlyout.vue";
</script>
