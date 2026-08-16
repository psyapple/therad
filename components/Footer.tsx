import Link from "@/components/SiteLink";
import { BrandLogo } from "./BrandLogo";
import { publicContent } from "@/lib/public-content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <Link className="footer-brand" href="/">
          <BrandLogo size="footer" />
          <span>
            <strong>새벽별</strong>
          </span>
        </Link>
        <p>마음을 이해하고, 연결하고,<br />삶에서 사용할 수 있는 형태로 만듭니다.</p>
      </div>
      <div className="shell footer-links">
        <div className="footer-column">
          <span className="footer-label">EXPLORE</span>
          <Link href="/about">ABOUT</Link>
          <Link href="/care">CARE</Link>
          <Link href="/guide">GUIDE</Link>
          <Link href="/tools">TOOLS</Link>
          <Link href="/insight-relay">INSIGHT RELAY</Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">CONNECT</span>
          <Link href="/contact">상담 및 협업 문의</Link>
          <a href={publicContent.blog.profileUrl} target="_blank" rel="noreferrer">NAVER BLOG ↗</a>
          <a href={publicContent.notion.publicUrl} target="_blank" rel="noreferrer">NOTION GUIDE ↗</a>
          <a href={publicContent.instagram.profileUrl} target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
        </div>
        <div className="footer-column footer-note">
          <span className="footer-label">NOTE</span>
          <p>이 사이트의 콘텐츠는 일반적인 심리교육 정보이며, 개인에 대한 진단이나 치료를 대신하지 않습니다.</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 SAEBYEOKBYEOL. ALL RIGHTS RESERVED.</span>
        <Link href="/privacy">개인정보 및 이용 안내</Link>
        <span>BETWEEN NIGHT & DAWN <b aria-hidden="true">✦</b></span>
      </div>
    </footer>
  );
}
