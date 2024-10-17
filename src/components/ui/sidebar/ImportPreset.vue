<script setup lang="ts">
import { useStorage, useUrlSearchParams } from "@vueuse/core";
import { nextTick, onMounted, ref } from "vue";
import { persistentState } from "~/lib/persistent-state";
import { usePresetsStore } from "~/lib/presets";
import { store } from "~/lib/store";
import { useSearchParams } from "~/lib/utils";

const presetsStore = usePresetsStore();
const params = useSearchParams();

onMounted(() => {
  if (!localStorage.getItem("chalk-store-backup")) {
    localStorage.setItem("chalk-store-backup", JSON.stringify(store.value));
  }
  if (presetsStore.parsedPreset) {
    store.value = presetsStore.parsedPreset.settings;
  }
});

const cancel = () => {
  delete params.import;
  presetsStore.isImportingPreset = false;
  store.value = JSON.parse(localStorage.getItem("chalk-store-backup") || "{}");
};
const focusNewPreset = async (id: string) => {
  await nextTick();
  const newPresetInput = document.querySelector<HTMLInputElement>(
    `[data-preset="${id}"] .name-input`,
  );
  newPresetInput?.focus();
};

const importPreset = () => {
  if (!presetsStore.parsedPreset) {
    return;
  }

  const id = presetsStore.createPreset(
    "Imported Preset",
    presetsStore.parsedPreset.settings,
  );
  cancel();
  persistentState.value.expandPresets = true;
  focusNewPreset(id);
};
</script>

<template>
  <div class="grid h-[calc(100vh-26px)] content-center">
    <div class="text-[16px] font-semibold text-zinc-300">Import Preset</div>
    <p class="mt-2 text-sm">Would you like to import this preset?</p>
    <div class="mt-4 grid gap-2">
      <Button
        @click="importPreset"
        variant="primary"
        class="w-full justify-center"
      >
        Import
      </Button>
      <Button @click="cancel" variant="outline" class="w-full justify-center">
        Cancel
      </Button>
    </div>
  </div>
</template>
