import generatedContent from "@/lib/generated-content.json";
import { getCareService, type CareService, type MarkdownBlock } from "@/lib/content";
import { getGuideArticle, guideArticles } from "@/lib/guide-all";

export const toolCategories = ["감정", "관계", "자기돌봄", "상담"] as const;
export type ToolCategory = (typeof toolCategories)[number];

export type ToolSection = {
  heading: string;
  blocks: MarkdownBlock[];
};

export type ToolItem = {
  title: string;
  slug: string;
  description: string;
  category: ToolCategory;
  topics: string[];
  format: string;
  relatedGuides: string[];
  relatedServices: CareService["id"][];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  order?: number;
  sections: ToolSection[];
};

export const toolItems = generatedContent.tools as ToolItem[];

export function getToolItem(slug: string) {
  return toolItems.find((item) => item.slug === slug);
}

export function getFeaturedTools(limit = 3) {
  return toolItems.filter((item) => item.featured).slice(0, limit);
}

export function getRelatedToolsForGuide(guideSlug: string, limit = 3) {
  const guide = getGuideArticle(guideSlug);
  return toolItems
    .filter((item) => item.relatedGuides.includes(guideSlug) || guide?.relatedTools.includes(item.slug))
    .slice(0, limit);
}

export function getRelatedGuidesForTool(item: ToolItem, limit = 3) {
  const relatedSlugs = new Set(item.relatedGuides);
  const explicitGuides = item.relatedGuides
    .map(getGuideArticle)
    .filter((guide) => guide !== undefined);
  const reverseRelatedGuides = guideArticles.filter(
    (guide) => !relatedSlugs.has(guide.slug) && guide.relatedTools.includes(item.slug),
  );

  return [...explicitGuides, ...reverseRelatedGuides].slice(0, limit);
}

export function getRelatedToolsForService(serviceId: CareService["id"], limit = 3) {
  const service = getCareService(serviceId);
  return toolItems
    .filter((item) => item.relatedServices.includes(serviceId) || service?.relatedTools.includes(item.slug))
    .slice(0, limit);
}
