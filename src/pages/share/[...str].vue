<template>
  <div class="h-screen grid">
    <TheEditorFrame />
  </div>
</template>

<script setup lang="ts">
import TheEditorFrame from "~/components/TheEditorFrame.vue";
import { preview } from "~/composables/store";

const props = defineProps({
  str: {
    type: String,
    default: "",
  },
});

const data: {
  c: string; // content
  t: string; // theme
  l: string; // language
  px: number; // padding x
  py: number; // padding y
  w: number; // width
  n: string; // name
  u: string; // username
  b: boolean; // showTwitterBadge
  r: boolean; // reflection
  ln: boolean; // showLineNumbers
  wc: boolean; // showWindowControls
} = JSON.parse(window.atob(props.str));

preview.value = {
  content: decodeURIComponent(data.c),
  theme: data.t,
  language: data.l,
  paddingX: data.px,
  paddingY: data.py,
  frameWidth: data.w,
  name: data.n,
  username: data.u,
  showTwitterBadge: data.b,
  reflection: data.r,
  picture: "",
  showLineNumbers: data.ln,
  showWindowControls: data.wc,
};
</script>
