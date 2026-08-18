"use client";

import { useEffect, useState } from "react";
import { kakaoChannelUrl } from "@/lib/contact";

const floatingContactPaths = ["/", "/about", "/care", "/guide", "/column", "/tools"];

function isFloatingContactPath(pathname: string) {
  return floatingContactPaths.some((path) => pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)));
}

export function KakaoFloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isFloatingContactPath(window.location.pathname)) return;

    let footerVisible = false;
    const updateVisibility = () => setVisible(window.scrollY >= 400 && !footerVisible);
    const footer = document.querySelector(".site-footer");
    const footerObserver = footer
      ? new IntersectionObserver(([entry]) => {
          footerVisible = entry.isIntersecting;
          updateVisibility();
        })
      : null;

    window.addEventListener("scroll", updateVisibility, { passive: true });
    if (footer) footerObserver?.observe(footer);
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      footerObserver?.disconnect();
    };
  }, []);

  return (
    <a
      className={`kakao-floating-contact${visible ? " is-visible" : ""}`}
      href={kakaoChannelUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="새벽별 카카오채널로 문의하기"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className="kakao-floating-talk" aria-hidden="true">TALK</span>
      <span className="kakao-floating-label kakao-floating-label-desktop">카카오로 문의하기</span>
      <span className="kakao-floating-label kakao-floating-label-mobile">카카오 문의</span>
      <span className="kakao-floating-arrow" aria-hidden="true">↗</span>
    </a>
  );
}
