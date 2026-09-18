import generatedContent from "@/lib/generated-content.json";
import type { CareService, MarkdownBlock } from "@/lib/content";
import { cache } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import type { ContentImage } from "@/sanity/image";
import { sanityClient } from "@/sanity/client";
import { columnArchiveQuery } from "@/sanity/queries";

export type ColumnCategory = { _id: string; title: string; slug: string };

export type ColumnArticle = {
  title: string;
  slug: string;
  description: string;
  topics: string[];
  relatedGuides: string[];
  relatedTools: string[];
  relatedServices: CareService["id"][];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  author: string;
  order?: number;
  blocks: MarkdownBlock[];
  body?: (PortableTextBlock | ContentImage)[];
  coverImage?: ContentImage;
  category?: ColumnCategory;
  seoTitle?: string;
  seoDescription?: string;
};

type SanityColumn = Partial<ColumnArticle> & {
  _id: string;
  title: string;
  slug: string;
};
type ArchiveResult = {
  articles: SanityColumn[];
  categories: ColumnCategory[];
  migratedSlugs: string[];
};
export type ColumnArchive = {
  articles: ColumnArticle[];
  categories: ColumnCategory[];
  unavailable: boolean;
};
const legacyArticles = generatedContent.columns as ColumnArticle[];

// Request-scoped only: publishing does not require a rebuild or a cache purge.
export const getColumnArchive = cache(async (): Promise<ColumnArchive> => {
  try {
    const result = await sanityClient.fetch<ArchiveResult>(
      columnArchiveQuery,
      {},
      { cache: "no-store" },
    );
    const unique = new Map<string, ColumnArticle>();
    for (const item of result.articles) {
      if (
        item._id.startsWith("drafts.") ||
        item._id.startsWith("versions.") ||
        !item.title ||
        !item.slug ||
        !item.publishedAt ||
        !Number.isFinite(Date.parse(item.publishedAt)) ||
        Date.parse(item.publishedAt) > Date.now() ||
        unique.has(item.slug)
      )
        continue;
      unique.set(item.slug, {
        ...item,
        description: item.description || "",
        author: item.author || "새벽별",
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt || item.publishedAt,
        featured: item.featured === true,
        blocks: [],
        body: item.body || [],
        topics: item.topics || [],
        relatedGuides: item.relatedGuides || [],
        relatedTools: item.relatedTools || [],
        relatedServices: item.relatedServices || [],
      });
    }
    // Migration records remain even when a migrated article is unpublished/deleted.
    const migrated = new Set(result.migratedSlugs || []);
    for (const article of legacyArticles)
      if (!migrated.has(article.slug) && !unique.has(article.slug))
        unique.set(article.slug, article);
    return {
      articles: [...unique.values()].sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.publishedAt.localeCompare(a.publishedAt),
      ),
      categories: result.categories || [],
      unavailable: false,
    };
  } catch {
    // Fail closed: don't accidentally republish MDX versions after CMS unpublishing.
    console.error(
      "COLUMN: Sanity published content is temporarily unavailable.",
    );
    return { articles: [], categories: [], unavailable: true };
  }
});

export async function getColumnArticle(slug: string) {
  return (await getColumnArchive()).articles.find(
    (article) => article.slug === slug,
  );
}
