<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";
import { ComponentPublicInstance, computed, nextTick, PropType, ref, watch } from "vue";
import IconChevronDown from "./IconChevronDown.vue";
import { useFuse } from "@vueuse/integrations/useFuse";
import IconCheck from "./IconCheck.vue";
import BaseInput from "./BaseInput.vue";
import { PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "radix-vue";

type Option = {
  value: string | number;
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
  useOpaqueBackground: {
    type: Boolean,
    default: false,
  },
  label: {
    type: Function as PropType<(option: Option) => string>,
    default: (option: Option) => option.label,
  },
  container: {
    type: HTMLElement as PropType<HTMLElement>,
    default: null,
  },
  modelValue: {
    type: [String, Number],
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

const activeIndex = ref(-1);
const inputRef = ref<ComponentPublicInstance<typeof BaseInput>>();
const search = ref("");
const isOpen = ref(false);
const isFocused = ref(false);
const originalValue = ref<string | number>("");

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

const value = computed(() => {
  if (isFocused.value) return search.value;
  if (selected.value) return props.label(selected.value);
  return "";
});

const { results } = useFuse(search, flatOptions, {
  matchAllWhenSearchEmpty: true,
  fuseOptions: {
    keys: ["label"],
  },
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

async function open() {
  activeIndex.value = -1;
  isOpen.value = true;
  isFocused.value = true;
  originalValue.value = props.modelValue;
  await nextTick();
  inputRef.value?.$el.focus?.();
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

function handleKeyDown(e: KeyboardEvent) {
  if (!isOpen.value && !["Enter", "ArrowDown", "ArrowUp", "Space"].includes(e.code)) {
    return;
  }
  if (!isOpen.value && e.code !== "Tab") {
    e.preventDefault();
    return open();
  }
  switch (e.code) {
    case "Tab":
      return close();
    case "ArrowDown":
      activeIndex.value = activeIndex.value + 1 < results.value.length ? activeIndex.value + 1 : 0;
      break;
    case "ArrowUp":
      activeIndex.value = activeIndex.value - 1 >= 0 ? activeIndex.value - 1 : results.value.length - 1;
      break;
    case "Enter":
      if (activeIndex.value > -1) {
        originalValue.value = results.value[activeIndex.value].item.value;
        emit("update:modelValue", results.value[activeIndex.value].item.value);
      } else if (results.value.length) {
        originalValue.value = results.value[0].item.value;
        emit("update:modelValue", results.value[0].item.value);
      }
      return close();
    case "Escape":
      return close();
    default:
      break;
  }
}
</script>

<template>
  <OnClickOutside @trigger="close">
    <PopoverRoot
      :open="isOpen"
      @update:open="(value: boolean) => {
        if (value) {
          open();
        } else {
          close();
        }
      }"
    >
      <PopoverTrigger class="relative" tabindex="-1">
        <BaseInput
          :aria-expanded="isOpen"
          :disabled="disabled"
          :id="id"
          :model-value="value"
          :placeholder="isFocused ? 'Search' : selected?.label"
          :readonly="!isOpen"
          @keydown="handleKeyDown"
          @keyup.esc="close"
          @update:model-value="search = $event"
          role="combobox"
          type="text"
          ref="inputRef"
          class="truncate"
          :class="
            useOpaqueBackground
              ? {
                  'opacity-50 cursor-not-allowed': disabled,
                  'bg-slate-900': isFocused,
                  'cursor-pointer bg-slate-800/60 shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]':
                    !isFocused,
                  'placeholder-slate-600/50': isFocused,
                }
              : {
                  'opacity-50 cursor-not-allowed': disabled,
                  'bg-slate-900  placeholder-slate-600/50': isFocused,
                  'cursor-pointer text-right pr-6 bg-transparent hover:bg-slate-800 border-opacity-0 hover:shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]':
                    !isFocused,
                }
          "
        />

        <IconChevronDown
          height="12"
          class="pointer-events-none absolute right-2 top-1/2 -mt-[6px] transition-transform"
          :class="{
            'rotate-180': isFocused,
          }"
        />
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent class="z-50 relative translate-y-2" align="end">
          <transition appear>
            <div
              class="grid overflow-auto font-mono p-1 border border-slate-700 bg-slate-800 rounded-md shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] min-w-[var(--radix-popper-anchor-width)] max-h-[calc(var(--radix-popover-content-available-height)-16px)]"
              @mouseleave="
                () => {
                  activeIndex = -1;
                }
              "
            >
              <div
                v-for="(result, i) in results"
                :key="result.item.value"
                @click="handleSelect(result.item)"
                class="text-xs font-medium px-2 h-6 pl-6 grid items-center cursor-pointer transition-colors relative"
                :class="{
                  'text-white': i === activeIndex,
                }"
                @mouseenter="activeIndex = i"
              >
                <IconCheck width="12" class="absolute left-2" v-if="modelValue === result.item.value" />
                <span class="whitespace-nowrap">{{ result.item.label }}</span>
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
          <PopoverClose />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
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
