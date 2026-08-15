import type { Metadata } from "next";
import { ContactChooser } from "@/components/ContactChooser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "문의", description: "새벽별 상담, 교육·협업, Insight Relay 문의 방법을 안내합니다." };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="CONTACT · START A CONVERSATION" index="06" title={<>정리된 질문이 아니어도,<br /><em>지금 궁금한 것부터.</em></>} description="상담, 교육·협업, Insight Relay 중 가까운 주제를 선택해 문의해주세요. 필요한 안내를 확인한 뒤 답변드립니다." />
        <section className="section contact-section"><div className="shell"><div className="contact-heading"><span className="section-kicker">CHOOSE YOUR PATH</span><h2>어떤 이야기로 찾아오셨나요?</h2></div><ContactChooser /></div></section>
        <section className="contact-notice"><div className="shell notice-grid"><strong>문의 전 확인해주세요.</strong><ul><li>첫 메시지에는 주민등록번호, 진단서, 상세한 의료정보 등 민감정보를 보내지 마세요.</li><li>답변은 운영 일정에 따라 시간이 걸릴 수 있으며, 긴급한 위기 상황에 즉시 대응하는 채널이 아닙니다.</li><li>즉각적인 안전 문제가 있다면 이 웹사이트 대신 가까운 응급의료기관 또는 지역의 긴급 서비스를 이용하세요.</li></ul></div></section>
      </main>
      <Footer />
    </>
  );
}
