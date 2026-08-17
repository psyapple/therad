import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarkdownBlocks } from "@/components/MarkdownBlocks";
import { PageHero } from "@/components/PageHero";
import { StructuredData, breadcrumbStructuredData } from "@/components/StructuredData";
import { formatGuideDate, getCareService } from "@/lib/content";
import { createPageMetadata, getSiteOrigin } from "@/lib/seo";
import { getRelatedGuidesForTool, getToolItem, toolItems } from "@/lib/tools";

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return toolItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const item = getToolItem((await params).slug);
  if (!item) return {};

  return createPageMetadata({
    path: `/tools/${item.slug}`,
    title: item.title,
    description: item.description,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const item = getToolItem((await params).slug);
  if (!item) notFound();

  const relatedGuides = getRelatedGuidesForTool(item);
  const relatedServices = item.relatedServices.map(getCareService).filter((service) => service !== undefined);
  const origin = await getSiteOrigin();

  return (
    <>
      <Header />
      <main>
        <StructuredData data={breadcrumbStructuredData(origin, [{ name: "HOME", path: "/" }, { name: "TOOLS", path: "/tools" }, { name: item.title, path: `/tools/${item.slug}` }])} />
        <PageHero eyebrow={`TOOLS · ${item.category} · ${item.format}`} index="04" tone="lavender" title={item.title} description={item.description} />
        <section className="section tool-detail-section">
          <div className="shell tool-detail-grid">
            <aside>
              <Link href="/tools" className="back-link">← TOOLS 전체 보기</Link>
              <dl><div><dt>형식</dt><dd>{item.format}</dd></div><div><dt>주제</dt><dd>{item.topics.join(" · ")}</dd></div><div><dt>업데이트</dt><dd>{formatGuideDate(item.updatedAt)}</dd></div></dl>
            </aside>
            <div className="tool-detail-body">
              {item.sections.map((section) => (
                <section key={section.heading}><h2>{section.heading}</h2><MarkdownBlocks blocks={section.blocks} /></section>
              ))}
              <div className="article-disclaimer">이 TOOLS 콘텐츠는 자기이해와 자기돌봄을 위한 일반적인 도구이며, 개인에 대한 진단·치료·위기개입을 대신하지 않습니다.</div>
            </div>
          </div>
        </section>
        {relatedGuides.length > 0 && <section className="section related-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED GUIDE</span><h2>함께 읽어보세요</h2></div></div><div className="related-grid">{relatedGuides.map((guide) => <Link href={`/guide/${guide.slug}`} key={guide.slug}><span>{guide.category} · {guide.readTime}</span><h3>{guide.title}</h3><b>→</b></Link>)}</div></div></section>}
        {relatedServices.length > 0 && <section className="section guide-care-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED CARE</span><h2>전문적인 도움이 필요하다면</h2></div></div><div className="related-grid care-related-grid">{relatedServices.map((service) => <Link href={`/care/${service.id}`} key={service.id}><span>{service.english}</span><h3>{service.title}</h3><p>{service.short}</p><b>→</b></Link>)}</div></div></section>}
      </main>
      <Footer />
    </>
  );
}
