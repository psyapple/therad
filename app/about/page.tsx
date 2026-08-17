import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { BrandLogo } from "@/components/BrandLogo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { careerBlogUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "새벽별 소개",
  description: "CARE, GUIDE, TOOLS를 통해 복잡한 마음을 삶에서 사용할 수 있는 언어와 도구로 번역하는 새벽별을 소개합니다.",
};

const values = [
  { number: "01", title: "안전이 먼저입니다", copy: "빠른 해답보다 충분히 말할 수 있는 관계, 감당할 수 있는 속도, 분명한 경계를 중요하게 생각합니다." },
  { number: "02", title: "맥락을 함께 봅니다", copy: "증상만 떼어 보지 않고 감정, 관계, 몸의 반응과 그 사람이 살아온 환경을 함께 이해합니다." },
  { number: "03", title: "삶으로 번역합니다", copy: "전문적인 심리학이 상담실 안의 설명으로 끝나지 않고 일상의 선택과 돌봄으로 이어지게 합니다." },
];

const education = [
  "숙명여자대학교 아동심리치료 박사수료",
  "숙명여자대학교 아동심리치료 석사졸업",
  "가톨릭대학교 심리학 / 아동학 졸업",
];

const workAreas = [
  { title: "심리서비스", items: ["심리상담", "심리평가"] },
  { title: "심리교육", items: ["심리교육", "심리워크숍 기획", "상담사 대상 교육"] },
  { title: "기관 프로그램", items: ["교육청 프로그램", "정부지원사업", "외부 심리·정서 프로그램"] },
  { title: "COLLABORATION", items: ["웰니스 협업", "콘텐츠 협업", "기관·기업 프로그램"] },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="ABOUT SAEBYEOKBYEOL"
          index="01"
          title={<>이해를 통해,<br /><em>당신만의 고유성이 빛나도록.</em></>}
          description="새벽별은 상담, 심리평가, 심리교육과 마음도구를 통해 자신과 서로를 이해하고 삶에서 사용할 수 있는 방식으로 연결합니다."
        />

        <section className="section manifesto-section">
          <div className="shell manifesto-grid">
            <div className="manifesto-mark">
              <BrandLogo size="feature" />
              <span>새벽별의 공식 Brand Symbol</span>
            </div>
            <div className="manifesto-copy">
              <span className="section-kicker">OUR STORY</span>
              <h2>내 마음과 서로의 마음을 이해하고 나면<br />우리는 연결됩니다.</h2>
              <p>이해는 복잡한 마음을 함부로 단순화하지 않으면서도, 지금의 경험을 알아차릴 수 있는 언어를 건넵니다. 이해받는 경험은 조금 더 안전해질 여지를 만들고, 안정은 회복을 위한 새로운 선택으로 이어집니다.</p>
              <p>새벽별은 상담하고, 평가하고, 연구하고, 설명합니다. 상담실에서 발견한 이해가 관계와 일상에서 사용할 수 있는 방식으로 번역되고 더 넓은 연결로 확장되도록 돕습니다.</p>
              <blockquote>“이해 — 안정 — 회복 — 연결 — 일상으로의 번역과 확장”</blockquote>
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
              <p>새벽별은 상담심리와 애착·트라우마에 대한 이해를 바탕으로 정서·관계·신체 기반의 관점을 통합합니다.</p>
              <p>어떤 이론도 한 사람보다 앞서지 않도록, 내담자의 속도와 문화적 맥락을 존중하며 지속적인 교육과 수련을 이어갑니다.</p>
              <div className="practitioner-facts">
                <div><span>ROLE</span><strong>새벽별심리상담센터 대표</strong></div>
                <div><span>PROFESSIONAL QUALIFICATION</span><strong>한국상담심리학회 상담심리사 2급</strong></div>
                <div><span>TRAINING &amp; APPROACH</span><strong>AEDP · Sensorimotor Psychotherapy(SP) 기반</strong></div>
              </div>
              <div className="education-note">
                <span className="section-kicker">EDUCATION</span>
                <ul>{education.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <a className="practitioner-source arrow-link" href={careerBlogUrl} target="_blank" rel="noreferrer noopener">세부 경력과 활동 기록 보기 <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="section beyond-section">
          <div className="shell">
            <div className="section-head">
              <div><span className="section-kicker">BEYOND THE COUNSELING ROOM</span><h2>상담실 밖에서도<br />이해를 연결합니다.</h2></div>
              <p>개인과 관계를 위한 심리서비스부터 교육, 기관 프로그램, 웰니스 협업까지 전문적인 심리학을 필요한 현장에 맞게 설계합니다.</p>
            </div>
            <div className="work-area-grid">
              {workAreas.map((area, index) => (
                <article key={area.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{area.title}</h3>
                  <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="shell about-cta-grid">
            <div><span className="section-kicker">WORK WITH SAEBYEOKBYEOL</span><h2>필요한 방식으로<br />함께 시작해보세요.</h2></div>
            <div className="about-cta-actions">
              <Link className="button button-primary" href="/care">상담·심리평가 알아보기 →</Link>
              <Link className="button button-ghost" href="/contact?type=collab">교육·협업 문의하기 →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
