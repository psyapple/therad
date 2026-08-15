import { getCareService, getGuideArticle, type CareService } from "@/lib/content";

export const toolCategories = ["감정", "관계", "자기돌봄", "상담"] as const;

export type ToolCategory = (typeof toolCategories)[number];

export type ToolSection = {
  heading: string;
  paragraphs?: string[];
  prompts?: string[];
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
  sections?: ToolSection[];
};

// 실제 워크시트와 마음도구가 확정되는 순서대로 이 배열에 등록합니다.
// 화면은 비어 있는 배열도 정상적인 아카이브 상태로 처리합니다.
export const toolItems: ToolItem[] = [];

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

export function getRelatedToolsForService(serviceId: CareService["id"], limit = 3) {
  const service = getCareService(serviceId);
  return toolItems
    .filter((item) => item.relatedServices.includes(serviceId) || service?.relatedTools.includes(item.slug))
    .slice(0, limit);
}
