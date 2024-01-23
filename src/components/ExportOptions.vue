<script setup lang="ts"></script>

<template>
  <div
    class="hidden z-10 sm:flex border gap-px border-zinc-800 fixed bottom-8 left-1/2 rounded-lg -translate-x-1/2 bg-zinc-900 shadow px-2 py-2"
  >
    <ExportToClipboardButton class="rounded-l-md rounded-r-none w-[204px]" />
    <ExportToPNGButton class="rounded-r-md rounded-l-none w-[150px]" />
    <!-- <ExportToMP4Button /> -->
  </div>
</template>
