<script setup lang="ts">
import { computed } from "vue";
import { Backdrops } from "~/lib/backdrops";
import type { Store } from "~/lib/store";

const props = defineProps<{
  mode: "preview" | "edit";
  store: Store;
}>();

const backdrop = computed(() => Backdrops[props.store.backdrop]);

const enableAppStyle = computed(() => {
  return ["variant-1", "variant-2", "variant-3"].includes(
    props.store.windowStyle,
  );
});
</script>

<template>
  <div
    class="relative grid h-full grid-rows-[auto_1fr_auto]"
    :style="
      !store.showWindow
        ? []
        : [
            enableAppStyle
              ? {
                  borderRadius: `${store.windowBorderRadius}px`,
                  backgroundColor: `rgba(15, 15, 15, ${
                    store.windowBackgroundOpacity / 100
                  })`,
                  backgroundImage: store.windowNoise
                    ? 'url(/noise.png)'
                    : undefined,
                  backgroundSize: '182px',
                }
              : {},
            {
              none: '',
              'variant-1': {
                boxShadow: `
                0 0 0px 1px rgba(4, 4, 4, ${store.windowShadows / 100}),
                inset 0 0 0 1px rgba(255,255,255,${store.windowHighlights / 100}),
                0 0 18px 1px rgba(0,0,0,.6)
              `,
              },
              'variant-2': {
                boxShadow: `
                0px 0px 0px 1px rgba(4, 4, 4, ${store.windowShadows / 100}),
                inset 0 1px 0 rgba(255,255,255,${store.windowHighlights / 100}),
                0px 0px 18px 1px rgba(0,0,0,.6)
              `,
              },
              'variant-3': {
                boxShadow: `
                0 0 0px 1px rgba(4, 4, 4, ${store.windowShadows / 100}),
                0 0 18px 1px rgba(0,0,0,.6)
              `,
              },
              'variant-4': {},
              'variant-5': {},
            }[store.windowStyle] || {},

            mode === 'preview'
              ? {
                  backgroundColor: 'white',
                  boxShadow: (() => {
                    const hsl = backdrop.shadow?.slice(4).replace(/\)$/, '');
                    return backdrop.shadow
                      ? `
                  0 0 0 1px rgba(0,0,0,.1),
                0px 4px 12px -2px hsla(${hsl},0.2), 
                0px 10px 18px -4px hsla(${hsl},0.2), 
                0px 40px 44px -16px hsla(${hsl},0.5)  
              `
                      : '';
                  })(),
                }
              : {},
          ]
    "
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
