import { ViteSSGContext } from "vite-ssg";

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install = ({ isClient, router }: ViteSSGContext) => {
  if (!isClient) return;

  router.isReady().then(async () => {
    // @ts-ignore
    const { registerSW } = await import("virtual:pwa-register");
    registerSW({ immediate: true });
  });
};
