<script setup lang="ts">
import { useMagicKeys, whenever } from "@vueuse/core";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRoot,
  MenubarTrigger,
} from "radix-vue";
import { ref } from "vue";
import {
  addEditorBlock,
  addMarkdownBlock,
  getCodeBlocks,
} from "~/composables/block";
import { store } from "~/composables/store";
import { BlockType } from "~/enums";

const currentMenu = ref("");
const keys = useMagicKeys();

whenever(() => keys.ctrl_e.value && !keys.current.has("shift"), addEditorBlock);
whenever(keys.ctrl_shift_e, addMarkdownBlock);

function clearLineDecorations() {
  store.value.blocks.forEach((item) => {
    if (item.type !== BlockType.Code) {
      return;
    }

    item.transformations = [];
  });
}
</script>
©
<template>
  <MenubarRoot
    v-model="currentMenu"
    class="border-b border-b-zinc-800 bg-zinc-900 overflow-auto flex items-center pwa:sm:border-t pwa:sm:border-t-black pwa:sm:shadow-[inset_0_1px_0_rgb(39_39_42)]"
  >
    <MenubarMenu value="blocks" v-if="store.editMode === 'code'">
      <MenubarTrigger class="menubar-trigger">
        Blocks
        <i-radix-icons:chevron-down class="ml-1" />
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent
          class="menubar-content"
          :side-offset="8"
          :align-offset="8"
        >
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

    <MenubarMenu value="line decorations" v-if="store.editMode === 'code'">
      <MenubarTrigger class="menubar-trigger">
        Line decorations
        <i-radix-icons:chevron-down class="ml-1" />
      </MenubarTrigger>

      <MenubarPortal>
        <MenubarContent class="menubar-content" :side-offset="8">
          <MenubarItem
            class="menubar-item group"
            @click="store.editMode = 'highlight'"
          >
            Highlight
            <!-- <div class="menubar-item-shortcut">⌘ E</div> -->
          </MenubarItem>
          <MenubarItem
            class="menubar-item group"
            @click="store.editMode = 'focus'"
          >
            Focus
            <!-- <div class="menubar-item-shortcut">⇧ ⌘ E</div> -->
          </MenubarItem>
          <MenubarItem
            class="menubar-item group"
            @click="store.editMode = 'add'"
          >
            Diff: Add
            <!-- <div class="menubar-item-shortcut">⇧ ⌘ E</div> -->
          </MenubarItem>
          <MenubarItem
            class="menubar-item group"
            @click="store.editMode = 'remove'"
          >
            Diff: Remove
            <!-- <div class="menubar-item-shortcut">⇧ ⌘ E</div> -->
          </MenubarItem>
          <MenubarItem
            class="menubar-item group"
            @click="clearLineDecorations"
            :disabled="
              getCodeBlocks().every((item) => item.transformations.length === 0)
            "
          >
            Clear all line decorations
          </MenubarItem>
          <!-- <MenubarSeparator class="h-[1px] bg-green6 m-[5px]" /> -->
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>

    <MenubarRadioGroup
      class="flex"
      v-model="store.editMode"
      v-if="store.editMode !== 'code'"
    >
      <MenubarRadioItem value="highlight" class="menubar-item-radio">
        Highlight
      </MenubarRadioItem>
      <MenubarRadioItem value="focus" class="menubar-item-radio">
        Focus
      </MenubarRadioItem>
      <MenubarRadioItem value="add" class="menubar-item-radio">
        Diff: Add
      </MenubarRadioItem>
      <MenubarRadioItem value="remove" class="menubar-item-radio">
        Diff: Remove
      </MenubarRadioItem>
    </MenubarRadioGroup>

    <MenubarItem
      v-if="store.editMode !== 'code'"
      class="menubar-trigger group"
      @click="clearLineDecorations"
      :disabled="
        getCodeBlocks().every((item) => item.transformations.length === 0)
      "
    >
      Clear
    </MenubarItem>

    <BaseButton
      v-if="store.editMode !== 'code'"
      @click="store.editMode = 'code'"
      class="bg-blue-700 text-white px-4 h-8 ml-4"
    >
      Done
    </BaseButton>
  </MenubarRoot>
</template>
