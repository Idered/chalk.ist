import { join } from "pathe";
import {
  addServerImportsDir,
  addServerScanDir,
  createResolver,
  defineNuxtModule,
  useRuntimeConfig,
} from "nuxt/kit";
import { addBuildHooks } from "./runtime/server/utils/build";

export default defineNuxtModule({
  meta: {
    name: "hubDrizzle",
    configKey: "drizzle",
  },
  defaults: {},
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.drizzle =
      nuxt.options.runtimeConfig.drizzle || {};

    const migrationsPath = join(
      nuxt.options.rootDir,
      "server/database/migrations",
    );
    nuxt.options.runtimeConfig.drizzle.migrationsPath = migrationsPath;

    const { resolve } = createResolver(import.meta.url);

    addServerScanDir(resolve("./runtime/server"));
    addServerImportsDir(resolve("./runtime/server/utils"));

    if (nuxt.options._prepare) {
      return;
    }

    addBuildHooks(nuxt, {
      hubUrl: process.env.NUXT_HUB_URL || "https://admin.hub.nuxt.com",
      migrationsPath,
    });
  },
});
