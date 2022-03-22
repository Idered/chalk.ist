import type { UserModule } from "~/types";

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: UserModule = ({ isClient, router }) => {
  if (!isClient) return;
  const umamiMock = function () {};
  umamiMock.trackEvent = function () {};
  umamiMock.trackPageView = function () {};
  window.umami = window.umami || umamiMock;
};
