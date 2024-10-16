<script setup lang="ts">
import { usePresetsStore } from "~/lib/presets";
import { Backdrops } from "~/lib/backdrops";
import { bundledLanguages } from "shiki/langs";
import { onMounted, ref, nextTick } from "vue";
import { HighlighterCore } from "shiki/types.mjs";
import { createHighlighterCore, createOnigurumaEngine } from "shiki/index.mjs";
import { chalkistThemes, portedThemes, shikiThemes } from "~/lib/themes";
import { persistentState } from "~/lib/persistent-state";
import { useScroll } from "@vueuse/core";
import { store } from "~/lib/store";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarTrigger,
} from "radix-vue";
import { createTheme } from "~/lib/create-theme";

const presetsStore = usePresetsStore();
const shiki = ref<HighlighterCore | null>(null);
const isReady = ref(false);

onMounted(async () => {
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
  focusNewPreset(id);
};
</script>

<template>
  <div>
    <div class="grid gap-2">
      <div class="flex items-center justify-between gap-2">
        <label
          class="cursor-pointer select-none text-xs font-semibold"
          for="showBackground"
          >Presets</label
        >

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
            <div
              v-for="preset in presetsStore.presets"
              :key="preset.id"
              :data-preset="preset.id"
              class="rounded border border-slate-900 bg-black p-2 pb-0"
              :style="{
                '--solid-background': preset.settings.solidBackground,
              }"
            >
              <div
                class="relative grid h-32 cursor-pointer content-center justify-center overflow-hidden rounded-[2px] text-sm"
                @click="presetsStore.loadPreset(preset.id)"
              >
                <div
                  v-if="
                    'transform' in
                    Backdrops[
                      preset.settings.backdrop as keyof typeof Backdrops
                    ].backgroundStyle
                  "
                  class="absolute inset-0 -translate-y-1/2"
                >
                  <div class="size-[1000px] origin-top-left scale-[.30]">
                    <div
                      class="absolute size-[1000px]"
                      :style="
                        Backdrops[
                          preset.settings.backdrop as keyof typeof Backdrops
                        ].backgroundStyle
                      "
                    ></div>
                  </div>
                </div>
                <div
                  v-else
                  class="absolute inset-0"
                  :style="
                    Backdrops[
                      preset.settings.backdrop as keyof typeof Backdrops
                    ].backgroundStyle
                  "
                ></div>
                <Window mode="edit" :store="preset.settings">
                  <!-- <WindowReflection v-if="preset.settings.reflection" /> -->
                  <WindowTitle
                    :settings="preset.settings"
                    :block="{
                      title: preset.name,
                      mode: 'edit',
                      icon: '',
                    }"
                    hide-title
                    readonly
                  />
                  <div
                    class="h-11 min-w-[208px] px-5 py-3"
                    v-html="
                      shiki?.codeToHtml(`let count = 'Hello';`, {
                        lang: 'javascript',
                        theme: preset.settings.useCustomTheme
                          ? createTheme('custom', preset.settings.customTheme)
                          : preset.settings.colorTheme,
                      })
                    "
                  ></div>
                </Window>
              </div>
              <div class="flex items-center justify-between">
                <input
                  class="name-input w-full bg-transparent px-1 py-2 text-xs font-medium outline-none placeholder:text-slate-500/50"
                  spellcheck="false"
                  autocomplete="off"
                  :value="preset.name"
                  placeholder="Untitled"
                  @input="
                    presetsStore.updatePresetName(
                      preset.id,
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                />
                <MenubarRoot>
                  <MenubarMenu value="presets">
                    <MenubarTrigger as-child>
                      <Button
                        class="h-6 rounded px-1 font-semibold hover:bg-slate-700"
                      >
                        <i-ph:dots-three-bold class="size-4" />
                      </Button>
                    </MenubarTrigger>
                    <MenubarPortal>
                      <MenubarContent
                        align="end"
                        class="menubar-content min-w-[130px]"
                        :side-offset="8"
                      >
                        <MenubarItem
                          class="menubar-item group"
                          @click="
                            presetsStore.updatePresetSettings(preset.id, store)
                          "
                        >
                          <i-ph:pencil-simple class="mr-2 size-4" />
                          Overwrite
                        </MenubarItem>
                        <MenubarItem
                          class="menubar-item group"
                          @click="presetsStore.deletePreset(preset.id)"
                        >
                          <i-ph:trash-simple class="mr-2 size-4" />
                          Delete
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarPortal>
                  </MenubarMenu>
                </MenubarRoot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
