import type { MetadataRoute } from "next";
import { absoluteSiteUrl, getSiteOrigin } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getSiteOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteSiteUrl(origin, "/sitemap.xml"),
  };
}
