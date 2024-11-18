<script setup lang="ts">
import { cropImage, resizeImage } from "~/lib/image";
import { persistentState } from "~/lib/persistent-state";
import { store } from "~/lib/store";

function handlePicture(event: Event, platform: String) {
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
    if(platform === 'twitter'){
      store.value.picture = resizedImage.toDataURL(file.type);
    }else {
      store.value.githubPicture = resizedImage.toDataURL(file.type);
    }
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
      >Twitter/X badge</label
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
      <input type="file" class="sr-only" @change="handlePicture($event, 'twitter')" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M172 56a4 4 0 0 1 4-4h20V32a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V60h-20a4 4 0 0 1-4-4Zm54.8 56.2A104.1 104.1 0 0 1 228 128a99.6 99.6 0 0 1-32.7 73.9l-.8.8a99.9 99.9 0 0 1-132.9 0a3.6 3.6 0 0 1-.9-.8A100 100 0 0 1 128 28a104.1 104.1 0 0 1 15.8 1.2a4 4 0 0 1 3.3 4.6a4 4 0 0 1-4.6 3.3A100 100 0 0 0 128 36a92 92 0 0 0-65.2 156.9a75.8 75.8 0 0 1 44.5-34.1a44 44 0 1 1 41.4 0a75.8 75.8 0 0 1 44.5 34.1A92.1 92.1 0 0 0 220 128a99 99 0 0 0-1.1-14.5a4 4 0 0 1 3.3-4.6a4 4 0 0 1 4.6 3.3ZM128 156a36 36 0 1 0-36-36a36 36 0 0 0 36 36Zm0 64a91.3 91.3 0 0 0 59.1-21.6a68 68 0 0 0-118.2 0A91.3 91.3 0 0 0 128 220Z"
        ></path>
      </svg>
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
  </div>

  <div
    class="grid grid-flow-col grid-cols-[1fr_auto_auto] items-center gap-x-2 gap-y-2"
  >
    <!--  github badge  -->
    <label
      class="cursor-pointer select-none text-xs font-semibold"
      for="showGithubBadge"
      >Github badge</label
    >
    <Button
      class="h-5 rounded bg-blue-600/30 px-2.5 text-xs font-semibold text-blue-500 hover:bg-blue-600/40"
      @click="
        persistentState.expandGithubOptions =
          !persistentState.expandGithubOptions
      "
    >
      <IconChevronDown
        width="12"
        class="transition-transform"
        :class="{
          'rotate-180': persistentState.expandGithubOptions,
        }"
      />
    </Button>
    <Switch v-model="store.showGithubBadge" id="showGithubBadge" />
  </div>

  <div
    class="grid grid-cols-[auto_1fr] items-start gap-x-2 gap-y-1"
    v-if="persistentState.expandGithubOptions"
  >
    <div v-if="store.githubPicture" class="group relative row-start-1 row-end-3">
      <Button
        @click="store.githubPicture = ''"
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
        :src="store.githubPicture"
        alt=""
        class="h-14 w-14 rounded-full border border-slate-700 bg-slate-700/30"
      />
    </div>
    <label
      v-else
      class="row-start-1 row-end-3 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-700/30 text-slate-600 transition-colors hover:bg-slate-700/50 hover:text-slate-400"
    >
      <input type="file" class="sr-only" @change="handlePicture($event, 'github')" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M172 56a4 4 0 0 1 4-4h20V32a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V60h-20a4 4 0 0 1-4-4Zm54.8 56.2A104.1 104.1 0 0 1 228 128a99.6 99.6 0 0 1-32.7 73.9l-.8.8a99.9 99.9 0 0 1-132.9 0a3.6 3.6 0 0 1-.9-.8A100 100 0 0 1 128 28a104.1 104.1 0 0 1 15.8 1.2a4 4 0 0 1 3.3 4.6a4 4 0 0 1-4.6 3.3A100 100 0 0 0 128 36a92 92 0 0 0-65.2 156.9a75.8 75.8 0 0 1 44.5-34.1a44 44 0 1 1 41.4 0a75.8 75.8 0 0 1 44.5 34.1A92.1 92.1 0 0 0 220 128a99 99 0 0 0-1.1-14.5a4 4 0 0 1 3.3-4.6a4 4 0 0 1 4.6 3.3ZM128 156a36 36 0 1 0-36-36a36 36 0 0 0 36 36Zm0 64a91.3 91.3 0 0 0 59.1-21.6a68 68 0 0 0-118.2 0A91.3 91.3 0 0 0 128 220Z"
        ></path>
      </svg>
    </label>

    <div class="col-start-2 grid gap-y-1">
      <Input
        class="placeholder:text-slate-600/75"
        type="text"
        id="name"
        autocomplete="off"
        spellcheck="false"
        placeholder="Name"
        v-model="store.githubName"
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
        v-model="store.githubUsername"
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
