<template>
  <OnClickOutside @trigger="isOpen = false">
    <div class="relative font-mono" @keyup.esc="isOpen = false">
      <div class="relative">
        <input
          type="text"
          class="border font-mono border-slate-700 rounded-md transition focus:outline-none px-2 py-1 text-[13px] w-full"
          @focus="
            () => {
              activeIndex = 0;
              isOpen = true;
              isFocused = true;
            }
          "
          @keydown.tab="
            () => {
              isOpen = false;
              isFocused = false;
              search = '';
            }
          "
          @blur="
            () => {
              isFocused = false;
              search = '';
            }
          "
          @keydown.enter="(e) => {
            $emit('update:modelValue', results[activeIndex].item.value);
            isOpen = false;
            (e.target as HTMLInputElement).blur();
          }"
          @keydown.up.prevent="
            () => {
              activeIndex =
                activeIndex - 1 >= 0 ? activeIndex - 1 : options.length - 1;
            }
          "
          @keydown.down.prevent="
            () => {
              activeIndex =
                activeIndex + 1 < options.length ? activeIndex + 1 : 0;
            }
          "
          @keyup.esc="($event.target as HTMLInputElement).blur()"
          v-model.trim="search"
          :placeholder="isFocused ? 'Search' : selected?.label"
          :class="{
            'bg-slate-900': isFocused,
            'cursor-pointer bg-slate-800 shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]':
              !isFocused,
            'placeholder-slate-600/50': isFocused,
          }"
        />
        <IconChevronDown
          height="12"
          class="pointer-events-none absolute right-2 top-1/2 -mt-[6px] transition-transform"
          :class="{
            'rotate-180': !isFocused,
          }"
        />
      </div>

      <transition appear>
        <div
          v-if="isOpen"
          class="absolute top-full p-1 border border-slate-700 bg-slate-800 rounded-md w-full translate-y-2 shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]"
        >
          <div
            v-for="(result, i) in results"
            @click="handleSelect(result.item)"
            class="text-xs font-medium px-2 h-6 grid items-center cursor-pointer transition-colors"
            :class="{
              'text-white': i === activeIndex,
              'bg-white/10 text-white rounded':
                result.item.value === modelValue,
            }"
            @mouseenter="activeIndex = i"
          >
            {{ result.item.label }}
          </div>
          <div
            v-if="results.length === 0"
            class="text-xs font-medium px-2 h-6 grid items-center hover:text-white cursor-pointer transition-colors"
          >
            No results
          </div>
        </div>
      </transition>
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";
import { computed, PropType, ref, watchEffect } from "vue";
import IconChevronDown from "./IconChevronDown.vue";
import { useFuse } from "@vueuse/integrations/useFuse";

type Option = {
  value: string;
  label: string;
};

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
    required: true,
  },
});

const activeIndex = ref(0);
const search = ref("");
const isOpen = ref(false);
const isFocused = ref(false);
const selected = computed(() => {
  return props.options.find((option) => option.value === props.modelValue);
});
const { results } = useFuse(search, props.options, {
  matchAllWhenSearchEmpty: true,
  fuseOptions: {
    keys: ["label"],
  },
});

watchEffect(() => {
  if (results.value.length - 1 < activeIndex.value) {
    activeIndex.value = results.value.length - 1;
  }
});

function handleSelect(option: Option) {
  emit("update:modelValue", option.value);
  isOpen.value = false;
  search.value = "";
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.325s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
