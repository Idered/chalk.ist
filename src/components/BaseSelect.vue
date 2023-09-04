<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";
import { useWindowSize } from "@vueuse/core";
import { computed, PropType, ref, watch } from "vue";
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
  previewOnFocus: {
    type: Boolean,
    default: false,
  },
  label: {
    type: Function as PropType<(option: Option) => string>,
    default: (option: Option) => option.label,
  },
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<(Option & OptionGroup)[] | Option[] | OptionGroup[]>,
    default: () => [],
    required: true,
  },
});

const dropdown = ref<HTMLElement>();
const activeIndex = ref(-1);
const search = ref("");
const isOpen = ref(false);
const isFocused = ref(false);
const { height: windowHeight } = useWindowSize();
const flatOptions = computed(() => {
  return props.options.flatMap((option) => {
    if ("group" in option) {
      return option.children;
    }
    return option;
  });
});
const maxHeight = computed(() => {
  if (!isOpen.value || !dropdown.value) return "down";
  const difference = windowHeight.value - (dropdown.value.getBoundingClientRect().bottom || 0);
  return difference < 0 ? dropdown.value.clientHeight + difference - 16 : "up";
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
const originalValue = ref("");
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
  originalValue.value = props.modelValue;
}

function close() {
  activeIndex.value = -1;
  isOpen.value = false;
  isFocused.value = false;
  search.value = "";
}

function handleSelect(option: Option) {
  originalValue.value = option.value;
  emit("update:modelValue", option.value);
  close();
}

const value = computed(() => {
  if (isFocused.value) return search.value;
  if (selected.value) return props.label(selected.value);
  return "";
});

watch(activeIndex, (index) => {
  if (!isOpen.value || !props.previewOnFocus) return;
  // if (results.value[index]?.item.type === "divider") return;
  // if (results.value[index]?.item.onSelect) return;
  if (results.value[index]) {
    emit("update:modelValue", results.value[index]?.item.value);
  } else {
    emit("update:modelValue", originalValue.value);
  }
});
</script>

<template>
  <OnClickOutside @trigger="close">
    <div class="relative font-mono" @keyup.esc="close">
      <BaseInput
        role="combobox"
        :id="id"
        :aria-expanded="isOpen"
        type="text"
        :readonly="!isOpen"
        :disabled="disabled"
        @click="open"
        @keydown="
          (e) => {
            if (!isOpen && !['Enter', 'ArrowDown', 'ArrowUp', 'Space'].includes(e.code)) {
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
                activeIndex = activeIndex + 1 < results.length ? activeIndex + 1 : 0;
                break;
              case 'ArrowUp':
                activeIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : results.length - 1;
                break;
              case 'Enter':
                if (activeIndex > -1) {
                  originalValue = results[activeIndex].item.value;
                  $emit('update:modelValue', results[activeIndex].item.value);
                } else if (results.length) {
                  originalValue = results[0].item.value;
                  $emit('update:modelValue', results[0].item.value);
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
        :model-value="value"
        @update:model-value="search = $event"
        :placeholder="isFocused ? 'Search' : selected?.label"
        :class="{
          'opacity-50 cursor-not-allowed': disabled,
          'bg-slate-900': isFocused,
          'cursor-pointer bg-slate-800 shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]': !isFocused,
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

      <transition appear>
        <div
          ref="dropdown"
          v-if="isOpen"
          class="absolute z-10 grid overflow-auto top-full translate-y-2 p-1 border border-slate-700 bg-slate-800 rounded-md w-full shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]"
          :style="{
            maxHeight: `${maxHeight}px`,
          }"
          @mouseleave="
            () => {
              activeIndex = -1;
            }
          "
        >
          <div
            v-for="(result, i) in results"
            @click="handleSelect(result.item)"
            class="text-xs font-medium px-2 h-6 pl-6 grid items-center cursor-pointer transition-colors relative"
            :class="{
              'text-white': i === activeIndex,
            }"
            @mouseenter="activeIndex = i"
          >
            <IconCheck width="12" class="absolute left-2" v-if="modelValue === result.item.value" />
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
