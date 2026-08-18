import type { Metadata, Viewport } from "next";
import { KakaoFloatingContact } from "@/components/KakaoFloatingContact";
import { StructuredData, organizationStructuredData } from "@/components/StructuredData";
import { absoluteSiteUrl, defaultDescription, defaultTitle, getSiteOrigin } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getSiteOrigin();
  const imageUrl = absoluteSiteUrl(origin, "/og.png");
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const naverVerification = process.env.NAVER_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(origin),
    title: {
      default: defaultTitle,
      template: "%s | 새벽별",
    },
    description: defaultDescription,
    icons: {
      icon: "/brand-symbol.png",
      shortcut: "/brand-symbol.png",
      apple: "/brand-symbol.png",
    },
    keywords: ["새벽별", "심리상담", "심리상담 가이드", "마음도구", "심리 워크시트", "AEDP", "SP", "애착", "트라우마", "Insight Relay"],
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: "새벽별",
      title: defaultTitle,
      description: "마음을 이해하는 일이 살아가는 데 도움이 되도록.",
      images: [{ url: imageUrl, width: 1734, height: 907, alt: "새벽별 — 마음을 이해하는 일이 살아가는 데 도움이 되도록." }],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: "마음을 이해하는 일이 살아가는 데 도움이 되도록.",
      images: [imageUrl],
    },
    verification: googleVerification || naverVerification
      ? {
          google: googleVerification,
          other: naverVerification ? { "naver-site-verification": [naverVerification] } : undefined,
        }
      : undefined,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ee",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const origin = await getSiteOrigin();
  return (
    <html lang="ko">
      <body><StructuredData data={organizationStructuredData(origin)} />{children}<KakaoFloatingContact /></body>
    </html>
  );
}
