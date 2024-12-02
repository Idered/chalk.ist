import { sharedSnippets } from "~~/server/database/schema";

export default eventHandler(async (event) => {
  const db = useDrizzle();
  const snippets = await db.select().from(tables.sharedSnippets);

  event.waitUntil(db.$client.end({ timeout: 1 }));

  return snippets;
});
