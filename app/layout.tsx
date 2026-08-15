import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host");
  const protocol = incoming.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "https://saebyeokbyeol.kr";
  const imageUrl = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: {
      default: "새벽별 | 마음을 이해하고 살아가는 방법",
      template: "%s | 새벽별",
    },
    description:
      "새벽별은 전문적인 심리상담 CARE, 마음을 이해하는 심리학 GUIDE, 일상에서 직접 사용하는 마음도구 TOOLS를 만듭니다.",
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
      title: "새벽별 | 마음을 이해하고 살아가는 방법",
      description: "마음을 이해하는 일이 살아가는 데 도움이 되도록.",
      images: [{ url: imageUrl, width: 1736, height: 907, alt: "새벽별 — 마음을 이해하는 일이 살아가는 데 도움이 되도록." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "새벽별 | 마음을 이해하고 살아가는 방법",
      description: "마음을 이해하는 일이 살아가는 데 도움이 되도록.",
      images: [imageUrl],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
