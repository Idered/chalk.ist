<script setup lang="ts">
import { onKeyStroke, useMagicKeys, whenever } from "@vueuse/core";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  RadioGroupRoot,
  RadioGroupItem,
  MenubarRoot,
  MenubarTrigger,
} from "radix-vue";
import { ref } from "vue";
import { addEditorBlock, addMarkdownBlock, getCodeBlocks } from "~/lib/block";
import { BlockType } from "~/lib/enums";
import { copyPngToClipboard, downloadPNG } from "~/lib/export";
import { state } from "~/lib/state";
import { persistentState } from "~/lib/persistent-state";

const currentMenu = ref("");
const keys = useMagicKeys();
// const isFirefox = computed(() => {
//   return navigator.userAgent.toLowerCase().includes("firefox");
// });

onKeyStroke(".", (e) => {
  if (e.metaKey) {
    e.preventDefault();
    persistentState.value.showUI = !persistentState.value.showUI;
  }
});

whenever(() => keys.ctrl_e.value && !keys.current.has("shift"), addEditorBlock);
whenever(keys.ctrl_shift_e, addMarkdownBlock);

function clearLineDecorations() {
  persistentState.value.blocks.forEach((item) => {
    if (item.type !== BlockType.Code) {
      return;
    }

    item.transformations = [];
  });
}
</script>
©
<template>
  <div>
    <MenubarRoot
      v-model="currentMenu"
      class="flex items-center overflow-auto border-b border-b-zinc-800 bg-zinc-900 pwa:sm:border-t pwa:sm:border-t-black pwa:sm:shadow-[inset_0_1px_0_rgb(39_39_42)]"
    >
      <MenubarMenu value="help" v-if="state.editMode === 'code'">
        <MenubarTrigger class="menubar-trigger">
          Chalk
          <i-radix-icons:chevron-down class="ml-1 size-3" />
        </MenubarTrigger>

        <MenubarPortal>
          <MenubarContent
            class="menubar-content"
            :side-offset="8"
            :align-offset="8"
          >
            <MenubarItem
              as="a"
              class="menubar-item group"
              href="https://x.com/Idered"
            >
              <i-fa6-brands:x-twitter class="mr-2 size-4" />
              Follow on X
            </MenubarItem>
            <MenubarItem
              as="a"
              class="menubar-item group"
              href="https://github.com/Idered/chalk.ist"
            >
              <i-fa6-brands:github class="mr-2 size-4" />
              View source on GitHub
            </MenubarItem>
            <MenubarItem
              as="a"
              class="menubar-item group"
              href="https://www.buymeacoffee.com/idered"
            >
              <i-ph:coffee class="mr-2 size-4" />
              Buy me a coffee
            </MenubarItem>
            <!-- <MenubarSeparator class="h-[1px] bg-green6 m-[5px]" /> -->
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>

      <MenubarMenu value="blocks" v-if="state.editMode === 'code'">
        <MenubarTrigger class="menubar-trigger hidden sm:flex">
          <span>Blocks</span>
          <i-radix-icons:chevron-down class="ml-1 size-3" />
        </MenubarTrigger>
        <MenubarPortal>
          <MenubarContent class="menubar-content" :side-offset="8">
            <MenubarItem class="menubar-item group" @click="addEditorBlock">
              Add Code Block
              <div class="menubar-item-shortcut">⌃ E</div>
            </MenubarItem>
            <MenubarItem class="menubar-item group" @click="addMarkdownBlock">
              Add Markdown Block
              <div class="menubar-item-shortcut">⇧ ⌃ E</div>
            </MenubarItem>
            <!-- <MenubarSeparator class="h-[1px] bg-green6 m-[5px]" /> -->
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>

      <MenubarMenu value="line decorations" v-if="state.editMode === 'code'">
        <MenubarTrigger class="menubar-trigger">
          <span class="hidden sm:block">Line decorations</span>
          <span class="sm:hidden">Decorations</span>
          <i-radix-icons:chevron-down class="ml-1 size-3" />
        </MenubarTrigger>

        <MenubarPortal>
          <MenubarContent class="menubar-content" :side-offset="8">
            <MenubarItem
              class="menubar-item group"
              @click="state.editMode = 'highlight'"
            >
              Highlight
              <!-- <div class="menubar-item-shortcut">⌘ E</div> -->
            </MenubarItem>
            <MenubarItem
              class="menubar-item group"
              @click="state.editMode = 'focus'"
            >
              Focus
              <!-- <div class="menubar-item-shortcut">⇧ ⌘ E</div> -->
            </MenubarItem>
            <MenubarItem
              class="menubar-item group"
              @click="state.editMode = 'add'"
            >
              Diff: Add
              <!-- <div class="menubar-item-shortcut">⇧ ⌘ E</div> -->
            </MenubarItem>
            <MenubarItem
              class="menubar-item group"
              @click="state.editMode = 'remove'"
            >
              Diff: Remove
              <!-- <div class="menubar-item-shortcut">⇧ ⌘ E</div> -->
            </MenubarItem>
            <MenubarItem
              class="menubar-item group"
              @click="clearLineDecorations"
              :disabled="
                getCodeBlocks().every(
                  (item) => item.transformations.length === 0,
                )
              "
            >
              Clear all line decorations
            </MenubarItem>
            <!-- <MenubarSeparator class="h-[1px] bg-green6 m-[5px]" /> -->
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>

      <MenubarMenu value="export" v-if="state.editMode === 'code'">
        <MenubarTrigger class="menubar-trigger text-white">
          <div
            v-if="persistentState.lastCopyMethod === 'copy_png'"
            :tabindex="0"
            @pointerdown.stop.prevent="copyPngToClipboard"
            class="-ml-1 mr-2 flex size-8 items-center justify-center rounded hover:bg-slate-700"
          >
            <i-radix-icons:clipboard class="size-4" />
          </div>
          <div
            v-if="persistentState.lastCopyMethod === 'download_png'"
            :tabindex="0"
            @pointerdown.stop.prevent="downloadPNG"
            class="-ml-1 mr-2 flex size-8 items-center justify-center rounded hover:bg-slate-700"
          >
            <i-radix-icons:download class="size-4" />
          </div>
          <span>Export</span>
          <i-radix-icons:chevron-down class="ml-1 size-3" />
        </MenubarTrigger>

        <MenubarPortal>
          <MenubarContent class="menubar-content" :side-offset="8">
            <MenubarItem class="menubar-item" @click="copyPngToClipboard">
              <i-radix-icons:clipboard class="mr-2 size-4" />
              <span>Copy Image</span>
            </MenubarItem>
            <MenubarItem class="menubar-item" @click="downloadPNG">
              <i-radix-icons:download class="mr-2 size-4" />
              <span>Download PNG</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>

      <RadioGroupRoot
        class="flex"
        v-model="state.editMode"
        v-if="state.editMode !== 'code'"
      >
        <RadioGroupItem value="highlight" class="menubar-item-radio">
          Highlight
        </RadioGroupItem>
        <RadioGroupItem value="focus" class="menubar-item-radio">
          Focus
        </RadioGroupItem>
        <RadioGroupItem value="add" class="menubar-item-radio">
          Diff: Add
        </RadioGroupItem>
        <RadioGroupItem value="remove" class="menubar-item-radio">
          Diff: Remove
        </RadioGroupItem>
      </RadioGroupRoot>

      <button
        v-if="state.editMode !== 'code'"
        class="menubar-trigger group cursor-pointer"
        @click="clearLineDecorations"
        :disabled="
          getCodeBlocks().every((item) => item.transformations.length === 0)
        "
      >
        Clear
      </button>

      <Button
        v-if="state.editMode !== 'code'"
        @click="state.editMode = 'code'"
        class="ml-4 h-8 bg-blue-700 px-4 text-white"
      >
        Done
      </Button>

      <!-- <div
        class="ml-auto hidden items-center space-x-2 pr-2 lg:flex"
        v-if="state.editMode === 'code'"
      >
        <ExportToClipboardButton class="h-8" />
        <ExportToPNGButton class="h-8" />
      </div> -->
    </MenubarRoot>
  </div>
</template>
