import { getCareService, getGuideArticle, type CareService } from "@/lib/content";
import { sourceDerivedTools } from "@/lib/source-derived-tools";

export const toolCategories = ["감정", "관계", "자기돌봄", "상담"] as const;

export type ToolCategory = (typeof toolCategories)[number];

export type ToolSection = {
  heading: string;
  paragraphs?: string[];
  prompts?: string[];
};

export type ToolItem = {
  title: string;
  slug: string;
  description: string;
  category: ToolCategory;
  topics: string[];
  format: string;
  relatedGuides: string[];
  relatedServices: CareService["id"][];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  sections?: ToolSection[];
};

// 기존 새벽별 교육·워크시트 자산에서 웹용으로 먼저 구조화한 초기 TOOLS입니다.
// 원본 파일 다운로드는 별도 검수 후 연결하며, 현재는 웹에서 바로 사용할 수 있는 self-care prompts 중심으로 제공합니다.
const initialTools: ToolItem[] = [
  {
    title: "감정 체크인",
    slug: "emotion-check-in",
    description: "지금의 감정과 몸의 반응을 서둘러 바꾸기보다 호기심을 가지고 알아차리는 짧은 체크인입니다.",
    category: "감정",
    topics: ["감정", "신체감각", "알아차림", "자기조절"],
    format: "워크시트",
    relatedGuides: ["body-remembers", "what-is-aedp"],
    relatedServices: ["individual", "trauma-attachment"],
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: true,
    sections: [
      {
        heading: "지금 여기에서",
        paragraphs: ["감정을 없애거나 정답을 찾기보다, 지금 내 안에서 일어나는 일을 잠시 관찰해봅니다."],
        prompts: ["지금 가장 먼저 알아차려지는 감정은 무엇인가요?", "그 감정은 몸의 어디에서, 어떤 느낌으로 느껴지나요?", "감정의 강도를 0~10으로 표현하면 어느 정도인가요?", "이 감정이 나에게 알려주려는 것이 있다면 무엇일까요?"],
      },
      {
        heading: "조금 더 안전하게",
        prompts: ["지금 나에게 도움이 되는 거리, 자세, 움직임이 있나요?", "강도가 너무 높다면 지금 당장 다루지 않아도 괜찮습니다. 무엇을 하면 조금 덜 압도될까요?"],
      },
    ],
  },
  {
    title: "스트레스 신호와 나의 대처 지도",
    slug: "stress-response-map",
    description: "스트레스 상황에서 나타나는 나의 반응을 살펴보고, 강도에 따라 실제로 사용할 수 있는 대처를 정리합니다.",
    category: "자기돌봄",
    topics: ["스트레스", "투쟁", "회피", "얼어붙음", "대처", "자기조절"],
    format: "워크시트",
    relatedGuides: ["body-remembers"],
    relatedServices: ["individual", "trauma-attachment"],
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: true,
    sections: [
      {
        heading: "나의 신호 알아차리기",
        prompts: ["스트레스가 낮을 때 가장 먼저 나타나는 신호는 무엇인가요?", "스트레스가 커지면 생각·감정·몸·행동은 어떻게 달라지나요?", "나는 맞서기, 피하기, 얼어붙기 중 어떤 반응을 자주 경험하나요?"],
      },
      {
        heading: "강도별 대처 만들기",
        prompts: ["가벼운 스트레스에서 실제로 할 수 있는 작은 대처 1가지는?", "중간 정도의 스트레스에서는 누구 또는 무엇의 도움이 필요한가요?", "혼자 감당하기 어려운 강도에서는 도움을 요청할 사람과 방법을 적어보세요."],
      },
    ],
  },
  {
    title: "나의 가치와 작은 행동",
    slug: "values-and-small-actions",
    description: "무엇을 잘해야 하는지가 아니라, 내가 중요하게 여기고 싶은 방향을 찾고 작은 행동으로 연결해봅니다.",
    category: "자기돌봄",
    topics: ["가치", "ACT", "선택", "행동", "자기이해"],
    format: "워크시트",
    relatedGuides: [],
    relatedServices: ["individual"],
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: true,
    sections: [
      {
        heading: "중요한 방향 찾기",
        prompts: ["요즘 내 삶에서 중요하게 지키고 싶은 것은 무엇인가요?", "일·관계·건강·배움·휴식 중 지금 가장 마음이 가는 영역은 어디인가요?", "다른 사람의 기대를 잠시 내려놓는다면 나는 어떤 방향을 선택하고 싶나요?"],
      },
      {
        heading: "실천 가능한 크기로",
        prompts: ["그 가치를 이번 주에 10분 안에 표현할 수 있는 행동은 무엇인가요?", "실행을 어렵게 만드는 것이 있다면 행동을 얼마나 더 작게 만들 수 있을까요?"],
      },
    ],
  },
  {
    title: "상담 사이 기록",
    slug: "between-session-reflection",
    description: "상담에서 남은 경험과 일주일의 변화를 기록해 다음 상담까지의 시간을 스스로 돌보는 도구입니다.",
    category: "상담",
    topics: ["상담", "회기 사이", "성찰", "자기돌봄", "연결"],
    format: "기록지",
    relatedGuides: ["is-therapy-working", "before-your-first-session"],
    relatedServices: ["individual", "couple", "trauma-attachment"],
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: false,
    sections: [
      {
        heading: "이번 상담에서 남은 것",
        prompts: ["상담이 끝난 뒤 가장 오래 남아 있는 말·감정·장면은 무엇인가요?", "새롭게 알게 된 것이 있나요?", "아직 정리되지 않았거나 다음에 다시 이야기하고 싶은 것은 무엇인가요?"],
      },
      {
        heading: "다음 상담까지",
        prompts: ["이번 주에 관찰해보고 싶은 패턴이나 순간이 있나요?", "도움이 되었던 돌봄이나 자원이 있었나요?", "다음 상담에서 꼭 가져가고 싶은 질문을 한 문장으로 적어보세요."],
      },
    ],
  },
];

export const toolItems: ToolItem[] = [...initialTools, ...sourceDerivedTools];

export function getToolItem(slug: string) {
  return toolItems.find((item) => item.slug === slug);
}

export function getFeaturedTools(limit = 3) {
  return toolItems.filter((item) => item.featured).slice(0, limit);
}

export function getRelatedToolsForGuide(guideSlug: string, limit = 3) {
  const guide = getGuideArticle(guideSlug);
  return toolItems
    .filter((item) => item.relatedGuides.includes(guideSlug) || guide?.relatedTools.includes(item.slug))
    .slice(0, limit);
}

export function getRelatedToolsForService(serviceId: CareService["id"], limit = 3) {
  const service = getCareService(serviceId);
  return toolItems
    .filter((item) => item.relatedServices.includes(serviceId) || service?.relatedTools.includes(item.slug))
    .slice(0, limit);
}
