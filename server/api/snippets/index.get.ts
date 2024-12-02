import { sharedSnippets } from "~~/server/database/schema";

export default eventHandler(async () => {
  const snippets = await useDrizzle().select().from(tables.sharedSnippets);

  return snippets;
});
