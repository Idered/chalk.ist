import { useDrizzle } from "~~/modules/drizzle/runtime/server/utils/drizzle";

export default eventHandler(async (event) => {
  const db = useDrizzle(event);
  return db.query.sharedSnippets.findMany();
});
