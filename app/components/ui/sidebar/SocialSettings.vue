<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { cropImage, resizeImage } from "~/lib/image";
import { persistentState } from "~/lib/persistent-state";
import { store } from "~/lib/store";
import { socialIcons } from "~/lib/social-icons";
function handlePicture(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) {
    return;
  }
  const file = target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const croppedImage = await cropImage(reader.result as string, 1);
    const resizedImage = await resizeImage(croppedImage, 56 * 2);
    store.value.picture = resizedImage.toDataURL(file.type);
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div
    class="grid grid-flow-col grid-cols-[1fr_auto_auto] items-center gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showTwitterBadge"
      >Social badge</label
    >
    <Button
      class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
      @click="
        persistentState.expandTwitterOptions =
          !persistentState.expandTwitterOptions
      "
    >
      <IconChevronDown
        width="12"
        class="transition-transform"
        :class="{
          'rotate-180': persistentState.expandTwitterOptions,
        }"
      />
    </Button>
    <Switch v-model="store.showTwitterBadge" id="showTwitterBadge" />
  </div>

  <div
    class="grid grid-cols-[auto_1fr] items-start gap-x-2 gap-y-1"
    v-if="persistentState.expandTwitterOptions"
  >
    <div v-if="store.picture" class="group relative row-start-1 row-end-3">
      <Button
        @click="store.picture = ''"
        class="absolute right-0 top-0 h-5 w-5 justify-center rounded-full bg-red-600/80 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 20 20"
        >
          <g fill="currentColor">
            <path
              d="M7.172 14.243a1 1 0 1 1-1.415-1.415l7.071-7.07a1 1 0 0 1 1.415 1.414l-7.071 7.07Z"
            ></path>
            <path
              d="M5.757 7.172a1 1 0 1 1 1.415-1.415l7.07 7.071a1 1 0 0 1-1.414 1.415l-7.07-7.071Z"
            ></path>
          </g>
        </svg>
      </Button>
      <img
        :src="store.picture"
        alt=""
        class="h-14 w-14 rounded-full border border-slate-700 bg-slate-700/30"
      />
    </div>
    <label
      v-else
      class="row-start-1 row-end-3 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-700/30 text-slate-600 transition-colors hover:bg-slate-700/50 hover:text-slate-400"
    >
      <input type="file" class="sr-only" @change="handlePicture" />
      <i-solar:user-plus-broken />
    </label>

    <div class="col-start-2 grid gap-y-1">
      <Input
        class="placeholder:text-slate-600/75"
        type="text"
        id="name"
        autocomplete="off"
        spellcheck="false"
        placeholder="Name"
        v-model="store.name"
      />
    </div>

    <div class="col-start-2 grid gap-y-1">
      <Input
        class="placeholder:text-slate-600/75"
        type="text"
        id="username"
        autocomplete="off"
        spellcheck="false"
        placeholder="Username"
        v-model="store.username"
      />
    </div>
    <div
      class="col-span-2 flex grid-flow-col grid-rows-2 flex-wrap items-center justify-start gap-2"
    >
      <component
        v-for="icon in Object.keys(socialIcons)"
        :is="socialIcons[icon as keyof typeof socialIcons]"
        @click="store.socialIcon = icon"
        class="size-9 cursor-pointer rounded border p-2 hover:bg-slate-700/50"
        :class="{
          'border-blue-600/80 bg-blue-900/10 text-blue-300':
            store.socialIcon === icon,
          'border-slate-600/40': store.socialIcon !== icon,
        }"
      />
    </div>
  </div>

  <div
    class="grid grid-flow-col grid-cols-[1fr_auto_auto] items-center gap-x-2 gap-y-2"
  >
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showWatermark"
      >Watermark</label
    >
    <Button
      class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
      @click="
        persistentState.expandWatermarkOptions =
          !persistentState.expandWatermarkOptions
      "
    >
      <IconChevronDown
        width="12"
        class="transition-transform"
        :class="{
          'rotate-180': persistentState.expandWatermarkOptions,
        }"
      />
    </Button>
    <Switch v-model="store.showWatermark" id="showWatermark" />
  </div>

  <template v-if="persistentState.expandWatermarkOptions">
    <div
      class="-my-1 grid grid-flow-col items-center justify-between gap-x-2 gap-y-2"
    >
      <label
        class="cursor-pointer select-none text-xs font-semibold"
        for="watermarkText"
        >Watermark text</label
      >
      <Input
        class="w-[116px] placeholder:text-slate-600/75"
        type="text"
        id="watermarkText"
        autocomplete="off"
        spellcheck="false"
        placeholder="Name"
        v-model="store.watermark"
      />
    </div>

    <div
      class="grid h-5 grid-flow-col items-center justify-between gap-x-2 gap-y-2"
    >
      <label
        class="cursor-pointer select-none text-xs font-semibold"
        for="watermarkOpacity"
        >Watermark opacity</label
      >
      <div class="grid grid-flow-col gap-x-2 text-sm">
        <SliderAlt
          class="w-[100px]"
          id="paddingX"
          :min="0"
          :max="100"
          :step="1"
          v-model="store.watermarkOpacity"
        />
      </div>
    </div>
  </template>
</template>
