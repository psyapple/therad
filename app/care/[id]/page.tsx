import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { CareProcess } from "@/components/CareProcess";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { careServices, defaultCareProcess, getCareService } from "@/lib/content";
import { getRelatedGuidesForService } from "@/lib/guide-all";
import { getRelatedToolsForService } from "@/lib/tools";

type CareServicePageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() { return careServices.map((service) => ({ id: service.id })); }

export async function generateMetadata({ params }: CareServicePageProps): Promise<Metadata> {
  const service = getCareService((await params).id); if (!service) return {};
  return { title: service.title, description: service.description, openGraph: { type: "website", title: service.title, description: service.description, images: [] }, twitter: { card: "summary", title: service.title, description: service.description, images: [] } };
}

export default async function CareServicePage({ params }: CareServicePageProps) {
  const service = getCareService((await params).id); if (!service) notFound();
  const relatedGuides = getRelatedGuidesForService(service.id);
  const relatedTools = getRelatedToolsForService(service.id);
  const process = service.process ?? defaultCareProcess;
  return <><Header /><main className={`care-service-page care-service-${service.id}`}>
    <nav className="care-breadcrumb" aria-label="현재 위치"><div className="shell"><Link href="/">HOME</Link><span aria-hidden="true">/</span><Link href="/care">CARE</Link><span aria-hidden="true">/</span><strong>{service.title}</strong></div></nav>
    <PageHero eyebrow={`CARE · ${service.english}`} index="02" tone="night" title={service.title} description={service.description} />
    <section className="section care-suitable-section"><div className="shell care-service-layout"><div className="care-service-aside"><span className="section-kicker">WHEN CARE MAY HELP</span><h2>이런 경우<br />이용할 수 있어요</h2><p>아래 내용은 진단이나 체크리스트가 아니라, 상담을 알아볼 수 있는 여러 상황의 예입니다.</p></div><div className="care-service-overview"><ul>{service.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section care-approach-section"><div className="shell care-approach-grid"><div><span className="section-kicker">AT SAEBYEOKBYEOL</span><h2>새벽별에서는</h2></div><div className="care-approach-copy">{service.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{service.methods.length > 0 && <div className="care-method-list">{service.methods.map((method) => { const content = <><strong>{method.title}</strong>{method.description && <span>{method.description}</span>}{method.relatedGuide && <small>관련 GUIDE 보기 →</small>}</>; return method.relatedGuide ? <Link href={`/guide/${method.relatedGuide}`} key={method.title}>{content}</Link> : <div key={method.title}>{content}</div>; })}</div>}</div></div></section>
    <CareProcess steps={process} />
    {relatedGuides.length > 0 && <section className="section care-related-guides"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED GUIDE</span><h2>조금 더 이해하고 싶다면</h2></div></div><div className="related-grid">{relatedGuides.map((article) => <Link href={`/guide/${article.slug}`} key={article.slug}><span>{article.category} · {article.readTime}</span><h3>{article.title}</h3><b>→</b></Link>)}</div></div></section>}
    {relatedTools.length > 0 && <section className="section care-related-tools"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED TOOLS</span><h2>일상에서 직접 해보고 싶다면</h2></div></div><div className="related-grid">{relatedTools.map((item) => <Link href={`/tools/${item.slug}`} key={item.slug}><span>{item.category} · {item.format}</span><h3>{item.title}</h3><p>{item.description}</p><b>→</b></Link>)}</div></div></section>}
    <section className="care-service-cta"><div className="shell"><span className="section-kicker">CARE INQUIRY</span><h2>상담을 알아보고 있다면</h2><p>지금 필요한 도움과 이용 방법을 확인해보세요.</p><Link className="button button-light" href="/contact">상담 문의하기 <span>→</span></Link></div></section>
  </main><Footer /></>;
}
