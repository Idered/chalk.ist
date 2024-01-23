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
import { store } from "~/composables/store";
import { useSession } from "~/composables/use-session";
import { BlockType } from "~/enums";
import { FrameRecord } from "~/lib/records/FrameRecord";
import { supabase } from "~/lib/supabase";

const session = useSession();

const currentMenu = ref("");
const keys = useMagicKeys();

whenever(
  () => keys.ctrl_e.value && !keys.current.has("shift"),
  () => FrameRecord.current?.addEditorBlock(),
);

whenever(
  () => keys.ctrl_shift_e,
  () => FrameRecord.current?.addMarkdownBlock(),
);

function clearLineDecorations() {
  FrameRecord.current?.blocks.forEach((item) => {
    if (item.type !== BlockType.Code) {
      return;
    }

    item.transformations = [];
    item.save();
  });
}
</script>
©
<template>
  <MenubarRoot
    v-model="currentMenu"
    class="border-b relative border-b-zinc-800 bg-zinc-900 overflow-auto flex items-center pwa:sm:border-t pwa:sm:border-t-black pwa:sm:shadow-[inset_0_1px_0_rgb(39_39_42)]"
  >
    <MenubarMenu value="file">
      <MenubarTrigger class="menubar-trigger group justify-center min-w-12">
        <div class="w-4 h-4 border-2 rounded-md rotate-12"></div>
        <radix-icons:chevron-down class="ml-1" v-if="session" />
      </MenubarTrigger>

      <MenubarPortal v-if="session">
        <MenubarContent
          class="menubar-content"
          :side-offset="8"
          :align-offset="8"
        >
          <MenubarItem
            class="menubar-item group"
            @click="supabase.auth.signOut()"
          >
            <div class="flex items-center" v-if="session">
              <radix-icons:exit class="w-4 h-4 mr-2 inline-block" />
              Sign out
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>

    <MenubarMenu value="blocks" v-if="store.editMode === 'code'">
      <MenubarTrigger class="menubar-trigger">
        Blocks
        <radix-icons:chevron-down class="ml-1" />
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent class="menubar-content" :side-offset="8">
          <MenubarItem
            class="menubar-item group"
            @click="FrameRecord.current?.addEditorBlock()"
          >
            Add Code Block
            <div class="menubar-item-shortcut">⌃ E</div>
          </MenubarItem>
          <MenubarItem
            class="menubar-item group"
            @click="FrameRecord.current?.addMarkdownBlock()"
          >
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
        <radix-icons:chevron-down class="ml-1" />
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
              FrameRecord.current?.blocks.every(
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
        FrameRecord.current?.blocks.every(
          (item) => item.transformations.length === 0,
        )
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
    <div class="h-px bg-black absolute bottom-0 inset-x-0"></div>

    <div class="flex-1"></div>

    <div class="pr-2 flex space-x-4" v-if="!session">
      <SignInDialog>
        <button class="text-xs">Sign in</button>
      </SignInDialog>
      <SignUpDialog>
        <button class="text-xs bg-blue-700 text-blue-50 px-3 h-7 rounded">
          Sign up
        </button>
      </SignUpDialog>
    </div>
  </MenubarRoot>
</template>
