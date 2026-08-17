import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarkdownBlocks } from "@/components/MarkdownBlocks";
import { StarMark } from "@/components/StarMark";
import { StructuredData, articleStructuredData, breadcrumbStructuredData } from "@/components/StructuredData";
import { columnArticles, getColumnArticle } from "@/lib/columns";
import { formatGuideDate, getCareService, getGuideArticle } from "@/lib/content";
import { createPageMetadata, getSiteOrigin } from "@/lib/seo";
import { getToolItem } from "@/lib/tools";

type ColumnPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return columnArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ColumnPageProps): Promise<Metadata> {
  const article = getColumnArticle((await params).slug);
  if (!article) return {};
  return createPageMetadata({
    path: `/column/${article.slug}`,
    title: article.title,
    description: article.description,
    kind: "article",
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });
}

export default async function ColumnDetailPage({ params }: ColumnPageProps) {
  const article = getColumnArticle((await params).slug);
  if (!article) notFound();
  const relatedGuides = article.relatedGuides.map(getGuideArticle).filter((item) => item !== undefined);
  const relatedTools = article.relatedTools.map(getToolItem).filter((item) => item !== undefined);
  const relatedServices = article.relatedServices.map(getCareService).filter((item) => item !== undefined);
  const origin = await getSiteOrigin();

  return (
    <>
      <Header />
      <main>
        <StructuredData data={articleStructuredData({ origin, path: `/column/${article.slug}`, title: article.title, description: article.description, publishedAt: article.publishedAt, updatedAt: article.updatedAt, author: article.author })} />
        <StructuredData data={breadcrumbStructuredData(origin, [{ name: "HOME", path: "/" }, { name: "COLUMN", path: "/column" }, { name: article.title, path: `/column/${article.slug}` }])} />
        <article className="column-detail">
          <header className="article-hero column-hero">
            <div className="shell article-hero-grid">
              <div className="article-title"><Link href="/column" className="back-link">← COLUMN으로 돌아가기</Link><span className="guide-meta">FROM SAEBYEOKBYEOL · {article.author}</span><h1>{article.title}</h1><p>{article.description}</p></div>
              <div className="article-cover column-cover" aria-hidden="true"><span className="article-cover-index">COLUMN<br />ARCHIVE</span><StarMark size="hero" /><small>THOUGHTS ON<br />PSYCHOLOGY &amp; LIFE</small></div>
            </div>
          </header>
          <div className="shell article-layout column-layout">
            <aside className="article-aside"><div><span>글쓴이</span><strong>{article.author}</strong></div><div><span>발행</span><strong>{formatGuideDate(article.publishedAt)}</strong></div><div><span>업데이트</span><strong>{formatGuideDate(article.updatedAt)}</strong></div><div><span>주제</span><strong>{article.topics.slice(0, 3).join(" · ")}</strong></div></aside>
            <div className="article-body column-body"><MarkdownBlocks blocks={article.blocks} /><div className="article-disclaimer">이 COLUMN은 일반적인 심리교육 및 정보 콘텐츠이며, 개인에 대한 진단·치료·위기개입을 대신하지 않습니다.</div></div>
          </div>
        </article>
        {relatedGuides.length > 0 && <section className="section related-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED GUIDE</span><h2>조금 더 알아보고 싶다면</h2></div></div><div className="related-grid">{relatedGuides.map((guide) => <Link href={`/guide/${guide.slug}`} key={guide.slug}><span>{guide.category} · {guide.readTime}</span><h3>{guide.title}</h3><b>→</b></Link>)}</div></div></section>}
        {relatedTools.length > 0 && <section className="section guide-tools-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED TOOLS</span><h2>직접 돌아보고 싶다면</h2></div></div><div className="related-grid">{relatedTools.map((tool) => <Link href={`/tools/${tool.slug}`} key={tool.slug}><span>{tool.category} · {tool.format}</span><h3>{tool.title}</h3><p>{tool.description}</p><b>→</b></Link>)}</div></div></section>}
        {relatedServices.length > 0 && <section className="section guide-care-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED CARE</span><h2>함께 다루고 싶다면</h2></div></div><div className="related-grid care-related-grid">{relatedServices.map((service) => <Link href={`/care/${service.id}`} key={service.id}><span>{service.english}</span><h3>{service.title}</h3><p>{service.short}</p><b>→</b></Link>)}</div></div></section>}
      </main>
      <Footer />
    </>
  );
}
