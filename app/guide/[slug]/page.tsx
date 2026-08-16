import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StarMark } from "@/components/StarMark";
import { formatGuideDate, getCareService } from "@/lib/content";
import { getGuideArticle, getRelatedGuides, guideArticles } from "@/lib/guide-all";
import { getRelatedToolsForGuide } from "@/lib/tools";

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.publishedAt, modifiedTime: article.updatedAt, images: [] },
    twitter: { card: "summary", title: article.title, description: article.description, images: [] },
  };
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) notFound();
  const related = getRelatedGuides(article);
  const relatedServices = article.relatedServices.map(getCareService).filter((service) => service !== undefined);
  const relatedTools = getRelatedToolsForGuide(article.slug);

  return (
    <>
      <Header />
      <main>
        <article>
          <header className="article-hero">
            <div className="shell article-hero-grid">
              <div className="article-title">
                <Link href="/guide" className="back-link">← GUIDE로 돌아가기</Link>
                <span className="guide-meta">{article.categoryEn} · {article.readTime}</span>
                <h1>{article.title}</h1><p>{article.description}</p>
              </div>
              <div className="article-cover" aria-hidden="true"><span className="article-cover-index">GUIDE<br />ARCHIVE</span><StarMark size="hero" /><span className="article-cover-orbit" /><small>SAEBYEOKBYEOL<br />PSYCHOLOGY FOR EVERYDAY LIFE</small></div>
            </div>
          </header>
          <div className="shell article-layout">
            <aside className="article-aside">
              <div><span>주제</span><strong>{article.category}</strong></div><div><span>읽는 시간</span><strong>{article.readTime}</strong></div><div><span>키워드</span><strong>{article.topics.slice(0, 2).join(" · ")}</strong></div><div><span>업데이트</span><strong>{formatGuideDate(article.updatedAt)}</strong></div><div className="share-note"><span aria-hidden="true">✦</span><p>필요한 사람에게 이 글을 건네도 좋아요.</p></div>
            </aside>
            <div className="article-body">
              <p className="article-lead">{article.intro}</p>
              {article.sections.map((section, index) => <section key={section.heading}><span className="article-section-number">0{index + 1}</span><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.note && <div className="article-note"><strong>새벽별 NOTE</strong><p>{section.note}</p></div>}</section>)}
              <div className="takeaway"><StarMark size="medium" /><div><strong>기억해두면 좋은 한 문장</strong><p>{article.takeaway}</p></div></div>
              <div className="article-disclaimer">이 글은 일반적인 심리교육 정보이며 개인에 대한 진단이나 치료를 대신하지 않습니다. 현재 어려움이 일상 기능을 크게 방해한다면 적절한 전문가와 상의하세요.</div>
            </div>
          </div>
        </article>
        {related.length > 0 && <section className="section related-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">KEEP READING</span><h2>관련해서 읽어보세요</h2></div></div><div className="related-grid">{related.map((item) => <Link href={`/guide/${item.slug}`} key={item.slug}><span>{item.category} · {item.readTime}</span><h3>{item.title}</h3><b>→</b></Link>)}</div></div></section>}
        {relatedTools.length > 0 && <section className="section guide-tools-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED TOOLS</span><h2>직접 해보고 싶다면</h2></div></div><div className="related-grid">{relatedTools.map((item) => <Link href={`/tools/${item.slug}`} key={item.slug}><span>{item.category} · {item.format}</span><h3>{item.title}</h3><p>{item.description}</p><b>→</b></Link>)}</div></div></section>}
        {relatedServices.length > 0 && <section className="section guide-care-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">RELATED CARE</span><h2>새벽별에서 이용할 수 있어요</h2></div></div><div className="related-grid care-related-grid">{relatedServices.map((service) => <Link href={`/care/${service.id}`} key={service.id}><span>{service.english}</span><h3>{service.title}</h3><p>{service.short}</p><b>→</b></Link>)}</div></div></section>}
      </main>
      <Footer />
    </>
  );
}
