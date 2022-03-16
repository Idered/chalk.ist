<template>
  <div
    class="flex transition-opacity duration-700"
    :class="{
      'opacity-0 pointer-events-none': !show || store.hideTwitterFollow,
    }"
  >
    <a
      href="https://twitter.com/Idered?ref_src=chalk.ist"
      class="twitter-follow-button"
      data-show-count="true"
      data-show-screen-name="false"
      data-size="large"
    />
    <button
      type="button"
      class="border rounded-full h-6 w-6 shrink-0 grid ml-4 items-center hover:border-slate-600/40 justify-center transition-colors group hover:bg-slate-800 border-slate-700 bg-slate-900"
      title="Hide Twitter Follow Button"
      @click="store.hideTwitterFollow = true"
    >
      <IconClose
        width="16"
        class="group-hover:scale-[1.20] transition-transform duration-500"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { store } from "~/composables/store";
import IconClose from "./IconClose.vue";

const show = ref(false);

onBeforeMount(async () => {
  let script = document.createElement("script");
  script.setAttribute("charset", "utf-8");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  script.addEventListener("load", () => {
    window.twttr?.ready(() => {
      setTimeout(() => {
        show.value = true;
      }, 150);
    });
  });
  document.body.insertAdjacentElement("beforeend", script);
});
</script>
