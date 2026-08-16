import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StarMark } from "@/components/StarMark";

export const metadata: Metadata = {
  title: "Insight Relay",
  description: "상담과 상담 사이의 시간을 돌볼 수 있도록 준비 중인 between-session self-care service, Insight Relay를 소개합니다.",
  openGraph: {
    type: "website",
    title: "Insight Relay · 현재 개발 중",
    description: "상담과 상담 사이, 나를 살피고 돌볼 수 있도록 준비 중인 서비스입니다.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Insight Relay · 현재 개발 중",
    description: "상담과 상담 사이, 나를 살피고 돌볼 수 있도록 준비 중인 서비스입니다.",
    images: [],
  },
};

export default function InsightRelayPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relay-hero">
          <div className="shell relay-hero-grid">
            <div className="relay-hero-copy">
              <span className="relay-badge">IN DEVELOPMENT · COMING SOON</span>
              <div className="relay-brand"><StarMark size="large" /><div><strong>Insight Relay</strong><span>Between-session self-care service</span></div></div>
              <h1>상담과 상담 사이,<br /><em>나를 살피고 돌볼 수 있도록.</em></h1>
              <p>상담에서 발견한 것을 일상에서 돌아보고, 자신의 경험과 상태를 살피며 다음 상담까지의 시간을 돌볼 수 있도록 돕는 between-session self-care service를 준비하고 있습니다.</p>
              <strong className="relay-hero-status">현재 개발 중입니다.</strong>
              <div className="button-row"><Link className="button button-light" href="/contact">개발 소식 문의 ↗</Link></div>
            </div>
            <div className="relay-status-visual" aria-hidden="true">
              <span className="relay-status-orbit relay-status-orbit-outer" />
              <span className="relay-status-orbit relay-status-orbit-inner" />
              <StarMark size="hero" />
              <small>BETWEEN<br />SESSION<br />SELF-CARE</small>
              <b>COMING SOON</b>
            </div>
          </div>
          <div className="relay-marquee" aria-hidden="true"><span>IN DEVELOPMENT · INSIGHT RELAY · COMING SOON · IN DEVELOPMENT · INSIGHT RELAY ·</span></div>
        </section>

        <section className="section relay-problem"><div className="shell relay-problem-grid"><div><span className="section-kicker">THE SPACE BETWEEN</span><h2>상담에서 발견한 것이<br />일상에서도 이어지도록.</h2></div><div><p>상담과 다음 상담 사이에도 각자의 삶과 마음은 계속 움직입니다.</p><p>Insight Relay는 그 시간을 스스로 살피고 돌볼 수 있도록 돕는 별도의 디지털 self-care service로 준비하고 있습니다. 구체적인 이용 방식은 충분히 검토한 뒤 공개하겠습니다.</p><blockquote>“상담과 상담 사이의 시간을 돌보는 연결.”</blockquote></div></div></section>

        <section className="relay-boundary"><div className="shell relay-boundary-grid"><div><StarMark size="hero" /><span>BUILT WITH CARE</span></div><div><h2>분명한 경계 안에서<br />안전하게 설계합니다.</h2><ul><li><strong>상담을 대체하지 않습니다.</strong><span>진단, 치료, 위기 개입을 제공하는 AI 상담 서비스가 아닙니다.</span></li><li><strong>필요한 정보만 다룹니다.</strong><span>정식 출시 전 개인정보 처리와 동의 구조를 투명하게 안내합니다.</span></li><li><strong>사람과 사람의 연결을 돕습니다.</strong><span>기술보다 상담 관계와 사용자의 선택권을 앞에 둡니다.</span></li></ul></div></div></section>

        <section className="relay-waitlist"><div className="shell"><span className="relay-badge">IN DEVELOPMENT · COMING SOON</span><h2>Insight Relay는<br />지금 조심스럽게 만들어지고 있습니다.</h2><p>개발 소식이나 상담자·기관 협업에 관심이 있다면 문의를 남겨주세요.</p><Link className="button button-primary" href="/contact">개발 소식 문의하기 ↗</Link></div></section>
      </main>
      <Footer />
    </>
  );
}
