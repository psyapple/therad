import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({ path: "/privacy", title: "개인정보 및 이용 안내", description: "새벽별 웹사이트의 개인정보, 외부 채널, 심리교육 콘텐츠와 마음도구 이용 안내입니다." });
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-main">
        <div className="shell legal-wrap">
          <span className="section-kicker">PRIVACY & USE</span>
          <h1>개인정보 및 이용 안내</h1>
          <p className="legal-updated">마지막 업데이트: 2026년 8월 18일</p>
          <section><h2>1. 이 웹사이트 자체에서 처리하는 정보</h2><p>현재 새벽별 웹사이트에는 회원가입과 자체 상담 문의폼이 없습니다. 웹사이트에서 상담 기록을 저장하지 않으며, 문의 template의 복사 기능은 사용자 기기의 클립보드에서만 작동합니다. 복사한 내용은 웹사이트 서버로 전송되거나 저장되지 않습니다.</p></section>
          <section><h2>2. 카카오채널 문의</h2><p>대표 문의 채널은 카카오채널입니다. 문의 버튼을 누르면 카카오 외부 플랫폼으로 이동하며, 카카오에서 입력한 정보와 이용기록은 카카오의 서비스 및 개인정보 관련 정책을 따릅니다. 첫 문의에서 상세한 민감정보를 요구하지 않으므로 주민등록번호, 진단서, 상세 의료정보 또는 불필요하게 자세한 개인사를 보내지 않아도 됩니다.</p></section>
          <section><h2>3. 외부 콘텐츠·소셜 채널</h2><p>네이버 블로그와 Instagram은 콘텐츠 및 소셜 채널이며, Notion은 공개 콘텐츠와 안내를 확인하는 외부 채널입니다. 대표 상담 문의 채널이 아니며, 각 링크를 통해 이동한 뒤 처리되는 계정 정보와 이용기록은 해당 서비스의 정책을 따릅니다.</p></section>
          <section><h2>4. 콘텐츠 이용 기준</h2><p>GUIDE는 일반 심리교육 및 정보 제공을 위한 콘텐츠이고, COLUMN은 새벽별의 관점과 심리교육적 글입니다. TOOLS는 자기이해와 자기돌봄을 위한 일반적인 도구입니다. 모든 콘텐츠는 개인의 진단·치료·의학적 판단·위기개입을 대신하지 않습니다.</p></section>
          <section><h2>5. 콘텐츠 저작권</h2><p>© 2026 새벽별 심리상담센터. 사이트의 GUIDE, COLUMN, TOOLS 콘텐츠는 출처를 표시한 비상업적 인용 범위를 제외하고 무단 복제·재배포하지 말아주세요.</p></section>
          <section><h2>6. Insight Relay</h2><p>Insight Relay는 현재 개발 중이며 이 웹사이트에서 관련 데이터를 받고 있지 않습니다. 정식 출시 시 실제 수집 정보, 이용 목적, 보관 방식, 동의 절차와 사용자 권리를 별도로 안내합니다.</p></section>
          <section><h2>7. 문의</h2><p>사이트 및 개인정보·콘텐츠 이용 안내에 관한 문의는 <Link href="/contact">문의 페이지</Link>에서 대표 카카오채널을 이용해주세요.</p></section>
        </div>
      </main>
      <Footer />
    </>
  );
}
