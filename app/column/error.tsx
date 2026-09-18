"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "@/components/SiteLink";

export default function ColumnError({ reset }: { reset: () => void }) {
  return (
    <>
      <Header />
      <main className="not-found-main">
        <div className="shell">
          <span className="section-kicker">COLUMN</span>
          <h1>글을 잠시 불러오지 못했습니다.</h1>
          <p>
            잠시 후 다시 시도해 주세요. 다른 페이지는 계속 이용하실 수 있습니다.
          </p>
          <div className="not-found-actions">
            <button type="button" className="button" onClick={reset}>
              다시 시도
            </button>
            <Link className="button" href="/guide">
              GUIDE 보기 →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
