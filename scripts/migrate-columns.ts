import { readFile } from "node:fs/promises";
import { getCliClient } from "sanity/cli";
import {
  initialColumnCategories,
  migrationDocuments,
} from "./column-migration.mjs";

// Run via `npm run sanity:migrate`. Uses the operator's existing Sanity CLI login,
// never an invented or stored write token. Dry-run by default.
const content = JSON.parse(
  await readFile(
    new URL("../lib/generated-content.json", import.meta.url),
    "utf8",
  ),
);
const entries = migrationDocuments(content.columns);
if (process.env.SANITY_MIGRATION_APPLY !== "1") {
  console.log("DRY RUN: existing data will not be changed.");
  console.log({
    categories: initialColumnCategories.map((item) => item.title),
    columns: entries.map(
      (item: { document: { slug: { current: string } } }) =>
        item.document.slug.current,
    ),
  });
  console.log(
    "After review and Sanity CLI login, set SANITY_MIGRATION_APPLY=1 to import.",
  );
} else {
  const client = getCliClient({ apiVersion: "2025-02-19" });
  for (const category of initialColumnCategories)
    await client.createIfNotExists(category);
  for (const { document, marker } of entries) {
    // Already migrated means 'do nothing', even when the article was unpublished.
    if (await client.getDocument(marker._id)) {
      console.log(`Skipped migrated: ${document.slug.current}`);
      continue;
    }
    const conflicting = await client.fetch<string[]>(
      `*[_type == "column" && slug.current == $slug]._id`,
      { slug: document.slug.current },
    );
    if (conflicting.length)
      throw new Error(
        `Existing Sanity article at ${document.slug.current}; review before importing. Nothing was overwritten.`,
      );
    await client
      .transaction()
      .createIfNotExists(document)
      .createIfNotExists(marker)
      .commit();
    console.log(
      `Imported without overwriting: /column/${document.slug.current}`,
    );
  }
}
