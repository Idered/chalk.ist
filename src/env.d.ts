/// <reference types="vite/client" />

declare module "vue-color-kit";
declare var umami: umami.umami;

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// https://umami.is/docs/tracker-functions
declare namespace umami {
  interface umami {
    (event_value: string): void;
    track(event: string, data?: Record<string, unknown>): void;
    trackView(url: string, referrer?: string, website_id?: string): void;
  }
}
