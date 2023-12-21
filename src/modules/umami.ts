import type { ViteSSGContext } from "vite-ssg";

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install = ({ isClient, router }: ViteSSGContext) => {
  if (!isClient) return;
  const umamiMock = function () {};
  umamiMock.trackEvent = function () {};
  umamiMock.trackPageView = function () {};
  window.umami = window.umami || umamiMock;
};
