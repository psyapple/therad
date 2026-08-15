import {
  guideArticles as baseGuideArticles,
  guideCategories,
  type GuideArticle,
} from "@/lib/content";

const additionalGuideArticles: GuideArticle[] = [
  {
    slug: "attachment-concepts-compared",
    category: "마음 이해하기",
    categoryEn: "ATTACHMENT",
    title: "불안정애착, 애착 손상, 애착 트라우마, 발달 트라우마는 어떻게 다를까요?",
    description: "비슷하게 들리지만 같은 뜻은 아닌 네 가지 개념을 관계의 패턴, 사건, 반복된 경험이라는 관점에서 구분해봅니다.",
    topics: ["애착", "애착 트라우마", "발달 트라우마", "관계", "안전감"],
    relatedServices: ["trauma-attachment", "individual", "couple"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: true,
    readTime: "8분",
    intro: "애착과 트라우마에 관한 말은 서로 겹쳐 사용되기 쉽습니다. 하지만 관계에서 보이는 패턴을 말하는지, 특정한 관계 사건을 말하는지, 발달 과정에서 반복된 위협과 결핍을 말하는지에 따라 초점이 달라집니다.",
    sections: [
      {
        heading: "불안정애착은 관계의 패턴을 설명하는 말에 가깝습니다",
        paragraphs: ["불안정애착은 가까운 관계에서 도움을 구하고 거리를 조절하며 안전감을 회복하는 방식이 얼마나 유연한지를 이해하는 개념입니다. 한 사람 전체를 고정된 유형으로 규정하거나 곧바로 트라우마가 있었다는 뜻은 아닙니다."],
      },
      {
        heading: "애착 손상은 중요한 관계에서 일어난 상처에 초점을 둡니다",
        paragraphs: ["신뢰가 필요했던 순간에 상대가 곁에 없었다고 느낀 경험, 배신이나 반복되는 정서적 단절처럼 중요한 관계에서 안전감이 흔들린 사건이나 경험을 설명할 때 사용할 수 있습니다. 관계를 회복하는 과정에서는 그 사건 자체뿐 아니라 이후 두 사람이 만들어온 반응의 악순환도 함께 살펴봅니다."],
      },
      {
        heading: "애착 트라우마는 관계가 안전의 장소이면서 동시에 위협의 장소였던 경험을 포함할 수 있습니다",
        paragraphs: ["보호와 돌봄이 필요한 관계에서 두려움, 방치, 예측하기 어려운 반응이 반복되면 가까워지고 싶은 욕구와 스스로를 지켜야 하는 반응이 동시에 강해질 수 있습니다. 이런 경험은 감정과 관계뿐 아니라 몸의 경계와 각성 패턴에도 영향을 줄 수 있습니다."],
      },
      {
        heading: "발달 트라우마는 성장 과정의 반복적이고 누적된 영향을 더 넓게 봅니다",
        paragraphs: ["발달 트라우마라는 표현은 성장기에 반복된 위협, 방치, 관계적 불안정 등이 정서조절, 자기감, 관계, 신체적 안전감과 같은 여러 발달 영역에 누적된 영향을 설명할 때 사용됩니다. 모든 어려움을 하나의 용어로 설명하기보다 개인의 실제 경험과 현재 기능을 함께 보는 것이 중요합니다."],
        note: "이 네 개념은 서로 완전히 분리된 진단 범주가 아닙니다. 특히 ‘애착 트라우마’와 ‘발달 트라우마’는 문헌과 임상 맥락에 따라 범위가 다르게 사용될 수 있습니다.",
      },
    ],
    takeaway: "이름을 붙이는 것보다 중요한 것은, 어떤 관계와 경험이 지금의 안전감·감정·몸·관계에 어떤 방식으로 남아 있는지 구체적으로 이해하는 것입니다.",
  },
  {
    slug: "sp-vs-se",
    category: "심리치료 알아보기",
    categoryEn: "SOMATIC THERAPY",
    title: "Sensorimotor Psychotherapy(SP)와 Somatic Experiencing(SE)은 무엇이 다를까요?",
    description: "둘 다 몸을 중요하게 보지만 출발점과 훈련 배경, 임상에서 강조하는 지점에는 차이가 있습니다.",
    topics: ["SP", "SE", "신체 기반 심리치료", "트라우마", "신경계", "애착"],
    relatedServices: ["trauma-attachment", "individual"],
    relatedTools: ["stress-response-map", "emotion-check-in"],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: true,
    readTime: "7분",
    intro: "SP와 SE는 모두 트라우마를 말과 생각만의 문제로 보지 않고 신체와 신경계의 반응을 중요한 정보로 다룹니다. 그래서 비슷해 보이지만, 같은 치료의 다른 이름은 아닙니다.",
    sections: [
      {
        heading: "공통점: 몸에서 일어나는 현재의 경험을 중요한 자료로 봅니다",
        paragraphs: ["두 접근 모두 긴장, 얼어붙음, 움직임, 호흡, 감각처럼 지금 몸에서 나타나는 반응을 알아차리고 압도되지 않는 범위에서 다루는 것을 중요하게 생각합니다. 과거 사건을 자세히 이야기하는 것만이 변화의 유일한 길이라고 보지 않습니다."],
      },
      {
        heading: "SP는 몸·감정·생각과 애착의 패턴을 심리치료 안에서 통합적으로 다룹니다",
        paragraphs: ["Sensorimotor Psychotherapy는 몸을 심리치료의 정보원이자 개입의 대상으로 두면서 신체감각, 움직임, 정서, 인지, 관계와 애착의 패턴을 함께 살펴보는 접근입니다. 특히 트라우마뿐 아니라 발달 및 애착 경험이 몸과 관계에 남긴 절차적 패턴을 다루는 훈련 체계를 갖고 있습니다."],
      },
      {
        heading: "SE는 스트레스와 트라우마가 신경계에 남긴 생존 반응에 더 직접적으로 초점을 둡니다",
        paragraphs: ["Somatic Experiencing은 싸우기·도망가기·얼어붙기 같은 생존 반응과 자율신경계의 조절을 중심으로 스트레스와 트라우마의 영향을 이해합니다. 심리치료뿐 아니라 의료, 코칭, 교육 등 여러 전문 영역에서 각자의 업무 범위 안에서 활용되는 신체 지향 모델이라는 점도 특징입니다."],
      },
      {
        heading: "무엇이 더 좋은가보다, 누구에게 어떤 방식이 맞는지가 중요합니다",
        paragraphs: ["두 접근 모두 실제 적용은 훈련 수준과 전문가의 기본 자격, 내담자의 상태에 따라 달라집니다. 트라우마 작업에서는 몸에 주의를 기울이는 것 자체가 불편하거나 압도적일 수도 있으므로, 안전감과 속도 조절이 중요합니다."],
        note: "SP와 SE의 차이는 몇 개의 기법 목록만으로 완전히 구분하기 어렵습니다. 치료를 선택할 때에는 접근법 이름뿐 아니라 치료자의 훈련, 기본 전문자격, 현재 어려움에 대한 경험을 함께 확인하세요.",
      },
    ],
    takeaway: "SP와 SE는 모두 몸을 변화의 통로로 보지만, SP는 심리치료 안에서 신체·정서·인지·애착의 통합을, SE는 신경계와 생존 반응의 조절을 특히 강조합니다.",
  },
  {
    slug: "between-session-self-care",
    category: "상담 잘 이용하기",
    categoryEn: "BETWEEN SESSIONS",
    title: "상담과 상담 사이의 시간을 어떻게 보내면 좋을까요?",
    description: "상담 내용을 계속 분석하기보다, 일상에서 나를 살피고 다음 회기로 연결하는 간단한 방법을 정리했습니다.",
    topics: ["상담 과정", "회기 사이", "자기돌봄", "기록", "상담 관계"],
    relatedServices: ["individual", "couple", "trauma-attachment"],
    relatedTools: ["between-session-reflection", "emotion-check-in"],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    featured: true,
    readTime: "5분",
    intro: "상담은 상담실 안에서만 일어나지 않습니다. 회기에서 떠오른 감정이 며칠 뒤 이해되기도 하고, 일상에서 반복되는 장면을 새롭게 알아차리기도 합니다. 그렇다고 일주일 내내 상담 내용을 분석해야 하는 것은 아닙니다.",
    sections: [
      {
        heading: "기억하려 애쓰기보다 남아 있는 것을 관찰해보세요",
        paragraphs: ["상담이 끝난 뒤 가장 오래 남는 말, 감정, 몸의 느낌이나 장면 하나만 적어도 충분합니다. 무엇이 중요했는지는 시간이 지나며 달라질 수 있습니다."],
      },
      {
        heading: "일상에서 반복되는 순간을 자료로 모아보세요",
        bullets: ["비슷한 감정이 올라온 순간", "몸이 긴장하거나 편안해진 순간", "평소와 다른 선택을 한 순간", "말하고 싶었지만 멈춘 순간", "도움이 되었던 사람·장소·행동"],
      },
      {
        heading: "회기 사이의 돌봄은 숙제가 아니라 선택입니다",
        paragraphs: ["기록이 도움이 되는 사람도 있고, 상담 이후에는 충분히 쉬는 것이 더 필요한 사람도 있습니다. 특히 힘든 경험을 다룬 뒤에는 더 깊이 파고드는 것보다 일상 리듬과 안전감을 회복하는 것이 우선일 수 있습니다."],
        note: "기록하다가 감정이나 신체 반응이 감당하기 어려울 정도로 커진다면 중단하고 현재의 안전과 안정에 먼저 주의를 돌리세요. 필요한 경우 담당 전문가와 상의하는 것이 좋습니다.",
      },
      {
        heading: "다음 상담에 가져갈 것은 한 문장이면 충분합니다",
        paragraphs: ["‘지난 상담 이후 이것이 계속 마음에 남았어요’, ‘이런 상황에서 예전과 다른 반응을 했어요’, ‘지난 회기에서 이해되지 않았던 부분이 있어요’처럼 한 문장으로 시작할 수 있습니다."],
      },
    ],
    takeaway: "상담 사이의 시간은 상담을 잘 해내기 위한 숙제 시간이 아니라, 내 삶 속에서 무엇이 달라지고 있는지 천천히 알아차리는 시간입니다.",
  },
];

export const guideArticles: GuideArticle[] = [
  ...baseGuideArticles,
  ...additionalGuideArticles,
];

export { guideCategories };

export function getGuideArticle(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
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
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}
