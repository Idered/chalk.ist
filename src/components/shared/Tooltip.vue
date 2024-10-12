<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "radix-vue";

defineProps<{
  content: string;
}>();
</script>

<template>
  <TooltipProvider>
    <TooltipRoot :delay-duration="0">
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          as-child
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-slate-200 text-xs select-none rounded-[4px] bg-zinc-800 px-4 py-2 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
          :side-offset="5"
        >
          <div>
            {{ content }} <TooltipArrow class="fill-zinc-800" size="8" />
          </div>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
