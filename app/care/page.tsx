import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { careServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "CARE · 심리상담",
  description: "개인 심리상담, 커플·부부상담, 놀이치료·양육코칭, 심리평가, 트라우마·애착 상담을 안내합니다.",
};

export default function CarePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="CARE"
          index="02"
          tone="night"
          title={<>마음을 만나는<br /><em>여러 가지 방식</em></>}
          description="사람마다 마음의 어려움을 경험하는 방식도, 도움이 필요한 지점도 다릅니다. 새벽별에서는 지금 필요한 도움과 상황에 따라 여러 형태의 심리서비스를 이용할 수 있습니다."
        />

        <section className="section care-index-services">
          <div className="shell">
            <div className="section-head">
              <div><span className="section-kicker">CARE SERVICES</span><h2>지금 필요한 도움을<br />비교해보세요.</h2></div>
              <span className="section-count">05 SERVICES</span>
            </div>
            <div className="care-index-list">
              {careServices.map((service, index) => (
                <Link className="care-index-row" href={`/care/${service.id}`} id={service.id} key={service.id}>
                  <div className="care-index-number"><span>{String(index + 1).padStart(2, "0")}</span><small>{service.english}</small></div>
                  <div className="care-index-copy"><h2>{service.title}</h2><p>{service.indexDescription}</p></div>
                  <span className="care-index-link">{service.title} 알아보기 <b aria-hidden="true">→</b></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
