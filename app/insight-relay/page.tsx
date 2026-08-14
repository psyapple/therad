import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StarMark } from "@/components/StarMark";

export const metadata: Metadata = {
  title: "Insight Relay",
  description: "상담에서 발견한 것을 일상으로 가져가고 다음 상담까지의 경험을 이어가는 between-session support, Insight Relay를 소개합니다.",
};

const relaySteps = [
  ["BEFORE", "상담 전", "오늘의 상태와 지난 회기 이후 중요한 순간을 짧게 돌아봅니다."],
  ["SESSION", "상담", "상담자와 함께 발견한 문장, 감정, 몸의 신호와 다음 주의 초점을 정리합니다."],
  ["BETWEEN", "상담 사이", "일상에서 경험을 기록하고, 다음 상담에서 이어가고 싶은 것을 놓치지 않습니다."],
];

export default function InsightRelayPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relay-hero">
          <div className="shell relay-hero-grid">
            <div className="relay-hero-copy">
              <span className="relay-badge">PRODUCT PREVIEW · IN DEVELOPMENT</span>
              <div className="relay-brand"><StarMark size="large" /><div><strong>Insight Relay</strong><span>by 새벽별</span></div></div>
              <h1>상담과 상담 사이에도<br /><em>마음의 흐름은 이어집니다.</em></h1>
              <p>상담에서 발견한 것을 일상으로 가져가고, 다음 회기까지의 경험을 이어가는 새벽별의 between-session support.</p>
              <div className="button-row"><a className="button button-light" href="#how-it-works">어떻게 이어지는지 보기 ↓</a><Link className="button button-dark-ghost" href="/contact">업데이트 문의 ↗</Link></div>
            </div>
            <div className="relay-device" aria-label="Insight Relay 서비스 화면 개념 미리보기">
              <div className="device-top"><span>9:41</span><span>✦ INSIGHT RELAY</span><span>•••</span></div>
              <div className="device-greeting"><small>8월 13일 · 목요일</small><h2>오늘 마음은<br />어디쯤 있나요?</h2><p>정답을 찾기보다 지금의 경험을 잠깐 바라봅니다.</p></div>
              <div className="mood-row"><span>고요함</span><span className="selected">조금 긴장</span><span>복잡함</span></div>
              <div className="device-card"><small>TODAY&apos;S NOTE</small><p>오늘 가장 오래 남은<br />감정이나 장면이 있나요?</p><span>기록 시작하기 →</span></div>
              <div className="device-nav"><span>●<small>오늘</small></span><span>○<small>기록</small></span><span>✦<small>연결</small></span></div>
            </div>
          </div>
          <div className="relay-marquee" aria-hidden="true"><span>REFLECT · CONNECT · CONTINUE · REFLECT · CONNECT · CONTINUE ·</span></div>
        </section>

        <section className="section relay-problem"><div className="shell relay-problem-grid"><div><span className="section-kicker">THE SPACE BETWEEN</span><h2>50분의 상담이<br />삶의 1주일과 연결되도록.</h2></div><div><p>상담이 끝난 뒤 중요한 말을 잊어버리거나, 다음 회기에서 무엇부터 이야기할지 막막할 때가 있습니다.</p><p>Insight Relay는 상담을 대체하는 AI가 아닙니다. 상담자와 내담자가 함께 만든 이해를 일상 속 경험과 다시 연결하기 위한 조용한 다리입니다.</p><blockquote>“회기와 회기 사이의 연결을 더 선명하게.”</blockquote></div></div></section>

        <section className="section relay-flow" id="how-it-works"><div className="shell"><div className="section-head"><div><span className="section-kicker">HOW IT WORKS</span><h2>경험이 사라지지 않도록 잇습니다</h2></div><span className="section-count">03 MOMENTS</span></div><div className="relay-step-grid">{relaySteps.map(([en,title,copy], index) => <article key={en}><div className="relay-step-visual"><span>{String(index + 1).padStart(2,"0")}</span><b aria-hidden="true">✦</b><i /></div><small>{en}</small><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="section relay-features"><div className="shell relay-features-grid"><div className="sticky-copy"><span className="section-kicker">DESIGNED FOR CONTINUITY</span><h2>기록을 늘리는 도구보다,<br />연결을 돕는 경험.</h2><p>필요한 만큼만 기록하고, 상담의 리듬을 방해하지 않도록 설계합니다.</p></div><div className="feature-stack"><article><span>01</span><h3>오늘의 상태 체크</h3><p>감정과 몸의 감각을 짧게 알아차리고, 지금의 상태를 말로 붙잡습니다.</p></article><article><span>02</span><h3>회기 사이의 사건 기록</h3><p>일상에서 반복된 장면과 작은 변화를 기억해 다음 상담의 실마리로 가져갑니다.</p></article><article><span>03</span><h3>상담 후 핵심 정리</h3><p>상담에서 발견한 것과 다음 회기까지 기억하고 싶은 문장을 함께 남깁니다.</p></article><article><span>04</span><h3>다음 상담으로 연결</h3><p>말하고 싶었던 것을 잊지 않고, 상담자와 더 빠르게 중요한 지점에서 시작합니다.</p></article></div></div></section>

        <section className="relay-boundary"><div className="shell relay-boundary-grid"><div><StarMark size="hero" /><span>BUILT WITH CARE</span></div><div><h2>분명한 경계 안에서<br />안전하게 설계합니다.</h2><ul><li><strong>상담을 대체하지 않습니다.</strong><span>진단, 치료, 위기 개입을 제공하는 AI 상담 서비스가 아닙니다.</span></li><li><strong>필요한 정보만 다룹니다.</strong><span>정식 출시 전 개인정보 처리와 동의 구조를 투명하게 안내합니다.</span></li><li><strong>사람과 사람의 연결을 돕습니다.</strong><span>기술보다 상담 관계와 사용자의 선택권을 앞에 둡니다.</span></li></ul></div></div></section>

        <section className="relay-waitlist"><div className="shell"><span className="relay-badge">CURRENTLY IN DEVELOPMENT</span><h2>Insight Relay는<br />지금 조심스럽게 만들어지고 있습니다.</h2><p>출시 소식, 상담자·기관 협업, 사용자 테스트에 관심이 있다면 문의를 남겨주세요.</p><Link className="button button-primary" href="/contact">Insight Relay 문의하기 ↗</Link></div></section>
      </main>
      <Footer />
    </>
  );
}
