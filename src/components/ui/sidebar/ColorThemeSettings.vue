<script setup lang="ts">
import { computed } from "vue";
import { store } from "~/lib/store";
import { ColorPicker } from "vue-color-kit";
import {
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "radix-vue";
import {
  shikiThemes,
  chalkistThemes,
  portedThemes,
  allThemes,
  getThemeColors,
  themeLabels,
} from "~/lib/themes";
import { persistentState } from "~/lib/persistent-state";

const featuredThemes = allThemes.filter((item) =>
  [
    "CodeSandbox",
    "Duotone - Dark Sea",
    "Liveblocks",
    "Monochrome",
    "Poimandres",
    "Tailwind CSS",
    "Vue",
  ].includes(item.displayName),
);

const themeOptions = computed(() => [
  {
    group: "Featured",
    children: featuredThemes
      .map((item) => ({
        value: item.id!,
        label: item.displayName!,
        showEdit: "raw" in item,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
  {
    group: "Other",
    children: shikiThemes
      .map((item) => ({ value: item.id, label: item.displayName }))
      .concat(
        ...chalkistThemes.map((item) => ({
          value: item.id,
          label: item.displayName,
          showEdit: true,
        })),
      )
      .concat(
        ...portedThemes.map((item) => ({
          value: item.id,
          label: item.displayName,
          showEdit: true,
        })),
      )
      .filter(
        (item) => !featuredThemes.find((theme) => theme.id === item.value),
      )
      .sort((a, b) => a.label.localeCompare(b.label)),
  },
]);
</script>

<template>
  <div class="grid grid-flow-col items-center justify-between gap-x-2 gap-y-2">
    <label for="colorTheme" class="text-xs font-semibold">Color theme</label>
    <Select
      id="colorTheme"
      class="-my-1"
      preview-on-focus
      :model-value="store.colorTheme"
      @update:model-value="store.colorTheme = $event"
      :options="themeOptions"
    >
      <template #item="{ item }">
        <div
          class="group relative flex h-[24px] cursor-pointer items-center px-2 pl-6 text-[13px] font-medium transition-colors"
        >
          <IconCheck
            width="12"
            class="absolute left-2"
            v-if="store.colorTheme === item.value"
          />
          <span class="whitespace-nowrap pr-2">{{ item.label }}</span>

          <Button
            v-if="item.showEdit"
            @click.stop="
              () => {
                const colors = getThemeColors(item.value);
                if (colors) {
                  store.customTheme = colors;
                  persistentState.expandCustomThemeOptions = true;
                  store.useCustomTheme = true;
                }
              }
            "
            class="ml-auto h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 opacity-0 hover:bg-blue-600/40 group-hover:opacity-100"
          >
            <span class="text-[10px] uppercase tracking-wider">Edit</span>
          </Button>
        </div>
      </template>
    </Select>
  </div>

  <div
    class="grid grid-cols-[1fr_auto_auto] items-center justify-between gap-x-2 gap-y-2"
  >
    <label for="useCustomTheme" class="text-xs font-semibold"
      >Custom theme</label
    >
    <Button
      class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
      @click="
        persistentState.expandCustomThemeOptions =
          !persistentState.expandCustomThemeOptions
      "
    >
      <span
        class="text-[10px] uppercase tracking-wider"
        v-if="!persistentState.expandCustomThemeOptions"
        >Edit</span
      >
      <span v-else class="text-[10px] uppercase tracking-wider">Collapse</span>
    </Button>
    <Switch v-model="store.useCustomTheme" id="useCustomTheme" />
  </div>

  <div v-if="persistentState.expandCustomThemeOptions" class="contents">
    <div
      class="flex items-center gap-x-2 gap-y-2"
      v-for="(backgroundColor, key) in store.customTheme"
      :key="key"
    >
      <label
        for="customTheme.keyword"
        class="w-[118px] text-xs font-semibold [text-transform:capitalize]"
        >{{ themeLabels[key] || key }}</label
      >
      <PopoverRoot>
        <PopoverTrigger class="w-full">
          <div
            class="h-5 w-full rounded-sm border-2 border-slate-900 bg-slate-800 shadow-[0_0_0_1px_rgba(255,255,255,.17)]"
            :style="{ backgroundColor }"
          />
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            :align-offset="-28"
            :side-offset="-120"
            side="right"
            align="start"
            class="z-[100000] rounded-md border border-slate-700 bg-slate-800 p-4 font-mono shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          >
            <PopoverArrow />
            <ColorPicker
              class="box-content"
              :color="backgroundColor"
              @changeColor="
                store.customTheme[key] = `rgba(${[
                  $event.rgba.r,
                  $event.rgba.g,
                  $event.rgba.b,
                  $event.rgba.a,
                ].join(',')})`
              "
            />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  </div>
</template>
