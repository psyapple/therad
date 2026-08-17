import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StarMark } from "@/components/StarMark";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="not-found-main">
        <div className="shell not-found-wrap">
          <StarMark size="large" />
          <span className="section-kicker">404 · PAGE NOT FOUND</span>
          <h1>찾고 있던 페이지가<br /><em>보이지 않아요.</em></h1>
          <p>주소가 바뀌었거나 페이지가 더 이상 존재하지 않을 수 있습니다.</p>
          <div className="not-found-actions">
            <Link className="button button-primary" href="/">HOME으로</Link>
            <Link className="button button-secondary" href="/guide">GUIDE 보기</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
