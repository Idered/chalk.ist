export const migrations = Object.entries(
  import.meta.glob<boolean, string, { default: () => void }>("./*/index.ts"),
)
  .map(([version, runImport]) => ({
    version: version.split("/")[1],
    runImport: () => runImport().then((m) => m.default),
  }))
  .sort((a, b) =>
    a.version
      .replace(/\d+/g, (n) => n + 100_000)
      .localeCompare(b.version.replace(/\d+/g, (n) => n + 100_000)),
  );

export const version = migrations[migrations.length - 1].version;
