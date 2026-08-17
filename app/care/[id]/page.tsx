import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/SiteLink";
import { CareProcess } from "@/components/CareProcess";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { careServices, defaultCareProcess, getCareService } from "@/lib/content";
import { kakaoChannelUrl } from "@/lib/contact";
import { getRelatedGuidesForService } from "@/lib/guide-all";
import { getRelatedToolsForService } from "@/lib/tools";

type CareServicePageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return careServices.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: CareServicePageProps): Promise<Metadata> {
  const service = getCareService((await params).id);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    openGraph: { type: "website", title: service.title, description: service.description, images: [] },
    twitter: { card: "summary", title: service.title, description: service.description, images: [] },
  };
}

export default async function CareServicePage({ params }: CareServicePageProps) {
  const service = getCareService((await params).id);
  if (!service) notFound();

  const relatedGuides = getRelatedGuidesForService(service.id);
  const relatedTools = getRelatedToolsForService(service.id);
  const process = service.process ?? defaultCareProcess;
  const isAssessment = service.id === "assessment";
  const sessionNotes = [...new Set(service.sessionInformation.flatMap((option) => option.notes ?? []))];

  return (
    <>
      <Header />
      <main className={`care-service-page care-service-${service.id}`}>
        <nav className="care-breadcrumb" aria-label="현재 위치">
          <div className="shell">
            <Link href="/">HOME</Link><span aria-hidden="true">/</span>
            <Link href="/care">CARE</Link><span aria-hidden="true">/</span>
            <strong>{service.title}</strong>
          </div>
        </nav>

        <PageHero
          eyebrow={`CARE · ${service.english}`}
          index="02"
          tone="night"
          title={isAssessment ? <>무엇을 알고 싶은지에서<br /><em>시작합니다.</em></> : service.title}
          description={isAssessment
            ? "검사 이름을 먼저 고르기보다 지금 무엇을 이해하고 싶은지에 따라 필요한 평가를 함께 살펴봅니다."
            : service.description}
        />

        {!isAssessment && (
          <section className="section care-suitable-section">
            <div className="shell care-service-layout">
              <div className="care-service-aside">
                <span className="section-kicker">WHEN CARE MAY HELP</span>
                <h2>이런 경우<br />이용할 수 있어요</h2>
                <p>아래 내용은 진단이나 체크리스트가 아니라, 상담을 알아볼 수 있는 여러 상황의 예입니다.</p>
              </div>
              <div className="care-service-overview">
                <ul>{service.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </section>
        )}

        {!isAssessment && service.sessionInformation.length > 0 && (
          <section className="section care-session-section">
            <div className="shell">
              <div className="section-head">
                <div><span className="section-kicker">SESSION INFORMATION</span><h2>시간과 비용</h2></div>
                <span className="section-count">CLEAR INFORMATION</span>
              </div>
              <div className="care-session-list">
                {service.sessionInformation.map((option) => (
                  <article key={`${option.name}-${option.duration}`}>
                    <div className="care-session-name">
                      <span>SESSION</span>
                      <h3>{option.name}</h3>
                      {option.description && <p>{option.description}</p>}
                    </div>
                    <dl>
                      <div><dt>TIME</dt><dd>{option.duration}</dd></div>
                      <div><dt>FEE</dt><dd>{option.fee}</dd></div>
                    </dl>
                    {option.detail && <p className="care-session-detail">{option.detail}</p>}
                  </article>
                ))}
              </div>
              {sessionNotes.length > 0 && (
                <div className="care-session-notes">{sessionNotes.map((note) => <span key={note}>{note}</span>)}</div>
              )}
            </div>
          </section>
        )}

        {isAssessment && service.assessmentGroups && (
          <section className="section assessment-catalog-section">
            <div className="shell">
              <div className="assessment-intro">
                <div><span className="section-kicker">ASSESSMENT INFORMATION</span><h2>평가의 목적부터<br />함께 살펴봅니다.</h2></div>
                <div className="assessment-notes">
                  <strong>모든 심리평가 비용에는 해석상담이 포함됩니다.</strong>
                  <p>서면 보고서가 필요한 경우 별도 비용이 발생합니다.</p>
                  <p>그 외 심리평가는 필요한 검사 구성에 따라 비용이 달라질 수 있습니다.</p>
                </div>
              </div>
              <div className="assessment-groups">
                {service.assessmentGroups.map((group) => (
                  <section className="assessment-group" key={group.code}>
                    <header><span>{group.code}</span><h2>{group.title}</h2></header>
                    <div className="assessment-items">
                      {group.items.map((item) => (
                        <article key={item.name}>
                          {item.badge && <span className="assessment-badge">{item.badge}</span>}
                          <h3>{item.name}</h3>
                          <p>{item.question}</p>
                          <div><strong>{item.fee}</strong>{item.detail && <small>{item.detail}</small>}</div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <a className="arrow-link assessment-inquiry-link" href={kakaoChannelUrl} target="_blank" rel="noreferrer noopener">
                어떤 평가가 필요한지 문의하기 <span>→</span>
              </a>
            </div>
          </section>
        )}

        <section className="section care-approach-section">
          <div className="shell care-approach-grid">
            <div><span className="section-kicker">AT SAEBYEOKBYEOL</span><h2>새벽별에서는</h2></div>
            <div className="care-approach-copy">
              {service.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {service.methods.length > 0 && (
                <div className="care-method-list">
                  {service.methods.map((method) => {
                    const content = <><strong>{method.title}</strong>{method.description && <span>{method.description}</span>}{method.relatedGuide && <small>관련 GUIDE 보기 →</small>}</>;
                    return method.relatedGuide
                      ? <Link href={`/guide/${method.relatedGuide}`} key={method.title}>{content}</Link>
                      : <div key={method.title}>{content}</div>;
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <CareProcess steps={process} />

        {relatedGuides.length > 0 && (
          <section className="section care-related-guides"><div className="shell">
            <div className="section-head"><div><span className="section-kicker">RELATED GUIDE</span><h2>조금 더 이해하고 싶다면</h2></div></div>
            <div className="related-grid">{relatedGuides.map((article) => <Link href={`/guide/${article.slug}`} key={article.slug}><span>{article.category} · {article.readTime}</span><h3>{article.title}</h3><b>→</b></Link>)}</div>
          </div></section>
        )}

        {relatedTools.length > 0 && (
          <section className="section care-related-tools"><div className="shell">
            <div className="section-head"><div><span className="section-kicker">RELATED TOOLS</span><h2>일상에서 직접 해보고 싶다면</h2></div></div>
            <div className="related-grid">{relatedTools.map((item) => <Link href={`/tools/${item.slug}`} key={item.slug}><span>{item.category} · {item.format}</span><h3>{item.title}</h3><p>{item.description}</p><b>→</b></Link>)}</div>
          </div></section>
        )}

        <section className="care-service-cta">
          <div className="shell">
            <span className="section-kicker">CARE INQUIRY</span>
            <h2>{isAssessment ? "어떤 평가가 필요한지 궁금하다면" : "상담을 알아보고 있다면"}</h2>
            <p>지금 필요한 도움과 이용 방법을 확인해보세요.</p>
            <div className="care-cta-actions">
              <Link className="button button-light" href="/contact">문의 안내 보기 <span>→</span></Link>
              <a className="button button-outline-light" href={kakaoChannelUrl} target="_blank" rel="noreferrer noopener">카카오채널로 문의하기 ↗</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
