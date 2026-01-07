import {
  tables,
  useDrizzle,
} from "~~/modules/drizzle/runtime/server/utils/drizzle";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const snippets = await useDrizzle(event)
    .insert(tables.sharedSnippets)
    .values({
      content: body.content,
    });

  return snippets;
});
