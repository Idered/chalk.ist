import { sharedSnippets } from "~~/server/database/schema";

export default eventHandler(async (event) => {
  const db = useDrizzle();

  const res = await Promise.all([
    db.select().from(tables.sharedSnippets),
    new Promise((resolve) =>
      setTimeout(() => {
        db.$client.end({ timeout: 1 });
        resolve(["fail"]);
      }, 1000),
    ),
  ]);

  // event.waitUntil(db.$client.end({ timeout: 1 }));

  return res;
});
