import generatedContent from "@/lib/generated-content.json";

export type CareService = {
  id: string;
  title: string;
  english: string;
  short: string;
  indexDescription: string;
  description: string;
  suitableFor: string[];
  approach: string[];
  methods: Array<{
    title: string;
    description?: string;
    relatedGuide?: string;
  }>;
  relatedGuides: string[];
  relatedTools: string[];
  process?: CareProcessStep[];
  sessionInformation: CareSessionOption[];
  assessmentGroups?: AssessmentGroup[];
};

export type CareSessionOption = {
  name: string;
  duration: string;
  fee: string;
  detail?: string;
  description?: string;
  notes?: string[];
};

export type AssessmentGroup = {
  code: string;
  title: string;
  items: Array<{
    name: string;
    question: string;
    fee: string;
    detail?: string;
    badge?: string;
  }>;
};

export type CareProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const defaultCareProcess: CareProcessStep[] = [
  { number: "01", title: "문의", description: "현재 고민과 이용하고 싶은 서비스를 문의합니다." },
  { number: "02", title: "초기 상담 / 확인", description: "현재 상황과 상담에서 다루고 싶은 내용을 함께 확인합니다." },
  { number: "03", title: "진행", description: "필요와 목표에 맞춰 상담 또는 평가를 진행합니다." },
  { number: "04", title: "함께 돌아보기", description: "진행 과정과 변화, 이후 필요한 도움을 함께 살펴봅니다." },
];

