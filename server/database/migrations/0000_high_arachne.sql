CREATE TABLE IF NOT EXISTS "shared_snippets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL
);
