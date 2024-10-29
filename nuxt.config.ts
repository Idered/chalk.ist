import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  nitro: {
    routeRules: {
      "/": { prerender: true },
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: false,
      },
    },
  },

  components: {
    dirs: [
      "~/components/shared",
      "~/components/ui/editor",
      "~/components/ui/sidebar",
      "~/components/ui",
      "~/components",
    ],
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/scripts",
  ],

  tailwindcss: {
    viewer: false,
  },

  pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    workbox: {
      navigateFallback: undefined,
      navigateFallbackDenylist: [/^(?!\/$).*/],
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,ico,json,txt,ttf,woff,woff2}",
      ],
    },

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
  },

  app: {
    head: {
      title: "Create beautiful images of your source code",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      meta: [
        {
          name: "description",
          content: "Turn your source code into beautiful images",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Chalk.ist - Create beautiful images of your source code",
        },
        { name: "twitter:domain", content: "https://chalk.ist" },
        { name: "twitter:creator", content: "@idered" },
        { name: "twitter:url", content: "https://chalk.ist" },
        { name: "twitter:image", content: "https://chalk.ist/og-image.jpg" },
        {
          name: "twitter:description",
          content: "Turn your source code into beautiful images",
        },
        {
          property: "og:title",
          content: "Chalk.ist - Create beautiful images of your source code",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://chalk.ist" },
        { property: "og:image", content: "https://chalk.ist/og-image.jpg" },
        {
          property: "og:description",
          content: "Turn your source code into beautiful images",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      htmlAttrs: {
        lang: "en",
        class: "bg-slate-900",
      },
      bodyAttrs: {
        class:
          "font-inter text-slate-500 subpixel-antialiased selection:bg-blue-600/50 selection:text-white",
      },
    },
  },

  scripts: {
    globals: {
      umami: [
        {
          src: "https://umami.chalk.ist/script.js",
          "data-website-id": "e26d67be-7367-4221-9f0d-28a4787bf633",
          crossorigin: false,
        },
        { trigger: "onNuxtReady" },
      ],
    },
  },

  vite: {
    plugins: [
      Components({
        resolvers: [IconsResolver()],
      }),
    ],

    optimizeDeps: {
      include: [
        "@vueuse/core",
        "@vueuse/head",
        "@vueuse/components",
        "@vueuse/integrations/useFuse",
      ],
    },
  },

  css: [
    "~/styles/main.css",
    "~/styles/color-picker.css",
    "~/styles/geist-mono.css",
    "~/styles/nova.css",
    "@fontsource/fira-code/400.css",
    "@fontsource/fira-code/700.css",
    "@fontsource/ibm-plex-mono/400.css",
    "@fontsource/ibm-plex-mono/700.css",
    "@fontsource/inter/400.css",
    "@fontsource/inter/500.css",
    "@fontsource/inter/600.css",
    "@fontsource/inter/700.css",
    "@fontsource/jetbrains-mono/400.css",
    "@fontsource/jetbrains-mono/700.css",
    "@fontsource/source-code-pro/400.css",
    "@fontsource/source-code-pro/700.css",
  ],

  compatibilityDate: "2024-10-23",
});
