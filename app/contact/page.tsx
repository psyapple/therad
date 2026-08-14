import type { Metadata } from "next";
import { ContactChooser } from "@/components/ContactChooser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { publicContent } from "@/lib/public-content";

export const metadata: Metadata = { title: "문의", description: "새벽별 상담, 교육·협업, Insight Relay 문의 방법을 안내합니다." };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="CONTACT · START A CONVERSATION" index="05" title={<>정리된 질문이 아니어도,<br /><em>지금 궁금한 것부터.</em></>} description="상담, 교육·협업, Insight Relay 중 가까운 주제를 선택해 문의해주세요. 필요한 안내를 확인한 뒤 답변드립니다." />
        <section className="section contact-section"><div className="shell"><div className="contact-heading"><span className="section-kicker">CHOOSE YOUR PATH</span><h2>어떤 이야기로 찾아오셨나요?</h2></div><ContactChooser /></div></section>
        <section className="section contact-channels"><div className="shell channels-grid"><div><span className="section-kicker">DIRECT CHANNELS</span><h2>현재 운영 중인 채널</h2><p>아래 공개 채널에서 새벽별의 실제 콘텐츠를 읽고, 각 채널의 방식으로 문의할 수 있습니다.</p></div><div className="channel-list"><a href={publicContent.blog.profileUrl} target="_blank" rel="noreferrer"><span>NAVER BLOG</span><div><strong>{publicContent.blog.title}</strong><p>{publicContent.blog.description}</p></div><b>↗</b></a><a href={publicContent.notion.publicUrl} target="_blank" rel="noreferrer"><span>NOTION</span><div><strong>{publicContent.notion.title}</strong><p>상담 전 준비, 상담사 선택, 상담 중 알아둘 점을 모은 공개 가이드입니다.</p></div><b>↗</b></a><a href={publicContent.instagram.profileUrl} target="_blank" rel="noreferrer"><span>INSTAGRAM</span><div><strong>@{publicContent.instagram.handle}</strong><p>짧은 심리교육 콘텐츠와 센터 소식을 확인하고 DM으로 문의하세요.</p></div><b>↗</b></a></div></div></section>
        <section className="contact-notice"><div className="shell notice-grid"><strong>문의 전 확인해주세요.</strong><ul><li>첫 메시지에는 주민등록번호, 진단서, 상세한 의료정보 등 민감정보를 보내지 마세요.</li><li>답변은 운영 일정에 따라 시간이 걸릴 수 있으며, 긴급한 위기 상황에 즉시 대응하는 채널이 아닙니다.</li><li>즉각적인 안전 문제가 있다면 이 웹사이트 대신 가까운 응급의료기관 또는 지역의 긴급 서비스를 이용하세요.</li></ul></div></section>
      </main>
      <Footer />
    </>
  );
}