export const careServices: CareService[] = [
  {
    id: "individual",
    title: "개인 심리상담",
    english: "INDIVIDUAL",
    short: "감정, 관계, 반복되는 어려움을 안전하게 이해합니다.",
    indexDescription: "마음의 어려움과 반복되는 관계·감정의 패턴을 상담자와 함께 이해하고 다루어갑니다.",
    description: "혼자 이해하고 해결하려 했지만 계속 마음에 남아 있는 것들을 함께 살펴봅니다.",
    suitableFor: [
      "우울하거나 불안한 마음이 반복될 때",
      "감정을 이해하거나 조절하기 어렵게 느껴질 때",
      "대인관계에서 비슷한 어려움이 반복될 때",
      "자기 자신을 이해하고 싶을 때",
      "중요한 변화나 선택 앞에서 마음을 정리하고 싶을 때",
      "과거의 경험이 현재의 삶과 관계에 계속 영향을 주는 것 같을 때",
      "특별한 문제가 명확하지 않아도 자신의 마음을 함께 들여다보고 싶을 때",
    ],
    approach: [
      "특정 치료기법에 사람을 맞추기보다 현재 경험하고 있는 어려움과 상담 목표를 함께 살펴보고 필요한 방식으로 상담을 진행합니다.",
      "아래 접근은 현재의 경험과 목표에 따라 필요한 경우 선택적으로 활용합니다.",
    ],
    methods: [
      { title: "AEDP", relatedGuide: "what-is-aedp" },
      { title: "Sensorimotor Psychotherapy (SP)", relatedGuide: "body-remembers" },
      { title: "애착 기반 접근", relatedGuide: "attachment-and-trauma" },
      { title: "정서 중심 접근" },
    ],
    relatedGuides: ["before-your-first-session", "is-therapy-working", "what-is-aedp"],
    relatedTools: [],
    sessionInformation: [
      {
        name: "개인 심리상담",
        duration: "50 MIN",
        fee: "80,000 KRW",
        notes: ["대면 및 화상상담을 이용할 수 있으며 비용은 동일합니다."],
      },
      {
        name: "단회기 상담",
        duration: "80 MIN",
        fee: "120,000 KRW",
        description: "한 번의 긴 회기 안에서 비교적 명확한 주제나 현재의 고민을 집중적으로 살펴보고 싶은 경우 이용할 수 있습니다.",
        notes: ["필요한 경우 이후 상담으로 이어갈 수 있습니다."],
      },
    ],
  },
  {
    id: "couple",
    title: "커플·부부상담",
    english: "COUPLE",
    short: "갈등의 내용보다 그 아래 반복되는 관계의 움직임을 봅니다.",
    indexDescription: "두 사람 사이에서 반복되는 갈등과 감정, 관계의 패턴을 함께 살펴봅니다.",
    description: "누가 옳은지를 정하기보다 두 사람 사이에서 어떤 일이 반복되고 있는지 함께 살펴봅니다.",
    suitableFor: [
      "같은 문제로 반복해서 갈등할 때",
      "대화가 쉽게 싸움이나 단절로 이어질 때",
      "서로의 마음을 이해하기 어렵게 느껴질 때",
      "관계에서 친밀감이나 연결감이 줄었다고 느낄 때",
      "중요한 관계의 변화나 결정을 앞두고 있을 때",
      "두 사람의 관계를 조금 더 깊이 이해하고 싶을 때",
    ],
    approach: ["두 사람 각각의 감정과 경험뿐 아니라 두 사람 사이에서 만들어지는 상호작용의 패턴을 함께 살펴봅니다."],
    methods: [],
    relatedGuides: ["attachment-and-trauma", "is-therapy-working", "ending-therapy"],
    relatedTools: [],
    sessionInformation: [
      {
        name: "커플·부부상담",
        duration: "80 MIN",
        fee: "150,000 KRW",
        notes: ["대면 및 화상상담을 이용할 수 있으며 비용은 동일합니다."],
      },
    ],
  },
  {
    id: "child-parent",
    title: "놀이치료·양육코칭",
    english: "CHILD & PARENT",
    short: "아이의 행동을 마음의 언어로 읽고 부모와 함께 길을 찾습니다.",
    indexDescription: "아이의 발달과 정서, 행동을 이해하고 아이와 부모에게 필요한 도움을 함께 찾아갑니다.",
    description: "아이의 행동만 바꾸기보다 그 행동 안에 담긴 발달과 마음을 함께 이해합니다.",
    suitableFor: [
      "아이의 정서나 행동이 걱정될 때",
      "또래·가족 관계에서 어려움이 반복될 때",
      "아이의 발달 특성을 이해하고 싶을 때",
      "부모와 아이 사이의 상호작용을 살펴보고 싶을 때",
      "양육 과정에서 어떻게 반응해야 할지 막막할 때",
      "아이에게 적절한 심리지원 방법을 함께 찾고 싶을 때",
    ],
    approach: ["아이의 발달 수준과 정서적 필요, 부모-아이 관계와 환경을 함께 고려합니다."],
    methods: [],
    relatedGuides: ["choosing-a-therapist", "before-your-first-session"],
    relatedTools: [],
    sessionInformation: [
      {
        name: "놀이치료",
        duration: "50 MIN",
        fee: "80,000 KRW",
        detail: "아동 40분 + 보호자 10분",
      },
      {
        name: "양육코칭",
        duration: "60 MIN",
        fee: "100,000 KRW",
        description: "현재의 양육 고민과 부모·아이 사이의 상호작용을 함께 살펴보고 구체적인 방향을 찾습니다.",
      },
    ],
  },
  {
    id: "assessment",
    title: "심리평가",
    english: "ASSESSMENT",
    short: "검사 점수 너머, 지금의 나를 이해하는 지도를 만듭니다.",
    indexDescription: "심리검사와 면담을 통해 현재의 마음과 특성을 조금 더 구체적으로 이해합니다.",
    description: "검사의 숫자만 확인하는 것이 아니라 그 결과가 나를 이해하는 데 어떤 의미가 있는지 함께 살펴봅니다.",
    suitableFor: [
      "자신의 성격과 정서적 특성을 이해하고 싶을 때",
      "반복되는 관계나 행동의 패턴을 살펴보고 싶을 때",
      "아이의 발달이나 기질을 이해하고 싶을 때",
      "커플 관계를 조금 더 구조적으로 살펴보고 싶을 때",
      "상담 과정에서 추가적인 이해가 필요할 때",
    ],
    approach: ["검사 결과를 단순 점수나 유형으로만 설명하기보다 면담 및 현재 상황과 함께 이해할 수 있도록 돕습니다."],
    methods: [],
    relatedGuides: ["psychological-assessment-guide"],
    relatedTools: [],
    sessionInformation: [],
    assessmentGroups: [
      {
        code: "A",
        title: "나를 이해하기",
        items: [
          { name: "개인심리평가 A", question: "특별한 어려움은 없지만 나 자신을 조금 더 이해하고 싶을 때", fee: "100,000 KRW" },
          { name: "개인심리평가 B", question: "심리적인 어려움이나 고통이 있고 상담 방향을 함께 정하고 싶을 때", fee: "150,000 KRW" },
        ],
      },
      {
        code: "B",
        title: "부모와 아이를 이해하기",
        items: [
          { name: "부모자녀 기질·양육태도 평가", question: "부모와 자녀의 기질 차이와 양육 관계를 이해하고 싶을 때", fee: "200,000 KRW", detail: "2인 기준 · 인원에 따라 추가비용 발생" },
          { name: "부모자녀 상호작용 평가", question: "실제 부모-자녀 상호작용을 비디오로 살펴보고 구체적인 피드백을 받고 싶을 때", fee: "300,000 KRW", detail: "2인 기준 · 인원에 따라 추가비용 발생" },
        ],
      },
      {
        code: "C",
        title: "우리 관계를 이해하기",
        items: [
          { name: "커플평가 A", question: "각자를 이해하고 우리의 관계를 함께 이해하고 싶을 때", fee: "160,000 KRW" },
          { name: "PREPARE / ENRICH", question: "결혼 전·후 커플의 관계를 구조적으로 살펴보기 위해 개발된 평가", fee: "300,000 KRW" },
        ],
      },
      {
        code: "D",
        title: "특정 패턴을 깊게 이해하기",
        items: [
          { name: "심리도식평가", question: "반복되는 심리도식과 관계·정서 패턴을 더 깊게 살펴보고 싶을 때", fee: "150,000–300,000 KRW", detail: "약식 / 전체" },
          { name: "애착유형평가", question: "고정된 유형을 판정하기보다 관계 안에서 나타나는 나의 애착 패턴을 조금 더 구체적으로 이해하고 싶을 때", fee: "100,000 KRW", badge: "SAEBYEOKBYEOL SIGNATURE" },
        ],
      },
    ],
  },
  {
    id: "trauma-attachment",
    title: "트라우마·애착 상담",
    english: "TRAUMA & ATTACHMENT",
    short: "머리로는 괜찮아도 몸과 관계에 남은 경험을 천천히 만납니다.",
    indexDescription: "말로 이해하는 것만으로 충분하지 않았던 경험과 감정·관계·신체의 반응을 함께 살펴봅니다.",
    description: "과거의 경험이 지금의 감정과 관계, 몸의 반응에 남아 있을 때 함께 살펴봅니다.",
    suitableFor: [
      "과거의 경험이 현재에도 반복해서 떠오르거나 영향을 줄 때",
      "특정 상황에서 몸이 먼저 긴장하거나 얼어붙는 것처럼 느껴질 때",
      "가까운 관계에서 불안이나 거리두기가 반복될 때",
      "감정을 느끼거나 표현하는 것이 어렵게 느껴질 때",
      "머리로는 이해하지만 몸과 감정의 반응은 쉽게 달라지지 않을 때",
      "관계에서 안전함이나 연결감을 경험하기 어려울 때",
    ],
    approach: ["말과 생각뿐 아니라 감정, 관계, 필요한 경우 신체에서 경험되는 반응까지 함께 살펴봅니다."],
    methods: [
      { title: "AEDP", description: "감정과 관계 안에서 일어나는 경험을 함께 살펴보는 접근입니다.", relatedGuide: "what-is-aedp" },
      { title: "Sensorimotor Psychotherapy · SP", description: "트라우마와 애착 경험에 관련된 신체적 반응과 감정, 생각을 함께 살펴보는 접근입니다.", relatedGuide: "body-remembers" },
    ],
    relatedGuides: ["attachment-and-trauma", "what-is-aedp", "body-remembers"],
    relatedTools: [],
    sessionInformation: [
      {
        name: "트라우마·애착 상담",
        duration: "60 MIN",
        fee: "100,000 KRW",
        notes: ["대면 및 화상상담을 이용할 수 있으며 비용은 동일합니다.", "필요한 시간은 상담 내용과 상황에 따라 선택할 수 있습니다."],
      },
      {
        name: "트라우마·애착 상담",
        duration: "90 MIN",
        fee: "150,000 KRW",
      },
    ],
  },
];


