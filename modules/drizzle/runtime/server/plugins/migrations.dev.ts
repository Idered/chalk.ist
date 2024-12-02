import { applyMigrations } from "../utils/migrations";

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return;

  const migrationsPath = useRuntimeConfig().drizzle?.migrationsPath;

  hubHooks.hookOnce("bindings:ready", async () => {
    await applyMigrations(migrationsPath);

    await hubHooks.callHookParallel("database:migrations:done");
  });
});
