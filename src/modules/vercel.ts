import { inject } from "@vercel/analytics";

import type { ViteSSGContext } from "vite-ssg";

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install = ({ isClient }: ViteSSGContext) => {
  if (!isClient) return;
  inject();
};
