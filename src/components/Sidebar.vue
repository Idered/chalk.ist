<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";
import { ref } from "vue";
import { persistentState } from "~/lib/persistent-state";

const isExpanded = ref(false);
</script>

<template>
  <OnClickOutside v-if="persistentState.showUI" @trigger="isExpanded = false">
    <aside>
      <!-- <div class="sm:hidden" :style="{ height: '57px' }"></div> -->
      <div
        class="fixed inset-x-0 bottom-[56px] z-10 max-h-[calc(30svh-48px)] content-start overflow-auto border-t border-zinc-800 bg-zinc-900 transition-[height] sm:static sm:grid sm:h-screen sm:max-h-none sm:w-[282px] sm:overflow-auto sm:border-r sm:border-t-0 sm:transition-none pwa:sm:border-t pwa:sm:border-t-black pwa:sm:shadow-[inset_0_1px_0_rgb(39_39_42)]"
        :class="{
          hidden: !isExpanded,
        }"
      >
        <div class="grid gap-y-2 px-3 pt-3.5 sm:pb-3">
          <PresetSettings />
          <SidebarSeparator />
          <ColorThemeSettings />
          <SidebarSeparator />
          <TextSettings />
          <SidebarSeparator />
          <BackdropSettings />
          <SidebarSeparator />
          <WindowSettings />
          <SidebarSeparator />
          <SocialSettings />
        </div>
      </div>
    </aside>

    <div
      class="fixed inset-x-0 bottom-0 z-10 grid grid-cols-[1fr_auto] gap-2 bg-zinc-900 px-3 py-2 sm:hidden"
    >
      <ExportToPNGButton />
      <Button
        class="group w-10 justify-center bg-slate-700 text-slate-500 hover:bg-slate-700/80 sm:hidden"
        @click="isExpanded = !isExpanded"
        square="w-10"
      >
        <IconChevronDown
          width="16"
          class="transition"
          :class="{
            'rotate-180': !isExpanded,
          }"
        />
      </Button>
    </div>
  </OnClickOutside>
</template>
