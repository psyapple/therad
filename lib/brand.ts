export type BrandPillar = {
  index: string;
  eyebrow: "CARE" | "GUIDE" | "INSIGHT RELAY";
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
    title: "복잡한 심리학을 이해할 수 있는 언어로",
    copy: "상담을 선택하고 일상을 돌보는 데 쓸 수 있도록 전문적인 내용을 번역합니다.",
    href: "/guide",
    link: "가이드 읽기",
    tone: "apricot",
  },
  {
    index: "03",
    eyebrow: "INSIGHT RELAY",
    concept: "이어가기",
    title: "상담과 상담 사이를 잇는 연결",
    copy: "상담에서 발견한 것을 일상으로 가져가고 다음 상담까지의 경험을 이어갑니다.",
    href: "/insight-relay",
    link: "서비스 알아보기",
    tone: "lavender",
  },
];

