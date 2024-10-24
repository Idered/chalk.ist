<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <main class="h-screen">
    <div
      class="flex h-full items-center justify-center bg-zinc-900 px-3 text-[13px] text-slate-300"
    >
      <i-ph:warning class="mr-2 text-yellow-500" />
      <span class="mr-1 font-bold">{{ error.statusCode }}</span>
      {{ error.message }}
    </div>
  </main>
</template>
