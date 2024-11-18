<script setup lang="ts">
import { store } from "~/lib/store";
import GithubIcon from "~/components/shared/icon/GithubIcon.vue";
</script>

<template>
  <div class="flex items-center justify-between">
    <div
      v-if="store.showWatermark"
      :class="{
        'h-9': store.paddingY === 0,
        'h-7': store.paddingY === 8,
        'h-5': store.paddingY === 16,
        'h-3': store.paddingY === 24,
        'h-1': store.paddingY === 32,
      }"
    >
      <div
        class="absolute bottom-2 left-2 z-10 h-5 whitespace-nowrap text-sm font-medium tracking-wide text-white [text-shadow:0_0px_3px_black]"
        :style="{
          opacity: store.watermarkOpacity / 100,
        }"
      >
        {{ store.watermark }}
      </div>
    </div>
    <div class="flex items-center justify-end w-full gap-[15px]">

      <component
        :is="store.username ? 'a' : 'div'"
        :href="
        store.username ? `https://twitter.com/${store.username}` : undefined
      "
        class="relative z-10 mt-4 flex items-center rounded-full bg-black/70 py-1.5 pl-3 pr-4 text-white"
        :class="{
        'hover:bg-black/50': store.username,
      }"
        v-if="
        (store.username || store.name || store.picture) &&
        store.showTwitterBadge
      "
      >
        <img
          v-if="store.picture"
          :src="store.picture"
          width="32"
          height="32"
          class="-my-2 -ml-2 rounded-full"
          alt=""
        />
        <IconTwitterCircle v-else :width="20" />
        <div v-if="store.name || store.username" class="ml-2 grid gap-0.5">
          <div class="text-xs font-semibold leading-3" v-if="store.name">
            {{ store.name }}
          </div>
          <div
            class="font-medium leading-3"
            v-if="store.username"
            :class="{
            'text-sm': !store.name,
            'text-[11px] text-white/50': store.name,
          }"
          >
            @{{ store.username }}
          </div>
        </div>
      </component>


      <component
        :is="store.githubUsername ? 'a' : 'div'"
        :href="
        store.githubUsername ? `https://github.com/${store.githubUsername}` : undefined
      "
        class="relative z-10 mt-4 flex items-center rounded-full bg-black/70 py-1.5 pl-3 pr-4 text-white"
        :class="{
        'hover:bg-black/50': store.githubUsername,
      }"
        v-if="
        (store.githubUsername || store.githubName || store.githubPicture) &&
        store.showGithubBadge
      "
      >
        <img
          v-if="store.githubPicture"
          :src="store.githubPicture"
          width="32"
          height="32"
          class="-my-2 -ml-2 rounded-full"
          alt=""
        />
        <GithubIcon v-else :width="21" />
        <div v-if="store.githubName || store.githubUsername" class="ml-2 grid gap-0.5">
          <div class="text-xs font-semibold leading-3" v-if="store.githubName">
            {{ store.githubName }}
          </div>
          <div
            class="font-medium leading-3"
            v-if="store.githubUsername"
            :class="{
            'text-sm': !store.githubName,
            'text-[11px] text-white/50': store.githubName,
          }"
          >
            @{{ store.githubUsername }}
          </div>
        </div>
      </component>
    </div>
  </div>
</template>
