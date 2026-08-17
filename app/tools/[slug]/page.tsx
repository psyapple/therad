import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarkdownBlocks } from "@/components/MarkdownBlocks";
import { PageHero } from "@/components/PageHero";
import { formatGuideDate, getCareService } from "@/lib/content";
import { getRelatedGuidesForTool, getToolItem, toolItems } from "@/lib/tools";

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return toolItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const item = getToolItem((await params).slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description,
    openGraph: { type: "article", title: item.title, description: item.description, publishedTime: item.publishedAt, modifiedTime: item.updatedAt, images: [] },
    twitter: { card: "summary", title: item.title, description: item.description, images: [] },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const item = getToolItem((await params).slug);
  if (!item) notFound();

  const relatedGuides = getRelatedGuidesForTool(item);
  const relatedServices = item.relatedServices.map(getCareService).filter((service) => service !== undefined);

  return (
    <>
      <Header />
      <main>
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
