<script setup lang="ts">
import FrameRow from "./FrameRow.vue";
import { computed } from "vue";
import { useDataStore } from "~/composables/store";
import { FileRecord } from "~/lib/records/FileRecord";

const dataStore = useDataStore();
const files = computed(() => FileRecord.all());
const currentFile = computed(() => FileRecord.find(dataStore.current_file));
</script>

<template>
  <div
    class="border-zinc-800 relative content-start bg-zinc-900 transition-[height] w-[264px] border-r transition-none pwa:border-t pwa:border-t-black pwa:shadow-[inset_0_1px_0_rgb(39_39_42)] overflow-hidden select-none cursor-default"
  >
    <div
      class="text-[12px] font-inter font-semibold pl-4 pr-2 mt-2 justify-between flex items-center"
    >
      <div>Files</div>
      <div class="flex-1"></div>
      <button
        @click="FileRecord.create().select().addFrame().select()"
        class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
      >
        <radix-icons:plus class="w-4 h-4" />
      </button>
    </div>

    <hr class="border-y border-b-zinc-800 border-t-black mb-2 mt-2" />

    <div class="overflow-auto max-h-80">
      <div
        v-for="file in files"
        class="text-[12px] font-inter select-none transition-colors"
        :class="{
          'text-white': file.id === dataStore.current_file,
        }"
      >
        <FileRow :file="file" />
      </div>
    </div>

    <hr class="border-y border-b-zinc-800 border-t-black mb-2 mt-2" />

    <div
      class="text-[12px] font-inter font-semibold pl-4 pr-2 justify-between flex items-center"
    >
      <div>Frames</div>
      <div class="flex-1"></div>
      <button
        @click="currentFile?.toggleExpandAllFrames"
        class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
      >
        <ion:chevron-collapse-outline
          class="w-4 h-4"
          v-if="currentFile?.hasEveryFrameExpanded"
        />
        <ion:chevron-expand-outline class="w-4 h-4" v-else />
      </button>
      <button
        @click="currentFile?.addFrame().select()"
        class="text-[11px] font-normal bg-white bg-opacity-0 transition w-6 h-6 flex items-center justify-center rounded-sm hover:bg-opacity-10"
      >
        <radix-icons:plus class="w-4 h-4" />
      </button>
    </div>

    <hr class="border-y border-b-zinc-800 border-t-black mb-2 mt-2" />

    <div class="overflow-auto">
      <div
        v-for="frame in currentFile?.frames"
        class="text-[12px] font-inter select-none transition-colors"
        :class="{
          'text-white': frame.id === dataStore.current_frame,
        }"
      >
        <FrameRow :frame="frame" />
        <BlockRow
          v-if="frame.isExpanded"
          v-for="block in frame.blocks"
          :key="block.id"
          :block="block"
        />
      </div>
    </div>
  </div>
</template>
