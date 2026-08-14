"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GuideArticle } from "@/lib/content";
import { guideCategories } from "@/lib/content";

export function GuideExplorer({ articles }: { articles: GuideArticle[] }) {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ko");
    return articles.filter((article) => {
      const inCategory = category === "전체" || article.category === category;
      const searchable = `${article.title} ${article.description} ${article.category}`.toLocaleLowerCase("ko");
      return inCategory && (!normalized || searchable.includes(normalized));
    });
  }, [articles, category, query]);

  return (
    <div className="guide-explorer">
      <div className="guide-controls">
        <div className="category-tabs" role="group" aria-label="가이드 주제 필터">
          {guideCategories.map((item) => (
            <button
              className={category === item ? "active" : ""}
              type="button"
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="guide-search">
          <span className="sr-only">가이드 검색</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="궁금한 주제를 검색해보세요"
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>

      <div className="guide-results-meta" aria-live="polite">
        <span>GUIDE ARCHIVE</span>
        <b>{String(filtered.length).padStart(2, "0")} ARTICLES</b>
      </div>

      {filtered.length ? (
        <div className="archive-grid">
          {filtered.map((article, index) => (
            <Link className="archive-card" href={`/guide/${article.slug}`} key={article.slug}>
              <div className={`archive-visual visual-${(index % 4) + 1}`} aria-hidden="true">
                <span className="archive-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="archive-star">✦</span>
                <span className="archive-line" />
              </div>
              <div className="archive-content">
                <span className="guide-meta">{article.category} · {article.readTime}</span>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span className="text-link">읽어보기 <span>→</span></span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-guides">
          <span aria-hidden="true">✦</span>
          <h2>아직 이 주제의 글은 없어요.</h2>
          <p>검색어를 조금 줄이거나 다른 주제를 선택해보세요.</p>
          <button type="button" onClick={() => { setCategory("전체"); setQuery(""); }}>전체 글 보기</button>
        </div>
      )}
    </div>
  );
}
