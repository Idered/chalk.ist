<template>
  <OnClickOutside @trigger="close">
    <div class="relative font-mono" @keyup.esc="close">
      <div class="relative">
        <BaseInput
          role="combobox"
          :id="id"
          :aria-expanded="isOpen"
          type="text"
          :readonly="!isOpen"
          @click="open"
          @keydown="
            (e) => {
              if (
                !isOpen &&
                !['Enter', 'ArrowDown', 'ArrowUp', 'Space'].includes(e.code)
              ) {
                return;
              }
              if (!isOpen && e.code !== 'Tab') {
                e.preventDefault();
                return open();
              }
              switch (e.code) {
                case 'Tab':
                  return close();
                case 'ArrowDown':
                  activeIndex =
                    activeIndex + 1 < results.length ? activeIndex + 1 : 0;
                  break;
                case 'ArrowUp':
                  activeIndex =
                    activeIndex - 1 >= 0 ? activeIndex - 1 : results.length - 1;
                  break;
                case 'Enter':
                  if (activeIndex > -1) {
                    $emit('update:modelValue', results[activeIndex].item.value);
                  }
                  return close();
                case 'Escape':
                  return close();
                default:
                  break;
              }
            }
          "
          @keyup.esc="close"
          v-model="search"
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
          class="absolute z-10 grid top-full p-1 border border-slate-700 bg-slate-800 rounded-md w-full translate-y-2 shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]"
          @mouseleave="
            () => {
              activeIndex = -1;
            }
          "
        >
          <div
            v-for="(result, i) in results"
            @click="handleSelect(result.item)"
            class="text-xs font-medium px-2 h-6 pl-6 grid items-center cursor-pointer transition-colors"
            :class="{
              'text-white': i === activeIndex,
            }"
            @mouseenter="activeIndex = i"
          >
            <IconCheck
              width="12"
              class="absolute left-2"
              v-if="modelValue === result.item.value"
            />
            {{ result.item.label }}
          </div>
          <div
            v-if="!search"
            v-for="item in groups"
            :key="item.group"
            class="text-xs opacity-50 pl-2 font-medium px-2 h-6 grid items-center cursor-pointer transition-colors"
            :style="{
              gridRowStart: item.index,
            }"
          >
            {{ item.group }}
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
import { computed, PropType, ref } from "vue";
import IconChevronDown from "./IconChevronDown.vue";
import { useFuse } from "@vueuse/integrations/useFuse";
import IconCheck from "./IconCheck.vue";
import BaseInput from "./BaseInput.vue";

type Option = {
  value: string;
  label: string;
};

type OptionGroup = {
  group: string;
  children: Option[];
};

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<
      (Option & OptionGroup)[] | Option[] | OptionGroup[]
    >,
    default: () => [],
    required: true,
  },
});

const activeIndex = ref(-1);
const search = ref("");
const isOpen = ref(false);
const isFocused = ref(false);
const flatOptions = computed(() => {
  return props.options.flatMap((option) => {
    if ("group" in option) {
      return option.children;
    }
    return option;
  });
});
const groups = computed(() => {
  let index = 1;
  const result = [] as (OptionGroup & { index: number })[];
  for (const item of props.options) {
    if (!("group" in item)) {
      index++;
      continue;
    }
    result.push({
      index,
      group: item.group,
      children: item.children,
    });
    index += item.children.length + 1;
  }
  return result;
});
const selected = computed(() => {
  return flatOptions.value.find((option) => option.value === props.modelValue);
});
const { results } = useFuse(search, flatOptions, {
  matchAllWhenSearchEmpty: true,
  fuseOptions: {
    keys: ["label"],
  },
});

function open() {
  activeIndex.value = -1;
  isOpen.value = true;
  isFocused.value = true;
}

function close() {
  activeIndex.value = -1;
  isOpen.value = false;
  isFocused.value = false;
  search.value = "";
}

function handleSelect(option: Option) {
  emit("update:modelValue", option.value);
  close();
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
