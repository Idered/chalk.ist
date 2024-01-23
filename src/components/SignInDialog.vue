<script setup lang="ts">
import BaseInput from "./BaseInput.vue";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
import { ref } from "vue";
import { z } from "zod";
import { supabase } from "~/lib/supabase";

const email = ref("");
const password = ref("");

function handleSubmit() {
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }).parse({
    email: email.value,
    password: password.value,
  });

  supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <DialogRoot>
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />

      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[360px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-900 border-zinc-800 border p-[25px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-white m-0 font-semibold">
          Sign in
        </DialogTitle>

        <form @submit.prevent="handleSubmit">
          <fieldset class="mt-8 grid gap-1">
            <label class="text-xs" for="email">Email</label>
            <BaseInput id="email" class="h-10" v-model="email" />
          </fieldset>

          <fieldset class="mt-4 grid gap-1">
            <label class="text-xs" for="password">Password</label>
            <BaseInput
              id="password"
              type="password"
              class="h-10"
              v-model="password"
            />
          </fieldset>

          <div class="mt-6 flex justify-end">
            <BaseButton
              type="submit"
              class="h-10 px-8 font-semibold bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Sign in
            </BaseButton>
          </div>
        </form>

        <DialogClose
          class="text-zinc-500 hover:bg-zinc-600 focus:shadow-blue-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <lucide:x />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
