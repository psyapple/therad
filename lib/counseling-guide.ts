import sources from "@/data/content-sources.json";

export const counselingGuide = {
  title: "PSYAPPLE 심리상담 가이드",
  url: sources.counselingGuide.publicUrl,
  description: "PSYAPPLE의 공개 글에서 자주 다룬 질문을 주제별로 정리했습니다. 상담이 처음이거나, 일상에서 나와 아이의 마음을 이해하고 싶을 때 필요한 부분부터 찾아보세요.",
  topics: [
    {
      title: "상담의 시작과 과정",
      description: "상담사를 고를 때 무엇을 물어볼지, 첫 회기에는 어떤 이야기를 나누는지, 진행 중 불편함이나 종결을 어떻게 의논할지 살펴봅니다.",
    },
    {
      title: "일상의 자기돌봄",
      description: "쉴 때조차 잘해야 한다는 부담이나 관계에서 지키고 싶은 경계를 알아차리는 데 도움이 되는 글을 모았습니다.",
    },
    {
      title: "아동·청소년 상담",
      description: "아이에게 상담을 어떻게 설명할지, 보호자와 상담사가 어떻게 협력하고 갈등 뒤에 관계를 다시 이어갈지 다룹니다.",
    },
  ],
};
