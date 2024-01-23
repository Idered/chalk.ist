import { createPinia } from "pinia";
import { ViteSSGContext } from "vite-ssg";

const pinia = createPinia();

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install = ({ isClient, app }: ViteSSGContext) => {
  if (!isClient) return;

  app.use(pinia);
};
