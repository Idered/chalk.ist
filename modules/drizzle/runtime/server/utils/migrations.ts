import { migrate } from "drizzle-orm/postgres-js/migrator";
import { useDrizzle } from "./drizzle";
export async function applyMigrations(migrationsFolder: string) {
  const db = useDrizzle();
  const _log = console.log;
  try {
    console.log = (args) => {
      if (args.severity === "NOTICE") return;
      _log(args);
    };
    await migrate(db, { migrationsFolder });
    console.log = _log;
    return true;
  } catch (err) {
    console.log = _log;
    console.error(err);
    return false;
  }
}
