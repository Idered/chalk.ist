<script setup lang="ts">
import { store } from "~/lib/store";
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden rounded-md transition"
    :class="{
      'opacity-0': !store.reflection || !store.showWindow,
    }"
  >
    <svg
      class="absolute left-0 top-0 w-3/6"
      viewBox="0 0 100 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H100L47 172H0V0Z" fill="url(#paint0_linear_47_2)" />
      <defs>
        <linearGradient
          id="paint0_linear_47_2"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity=".035" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
