import type { Metadata } from "next";
import { headers } from "next/headers";

export const siteName = "새벽별";
export const organizationName = "새벽별 심리상담센터";
export const defaultTitle = "새벽별 | 마음을 이해하고 살아가는 방법";
export const defaultDescription = "새벽별은 전문적인 심리상담 CARE, 마음을 이해하는 심리학 GUIDE, 일상에서 직접 사용하는 마음도구 TOOLS를 만듭니다.";

function normalizedConfiguredOrigin() {
  const value = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return null;

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    throw new Error("SITE_URL 또는 NEXT_PUBLIC_SITE_URL은 올바른 웹 주소여야 합니다.");
  }
}

export async function getSiteOrigin() {
  const configured = normalizedConfiguredOrigin();
  if (configured) return configured;

  const incoming = await headers();
  const forwardedHost = incoming.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || incoming.get("host")?.trim();
  if (!host) return "http://localhost:3000";

  const forwardedProtocol = incoming.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  return new URL(`${protocol}://${host}`).origin;
}

export function absoluteSiteUrl(origin: string, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${origin}/`).toString();
}

type PageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  kind?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  absoluteTitle?: boolean;
};

export async function createPageMetadata({
  path,
  title,
  description,
  kind = "website",
  publishedAt,
  updatedAt,
  openGraphTitle = title,
  openGraphDescription = description,
  absoluteTitle = false,
}: PageMetadataOptions): Promise<Metadata> {
  const origin = await getSiteOrigin();
  const canonical = absoluteSiteUrl(origin, path);
  const imageUrl = absoluteSiteUrl(origin, "/og.png");
  const images = [{ url: imageUrl, width: 1734, height: 907, alt: "새벽별 — 마음을 이해하는 일이 살아가는 데 도움이 되도록." }];

  const openGraph: NonNullable<Metadata["openGraph"]> = kind === "article"
    ? {
        type: "article",
        locale: "ko_KR",
        siteName,
        url: canonical,
        title: openGraphTitle,
        description: openGraphDescription,
        publishedTime: publishedAt,
        modifiedTime: updatedAt,
        images,
      }
    : {
        type: "website",
        locale: "ko_KR",
        siteName,
        url: canonical,
        title: openGraphTitle,
        description: openGraphDescription,
        images,
      };

  return {
    metadataBase: new URL(origin),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [imageUrl],
    },
  };
}
