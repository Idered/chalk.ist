import { reactive, ref } from "vue";
import { ExportState } from "~/lib/enums";

export const state = reactive({
  exportState: ref(ExportState.Idle),
});
