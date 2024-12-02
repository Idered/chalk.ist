export default eventHandler(async (event) => {
  const body = await readBody(event);

  const snippets = await useDrizzle().insert(tables.sharedSnippets).values({
    content: body.content,
  });

  return snippets;
});
