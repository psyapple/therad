import type { MetadataRoute } from "next";
import { getColumnArchive } from "@/lib/columns";
import { careServices } from "@/lib/content";
import { guideArticles } from "@/lib/guide-all";
import { absoluteSiteUrl, getSiteOrigin } from "@/lib/seo";
import { toolItems } from "@/lib/tools";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles: columnArticles, unavailable } = await getColumnArchive();
  // Do not tell crawlers that CMS URLs were removed during a temporary outage.
  if (unavailable) throw new Error("Sitemap temporarily unavailable: COLUMN source could not be read.");
  const origin = await getSiteOrigin();
  const staticPaths = [
    "/",
    "/about",
    "/care",
    "/guide",
    "/tools",
    "/column",
    "/contact",
    "/privacy",
    "/insight-relay",
  ];

  return [
    ...staticPaths.map((path) => ({ url: absoluteSiteUrl(origin, path) })),
    ...careServices.map((service) => ({ url: absoluteSiteUrl(origin, `/care/${service.id}`) })),
    ...guideArticles.map((article) => ({ url: absoluteSiteUrl(origin, `/guide/${article.slug}`), lastModified: article.updatedAt })),
    ...toolItems.map((item) => ({ url: absoluteSiteUrl(origin, `/tools/${item.slug}`), lastModified: item.updatedAt })),
    ...columnArticles.map((article) => ({ url: absoluteSiteUrl(origin, `/column/${article.slug}`), lastModified: article.updatedAt })),
  ];
}
