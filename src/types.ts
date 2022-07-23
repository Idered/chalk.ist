import type { ViteSSGContext } from "vite-ssg";

export enum WindowControls {
  None = "none",
  MacColor = "mac-color",
  MacGray = "mac-gray",
  MacOutline = "mac-outline",
}

export type UserModule = (ctx: ViteSSGContext) => void;
