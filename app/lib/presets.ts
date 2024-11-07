import { defineStore } from "pinia";
import { store } from "./store";
import type { Store } from "./store";
import { useStorage, watchImmediate } from "@vueuse/core";
import { atou, useSearchParams, utoa } from "./utils";
import { v4 } from "uuid";
import { z } from "zod";
import { WindowControls } from "./enums";
import { Backdrops } from "./backdrops";
import { themeNames } from "./themes";
import { FONTS, SHADOW_OVERLAY_MAPPING, WINDOW_STYLES } from "./constants";
import { hslToHex, rgbaToHex, toHex } from "./colors";
import { computed, ref } from "vue";

type Preset = {
  id: string;
  name: string;
  settings: Store;
};

const hexRegexp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})([A-Fa-f0-9]{2})?$/;
const importPresetSchema = z.object({
  version: z.literal(1),
  type: z.literal("preset"),
  settings: z.object({
    // boolean settings
    backdropNoise: z.boolean(),
    fontLigatures: z.boolean(),
    reflection: z.boolean(),
    showBackground: z.boolean(),
    showLineNumbers: z.boolean(),
    showParticles: z.boolean(),
    showTwitterBadge: z.boolean(),
    showWatermark: z.boolean(),
    showWindow: z.boolean(),
    useCustomTheme: z.boolean(),
    windowNoise: z.boolean(),

    // number settings
    fontSize: z.number(),
    frameHeight: z.number(),
    frameWidth: z.number(),
    innerPaddingX: z.number(),
    innerPaddingY: z.number(),
    paddingX: z.number(),
    paddingY: z.number(),
    watermarkOpacity: z.number(),
    lineHeight: z.number(),

    // enum settings
    backdrop: z.enum(Object.keys(Backdrops) as any),
    colorTheme: z.enum(themeNames as any),
    fontFamily: z.enum(FONTS.map((item) => item.value) as any),
    shadowOverlay: z.enum(Object.keys(SHADOW_OVERLAY_MAPPING) as any),
    windowControls: z.enum(Object.values(WindowControls) as any),
    windowStyle: z.enum(WINDOW_STYLES.map((item) => item.value) as any),

    solidBackground: z.string().regex(hexRegexp),

    // object settings
    customTheme: z.object({
      foreground: z.string().regex(hexRegexp),
      variable: z.string().regex(hexRegexp),
      comment: z.string().regex(hexRegexp),
      keyword: z.string().regex(hexRegexp),
      function: z.string().regex(hexRegexp),
      string: z.string().regex(hexRegexp),
      punctuation: z.string().regex(hexRegexp),
      operator: z.string().regex(hexRegexp),
      number: z.string().regex(hexRegexp),
      regexp: z.string().regex(hexRegexp),
    }),
  }),
});

export const usePresetsStore = defineStore("presets", () => {
  const presets = useStorage<Preset[]>("chalk-presets", () => []);
  const params = useSearchParams();
  const isImportingPreset = ref();
  const parsedPreset = computed(() => {
    if (!isImportingPreset.value) {
      return null;
    }

    try {
      const data = atou(params.import as string);
      const json = JSON.parse(data);
      const parsed = importPresetSchema.safeParse(json);
      if (parsed.success) {
        return {
          ...parsed.data,
          settings: {
            ...parsed.data.settings,
            username: "",
            name: "",
            picture: "",
          },
        };
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  });

  watchImmediate(params, (value) => {
    if (value.import) {
      isImportingPreset.value = true;
    }
  });

  function createPreset(name: Preset["name"], settings: Preset["settings"]) {
    const id = v4();

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

  function sharePreset(id: string) {
    const preset = presets.value.find((e) => e.id === id);

    if (!preset) {
      return;
    }

    const { name, picture, watermark, username, ...settings } = preset.settings;

    const data = utoa(
      JSON.stringify({
        version: 1,
        type: "preset",
        name: preset.name,
        settings: {
          ...settings,
          customTheme: Object.fromEntries(
            Object.entries(settings.customTheme).map(([key, value]) => [
              key,
              toHex(value),
            ]),
          ),
          solidBackground: toHex(settings.solidBackground),
        },
      }),
    );
    const encoded = encodeURIComponent(data);
    const shareUrl = `${window.location.origin}/?import=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
  }

  return {
    presets,
    createPreset,
    loadPreset,
    deletePreset,
    updatePresetName,
    updatePresetSettings,
    sharePreset,
    isImportingPreset,
    parsedPreset,
  };
});
