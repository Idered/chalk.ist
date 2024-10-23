declare module "vue-color-kit";
declare var umami: umami.umami;

// https://umami.is/docs/tracker-functions
declare namespace umami {
  interface umami {
    (event_value: string): void;
    track(event: string, data?: Record<string, unknown>): void;
    trackView(url: string, referrer?: string, website_id?: string): void;
  }
}
