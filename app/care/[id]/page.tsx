import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { careServices, getCareService, getRelatedGuidesForService } from "@/lib/content";

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
    openGraph: {
      type: "website",
      title: service.title,
      description: service.description,
      images: [],
    },
    twitter: {
      card: "summary",
      title: service.title,
      description: service.description,
      images: [],
    },
  };
}

export default async function CareServicePage({ params }: CareServicePageProps) {
  const service = getCareService((await params).id);
  if (!service) notFound();

  const relatedGuides = getRelatedGuidesForService(service.id);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={`CARE · ${service.english}`}
          index="02"
          tone="night"
          title={<>{service.title}<br /><em>마음을 만나는 한 가지 방식.</em></>}
          description={service.description}
        />

        <section className="section care-service-main">
          <div className="shell care-service-layout">
            <div className="care-service-nav">
              <Link href="/care" className="back-link">← CARE 전체 보기</Link>
              <span className="section-kicker">{service.english}</span>
              <p>{service.short}</p>
            </div>
            <div className="care-service-overview">
              <h2>이런 때 살펴볼 수 있어요</h2>
              <ul>{service.forWhom.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="care-service-note"><strong>진행 안내</strong><p>{service.note}</p></div>
              <Link className="button button-primary" href="/contact">상담 문의 방법 보기 <span>↗</span></Link>
            </div>
          </div>
        </section>

        {relatedGuides.length > 0 && (
          <section className="section related-section">
            <div className="shell">
              <div className="section-head"><div><span className="section-kicker">RELATED GUIDE</span><h2>조금 더 알아보고 싶다면</h2></div></div>
              <div className="related-grid">{relatedGuides.map((article) => <Link href={`/guide/${article.slug}`} key={article.slug}><span>{article.category} · {article.readTime}</span><h3>{article.title}</h3><b>→</b></Link>)}</div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

