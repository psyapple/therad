import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { careServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "CARE · 심리상담",
  description: "개인 심리상담, 커플·부부상담, 놀이치료·양육코칭, 심리평가, 트라우마·애착 상담을 안내합니다.",
};

const steps = [
  ["01", "문의", "원하는 상담과 가능한 일정을 남겨주세요. 자세한 개인사는 첫 문의에 적지 않아도 됩니다."],
  ["02", "초기 상담", "지금의 어려움과 기대를 함께 정리하고 상담 방식, 목표, 빈도를 상의합니다."],
  ["03", "상담 진행", "정기적인 만남 속에서 경험을 이해하고 새로운 반응과 선택을 만들어갑니다."],
  ["04", "점검과 종결", "변화와 남은 과제를 돌아보고, 이후에 사용할 자원과 돌봄 계획을 정리합니다."],
];

export default function CarePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="CARE · PSYCHOLOGICAL SERVICES"
          index="02"
          tone="night"
          title={<>말로 다 설명할 수 없어도,<br /><em>함께 이해해갈 수 있습니다.</em></>}
          description="새벽별의 상담은 문제를 빠르게 고치는 것보다, 마음과 몸의 반응이 생겨난 이유를 안전한 관계 안에서 함께 이해하는 데서 시작합니다."
        />

        <section className="section care-intro">
          <div className="shell intro-grid">
            <h2>마음은 관계 안에서 다치기도 하지만,<br /><span>관계 안에서 다시 움직이기도 합니다.</span></h2>
            <div className="intro-copy"><p>한 사람을 증상이나 진단으로 줄이지 않습니다. 지금의 반응이 나를 지켜온 방식일 수 있음을 존중하고, 감당할 수 있는 속도로 새로운 경험을 만들어갑니다.</p></div>
          </div>
        </section>

        <section className="section care-services">
          <div className="shell">
            <div className="section-head"><div><span className="section-kicker">OUR SERVICES</span><h2>지금 필요한 상담을 살펴보세요</h2></div><span className="section-count">05 SERVICES</span></div>
            <div className="care-detail-list">
              {careServices.map((service, index) => (
                <article className="care-detail" id={service.id} key={service.id}>
                  <div className="care-detail-head"><span>0{index + 1}</span><small>{service.english}</small></div>
                  <div className="care-detail-main"><h2>{service.title}</h2><p>{service.description}</p><Link className="text-link care-detail-link" href={`/care/${service.id}`}>자세히 보기 <span>→</span></Link></div>
                  <div className="care-detail-for"><strong>이런 때 살펴볼 수 있어요</strong><ul>{service.forWhom.map((item) => <li key={item}>{item}</li>)}</ul><small>{service.note}</small></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="shell">
            <div className="section-head"><div><span className="section-kicker">HOW IT WORKS</span><h2>상담은 이렇게 이어집니다</h2></div></div>
            <div className="process-grid">{steps.map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-grid">
            <div><span className="section-kicker">BEFORE YOU BEGIN</span><h2>상담 전 자주 묻는 질문</h2><p>더 궁금한 내용은 문의 채널에서 편하게 물어보세요.</p></div>
            <div className="faq-list">
              <details><summary>어떤 상담을 선택해야 할지 모르겠어요.<span>＋</span></summary><p>괜찮습니다. 첫 문의에서 현재 가장 궁금한 점을 간단히 알려주시면 초기 상담에서 적절한 방식과 우선순위를 함께 정리합니다.</p></details>
              <details><summary>상담은 보통 얼마나 오래 받나요?<span>＋</span></summary><p>어려움의 성격과 목표에 따라 다릅니다. 초기 상담에서 예상할 수 있는 방향을 설명하고, 진행 중에도 주기적으로 목표와 도움이 되는 정도를 점검합니다.</p></details>
              <details><summary>상담 내용은 비밀이 보장되나요?<span>＋</span></summary><p>상담 내용과 기록은 관련 윤리 기준에 따라 보호됩니다. 다만 자신이나 타인의 안전에 즉각적인 위험이 있는 경우 등 비밀보장의 예외가 있으며 시작 전 구체적으로 안내합니다.</p></details>
              <details><summary>상담이 잘 맞지 않으면 어떻게 하나요?<span>＋</span></summary><p>불편함과 의문을 상담자에게 직접 말할 수 있습니다. 그 대화 자체를 함께 다루고, 다른 지원이 더 적절하다면 연결 방향을 논의합니다.</p></details>
              <details><summary>비용과 일정은 어디에서 확인하나요?<span>＋</span></summary><p>상담 유형과 진행 방식에 따라 달라질 수 있어 문의 시 현재 가능한 시간, 회기 비용, 취소 및 변경 규정을 먼저 안내합니다.</p></details>
            </div>
          </div>
        </section>

        <section className="care-cta"><div className="shell"><span>READY WHEN YOU ARE</span><h2>어떤 이야기부터 해야 할지<br />정리되지 않아도 괜찮습니다.</h2><p>지금 가장 궁금한 한 가지에서 시작해보세요.</p><Link className="button button-light" href="/contact">상담 문의 방법 보기 ↗</Link></div></section>
      </main>
      <Footer />
    </>
  );
}

