import { Footer } from "@/components/Footer";
import { GuideExplorer } from "@/components/GuideExplorer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import Link from "@/components/SiteLink";
import { columnArticles } from "@/lib/columns";
import { guideArticles, guideCategories } from "@/lib/guide-all";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({ path: "/guide", title: "GUIDE · 심리상담 가이드", description: "상담을 시작하고 잘 이용하는 법, 마음과 애착, AEDP·SP 같은 심리치료, 심리검사에 관한 새벽별의 가이드입니다." });
}

type GuidePageProps = { searchParams: Promise<{ category?: string }> };

export default async function GuidePage({ searchParams }: GuidePageProps) {
  const requestedCategory = (await searchParams).category;
  const initialCategory = guideCategories.includes(requestedCategory ?? "") ? requestedCategory : "전체";

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="GUIDE · PSYCHOLOGY IN PLAIN LANGUAGE"
          index="03"
          tone="lavender"
          title={<>알고 나면 덜 막막해지는<br /><em>마음의 사용 설명서.</em></>}
          description="상담을 선택하는 일부터 감정과 관계를 이해하는 일까지. 전문적인 심리학을 오늘의 삶에서 사용할 수 있는 언어로 옮깁니다."
        />
        <section className="section guide-archive-section" id="guide-archive">
          <div className="shell">
            <GuideExplorer articles={guideArticles} initialCategory={initialCategory} />
          </div>
        </section>
        {columnArticles.length > 0 && (
          <section className="section guide-column-section">
            <div className="shell">
              <div className="section-head"><div><span className="section-kicker">FROM SAEBYEOKBYEOL</span><h2>COLUMN</h2><p className="section-description">상담과 마음에 대해<br />조금 더 오래 생각해본 것들.</p></div><Link className="arrow-link" href="/column">COLUMN 전체 보기 →</Link></div>
              <div className="related-grid">{columnArticles.slice(0, 3).map((article) => <Link href={`/column/${article.slug}`} key={article.slug}><span>{article.author} · {article.publishedAt}</span><h3>{article.title}</h3><p>{article.description}</p><b>→</b></Link>)}</div>
            </div>
          </section>
        )}
        <section className="guide-principle">
          <div className="shell guide-principle-grid">
            <span className="section-kicker">OUR EDITORIAL PRINCIPLE</span>
            <h2>쉽게 쓰되, 쉽게 단정하지 않습니다.</h2>
            <p>심리학은 한 사람을 분류하기 위한 말이 아니라 이해의 가능성을 넓히기 위한 언어여야 합니다. GUIDE의 글은 일반적인 심리교육 정보이며 개인의 진단이나 치료를 대신하지 않습니다.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
