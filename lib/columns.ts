import generatedContent from "@/lib/generated-content.json";
import type { CareService, MarkdownBlock } from "@/lib/content";

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
};

export const columnArticles = generatedContent.columns as ColumnArticle[];

export function getColumnArticle(slug: string) {
  return columnArticles.find((article) => article.slug === slug);
}
