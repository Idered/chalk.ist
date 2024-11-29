<script setup lang="ts">
import { usePresetsStore } from "~/lib/presets";
import { bundledLanguages } from "shiki/langs";
import { onMounted, ref, nextTick } from "vue";
import type { HighlighterCore } from "shiki/types.mjs";
import { createHighlighterCore, createOnigurumaEngine } from "shiki/index.mjs";
import { chalkistThemes, portedThemes, shikiThemes } from "~/lib/themes";
import { persistentState } from "~/lib/persistent-state";
import { useScroll } from "@vueuse/core";
import { store } from "~/lib/store";

const presetsStore = usePresetsStore();
const shiki = ref<HighlighterCore>();
const isReady = ref(false);

onMounted(async () => {
  if (shiki.value) return;
  shiki.value = await createHighlighterCore({
    engine: createOnigurumaEngine(import("shiki/wasm")),
    themes: [
      ...chalkistThemes,
      ...portedThemes,
      ...shikiThemes.map((theme) => theme.import),
    ],
    langs: [bundledLanguages["javascript"]],
  });
  isReady.value = true;
});

const container = ref<HTMLDivElement | null>(null);
const { arrivedState } = useScroll(container);

const focusNewPreset = async (id: string) => {
  await nextTick();
  const newPresetInput = document.querySelector<HTMLInputElement>(
    `[data-preset="${id}"] .name-input`,
  );
  newPresetInput?.focus();
};

const createNewPreset = async () => {
  const id = presetsStore.createPreset("", store.value);
  persistentState.value.expandPresets = true;
  focusNewPreset(id);
};
</script>

<template>
  <div>
    <div class="grid gap-2">
      <div class="flex items-center justify-between gap-2">
        <label class="select-none text-xs font-semibold">Presets</label>

        <div class="flex-1"></div>

        <Button
          v-if="presetsStore.presets.length > 0"
          class="ml-auto h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
          @click="createNewPreset"
        >
          <span>
            <i-ph:plus-bold class="size-3" />
          </span>
        </Button>

        <Button
          class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
          @click="
            persistentState.expandPresets = !persistentState.expandPresets
          "
        >
          <IconChevronDown
            width="12"
            class="transition-transform"
            :class="{
              'rotate-180': persistentState.expandPresets,
            }"
          />
        </Button>
      </div>

      <div v-if="persistentState.expandPresets">
        <div
          v-if="presetsStore.presets.length === 0"
          class="grid justify-items-center py-6 text-center text-xs"
        >
          <div class="font-semibold">No presets saved yet</div>
          <div class="mt-1 max-w-[200px]">
            Save your current settings as a preset for quick access later.
          </div>
          <Button
            class="mt-4 h-8 bg-blue-600 px-4 text-white hover:bg-blue-500 active:bg-blue-700"
            @click="createNewPreset"
          >
            Create New Preset
          </Button>
        </div>
        <div class="relative" v-else>
          <div
            class="pointer-events-none absolute -left-3 -right-3 bottom-0 z-50 h-8 bg-gradient-to-b from-transparent to-black/70 backdrop-blur transition-opacity [mask-image:linear-gradient(to_bottom,_transparent_0%,_black_90%)]"
            :class="{ 'opacity-0': arrivedState.bottom }"
          ></div>
          <div
            class="pointer-events-none absolute -left-3 -right-3 top-0 z-50 h-8 bg-gradient-to-t from-transparent to-black/70 backdrop-blur transition-opacity [mask-image:linear-gradient(to_top,_transparent_0%,_black_90%)]"
            :class="{ 'opacity-0': arrivedState.top }"
          ></div>

          <div
            ref="container"
            class="-mb-3.5 grid max-h-[50vh] gap-2 overflow-y-auto pb-3.5"
          >
            <PresetCard
              v-for="preset in presetsStore.presets"
              :key="preset.id"
              :preset="preset"
              :shiki="shiki"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
