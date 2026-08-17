type StructuredDataValue = Record<string, unknown> | Array<Record<string, unknown>>;

export function StructuredData({ data }: { data: StructuredDataValue }) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return <script type="application/ld+json">{json}</script>;
}

export function organizationStructuredData(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "새벽별 심리상담센터",
    alternateName: "새벽별",
    url: origin,
    logo: new URL("/brand-symbol.png", `${origin}/`).toString(),
    description: "심리상담, 심리평가, 심리교육과 마음도구를 통해 마음을 이해하고 삶에서 사용할 수 있도록 돕습니다.",
  };
}

export function articleStructuredData({
  origin,
  path,
  title,
  description,
  publishedAt,
  updatedAt,
  author,
}: {
  origin: string;
  path: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    mainEntityOfPage: new URL(path, `${origin}/`).toString(),
    author: { "@type": "Organization", name: author || "새벽별 심리상담센터" },
    publisher: { "@type": "Organization", name: "새벽별 심리상담센터", url: origin },
  };
}

export function breadcrumbStructuredData(origin: string, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, `${origin}/`).toString(),
    })),
  };
}
