<script setup lang="ts">
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarSeparator,
  MenubarTrigger,
} from "radix-vue";
import { HighlighterCore } from "shiki/types.mjs";
import { Backdrops } from "~/lib/backdrops";
import { createTheme } from "~/lib/create-theme";
import { usePresetsStore } from "~/lib/presets";
import { Store, store } from "~/lib/store";
import { Preset } from "~/types";

const presetsStore = usePresetsStore();

defineProps<{
  preset: Preset;
  shiki?: HighlighterCore;
}>();
</script>

<template>
  <div
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
          Backdrops[preset.settings.backdrop as keyof typeof Backdrops]
            .backgroundStyle
        "
        class="absolute inset-0 -translate-y-1/2"
      >
        <div class="size-[1000px] origin-top-left scale-[.30]">
          <div
            class="absolute size-[1000px]"
            :style="
              Backdrops[preset.settings.backdrop as keyof typeof Backdrops]
                .backgroundStyle
            "
          ></div>
        </div>
      </div>
      <div
        v-else
        class="absolute inset-0"
        :style="
          Backdrops[preset.settings.backdrop as keyof typeof Backdrops]
            .backgroundStyle
        "
      ></div>
      <Window mode="edit" :store="preset.settings as Store">
        <!-- <WindowReflection v-if="preset.settings.reflection" /> -->
        <WindowTitle
          :settings="{
            windowControls: preset.settings.windowControls,
            showWindow: preset.settings.showWindow,
          }"
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
            <Button class="h-6 rounded px-1 font-semibold hover:bg-slate-700">
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
                @click="presetsStore.updatePresetSettings(preset.id, store)"
              >
                <i-ph:pencil-simple class="mr-2 size-4" />
                Overwrite
              </MenubarItem>
              <MenubarItem
                class="menubar-item group"
                @click="presetsStore.sharePreset(preset.id)"
              >
                <i-ph:share-network class="mr-2 size-4" />
                Share (copy url)
              </MenubarItem>
              <MenubarSeparator class="menubar-separator" />
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
</template>
