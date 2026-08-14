import snapshot from "@/data/public-content.json";

export type PublicPost = {
  title: string;
  category: string;
  url: string;
  publishedAt: string | null;
  excerpt: string;
  tags: string[];
};

export type PublicContent = {
  sourceUpdatedAt: string;
  blog: {
    title: string;
    description: string;
    profileUrl: string;
    rssUrl: string;
    logoSourceUrl: string;
    updatedAt: string | null;
    items: PublicPost[];
  };
  notion: {
    title: string;
    publicUrl: string;
    overview: string;
    updatedAt: string;
    sections: Array<{ title: string; type: string }>;
    checklist: string[];
  };
  instagram: {
    handle: string;
    profileUrl: string;
    connection: string;
    items: Array<{
      id: string;
      caption: string;
      mediaType: string;
      url: string;
      publishedAt: string | null;
    }>;
  };
};

export const publicContent = snapshot as PublicContent;

export function formatSourceDate(value: string | null) {
  if (!value) return "업데이트 중";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  }).format(new Date(value));
}
