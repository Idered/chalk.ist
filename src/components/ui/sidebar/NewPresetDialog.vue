<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
import { ref } from "vue";
import { usePresetsStore } from "~/lib/presets";
import { store } from "~/lib/store";

const presetsStore = usePresetsStore();
const newPresetName = ref("");
const isDialogOpen = ref(false);

const createNewPreset = () => {
  presetsStore.createPreset(newPresetName.value, store.value);
  newPresetName.value = "";
  isDialogOpen.value = false;
};
</script>

<template>
  <DialogRoot v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="data-[state=open]:animate-overlayShow fixed inset-0 z-30 bg-black/60 backdrop-blur-[3px]"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md border border-slate-700 bg-slate-900 px-6 py-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <DialogTitle class="font-semibold text-slate-100">
          Create New Preset
        </DialogTitle>

        <DialogDescription class="sr-only">
          Create a new preset with your current settings.
        </DialogDescription>
        <form @submit.prevent="createNewPreset">
          <fieldset class="mt-4 grid gap-1">
            <label class="whitespace-nowrap text-sm" for="presetName">
              Preset name
            </label>
            <Input
              id="presetName"
              v-model="newPresetName"
              class="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-800 text-sm outline-none"
            />
          </fieldset>

          <div class="mt-[25px] flex justify-end">
            <Button
              type="submit"
              class="h-8 rounded bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create
            </Button>
          </div>
        </form>

        <DialogClose
          class="absolute right-4 top-4 inline-flex h-5 w-5 appearance-none items-center justify-center rounded-full text-slate-400 hover:text-slate-50 focus:outline-none"
          aria-label="Close"
        >
          <i-ph:x />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
