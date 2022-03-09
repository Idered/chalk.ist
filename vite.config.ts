import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monaco from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monaco({
      languageWorkers: [
        "typescript",
        "css",
        "html",
        "json",
        "editorWorkerService",
      ],
    }),
  ],
});
