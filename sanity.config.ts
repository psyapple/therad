"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "saebyeokbyeol",
  title: "새벽별 · Content",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("column").title("COLUMN"),
            S.documentTypeListItem("columnCategory").title("Categories"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (options) => options.filter((option) => option.templateId !== "columnMigration"),
    actions: (actions, context) => context.schemaType === "columnMigration" ? [] : actions,
  },
});
