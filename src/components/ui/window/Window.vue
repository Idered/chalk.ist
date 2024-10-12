<script setup lang="ts">
import { computed } from "vue";
import { store } from "~/lib/store";
import { Backdrops } from "~/lib/backdrops";

defineProps<{
  mode: "preview" | "edit";
}>();

const backdrop = computed(() => Backdrops[store.value.backdrop]);
</script>

<template>
  <div
    class="relative grid h-full grid-rows-[auto_1fr_auto]"
    :class="{
      'rounded-md': store.paddingX !== 0 && store.paddingY !== 0,
    }"
    :style="
      !store.showWindow
        ? []
        : [
            {
              backgroundColor: '#03000ADD',
              backgroundImage: store.windowNoise
                ? 'url(/noise.png)'
                : undefined,
              backgroundSize: '182px',
            },
            store.paddingX !== 0 && store.paddingY !== 0
              ? {
                  none: '',
                  'variant-1': {
                    boxShadow: `
                0 0 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
                inset 0 0 0 1px rgba(255,255,255,${backdrop.lightsOpacity}),
                0 0 18px 1px rgba(0,0,0,.6)
              `,
                  },
                  'variant-2': {
                    boxShadow: `
                0px 0px 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
                inset 0 1px 0 rgba(255,255,255,${backdrop.lightsOpacity}),
                0px 0px 18px 1px rgba(0,0,0,.6)
              `,
                  },
                  'variant-3': {
                    boxShadow: `
                0 0 0px 1px rgba(17, 4, 14, ${backdrop.shadowsOpacity}),
                0 0 18px 1px rgba(0,0,0,.6)
              `,
                  },
                  'variant-4': {
                    boxShadow: (() => {
                      const hsl = backdrop.shadow?.slice(4).replace(/\)$/, '');
                      return backdrop.shadow
                        ? `
                  5px 8.5px 3.3px -10px hsla(${hsl}, 0.24),
                  8.7px 14.6px 8.7px -10px hsla(${hsl}, 0.24),
                  12.1px 20.4px 18.2px -10px hsla(${hsl}, 0.30),
                  18.8px 31.6px 36.5px -10px hsla(${hsl}, 0.46),
                  60px 101px 90px -10px hsla(${hsl}, 0.7)
                `
                        : '';
                    })(),
                  },
                  'variant-5': {
                    boxShadow: (() => {
                      const hsl = backdrop.shadow?.slice(4).replace(/\)$/, '');
                      return backdrop.shadow
                        ? `
                0px 4px 12px -2px hsla(${hsl},0.2), 
                0px 10px 18px -4px hsla(${hsl},0.2), 
                0px 40px 44px -16px hsla(${hsl},0.5)  
              `
                        : '';
                    })(),
                  },
                }[store.windowStyle] || {}
              : {},
            backdrop.appStyle || {},
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
    <slot />
  </div>
</template>
