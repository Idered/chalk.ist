<script setup lang="ts">
import { store } from "~/lib/store";
import { ExportState, WindowControls } from "~/lib/enums";
import { CodeBlock } from "~/types";
import { state } from "~/lib/state";

defineProps<{
  block: CodeBlock;
}>();
</script>

<template>
  <div
    v-if="state.supported.windowTitle"
    class="grid grid-cols-[62px_auto_62px] items-center px-5"
    :class="{
      'grid-cols-[62px_auto_62px]':
        store.windowControls !== WindowControls.Windows,
      '-mx-5 grid-cols-[auto_124px]':
        store.windowControls === WindowControls.Windows,
    }"
  >
    <template v-if="store.showWindow">
      <div
        class="grid grid-flow-col justify-start gap-x-2 pt-4"
        v-if="store.windowControls === WindowControls.MacColor"
      >
        <div class="h-3 w-3 rounded-full bg-[#EC6A5E]"></div>
        <div class="h-3 w-3 rounded-full bg-[#F3BF4F]"></div>
        <div class="h-3 w-3 rounded-full bg-[#61C554]"></div>
      </div>

      <div
        class="grid grid-flow-col justify-start gap-x-2 pt-4"
        v-if="store.windowControls === WindowControls.MacGray"
      >
        <div
          v-for="_i in [1, 2, 3]"
          class="h-3 w-3 rounded-full"
          :class="{
            'bg-white/25': block.mode === 'edit',
            'bg-black/25': block.mode === 'preview',
          }"
        />
      </div>

      <div
        class="grid grid-flow-col justify-start gap-x-2 pt-4"
        v-if="store.windowControls === WindowControls.MacOutline"
      >
        <div
          v-for="_i in [1, 2, 3]"
          class="h-3 w-3 rounded-full border"
          :class="{
            'border-white/25': block.mode === 'edit',
            'border-black/25': block.mode === 'preview',
          }"
        />
      </div>

      <div v-if="store.windowControls === WindowControls.None"></div>
    </template>

    <div v-else></div>

    <div
      class="mt-4 flex items-center"
      :class="{
        'justify-center': store.windowControls !== WindowControls.Windows,
        'pl-5': store.windowControls === WindowControls.Windows,
      }"
      v-if="
        [ExportState.Idle, ExportState.JustCopied].includes(
          state.exportState,
        ) ||
        block.title.trim() ||
        block.icon
      "
    >
      <IconPicker
        v-if="
          [ExportState.Idle, ExportState.JustCopied].includes(
            state.exportState,
          ) || block.icon
        "
        v-model="block.icon"
      />

      <div
        v-if="
          [ExportState.Idle, ExportState.JustCopied].includes(state.exportState)
        "
        contenteditable
        @blur="
          block.title = ($event.target as HTMLInputElement).textContent || ''
        "
        spellcheck="false"
        autocomplete="off"
        data-placeholder="Untitled..."
        :class="{
          // 'text-white/60 placeholder:text-white/30 ': theme.mode === 'dark',
          // 'text-black/60 placeholder:text-black/30': theme.mode === 'light',
          'text-center': store.windowControls !== WindowControls.Windows,
        }"
        v-text="block.title"
        class="z-10 inline-flex h-4 min-w-[0] shrink-0 border-none bg-transparent px-2 text-xs leading-4 after:inline-flex after:cursor-text empty:after:content-[attr(data-placeholder)] focus:outline-none"
      />
      <div
        v-else-if="block.title.trim()"
        class="z-10 inline-flex h-4 min-w-[0] shrink-0 whitespace-nowrap border-none bg-transparent px-2 text-xs leading-4"
        v-text="block.title"
      />
    </div>
    <div v-else></div>

    <div
      class="grid grid-flow-col justify-end"
      v-if="store.windowControls === WindowControls.Windows"
      :class="{
        'text-white': block.mode === 'edit',
        'text-black': block.mode === 'preview',
      }"
    >
      <div class="flex h-8 w-10 items-center justify-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="5"
            width="10"
            height="1"
            fill="currentColor"
            fill-opacity="0.5"
          />
        </svg>
      </div>

      <div class="flex h-8 w-10 items-center justify-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 1H9V7H8V8H10V0H2V2H3V1Z"
            fill="currentColor"
            fill-opacity="0.5"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2.00002H8V10H0V2.00002ZM7 3.00002H1V9.00002H7V3.00002Z"
            fill="currentColor"
            fill-opacity="0.5"
          />
        </svg>
      </div>

      <div class="flex h-8 w-11 items-center justify-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.14645 4.85355L0 0.707107L0.707107 0L4.85355 4.14645L9 0L9.70711 0.707107L5.56066 4.85355L9.70711 9L9 9.70711L4.85355 5.56066L0.707107 9.70711L0 9L4.14645 4.85355Z"
            fill="currentColor"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
