import Vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";

export const r = (...args: string[]) => resolve(__dirname, ...args);
export const isDev = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    {
      name: "html-transform",
      transformIndexHtml(html) {
        if (mode !== "production") return html;

        return html.replace(
          "<!-- %UMAMI% -->",
          `<script async defer data-website-id="74b418ca-7be5-48a9-8947-d62340be88cc" src="https://umami.kasper.io/umami.js" ></script>`,
        );
      },
    },

    Components({
      dirs: [r("src/components")],
      // generate `components.d.ts` for ts support with Volar
      dts: r("src/components.d.ts"),
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: "",
        }),
      ],
    }),

    Icons(),

    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"],
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      },
      includeAssets: ["og-image.jpg", "robots.txt", "favicon.ico"],
      manifest: {
        name: "Chalk",
        short_name: "Chalk",
        theme_color: "#18181b",
        background_color: "#18181b",
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
}));
