<template>
  <div class="h-screen grid">
    <TheEditorFrame />
  </div>
</template>

<script setup lang="ts">
import TheEditorFrame from "~/components/TheEditorFrame.vue";
import { preview } from "~/composables/store";
import { WindowControls } from "~/types";

const props = defineProps({
  str: {
    type: String,
    default: "",
  },
});

const data: {
  c: string; // content
  t: string; // theme
  tt: string; // title
  l: string; // language
  px: number; // padding x
  py: number; // padding y
  w: number; // width
  ff: string; // font family
  n: string; // name
  u: string; // username
  b: boolean; // showTwitterBadge
  r: boolean; // reflection
  ln: boolean; // showLineNumbers
  wc: WindowControls; // windowControls
} = JSON.parse(window.atob(props.str));

preview.value = {
  content: decodeURIComponent(data.c),
  theme: data.t,
  title: data.tt,
  language: data.l,
  paddingX: data.px,
  paddingY: data.py,
  frameWidth: data.w,
  fontFamily: data.ff,
  name: data.n,
  username: data.u,
  showTwitterBadge: data.b,
  reflection: data.r,
  picture: "",
  showLineNumbers: data.ln,
  windowControls: data.wc,
};
</script>
