import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { getColumnArchive } from "@/lib/columns";
import { ColumnImage } from "@/components/ColumnPortableText";
import { createPageMetadata } from "@/lib/seo";
import "./column.css";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return createPageMetadata({
    path: "/column",
    title: "COLUMN · 새벽별의 관점",
    description:
      "상담과 마음에 대해 새벽별이 조금 더 오래 생각해본 글을 모았습니다.",
  });
}

export default async function ColumnPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { articles, categories, unavailable } = await getColumnArchive();
  const requestedCategory = (await searchParams).category;
  const selected = categories.find(
    (category) => category.slug === requestedCategory,
  )?.slug;
  const columnArticles = selected
    ? articles.filter((article) => article.category?.slug === selected)
    : articles;
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="COLUMN · FROM SAEBYEOKBYEOL"
          index="05"
          title={
            <>
              상담과 마음에 대해
              <br />
              <em>조금 더 오래 생각해본 것들.</em>
            </>
          }
          description="정답보다 관점을, 설명보다 오래 남는 질문을 건네는 새벽별의 editorial writing입니다."
        />
        <section className="section column-archive-section">
          <div className="shell">
            {categories.length > 0 && (
              <nav className="column-categories" aria-label="COLUMN 카테고리">
                <Link
                  href="/column"
                  aria-current={!selected ? "page" : undefined}
                >
                  전체
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/column?category=${encodeURIComponent(category.slug)}`}
                    aria-current={
                      selected === category.slug ? "page" : undefined
                    }
                  >
                    {category.title}
                  </Link>
                ))}
              </nav>
            )}
            {unavailable && (
              <p className="column-status" role="status">
                글을 잠시 불러오지 못했습니다. 잠시 후 다시 방문해 주세요.
                GUIDE와 TOOLS는 계속 이용하실 수 있습니다.
              </p>
            )}
            {!unavailable && columnArticles.length === 0 && (
              <p className="column-status">
                이 카테고리에 발행된 글이 아직 없습니다.
              </p>
            )}
            <div className="archive-grid column-archive-grid">
              {columnArticles.map((article, index) => (
                <Link
                  className="archive-card"
                  href={`/column/${article.slug}`}
                  key={article.slug}
                >
                  {article.coverImage ? (
                    <div className="archive-visual">
                      <ColumnImage value={article.coverImage} />
                    </div>
                  ) : (
                    <div
                      className={`archive-visual visual-${(index % 4) + 1}`}
                      aria-hidden="true"
                    >
                      <span className="archive-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="archive-star">✦</span>
                      <span className="archive-line" />
                    </div>
                  )}
                  <div className="archive-content">
                    <span className="guide-meta">
                      {article.category?.title || article.author} ·{" "}
                      {article.publishedAt.slice(0, 10)}
                    </span>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <span className="text-link">
                      읽어보기 <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="guide-principle">
          <div className="shell guide-principle-grid">
            <span className="section-kicker">GUIDE, COLUMN, TOOLS</span>
            <h2>이해하고, 생각하고, 직접 해봅니다.</h2>
            <p>
              GUIDE는 정보를 찾는 글, COLUMN은 새벽별의 관점과 해석을 담은 글,
              TOOLS는 일상에서 직접 사용해보는 마음도구입니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
