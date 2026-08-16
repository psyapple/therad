import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = { title: "개인정보 및 이용 안내", description: "새벽별 웹사이트의 개인정보, 외부 채널, 심리교육 콘텐츠 이용 안내입니다." };

export default function PrivacyPage() {
  return <><Header /><main className="legal-main"><div className="shell legal-wrap"><span className="section-kicker">PRIVACY & USE</span><h1>개인정보 및 이용 안내</h1><p className="legal-updated">마지막 업데이트: 2026년 8월 13일</p><section><h2>1. 이 웹사이트에서 수집하는 정보</h2><p>현재 새벽별 웹사이트는 회원가입, 상담 기록 저장, 문의 폼 전송 기능을 제공하지 않으며 방문자가 입력한 개인정보를 직접 수집하거나 저장하지 않습니다. 문의 문구 복사 기능은 사용자의 기기 안에서만 작동합니다.</p></section><section><h2>2. 외부 채널 이용</h2><p>네이버 블로그와 Instagram 링크를 통해 이동한 뒤 이루어지는 메시지, 계정 정보 및 이용 기록은 각 서비스 제공자의 정책에 따라 처리됩니다. 민감한 개인정보나 상세한 건강정보는 첫 문의에 포함하지 않는 것을 권합니다.</p></section><section><h2>3. 심리교육 콘텐츠</h2><p>GUIDE와 사이트 내 콘텐츠는 일반적인 심리교육과 정보 제공을 목적으로 합니다. 개인에 대한 진단, 치료, 위기 개입 또는 의료적 조언을 대신하지 않습니다.</p></section><section><h2>4. Insight Relay</h2><p>Insight Relay는 현재 개발 중인 별도 서비스입니다. 정식 출시 시 수집하는 정보, 이용 목적, 보관 기간, 사용자의 권리와 안전 조치를 별도의 개인정보 처리 안내와 동의 과정으로 제공합니다.</p></section><section><h2>5. 문의</h2><p>사이트 및 개인정보 안내에 관한 문의는 <Link href="/contact">문의 페이지</Link>의 운영 채널을 이용해주세요.</p></section></div></main><Footer /></>;
}
