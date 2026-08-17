"use client";

import { useMemo, useState } from "react";
import { kakaoChannelUrl } from "@/lib/contact";

const inquiryTypes = [
  {
    id: "care",
    label: "상담·심리평가",
    description: "개인상담 · 커플상담 · 아동상담 · 심리평가",
    template: "[새벽별 상담·심리평가 문의]\n\n1. 관심 있는 서비스:\n2. 이용 대상: 본인 / 커플 / 자녀\n3. 대면 / 화상:\n4. 가능한 요일·시간대:\n5. 궁금한 점:\n\n※ 자세한 개인사나 민감정보는 첫 문의에서 보내지 않아도 됩니다.",
  },
  {
    id: "collab",
    label: "교육·기관·협업",
    description: "강의 · 외부 프로그램 · 상담사 교육 · 콘텐츠 · 웰니스 협업",
    template: "[새벽별 교육·협업 문의]\n\n1. 소속/기관:\n2. 문의 유형:\n3. 대상 및 예상 인원:\n4. 희망 일정:\n5. 함께 논의하고 싶은 내용:",
  },
  {
    id: "relay",
    label: "Insight Relay",
    description: "개발 소식, 파트너십, 사용자 의견",
    template: "[Insight Relay 문의]\n\n1. 문의자 유형(내담자·상담자·기관·기타):\n2. 관심을 갖게 된 이유:\n3. 궁금한 점:\n\n※ Insight Relay는 현재 개발 중인 서비스입니다.",
  },
];

type ContactChooserProps = {
  initialType?: string;
};

export function ContactChooser({ initialType = "care" }: ContactChooserProps) {
  const [selected, setSelected] = useState(
    inquiryTypes.some((type) => type.id === initialType) ? initialType : "care",
  );
  const [copied, setCopied] = useState(false);
  const item = useMemo(() => inquiryTypes.find((type) => type.id === selected) ?? inquiryTypes[0], [selected]);

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(item.template);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = item.template;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="contact-chooser">
      <div className="contact-types" role="group" aria-label="문의 유형 선택">
        {inquiryTypes.map((type, index) => (
          <button
            className={selected === type.id ? "active" : ""}
            type="button"
            key={type.id}
            onClick={() => { setSelected(type.id); setCopied(false); }}
          >
            <span>0{index + 1}</span>
            <strong>{type.label}</strong>
            <small>{type.description}</small>
            <b aria-hidden="true">→</b>
          </button>
        ))}
      </div>
      <div className="inquiry-template">
        <span className="footer-label">MESSAGE TEMPLATE</span>
        {item.id === "relay" && <span className="inquiry-status">IN DEVELOPMENT · COMING SOON</span>}
        <h2>{item.label} 문의 메모</h2>
        <p>필요하다면 아래 내용을 참고해 카카오채널로 문의해주세요. 모든 항목을 작성할 필요는 없습니다.</p>
        <pre>{item.template}</pre>
        <div className="template-actions">
          <a className="button button-primary" href={kakaoChannelUrl} target="_blank" rel="noreferrer noopener">
            카카오채널로 문의하기 ↗
          </a>
          <button className="button button-ghost" type="button" onClick={copyTemplate}>
            {copied ? "복사했어요 ✓" : "문의 문구 복사"}
          </button>
        </div>
        <span className="privacy-mini">웹사이트는 이 내용을 저장하거나 전송하지 않습니다. 첫 문의에서는 상세한 진단·의료정보나 민감한 개인정보를 보내지 않아도 됩니다.</span>
      </div>
    </div>
  );
}
