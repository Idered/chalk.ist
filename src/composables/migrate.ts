import { store } from "./store";
import { gt as semverGt } from "semver";
import { migrations } from "~/migrations";

export default async function () {
  for (const { runImport, version } of migrations) {
    if (!semverGt(version, store.value.version)) continue;
    const migrate = await runImport();
    migrate();
    store.value.version = version;
  }
}
