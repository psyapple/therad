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

export type GuideSection = { heading: string; paragraphs?: string[]; bullets?: string[]; note?: string };
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
  intro: string;
  sections: GuideSection[];
  takeaway: string;
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "choosing-a-therapist",
    category: "상담 시작하기",
    categoryEn: "STARTING THERAPY",
    title: "나에게 맞는 상담자를 고르는 기준",
    description: "자격, 전문 분야, 첫 만남에서 확인할 것까지. 막막한 선택을 조금 더 분명하게 만드는 질문들.",
    topics: ["상담자 선택", "전문성", "첫 상담", "상담 관계"],
    relatedServices: ["individual", "couple", "child-parent", "trauma-attachment"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: true,
    readTime: "7분",
    intro: "상담자를 찾는 일은 마음이 힘든 와중에 또 하나의 어려운 선택을 감당하는 일입니다. 유명한 사람보다 중요한 것은, 적절한 훈련을 받았고 내 어려움을 함께 다룰 준비가 되어 있는 사람인지 확인하는 것입니다.",
    sections: [
      { heading: "자격의 이름보다 훈련 과정을 확인하세요", paragraphs: ["‘상담’, ‘심리’, ‘치료’라는 말은 매우 넓게 쓰입니다. 자격명 하나만 보기보다 어떤 전공과 수련을 거쳤는지, 지속적으로 지도감독을 받는지, 윤리규정을 따르는 전문 학회에 소속되어 있는지 살펴보세요."] },
      { heading: "나의 어려움과 상담자의 경험이 만나는지", paragraphs: ["불안, 우울, 트라우마, 커플 갈등, 아동 문제는 필요한 경험과 접근이 다를 수 있습니다. 상담자가 모든 분야의 전문가일 필요는 없지만, 내 주제를 다뤄본 경험과 필요할 때 다른 전문가에게 연결할 기준은 있어야 합니다."], bullets: ["현재 가장 힘든 문제를 어떻게 이해하는지", "비슷한 어려움을 주로 다루는지", "상담의 진행 방식과 예상할 수 있는 변화", "약물치료나 다른 지원이 필요할 때 어떻게 협력하는지"] },
      { heading: "첫 만남에서 느낀 안전함도 중요한 정보입니다", paragraphs: ["첫 회기부터 편안할 필요는 없습니다. 낯설고 긴장되는 것이 자연스럽습니다. 다만 질문할 수 있는 분위기인지, 설명이 충분한지, 경계와 비용·취소 규정이 명확한지, 내 속도를 존중하는지는 살펴볼 수 있습니다."], note: "불편함이 생겼을 때 말해볼 수 있고, 그 대화를 상담자가 방어하지 않고 함께 다룰 수 있는 관계인지가 중요합니다." },
    ],
    takeaway: "좋은 상담자를 고르는 일은 완벽한 사람을 찾는 일이 아니라, 전문성과 투명성 그리고 함께 말해볼 수 있는 관계를 확인하는 과정입니다.",
  },
  {
    slug: "before-your-first-session",
    category: "상담 시작하기",
    categoryEn: "FIRST SESSION",
    title: "첫 상담 전, 무엇을 준비하면 좋을까요?",
    description: "잘 말해야 한다는 부담 없이 첫 회기를 시작하기 위해 알아두면 좋은 것들.",
    topics: ["첫 상담", "상담 준비", "초기 상담"],
    relatedServices: ["individual", "couple", "child-parent"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: true,
    readTime: "5분",
    intro: "처음 상담실에 들어가기 전에는 ‘어디서부터 말해야 하지?’, ‘내 문제가 상담받을 만큼 큰가?’ 같은 생각이 들 수 있습니다. 첫 상담은 정답을 말하는 자리가 아니라, 무엇이 필요한지 함께 알아가는 시작입니다.",
    sections: [
      { heading: "이야기를 완벽하게 정리하지 않아도 됩니다", paragraphs: ["최근 가장 자주 떠오르는 장면, 몸이 힘들어지는 순간, 반복해서 걱정되는 것 중 하나만 가져와도 충분합니다. 말이 엉키거나 기억이 잘 나지 않는 것도 상담에서 다룰 수 있는 중요한 정보입니다."] },
      { heading: "궁금한 것은 직접 물어보세요", bullets: ["상담은 보통 어떤 방식으로 진행되나요?", "제 이야기는 어떻게 보호되나요?", "회기 빈도와 취소 규정은 어떻게 되나요?", "상담이 맞지 않는다고 느낄 때는 어떻게 말하면 되나요?"] },
      { heading: "첫 회기 뒤에는 이렇게 돌아보세요", paragraphs: ["모든 것이 해결되었는지가 아니라, 조금이라도 이해받았는지, 내가 궁금한 것을 물을 수 있었는지, 다음 이야기를 이어가볼 여지가 느껴지는지를 살펴보세요."], note: "첫 만남의 어색함과 안전하지 않다는 느낌은 다릅니다. 설명하기 어려운 불편함도 상담자에게 말해볼 수 있습니다." },
    ],
    takeaway: "첫 상담에 필요한 가장 중요한 준비는 잘 말하는 능력이 아니라, 지금의 나로 와도 된다는 허락입니다.",
  },
  {
    slug: "is-therapy-working",
    category: "상담 잘 이용하기",
    categoryEn: "USING THERAPY",
    title: "상담이 잘 되고 있는지 확인하는 법",
    description: "변화가 더디게 느껴질 때 살펴볼 신호와 상담자에게 꺼내볼 질문을 정리했습니다.",
    topics: ["상담 과정", "변화", "상담 목표", "상담 관계"],
    relatedServices: ["individual", "couple", "trauma-attachment"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: true,
    readTime: "6분",
    intro: "상담의 변화는 늘 선명한 상승선으로 나타나지 않습니다. 힘든 이야기를 다루며 잠시 더 예민해지기도 하고, 큰 사건보다 작은 선택과 관계의 차이로 먼저 드러나기도 합니다.",
    sections: [
      { heading: "작은 변화도 변화입니다", bullets: ["감정을 알아차리는 시간이 조금 빨라졌다", "반복되는 상황에서 잠깐 멈출 수 있게 되었다", "필요한 것을 말하거나 경계를 세우는 순간이 생겼다", "나를 비난하는 대신 이해하려는 문장이 떠오른다"] },
      { heading: "방향을 함께 점검할 수 있어야 합니다", paragraphs: ["처음 세운 목표가 지금도 중요한지, 무엇이 도움이 되었고 막혔는지, 상담의 초점과 속도가 적절한지 주기적으로 대화할 수 있어야 합니다."] },
      { heading: "이 질문을 그대로 가져가도 됩니다", bullets: ["요즘 상담이 어디로 가고 있는지 잘 모르겠어요.", "제가 달라지고 있는지 함께 점검해보고 싶어요.", "이 이야기를 반복하는 것이 어떤 의미인지 궁금해요.", "지금 방식이 저에게 맞는지 솔직히 이야기하고 싶어요."], note: "상담에 대한 질문과 불만은 관계를 망치는 말이 아니라, 더 실제적인 상담을 만드는 자료가 될 수 있습니다." },
    ],
    takeaway: "상담이 잘 되고 있는지는 힘든 감정이 사라졌는지만이 아니라, 그 감정을 대하는 선택지가 넓어지고 있는지로도 확인할 수 있습니다.",
  },
  {
    slug: "attachment-and-trauma",
    category: "마음 이해하기",
    categoryEn: "ATTACHMENT",
    title: "애착과 트라우마는 어떻게 연결될까요",
    description: "가까워지고 싶은 마음과 다치지 않으려는 마음이 동시에 움직이는 이유.",
    topics: ["애착", "트라우마", "관계", "안전감"],
    relatedServices: ["trauma-attachment", "individual", "couple"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: false,
    readTime: "8분",
    intro: "애착은 누군가에게 의존적인 성격을 뜻하지 않습니다. 위험할 때 연결을 찾고, 안전할 때 세상을 탐색하도록 돕는 인간의 기본적인 생존 체계입니다.",
    sections: [
      { heading: "관계는 안전을 배우는 첫 환경입니다", paragraphs: ["필요할 때 누군가가 반응해주고, 감정을 함께 견뎌주는 경험이 반복되면 몸과 마음은 ‘도움을 구해도 된다’는 예측을 만듭니다. 반대로 연결이 일관되지 않거나 위협적이었다면 혼자 버티거나 관계를 강하게 확인하는 방식이 필요했을 수 있습니다."] },
      { heading: "지금의 반응은 과거에 유용했던 적응일 수 있습니다", paragraphs: ["갈등에서 얼어붙거나, 작은 거리감에도 버려질 것처럼 느끼거나, 가까워질수록 멀어지고 싶은 반응은 잘못된 성격이 아니라 몸이 안전을 지키기 위해 익힌 방식일 수 있습니다."] },
      { heading: "회복은 새로운 관계 경험을 쌓는 과정입니다", paragraphs: ["상담에서는 반응을 없애라고 요구하기보다 언제, 무엇 때문에 그 반응이 시작되는지 함께 알아차립니다. 그리고 안전한 관계 안에서 감정을 느끼고 도움을 요청하며 다시 안정되는 경험을 조금씩 연습합니다."], note: "애착 유형은 사람을 고정된 네 칸에 넣는 진단이 아닙니다. 관계와 상황에 따라 달라질 수 있는 패턴을 이해하는 지도에 가깝습니다." },
    ],
    takeaway: "관계에서 반복되는 반응에는 이유가 있습니다. 그 이유를 이해하는 순간, 오래된 생존 방식 대신 새로운 선택을 만들어갈 수 있습니다.",
  },
  {
    slug: "what-is-aedp",
    category: "심리치료 알아보기",
    categoryEn: "AEDP",
    title: "AEDP: 감정을 피하지 않고 변화로 가는 치료",
    description: "가속경험적 역동치료가 안전한 관계와 감정의 경험을 중요하게 보는 이유.",
    topics: ["AEDP", "감정", "치료 관계", "애착"],
    relatedServices: ["individual", "trauma-attachment"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: false,
    readTime: "7분",
    intro: "AEDP는 어려움을 분석하는 데서 멈추지 않고, 안전한 치료 관계 안에서 감정을 실제로 경험하고 변화의 순간을 함께 알아차리는 심리치료 접근입니다.",
    sections: [
      { heading: "혼자 견디지 않도록 돕습니다", paragraphs: ["힘든 감정을 느끼는 것만큼이나 그것을 혼자 감당해야 한다는 느낌이 사람을 압도합니다. AEDP는 상담자가 정서적으로 함께 있다는 경험을 분명하게 만들며, 내담자가 감정에 가까이 갈 수 있는 안전을 세웁니다."] },
      { heading: "방어를 없애기보다 먼저 이해합니다", paragraphs: ["생각으로만 설명하기, 웃어넘기기, 몸이 굳기 같은 반응은 감정을 피하려는 결함이 아니라 한때 나를 지켜준 방식일 수 있습니다. 그 보호 기능을 존중하면서 지금은 조금 다른 경험이 가능한지 살펴봅니다."] },
      { heading: "변화 자체도 충분히 경험합니다", paragraphs: ["슬픔을 견디고, 필요한 분노를 느끼고, 누군가에게 이해받았다는 순간이 생기면 그 변화가 몸과 마음에 어떻게 남는지 천천히 확인합니다."], note: "AEDP는 특정 진단에 자동으로 적용되는 단일 기법이 아닙니다. 개인의 상태와 목표에 맞는지 초기 상담에서 함께 판단해야 합니다." },
    ],
    takeaway: "감정은 없애야 할 문제가 아니라, 안전하게 만날 때 삶의 방향을 알려주는 정보가 될 수 있습니다.",
  },
  {
    slug: "body-remembers",
    category: "심리치료 알아보기",
    categoryEn: "SOMATIC PSYCHOLOGY",
    title: "머리로는 괜찮은데 몸은 왜 긴장할까요",
    description: "신체 기반 심리치료가 몸의 감각과 신경계 반응을 함께 살피는 이유.",
    topics: ["신체 기반 심리치료", "신경계", "긴장", "SP", "트라우마"],
    relatedServices: ["trauma-attachment", "individual"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: false,
    readTime: "6분",
    intro: "상황이 끝났다는 것을 알아도 심장이 빨리 뛰고, 어깨가 굳고, 숨이 얕아질 수 있습니다. 몸은 말보다 빠르게 위험을 판단하고 우리를 지키기 때문입니다.",
    sections: [
      { heading: "몸의 반응은 의지 부족이 아닙니다", paragraphs: ["싸우기, 도망가기, 얼어붙기 같은 생존 반응은 생각으로 선택하기 전에 시작될 수 있습니다. ‘왜 아직도 이러지?’라고 비난하기보다 지금 몸이 무엇을 위험으로 감지했는지 살펴보는 것이 출발점입니다."] },
      { heading: "감각을 알아차리는 데도 속도가 필요합니다", paragraphs: ["몸에 집중하는 것이 누구에게나 바로 편안한 것은 아닙니다. 상담에서는 비교적 괜찮은 감각과 불편한 감각 사이를 오가며 압도되지 않을 만큼만 경험합니다."] },
      { heading: "안정은 멈춰 있는 상태가 아닙니다", paragraphs: ["건강한 신경계는 늘 차분한 신경계가 아니라, 긴장한 뒤에도 다시 돌아올 수 있는 유연한 신경계에 가깝습니다."], bullets: ["발이 바닥에 닿는 감각 확인하기", "주변에서 편안한 색이나 형태 찾기", "숨을 바꾸기보다 지금의 호흡을 먼저 알아차리기", "긴장이 덜한 부위를 함께 발견하기"] },
    ],
    takeaway: "몸의 반응을 이해하면 통제해야 할 적이 아니라, 안전을 함께 찾아갈 동료로 만날 수 있습니다.",
  },
  {
    slug: "psychological-assessment-guide",
    category: "심리검사 알아보기",
    categoryEn: "ASSESSMENT",
    title: "심리검사는 나를 얼마나 설명할 수 있을까요",
    description: "검사 결과를 낙인이 아니라 더 좋은 질문을 만드는 자료로 사용하는 법.",
    topics: ["심리검사", "심리평가", "해석상담", "검사 결과"],
    relatedServices: ["assessment"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: false,
    readTime: "6분",
    intro: "심리검사는 나를 한 문장으로 판정하는 도구가 아닙니다. 일정한 조건에서 드러난 반응을 바탕으로 현재의 정서, 성격, 인지와 관계 패턴을 가설로 이해하는 과정입니다.",
    sections: [
      { heading: "먼저 검사 목적이 분명해야 합니다", paragraphs: ["같은 사람이더라도 무엇이 궁금한지에 따라 필요한 검사가 달라집니다. ‘그냥 종합검사’보다 현재의 어려움과 알고 싶은 점을 충분히 이야기한 뒤 구성을 정하는 것이 좋습니다."] },
      { heading: "점수보다 패턴과 맥락을 봅니다", paragraphs: ["하나의 높은 점수만으로 진단하거나 성격을 단정할 수 없습니다. 여러 검사 결과가 어떻게 연결되는지, 면담 내용과 생활 맥락에 부합하는지 함께 해석해야 합니다."] },
      { heading: "좋은 해석상담은 다음 선택으로 이어집니다", bullets: ["결과가 현재의 어려움과 어떻게 연결되는지", "강점과 사용 가능한 자원은 무엇인지", "상담·치료·환경 조정 중 무엇이 필요한지", "결과에 동의되지 않는 부분은 무엇인지"], note: "검사 결과는 평생 변하지 않는 신분증이 아닙니다. 현재를 이해하고 다음 도움을 선택하기 위한 지도입니다." },
    ],
    takeaway: "심리검사의 가치는 정답을 주는 데보다, 나를 더 정확하고 다정하게 이해할 질문을 만드는 데 있습니다.",
  },
  {
    slug: "ending-therapy",
    category: "상담 잘 이용하기",
    categoryEn: "ENDING THERAPY",
    title: "상담을 종결할 때 함께 확인할 것",
    description: "그만두는 통보가 아니라 변화와 관계를 충분히 정리하는 과정으로서의 종결.",
    topics: ["상담 종결", "상담 과정", "변화", "재상담"],
    relatedServices: ["individual", "couple", "trauma-attachment"],
    relatedTools: [],
    sourcePlatform: "website",
    originalUrl: null,
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    featured: false,
    readTime: "5분",
    intro: "상담의 끝은 갑자기 문을 닫는 일이 아니라, 무엇이 달라졌고 앞으로 무엇이 필요한지 함께 정리하는 중요한 과정입니다.",
    sections: [
      { heading: "끝내고 싶은 마음도 상담의 주제가 됩니다", paragraphs: ["목표를 이루어서, 비용이나 일정 때문에, 상담이 맞지 않는 것 같아서 등 이유는 다양합니다. 가능한 한 그 마음을 미리 이야기하면 실제 상황을 조정하거나 관계에서 반복되던 중요한 패턴을 이해할 기회가 생길 수 있습니다."] },
      { heading: "변화와 남은 과제를 함께 돌아봅니다", bullets: ["처음 상담을 시작할 때와 달라진 점", "도움이 되었던 경험과 나에게 맞지 않았던 방식", "다시 어려워질 때 알아차릴 신호", "스스로 활용할 자원과 도움을 요청할 사람"] },
      { heading: "다시 찾아올 수 있는 길도 확인합니다", paragraphs: ["종결은 다시는 힘들어지지 않는다는 선언이 아닙니다. 필요할 때 재상담이 가능한지, 다른 지원이 더 적절한 경우 어디로 연결할지 확인해두면 끝이 단절처럼 느껴지지 않습니다."] },
    ],
    takeaway: "잘 마무리한 상담은 관계를 잃는 경험이 아니라, 그 관계에서 얻은 것을 내 삶으로 가져가는 경험이 될 수 있습니다.",
  },
];

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
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}

export function getRelatedGuidesForService(serviceId: string, limit = 3) {
  const service = getCareService(serviceId);
  if (!service) return [];

  return service.relatedGuides
    .map(getGuideArticle)
    .filter((article) => article !== undefined)
    .slice(0, limit);
}

export function formatGuideDate(value: string) {
  return value.replaceAll("-", ".");
}
