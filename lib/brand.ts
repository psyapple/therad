export type BrandPillar = {
  index: string;
  eyebrow: "CARE" | "GUIDE" | "TOOLS";
  concept: string;
  title: string;
  copy: string;
  href: string;
  link: string;
  tone: "navy" | "apricot" | "lavender";
};

export const brandPillars: BrandPillar[] = [
  {
    index: "01",
    eyebrow: "CARE",
    concept: "만나기",
    title: "전문적인 상담과 심리서비스",
    copy: "말로 설명하기 어려운 마음도 관계 안에서 안전하게 만나고 이해합니다.",
    href: "/care",
    link: "상담 알아보기",
    tone: "navy",
  },
  {
    index: "02",
    eyebrow: "GUIDE",
    concept: "이해하기",
    title: "마음을 이해하는 데 도움이 되는 심리학",
    copy: "마음을 이해하고 상담을 선택하는 데 쓸 수 있도록 전문적인 내용을 정확한 언어로 번역합니다.",
    href: "/guide",
    link: "가이드 읽기",
    tone: "apricot",
  },
  {
    index: "03",
    eyebrow: "TOOLS",
    concept: "돌보기",
    title: "일상에서 직접 사용해볼 수 있는 마음도구",
    copy: "읽고 이해한 것을 일상에서 사용해볼 수 있도록 새벽별이 만든 워크시트와 마음도구를 모았습니다.",
    href: "/tools",
    link: "마음도구 보기",
    tone: "lavender",
  },
];
