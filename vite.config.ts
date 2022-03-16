import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      },
      manifest: {
        name: "Chalk",
        short_name: "Chalk",
        theme_color: "#0b0b0d",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "@vueuse/head",
      "@vueuse/components",
      "@vueuse/integrations/useFuse",
    ],
    exclude: ["vue-demi"],
  },
});
