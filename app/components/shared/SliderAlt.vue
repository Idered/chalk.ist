<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

defineProps<{
  id: string;
  modelValue: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [number];
}>();

const control = ref<HTMLDivElement | null>(null);
const input = ref<HTMLInputElement | null>(null);

if (import.meta.client && !CSS.supports("animation-timeline: scroll()")) {
  const update = () => {
    control.value?.style.setProperty("--value", input.value?.value ?? "0");
  };
  useEventListener(input, "input", update);
  useEventListener(input, "pointerdown", update);
  update();
}
</script>

<template>
  <div class="control" ref="control" :class="{ 'control--disabled': disabled }">
    <input
      :id="id"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      @input="
        emit(
          'update:modelValue',
          Number(($event.target as HTMLInputElement)?.value ?? '0'),
        )
      "
      ref="input"
    />
    <div class="control__track">
      <div class="control__indicator"></div>
    </div>
  </div>
</template>

<style scoped>
/* Source: https://codepen.io/jh3y/pen/oNVwLpK */
.control {
  --height: 20px;
  position: relative;
  display: grid;
  place-items: center;
  margin: 0 auto;
}

.control:focus-within,
.control:hover {
  --active: 1;
}

[type="range"] {
  width: 100%;
  opacity: 0;
  height: var(--height);
}

[type="range"]:hover {
  cursor: -webkit-grab;
}
[type="range"]:active {
  cursor: -webkit-grabbing;
}

[type="range"]:focus-visible {
  outline-offset: 0.25rem;
  outline-color: transparent;
}

[type="range"]::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  height: 120px;
  width: 40px;
  margin-top: 0px;
  opacity: 1;
}
[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 120px;
  background: theme("colors.blue.700");
  margin-top: -20px;
  box-shadow:
    1px 1px 1px #000000,
    0px 0px 1px #0d0d0d;
}
[type="range"]::-moz-range-track {
  height: 120px;
  background: theme("colors.blue.700");
  margin-top: -20px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow:
    1px 1px 1px #000000,
    0px 0px 1px #0d0d0d;
}

@property --value {
  initial-value: 0;
  syntax: "<integer>";
  inherits: true;
}

@keyframes sync {
  to {
    --value: 100;
  }
}

[type="range"] {
  overflow: hidden;
  opacity: 0;
  touch-action: none;
}

.control {
  --speed: 0.65s;
  --update: 0s;
  --timing: linear(
    0,
    0.5007 7.21%,
    0.7803 12.29%,
    0.8883 14.93%,
    0.9724 17.63%,
    1.0343 20.44%,
    1.0754 23.44%,
    1.0898 25.22%,
    1.0984 27.11%,
    1.1014 29.15%,
    1.0989 31.4%,
    1.0854 35.23%,
    1.0196 48.86%,
    1.0043 54.06%,
    0.9956 59.6%,
    0.9925 68.11%,
    1
  );
  timeline-scope: --thumb;
  animation: sync both linear reverse;
  animation-timeline: --thumb;
  animation-range: contain;
}

.control__track {
  pointer-events: none;
  transition: height var(--speed) var(--timing);
}

.control__track::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(var(--value, 0) * 1% - 0.375rem);
  background: theme("colors.blue.700");
  border-radius: 4px;
  transition: width var(--update);
}
.control__track::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: calc((100 - var(--value, 0)) * 1% - 0.375rem);
  background: theme("colors.slate.600");
  opacity: 0.25;
  border-radius: 4px;
  transition: width var(--update);
}
.control__indicator {
  height: 75%;
  border-radius: 4px;
  width: 4px;
  position: absolute;
  top: 50%;
  background: hsl(0 0% 100% / calc((var(--active, 0) * 0.5) + 0.5));
  left: calc(var(--value, 0) * 1%);
  z-index: 2;
  translate: -50% -50%;
  transition: left var(--update);
}

@supports (animation-timeline: scroll()) {
  .control {
    --speed: 0.65s;
    --update: 0.1s;
    --timing: linear(
      0,
      0.5007 7.21%,
      0.7803 12.29%,
      0.8883 14.93%,
      0.9724 17.63%,
      1.0343 20.44%,
      1.0754 23.44%,
      1.0898 25.22%,
      1.0984 27.11%,
      1.1014 29.15%,
      1.0989 31.4%,
      1.0854 35.23%,
      1.0196 48.86%,
      1.0043 54.06%,
      0.9956 59.6%,
      0.9925 68.11%,
      1
    );
    timeline-scope: --thumb;
  }

  [type="range"]::-webkit-slider-thumb {
    view-timeline-name: --thumb;
    view-timeline-axis: inline;
  }
}

.control--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.control--disabled [type="range"] {
  cursor: not-allowed;
}

[type="range"]:disabled {
  cursor: not-allowed;
}

[type="range"]:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}

[type="range"]:disabled::-moz-range-thumb {
  cursor: not-allowed;
}
</style>
