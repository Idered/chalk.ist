<template>
  <main class="bg-slate-900 min-h-screen grid grid-cols-[auto_1fr]">
    <Sidebar />
    <EditorFrame />
  </main>
</template>

<script setup lang="ts">
import EditorFrame from "./components/EditorFrame.vue";
import Sidebar from "./components/Sidebar.vue";
</script>
