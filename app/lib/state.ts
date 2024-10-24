import { computed, reactive } from "vue";
import { ExportState } from "~/lib/enums";
import { WINDOW_STYLES } from "./constants";
import { store } from "./store";
import type { EditMode } from "~/types";

const features = computed(() => {
  return WINDOW_STYLES.find((style) => style.value === store.value.windowStyle)
    ?.features;
});

export const state = reactive({
  exportState: ExportState.Idle,
  isResizingInnerPadding: false,
  editMode: "code" as EditMode,

  get supported() {
    return {
      particles: features.value?.particles !== false,
      reflection: features.value?.reflection !== false,
      windowTitle: features.value?.windowTitle !== false,
    };
  },
});
