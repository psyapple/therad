import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { columnArticles } from "@/lib/columns";

export const metadata: Metadata = {
  title: "COLUMN · 새벽별의 관점",
  description: "상담과 마음에 대해 새벽별이 조금 더 오래 생각해본 글을 모았습니다.",
};

export default function ColumnPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="COLUMN · FROM SAEBYEOKBYEOL"
          index="05"
          title={<>상담과 마음에 대해<br /><em>조금 더 오래 생각해본 것들.</em></>}
          description="정답보다 관점을, 설명보다 오래 남는 질문을 건네는 새벽별의 editorial writing입니다."
        />
        {columnArticles.length > 0 && (
          <section className="section column-archive-section">
            <div className="shell">
              <div className="archive-grid column-archive-grid">
                {columnArticles.map((article, index) => (
                  <Link className="archive-card" href={`/column/${article.slug}`} key={article.slug}>
                    <div className={`archive-visual visual-${(index % 4) + 1}`} aria-hidden="true"><span className="archive-index">{String(index + 1).padStart(2, "0")}</span><span className="archive-star">✦</span><span className="archive-line" /></div>
                    <div className="archive-content"><span className="guide-meta">{article.author} · {article.publishedAt}</span><h2>{article.title}</h2><p>{article.description}</p><span className="text-link">읽어보기 <span>→</span></span></div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="guide-principle">
          <div className="shell guide-principle-grid"><span className="section-kicker">GUIDE, COLUMN, TOOLS</span><h2>이해하고, 생각하고, 직접 해봅니다.</h2><p>GUIDE는 정보를 찾는 글, COLUMN은 새벽별의 관점과 해석을 담은 글, TOOLS는 일상에서 직접 사용해보는 마음도구입니다.</p></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
