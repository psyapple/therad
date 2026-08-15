"use client";

import { useMemo, useState } from "react";

const inquiryTypes = [
  {
    id: "care",
    label: "상담 문의",
    description: "개인·커플·아동 상담 또는 심리평가",
    template: "[새벽별 상담 문의]\n\n1. 문의할 서비스:\n2. 상담을 원하는 대상(본인/커플/자녀):\n3. 가능한 요일과 시간대:\n4. 가장 궁금한 점:\n\n※ 자세한 개인사나 민감정보는 첫 문의에 적지 않아도 됩니다.",
  },
  {
    id: "collab",
    label: "교육·협업",
    description: "강의, 기관 프로그램, 콘텐츠 및 전문가 협업",
    template: "[새벽별 교육·협업 문의]\n\n1. 소속/기관명:\n2. 문의 유형(강의·프로그램·콘텐츠·기타):\n3. 대상과 예상 인원:\n4. 희망 일정:\n5. 함께 논의하고 싶은 내용:",
  },
  {
    id: "relay",
    label: "Insight Relay",
    description: "개발 소식, 파트너십, 사용자 의견",
    template: "[Insight Relay 문의]\n\n1. 문의자 유형(내담자·상담자·기관·기타):\n2. 관심을 갖게 된 이유:\n3. 궁금한 점:\n\n※ Insight Relay는 현재 개발 중인 서비스입니다.",
  },
];

export function ContactChooser() {
  const [selected, setSelected] = useState("care");
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
        <h2>{item.label}를 위한 메모</h2>
        <p>아래 문구를 복사해 블로그 또는 인스타그램 메시지에 붙여넣으면 필요한 정보를 빠르게 안내받을 수 있습니다.</p>
        <pre>{item.template}</pre>
        <div className="template-actions">
          <button className="button button-primary" type="button" onClick={copyTemplate}>
            {copied ? "복사했어요 ✓" : "문의 문구 복사"}
          </button>
          <a className="button button-ghost" href="https://www.instagram.com/dawnstar_mindtherapy/" target="_blank" rel="noreferrer">
            Instagram 열기 ↗
          </a>
        </div>
        <span className="privacy-mini">웹사이트는 이 내용을 저장하거나 전송하지 않습니다.</span>
      </div>
    </div>
  );
}
