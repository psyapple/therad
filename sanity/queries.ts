import { defineQuery } from "next-sanity";

export const columnArchiveQuery = defineQuery(`{
  "articles": *[_type == "column" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())]
    | order(featured desc, publishedAt desc) {
      _id, title, "slug": slug.current, "description": excerpt, coverImage,
      "category": category->{_id, title, "slug": slug.current},
      body, publishedAt, "updatedAt": _updatedAt, featured,
      relatedGuides, relatedTools, relatedServices, author, topics, seoTitle, seoDescription
    },
  "categories": *[_type == "columnCategory" && !(_id in path("drafts.**"))] | order(order asc, title asc) {_id, title, "slug": slug.current},
  "migratedSlugs": *[_type == "columnMigration"].slug
}`);
