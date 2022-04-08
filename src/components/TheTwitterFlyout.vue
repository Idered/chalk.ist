<template>
  <div
    class="sm:col-start-2 fixed -mt-12 sm:mt-0 right-4 left-4 md:left-[256px] top-full grid justify-items-center max-h-0"
  >
    <div
      class="absolute bottom-full bg-slate-800 p-2 -translate-y-5 rounded-full border border-slate-700 grid grid-flow-col items-center gap-x-4 transition ease-out-back duration-700"
      :class="{
        'opacity-0 pointer-events-none translate-y-12': !showTwitterFlyout || !store.enableTwitterFlyout,
      }"
    >
      <img src="https://github.com/idered.png" alt="" class="w-8 rounded-full" />

      <span class="text-slate-400 font-medium text-sm">
        Your first screenshot looks great <span class="ml-1"> 🎉</span> If you like this tool, follow me on Twitter for
        more!
      </span>

      <a
        href="https://twitter.com/Idered?ref_src=chalk.ist"
        class="twitter-follow-button"
        data-show-count="false"
        data-show-screen-name="false"
        data-size="large"
      />

      <button
        type="button"
        class="border rounded-full h-8 w-8 shrink-0 grid items-center hover:border-slate-600/40 focus:outline-none focus:ring-[3px] focus:border-blue-800 ring-blue-900/20 justify-center transition-colors group hover:bg-slate-800 border-slate-700 bg-slate-900"
        title="Hide"
        @click="store.enableTwitterFlyout = false"
      >
        <IconClose width="24" class="group-hover:scale-[1.20] transition-transform duration-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { showTwitterFlyout, store } from "~/composables/store";
import IconClose from "~/components/IconClose.vue";

onBeforeMount(async () => {
  let script = document.createElement("script");
  script.setAttribute("charset", "utf-8");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  document.body.insertAdjacentElement("beforeend", script);
});
</script>
