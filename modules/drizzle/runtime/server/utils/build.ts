import { $fetch } from "ofetch";
import type { Nuxt, RuntimeConfig } from "nuxt/schema";
import { applyMigrations } from "./migrations";

export function addBuildHooks(
  nuxt: Nuxt,
  config: {
    hubUrl: string;
    migrationsPath: string;
  },
) {
  if (!process.env.NUXT_HUB_PROJECT_KEY) {
    return;
  }

  nuxt.hook("nitro:init", async (nitro) => {
    nitro.hooks.hook("compiled", async () => {
      const migrationsApplied = await applyMigrations(config.migrationsPath);

      if (!migrationsApplied) {
        process.exit(1);
      }
    });
  });
}
