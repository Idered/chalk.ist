/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare var umami: umami.umami;
declare module "vue-color-kit";

// https://umami.is/docs/tracker-functions
declare namespace umami {
  interface umami {
    (event_value: string): void;
    trackEvent(
      event_value: string,
      event_type: string,
      url?: string,
      website_id?: string,
    ): void;
    trackView(url: string, referrer?: string, website_id?: string): void;
  }
}
