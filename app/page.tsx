import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SourceStream } from "@/components/SourceStream";
import { StarMark } from "@/components/StarMark";
import { careServices, guideArticles } from "@/lib/content";

const pillars = [
  {
    index: "01",
    eyebrow: "CARE",
    title: "전문적인 상담과 심리서비스",
    copy: "말로 설명하기 어려운 마음도 관계 안에서 안전하게 만나고 이해합니다.",
    href: "/care",
    link: "상담 알아보기",
    tone: "navy",
  },
  {
    index: "02",
    eyebrow: "GUIDE",
    title: "누구나 이해할 수 있는 심리학",
    copy: "복잡한 심리학을 상담을 선택하고 일상을 돌보는 데 쓸 수 있는 언어로 번역합니다.",
    href: "/guide",
    link: "가이드 읽기",
    tone: "apricot",
  },
  {
    index: "03",
    eyebrow: "INSIGHT RELAY",
    title: "상담과 상담 사이를 잇는 연결",
    copy: "한 회기에서 발견한 것을 다음 회기까지 놓치지 않도록 경험의 흐름을 이어갑니다.",
    href: "/insight-relay",
    link: "서비스 알아보기",
    tone: "lavender",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-sky" aria-hidden="true">
            <span className="sky-dot dot-a" />
            <span className="sky-dot dot-b" />
            <span className="sky-dot dot-c" />
            <span className="sky-line" />
          </div>
          <div className="shell hero-inner">
            <div className="hero-copy reveal-up">
              <div className="eyebrow-line">
                <StarMark size="small" />
                <span>Psychology for Everyday Life</span>
              </div>
              <h1>
                마음을 이해하는 일이
                <br />
                <em>살아가는 데 도움이 되도록.</em>
              </h1>
              <p>
                새벽별은 상담하고, 연결하고,
                <br className="desktop-break" /> 심리학을 삶에서 사용할 수 있는 형태로 만듭니다.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href="/care">
                  상담 알아보기 <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button-ghost" href="/guide">
                  심리상담 GUIDE <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="hero-orbit reveal-up delay-1" aria-hidden="true">
              <div className="orbit-ring orbit-ring-outer" />
              <div className="orbit-ring orbit-ring-inner" />
              <div className="hero-star"><StarMark size="hero" /></div>
              <span className="orbit-label orbit-label-one">이해</span>
              <span className="orbit-label orbit-label-two">연결</span>
              <span className="orbit-label orbit-label-three">회복</span>
              <span className="orbit-note">NIGHT<br />TO DAWN</span>
            </div>
          </div>
          <div className="shell hero-foot">
            <span>SCROLL TO EXPLORE</span>
            <span className="hero-foot-line" />
            <span>SEOUL · ONLINE</span>
          </div>
        </section>

        <section className="section intro-section">
          <div className="shell">
            <div className="section-kicker">OUR APPROACH</div>
            <div className="intro-grid">
              <h2>
                상담실 안에서 시작된 변화가
                <br />
                <span>일상에서도 이어질 수 있도록.</span>
              </h2>
              <div className="intro-copy">
                <p>
                  마음은 한 가지 설명으로 정리되지 않습니다. 새벽별은 지금의 어려움뿐 아니라
                  관계, 감정, 몸의 감각과 살아온 맥락을 함께 봅니다.
                </p>
                <p>
                  이해에서 멈추지 않고 오늘의 삶에서 실제로 써볼 수 있는 언어와 경험으로
                  연결합니다.
                </p>
              </div>
            </div>

            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <Link className={`pillar-card tone-${pillar.tone}`} href={pillar.href} key={pillar.eyebrow}>
                  <div className="pillar-top">
                    <span>{pillar.index}</span>
                    <span className="pillar-arrow" aria-hidden="true">↗</span>
                  </div>
                  <div>
                    <span className="pillar-eyebrow">{pillar.eyebrow}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.copy}</p>
                  </div>
                  <span className="text-link">{pillar.link}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section path-section">
          <div className="shell path-grid">
            <div className="path-heading">
              <div className="section-kicker">START HERE</div>
              <h2>지금 필요한 길에서<br />시작하세요.</h2>
              <p>상담이 필요한 순간과, 먼저 정보를 살펴보고 싶은 순간은 다를 수 있으니까요.</p>
            </div>
            <div className="path-options">
              <Link className="path-option" href="/care">
                <span className="path-number">A</span>
                <div>
                  <span className="path-label">마음을 함께 살펴볼 사람이 필요하다면</span>
                  <h3>상담을 알아보고 있어요</h3>
                  <p>상담 분야, 진행 과정, 자주 묻는 질문을 먼저 확인해보세요.</p>
                </div>
                <span className="path-circle" aria-hidden="true">→</span>
              </Link>
              <Link className="path-option" href="/guide">
                <span className="path-number">B</span>
                <div>
                  <span className="path-label">조금 더 이해한 뒤 결정하고 싶다면</span>
                  <h3>정보를 먼저 읽어볼래요</h3>
                  <p>상담 선택부터 심리치료와 마음에 관한 가이드를 살펴보세요.</p>
                </div>
                <span className="path-circle" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relay-feature">
          <div className="relay-stars" aria-hidden="true">
            <span>✦</span><span>·</span><span>✦</span><span>·</span><span>✦</span>
          </div>
          <div className="shell relay-feature-grid">
            <div className="relay-title">
              <span className="relay-badge">IN DEVELOPMENT · 2026</span>
              <h2>
                상담은 한 회기로 끝나지만,
                <br />
                <em>마음의 변화는 그 사이에도 계속됩니다.</em>
              </h2>
            </div>
            <div className="relay-copy">
              <div className="relay-wordmark">
                <StarMark size="medium" />
                <div>
                  <strong>Insight Relay</strong>
                  <span>by 새벽별</span>
                </div>
              </div>
              <p>
                상담에서 발견한 것을 일상으로 가져가고, 다음 상담까지의 경험을 이어가는
                새벽별의 between-session support.
              </p>
              <Link className="light-link" href="/insight-relay">
                Insight Relay 알아보기 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section services-section">
          <div className="shell">
            <div className="section-head">
              <div>
                <div className="section-kicker">CARE</div>
                <h2>마음을 만나는 여러 가지 방식</h2>
              </div>
              <Link className="text-link arrow-link" href="/care">전체 서비스 보기 <span>→</span></Link>
            </div>
            <div className="service-list">
              {careServices.slice(0, 5).map((service, index) => (
                <Link className="service-row" href={`/care#${service.id}`} key={service.id}>
                  <span className="service-index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <span className="service-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section guide-preview">
          <div className="shell">
            <div className="section-head">
              <div>
                <div className="section-kicker">RECENT GUIDE</div>
                <h2>알고 나면 덜 막막해지는 것들</h2>
              </div>
              <Link className="text-link arrow-link" href="/guide">GUIDE 전체 보기 <span>→</span></Link>
            </div>
            <div className="guide-card-grid">
              {guideArticles.slice(0, 3).map((article, index) => (
                <Link className="guide-card" href={`/guide/${article.slug}`} key={article.slug}>
                  <div className={`guide-art guide-art-${index + 1}`} aria-hidden="true">
                    <span className="guide-art-label">{article.categoryEn}</span>
                    <span className="guide-art-star">✦</span>
                    <span className="guide-art-orbit" />
                  </div>
                  <div className="guide-card-body">
                    <span className="guide-meta">{article.category} · {article.readTime}</span>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className="text-link">읽어보기 <span>→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <SourceStream compact />

        <section className="closing-cta">
          <div className="shell closing-grid">
            <div>
              <span className="section-kicker">A QUIET PLACE TO BEGIN</span>
              <h2>마음을 이해하는 첫걸음,<br />새벽별에서 함께 시작해요.</h2>
            </div>
            <div className="closing-action">
              <p>어떤 상담이 맞을지 아직 모르겠어도 괜찮습니다. 지금 궁금한 것부터 남겨주세요.</p>
              <Link className="button button-primary" href="/contact">문의 방법 보기 <span>↗</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
