<script setup lang="ts">
import { socialIcons } from "~/lib/social-icons";
import { store } from "~/lib/store";
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
    <!-- :is="store.username ? 'a' : 'div'" -->
    <!-- :class="{
        'hover:bg-black/50': store.username,
      }" -->
    <component
      is="div"
      :href="
        store.username ? `https://twitter.com/${store.username}` : undefined
      "
      class="relative z-10 ml-auto mt-4 flex items-center rounded-full bg-black/70 py-1.5 pl-3 pr-4 text-white"
      v-if="
        (store.username || store.name || store.picture) &&
        store.showTwitterBadge
      "
    >
      <img
        v-if="store.picture && store.socialIcon === 'custom'"
        :src="store.picture"
        width="32"
        height="32"
        class="-my-2 -ml-2 rounded-full"
        alt=""
      />
      <component
        v-else
        :is="socialIcons[store.socialIcon as keyof typeof socialIcons]"
      />
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
  </div>
</template>
