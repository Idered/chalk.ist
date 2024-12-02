import { sharedSnippets } from "~~/server/database/schema";

export default eventHandler(async (event) => {
  const db = useDrizzle(event);
  return db.query.sharedSnippets.findMany();
});
