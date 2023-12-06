// register vue composition api globally
import { ViteSSG } from "vite-ssg";
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import App from "~/App.vue";
import "./style.css";

import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";

import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/700.css";

import "@fontsource/source-code-pro/400.css";
import "@fontsource/source-code-pro/700.css";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/700.css";

import "./fonts/nova.css";

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  // install all modules under `modules/`
  Object.values(
    import.meta.glob("./modules/*.ts", {
      eager: true,
    })
  ).forEach((i: any) => i.install?.(ctx));
});
