import { sharedSnippets } from "~~/server/database/schema";

export default eventHandler(async (event) => {
  // const db = useDrizzle();
  return process.env.POSTGRES;
});