export type MarkdownBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "unordered-list" | "ordered-list"; items: string[] }
  | { type: "note" | "blockquote"; content: string }
  | { type: "hr" };

export type GuideSection = { heading: string; blocks: MarkdownBlock[] };
export type GuideArticle = {
  slug: string;
  category: string;
  categoryEn: string;
  title: string;
  description: string;
  topics: string[];
  relatedServices: CareService["id"][];
  relatedTools: string[];
  sourcePlatform: "website" | "naver-blog" | "instagram" | "notion";
  originalUrl: string | null;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  readTime: string;
  order?: number;
  intro: string;
  sections: GuideSection[];
  takeaway: string;
};

export const guideArticles = generatedContent.guides as GuideArticle[];
export const guideCategories = ["전체", "상담 시작하기", "상담 잘 이용하기", "마음 이해하기", "심리치료 알아보기", "심리검사 알아보기"];

export function getGuideArticle(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}

export function getCareService(id: string) {
  return careServices.find((service) => service.id === id);
}

export function getRelatedGuides(article: GuideArticle, limit = 3) {
  return guideArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score:
        candidate.topics.filter((topic) => article.topics.includes(topic)).length * 2 +
        (candidate.category === article.category ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}

export function getRelatedGuidesForService(serviceId: string, limit = 3) {
  const service = getCareService(serviceId);
  const explicitSlugs = new Set(service?.relatedGuides ?? []);
  return guideArticles
    .filter((article) => article.relatedServices.includes(serviceId) || explicitSlugs.has(article.slug))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}

export function formatGuideDate(value: string) {
  return value.replaceAll("-", ".");
}
