<script setup lang="ts">
import { twMerge } from "tailwind-merge";

defineProps<{
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "outline";
  is?: string;
}>();
</script>

<template>
  <component
    :is="is || 'button'"
    type="button"
    :class="[
      twMerge(
        'grid grid-flow-col items-center gap-x-3 rounded text-xs font-semibold ring-blue-600/30 transition focus:outline-none focus-visible:ring-[3px]',
        $props.class as string,
      ),
      {
        'h-10': !($attrs.class as string)?.match(/h-\d+/),
        'justify-start': !($attrs.class as string)?.match(/justify-\w+/),
        'bg-blue-600/30 text-blue-500 hover:bg-blue-700/50 active:bg-blue-900/50':
          variant === 'primary',
        'bg-red-600/30 text-red-500 hover:bg-red-600/40': variant === 'danger',
        'bg-yellow-600/30 text-yellow-500 hover:bg-yellow-600/40':
          variant === 'warning',
        'bg-green-600/30 text-green-500 hover:bg-green-600/40':
          variant === 'success',
        'border border-slate-600/30 bg-transparent text-slate-500 hover:bg-slate-700 active:bg-slate-800/50':
          variant === 'outline',
      },
    ]"
  >
    <slot />
  </component>
</template>
