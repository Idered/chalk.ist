<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: true
  }
})
</script>

<template>
  <main class="h-screen">
    <div
      class="flex h-full items-center justify-center bg-zinc-900 px-3 text-[13px] text-slate-300"
    >
      <i-ph:warning class="mr-2 text-yellow-500" />
      <span class="font-bold mr-1">{{ error.statusCode }}</span> {{ error.message }}
    </div>
  </main>
</template>
