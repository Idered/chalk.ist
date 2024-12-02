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
  if (
    !process.env.NUXT_HUB_PROJECT_KEY ||
    !process.env.NUXT_HUB_ENV ||
    !process.env.NUXT_HUB_PROJECT_DEPLOY_TOKEN
  ) {
    return;
  }

  nuxt.hook("nitro:init", async (nitro) => {
    nitro.hooks.hook("compiled", async () => {
      await $fetch(
        `/api/projects/${process.env.NUXT_HUB_PROJECT_KEY}/build/${process.env.NUXT_HUB_ENV}/done`,
        {
          baseURL: config.hubUrl,
          method: "POST",
          headers: {
            authorization: `Bearer ${process.env.NUXT_HUB_PROJECT_DEPLOY_TOKEN}`,
          },
          body: {
            pagesUrl: process.env.CF_PAGES_URL,
          },
        },
      ).catch((e) => {
        if (e.response?._data?.message) {
          console.error(e.response._data.message);
        } else {
          console.error("Failed run compiled:done hook on NuxtHub.", e);
        }

        process.exit(1);
      });
      const migrationsApplied = await applyMigrations(config.migrationsPath);

      if (!migrationsApplied) {
        process.exit(1);
      }
    });
  });
}
