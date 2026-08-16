import { guideCategories, type GuideArticle } from "@/lib/content";
import { guideArticles as curatedGuideArticles } from "@/lib/guide-archive";
import { sourceDerivedGuides } from "@/lib/source-derived-guides";

// One public GUIDE collection. Source-derived records are merged only when their slug
// is not already represented by a curated/base article, preventing duplicate routes.
const seen = new Set<string>();

export const guideArticles: GuideArticle[] = [
  ...curatedGuideArticles,
  ...sourceDerivedGuides,
].filter((article) => {
  if (seen.has(article.slug)) return false;
  seen.add(article.slug);
  return true;
});

export { guideCategories };

export function getGuideArticle(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}

export function getRelatedGuides(article: GuideArticle, limit = 3) {
  return guideArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score:
        candidate.topics.filter((topic) => article.topics.includes(topic)).length * 2 +
        (candidate.category === article.category ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}

export function getRelatedGuidesForService(serviceId: string, limit = 3) {
  return guideArticles
    .filter((article) => article.relatedServices.includes(serviceId))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}
