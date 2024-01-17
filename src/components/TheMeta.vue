<script setup lang="ts"></script>

<template>
  <div
    class="hidden grid-cols-[1fr_auto_1fr] gap-2 bg-slate-800 sm:static sm:grid sm:grid-cols-1 sm:bg-transparent sm:px-3 sm:py-0 pwa:hidden mt-4"
  >
    <div class="hidden sm:flex justify-center items-center space-x-4">
      <Tooltip content="Follow Idered on X">
        <a
          href="https://twitter.com/Idered"
          class="font-medium outline-none transition hover:text-white focus:text-white"
        >
          <i-fa6-brands:x-twitter />
        </a>
      </Tooltip>

      <span class="opacity-20 skew">/</span>

      <Tooltip content="View source on GitHub">
        <a
          href="https://github.com/Idered/chalk.ist"
          class="font-medium outline-none transition hover:text-white focus:text-white"
        >
          <i-fa6-brands:github />
        </a>
      </Tooltip>

      <span class="opacity-20 skew">/</span>

      <Tooltip content="Buy me a coffee">
        <a
          href="https://www.buymeacoffee.com/idered"
          class="font-medium outline-none transition hover:text-white focus:text-white"
        >
          <i-ph:coffee />
        </a>
      </Tooltip>
    </div>

    <!-- <div
      class="hidden text-xs sm:block rounded py-3 mt-2 relative"
      v-if="store.showAlternatives"
    >
      <div class="text-zinc-700">
        Not happy with chalk.ist? <br />Try these alternatives:
      </div>

      <div class="flex space-x-2 justify-center mt-2">
        <a
          href="https://snappify.com/?ref=chalk.ist"
          class="font-medium outline-none transition hover:text-white focus:text-white"
          >snappify.com</a
        >
        <a
          href="https://ray.so/?ref=chalk.ist"
          class="font-medium outline-none transition hover:text-white focus:text-white"
          >ray.so</a
        >
        <a
          href="https://carbon.now.sh/?ref=chalk.ist"
          class="font-medium outline-none transition hover:text-white focus:text-white"
          >carbon.now.sh</a
        >
      </div>

      <div
        class="absolute top-2 right-2 transition hover:text-white focus:text-white cursor-pointer"
        @click="store.showAlternatives = false"
      >
        <i-ph:x-bold />
      </div>
    </div> -->
  </div>
</template>
