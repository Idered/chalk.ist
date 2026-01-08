<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Backdrops } from "~/lib/backdrops";
import { LIGHT_WINDOW_STYLES, WINDOW_STYLES } from "~/lib/constants";
import type { Store } from "~/lib/store";

const props = defineProps<{
  mode: "preview" | "edit";
  store: Store;
  isLightTheme: boolean;
}>();

const backdrop = computed(() => Backdrops[props.store.backdrop]);
const windowStyle = computed(() => {
  const style = props.isLightTheme
    ? props.store.lightWindowStyle
    : props.store.windowStyle;
  return windowStyles.value.find((w) => w.value === style);
});
const windowStyles = computed(() =>
  props.isLightTheme ? LIGHT_WINDOW_STYLES : WINDOW_STYLES,
);
const style = computed(() => {
  const styles: Partial<CSSProperties>[] = [];

  if (!props.store.showWindow) return styles;

  if (windowStyle.value?.features?.appStyle !== false) {
    styles.push({
      borderRadius: `${props.store.windowBorderRadius}px`,
      backgroundColor: props.isLightTheme
        ? `rgba(255, 255, 255, ${props.store.windowBackgroundOpacity / 100})`
        : `rgba(15, 15, 15, ${props.store.windowBackgroundOpacity / 100})`,
      backgroundImage: props.store.windowNoise ? "url(/noise.png)" : undefined,
      backgroundSize: "182px",
    });
  }

  if (props.isLightTheme) {
    styles.push(
      {
        none: {},
        "variant-1": {
          boxShadow: `
            rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, 
            rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, 
            rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, 
            rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, 
            rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, 
            rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, 
            rgba(42, 51, 70, 0.03) 0px 24px 24px -8px
          `,
        },
        "variant-2": {
          boxShadow: `
            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, 
            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px
          `,
        },
        "variant-3": {
          boxShadow: `
            rgba(0, 0, 0, 0.12) 0px 1px 3px, 
            rgba(0, 0, 0, 0.24) 0px 1px 2px
          `,
        },
        "variant-4": {
          boxShadow: `
            rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
            rgba(0, 0, 0, 0.08) 0px 0px 0px 1px
          `,
        },
        "variant-5": {
          boxShadow: `
            rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, 
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px
          `,
        },
        "variant-6": {
          boxShadow: `
            hsla(212, 10%, 27%, .9) 0px 20px 30px -10px
          `,
        },
      }[props.store.lightWindowStyle] || {},
    );
  } else {
    styles.push(
      {
        none: {},
        "variant-1": {
          boxShadow: `
                  0 0 0px 1px rgba(4, 4, 4, ${props.store.windowShadows / 100}),
                  inset 0 0 0 1px rgba(255,255,255,${props.store.windowHighlights / 100}),
                  0 0 18px 1px rgba(0,0,0,.6)
                `,
        },
        "variant-2": {
          boxShadow: `
                  0px 0px 0px 1px rgba(4, 4, 4, ${props.store.windowShadows / 100}),
                  inset 0 1px 0 rgba(255,255,255,${props.store.windowHighlights / 100}),
                  0px 0px 18px 1px rgba(0,0,0,.6)
                `,
        },
        "variant-3": {
          boxShadow: `
                  0 0 0px 1px rgba(4, 4, 4, ${props.store.windowShadows / 100}),
                  0 0 18px 1px rgba(0,0,0,.6)
                `,
        },
        "variant-4": {},
        "variant-5": {},
      }[props.store.windowStyle] || {},
    );
  }

  if (props.mode === "preview") {
    styles.push({
      backgroundColor: "white",
      boxShadow: (() => {
        const hsl = backdrop.value.shadow?.slice(4).replace(/\)$/, "");
        return backdrop.value.shadow
          ? `
                0 0 0 1px rgba(0,0,0,.1),
              0px 4px 12px -2px hsla(${hsl},0.2), 
              0px 10px 18px -4px hsla(${hsl},0.2), 
              0px 40px 44px -16px hsla(${hsl},0.5)  
            `
          : "";
      })(),
    });
  }

  return styles;
});
</script>

<template>
  <div
    class="relative grid h-full grid-rows-[auto_1fr_auto]"
    :class="{
      'is-light-theme': isLightTheme,
    }"
    :style="style"
  >
    <template v-if="store.windowStyle === 'variant-4' && store.showWindow">
      <div
        :style="{ top: `${-store.paddingY}px`, bottom: `${-store.paddingY}px` }"
        class="absolute -left-px z-40 w-px bg-[#282828] mix-blend-luminosity" />
      <div
        :style="{ top: `${-store.paddingY}px`, bottom: `${-store.paddingY}px` }"
        class="absolute -right-px z-40 w-px bg-[#282828] mix-blend-luminosity" />
      <div
        :style="{ left: `${-store.paddingX}px`, right: `${-store.paddingX}px` }"
        class="absolute -top-px z-40 h-px bg-[#282828] mix-blend-luminosity" />
      <div
        :style="{ left: `${-store.paddingX}px`, right: `${-store.paddingX}px` }"
        class="absolute -bottom-px z-40 h-px bg-[#282828] mix-blend-luminosity"
    /></template>

    <template v-if="store.windowStyle === 'variant-5' && store.showWindow">
      <div
        class="pointer-events-none absolute inset-0 z-40 border border-blue-700"
      />
      <div
        class="absolute -left-1 -top-1 z-40 size-2 border border-blue-700 bg-white"
      />
      <div
        class="absolute -right-1 -top-1 z-40 size-2 border border-blue-700 bg-white"
      />
      <div
        class="absolute -bottom-1 -left-1 z-40 size-2 border border-blue-700 bg-white"
      />
      <div
        class="absolute -bottom-1 -right-1 z-40 size-2 border border-blue-700 bg-white"
      />
    </template>
    <slot />
  </div>
</template>
