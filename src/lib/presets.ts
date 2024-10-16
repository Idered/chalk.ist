import { defineStore } from "pinia";
import { store, Store } from "./store";
import { useStorage } from "@vueuse/core";

type Preset = {
  id: string;
  name: string;
  settings: Store;
};

export const usePresetsStore = defineStore("presets", () => {
  const presets = useStorage<Preset[]>("chalk-presets", () => []);

  function createPreset(name: Preset["name"], settings: Preset["settings"]) {
    const id = crypto.randomUUID();

    presets.value.push({
      id: id,
      name,
      settings: JSON.parse(JSON.stringify(settings)),
    });

    return id;
  }

  function loadPreset(id: string) {
    const preset = presets.value.find((e) => e.id === id);

    if (!preset) {
      return;
    }

    // Apply preset settings to the store
    Object.entries(preset.settings).forEach(([key, value]) => {
      if (key in store.value) {
        (store.value[key as keyof Store] as any) = value;
      }
    });
  }

  function updatePresetSettings(id: string, settings: Store) {
    const preset = presets.value.find((e) => e.id === id);

    if (!preset) {
      return;
    }

    preset.settings = JSON.parse(JSON.stringify(settings));
  }

  function updatePresetName(id: string, name: string) {
    const preset = presets.value.find((e) => e.id === id);

    if (!preset) {
      return;
    }

    preset.name = name;
  }

  function deletePreset(id: string) {
    presets.value = presets.value.filter((e) => e.id !== id);
  }

  return {
    presets,
    createPreset,
    loadPreset,
    deletePreset,
    updatePresetName,
    updatePresetSettings,
  };
});
