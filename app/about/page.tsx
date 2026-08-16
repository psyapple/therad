import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { BrandLogo } from "@/components/BrandLogo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "새벽별 소개",
  description: "CARE, GUIDE, TOOLS를 통해 복잡한 마음을 삶에서 사용할 수 있는 언어와 도구로 번역하는 새벽별을 소개합니다.",
};

const values = [
  { number: "01", title: "안전이 먼저입니다", copy: "빠른 해답보다 충분히 말할 수 있는 관계, 감당할 수 있는 속도, 분명한 경계를 중요하게 생각합니다." },
  { number: "02", title: "맥락을 함께 봅니다", copy: "증상만 떼어 보지 않고 감정, 관계, 몸의 반응과 그 사람이 살아온 환경을 함께 이해합니다." },
  { number: "03", title: "삶으로 번역합니다", copy: "전문적인 심리학이 상담실 안의 설명으로 끝나지 않고 일상의 선택과 돌봄으로 이어지게 합니다." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="ABOUT SAEBYEOKBYEOL"
          index="01"
          title={<>밤과 새벽 사이,<br /><em>마음을 이해하는 곳.</em></>}
          description="새벽별은 심리상담센터를 넘어, 전문적인 심리학을 사람의 언어와 일상의 도구로 연결하는 심리서비스 브랜드입니다."
        />

        <section className="section manifesto-section">
          <div className="shell manifesto-grid">
            <div className="manifesto-mark">
              <BrandLogo size="feature" />
              <span>새벽별의 공식 Brand Symbol</span>
            </div>
            <div className="manifesto-copy">
              <span className="section-kicker">OUR STORY</span>
              <h2>이해는 마음을 설명하는 데서 끝나지 않아야 한다고 믿습니다.</h2>
              <p>좋은 심리학은 복잡한 경험을 함부로 단순화하지 않으면서도, 지금의 삶에서 붙잡을 수 있는 언어를 건넵니다.</p>
              <p>새벽별은 상담하고, 연구하고, 설명하고, 연결합니다. 전문성을 어렵게 유지하는 대신 정확하면서도 사용할 수 있는 형태로 만듭니다.</p>
              <blockquote>“연결 — 이해 — 안정 — 회복 — 일상으로의 번역”</blockquote>
            </div>
          </div>
        </section>

        <section className="section values-section">
          <div className="shell">
            <div className="section-head">
              <div><span className="section-kicker">WHAT WE VALUE</span><h2>새벽별이 중요하게 생각하는 것</h2></div>
            </div>
            <div className="value-grid">
              {values.map((value) => (
                <article className="value-card" key={value.number}>
                  <span>{value.number}</span><h3>{value.title}</h3><p>{value.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section spectrum-section">
          <div className="shell spectrum-grid">
            <div>
              <span className="section-kicker">ONE BRAND, THREE EXPERIENCES</span>
              <h2>만나고, 이해하고,<br />직접 돌볼 수 있도록.</h2>
            </div>
            <div className="spectrum-list">
              <Link href="/care"><span>CARE</span><strong>심리서비스</strong><p>개인·커플·아동 상담, 심리평가, 트라우마 상담</p><b>↗</b></Link>
              <Link href="/guide"><span>GUIDE</span><strong>심리교육</strong><p>상담 선택, 마음 이해, 심리치료와 검사에 관한 가이드</p><b>↗</b></Link>
              <Link href="/tools"><span>TOOLS</span><strong>마음도구</strong><p>읽고 이해한 것을 일상에서 직접 사용해보는 워크시트와 도구</p><b>↗</b></Link>
            </div>
          </div>
        </section>

        <section className="section practitioner-section">
          <div className="shell practitioner-grid">
            <div className="practitioner-visual" aria-hidden="true">
              <span className="portrait-moon" /><span className="portrait-star">✦</span><span className="portrait-line" />
              <small>THE PRACTICE OF<br />BEING WITH</small>
            </div>
            <div className="practitioner-copy">
              <span className="section-kicker">THE PRACTITIONER</span>
              <h2>기법보다 먼저,<br />한 사람과 함께 있는 태도.</h2>
              <p>새벽별은 상담심리와 애착·트라우마에 대한 이해를 바탕으로 AEDP와 SP 등 정서·관계·신체 기반의 관점을 통합합니다.</p>
              <p>어떤 이론도 한 사람보다 앞서지 않도록, 내담자의 속도와 문화적 맥락을 존중하며 지속적인 교육과 수련을 이어갑니다.</p>
              <div className="credential-note">
                <strong>공개 안내 기준</strong>
                <span>공개 가이드에서 한국상담심리학회 상담심리사 자격으로 활동하고 있음을 안내하고 있습니다. 세부 학력·수련·경력은 문의 과정에서 확인할 수 있습니다.</span>
              </div>
              <Link className="button button-primary" href="/contact">상담 문의하기 ↗</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
