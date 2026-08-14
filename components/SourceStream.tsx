import { formatSourceDate, publicContent } from "@/lib/public-content";

type SourceStreamProps = {
  compact?: boolean;
};

export function SourceStream({ compact = false }: SourceStreamProps) {
  const posts = publicContent.blog.items.slice(0, compact ? 3 : 5);
  const instagramPosts = publicContent.instagram.items.slice(0, 2);

  return (
    <section className={`section source-stream ${compact ? "is-compact" : ""}`}>
      <div className="shell">
        <div className="section-head source-stream-head">
          <div>
            <span className="section-kicker">FROM OUR PUBLIC CHANNELS</span>
            <h2>새벽별이 실제로 쓰고 있는 기록</h2>
          </div>
          <p>블로그와 공개 노션의 최신 내용을 가져와 사이트에 연결합니다.</p>
        </div>

        <div className="source-grid">
          <article className="source-card source-blog">
            <div className="source-card-head">
              <div><span>NAVER BLOG</span><strong>{publicContent.blog.title}</strong></div>
              <small>UPDATED {formatSourceDate(publicContent.blog.updatedAt)}</small>
            </div>
            <div className="source-post-list">
              {posts.map((post, index) => (
                <a href={post.url} target="_blank" rel="noreferrer" key={post.url}>
                  <span>0{index + 1}</span>
                  <div>
                    <small>{post.category} · {formatSourceDate(post.publishedAt)}</small>
                    <strong>{post.title}</strong>
                    {!compact && <p>{post.excerpt}</p>}
                  </div>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
            <a className="source-card-link" href={publicContent.blog.profileUrl} target="_blank" rel="noreferrer">
              블로그에서 전체 글 보기 <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="source-card source-notion">
            <div className="source-card-head">
              <div><span>NOTION GUIDE</span><strong>{publicContent.notion.title}</strong></div>
              <small>UPDATED {formatSourceDate(publicContent.notion.updatedAt)}</small>
            </div>
            <p className="source-notion-intro">{publicContent.notion.overview}</p>
            <ul>
              {publicContent.notion.sections.slice(0, compact ? 4 : 6).map((section) => (
                <li key={section.title}><span aria-hidden="true">✦</span>{section.title}</li>
              ))}
            </ul>
            <a className="source-card-link" href={publicContent.notion.publicUrl} target="_blank" rel="noreferrer">
              공개 노션 가이드 보기 <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="source-card source-instagram">
            <div className="source-card-head">
              <div><span>INSTAGRAM</span><strong>@{publicContent.instagram.handle}</strong></div>
              <small>{instagramPosts.length ? "POSTS CONNECTED" : "PROFILE CONNECTED"}</small>
            </div>
            {instagramPosts.length ? (
              <div className="instagram-post-list">
                {instagramPosts.map((post) => (
                  <a href={post.url} target="_blank" rel="noreferrer" key={post.id}>
                    {post.caption || "새벽별 인스타그램 게시물"} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ) : (
              <p>짧은 심리교육 콘텐츠와 센터 소식은 인스타그램 프로필에서 이어집니다.</p>
            )}
            <a className="source-card-link" href={publicContent.instagram.profileUrl} target="_blank" rel="noreferrer">
              인스타그램에서 보기 <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
