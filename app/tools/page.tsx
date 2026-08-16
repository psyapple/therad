import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { toolCategories, toolItems } from "@/lib/tools";

export const metadata: Metadata = {
  title: "마음도구",
  description: "읽고 이해한 것을 일상에서 직접 사용해볼 수 있도록 새벽별이 만든 워크시트와 마음도구를 모았습니다.",
  openGraph: {
    type: "website",
    title: "TOOLS · 마음도구",
    description: "읽고 이해한 것을 일상에서 직접 사용해보는 새벽별의 마음도구 아카이브.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "TOOLS · 마음도구",
    description: "읽고 이해한 것을 일상에서 직접 사용해보는 새벽별의 마음도구 아카이브.",
    images: [],
  },
};

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="TOOLS · PRACTICAL RESOURCES"
          index="04"
          tone="lavender"
          title={<>알고 끝나지 않고,<br /><em>직접 해볼 수 있도록.</em></>}
          description="읽고 이해한 것을 일상에서 사용해볼 수 있도록 새벽별이 만든 워크시트와 마음도구를 모았습니다."
        />

        <section className="section tools-archive-section">
          <div className="shell">
            <div className="section-head tools-archive-head">
              <div>
                <span className="section-kicker">TOOLS ARCHIVE</span>
                <h2>필요한 순간에 꺼내 쓰는<br />마음도구를 모읍니다.</h2>
              </div>
              <div className="tool-category-list" aria-label="마음도구 분류">
                {toolCategories.map((category) => <span key={category}>{category}</span>)}
              </div>
            </div>

            {toolItems.length > 0 ? (
              <div className="tool-archive-list">
                {toolItems.map((item, index) => (
                  <Link className="tool-archive-row" href={`/tools/${item.slug}`} key={item.slug}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><small>{item.category} · {item.format}</small><h3>{item.title}</h3><p>{item.description}</p></div>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="tools-empty-state">
                <span aria-hidden="true">✦</span>
                <div>
                  <strong>새벽별의 마음도구 아카이브</strong>
                  <p>실제 워크시트와 마음도구를 제목·형식·관련 GUIDE와 함께 순서대로 등록합니다.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section tools-guide-bridge">
          <div className="shell tools-guide-bridge-grid">
            <div><span className="section-kicker">UNDERSTAND, THEN PRACTICE</span><h2>먼저 이해하고 싶다면<br />GUIDE에서 시작하세요.</h2></div>
            <div><p>마음도구는 관련 GUIDE와 CARE에 연결됩니다. 읽기, 직접 해보기, 전문적인 도움을 알아보는 흐름을 필요에 따라 오갈 수 있습니다.</p><Link className="text-link" href="/guide">GUIDE 전체 보기 <span>→</span></Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
