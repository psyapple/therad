"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { StarMark } from "./StarMark";

const nav = [
  { href: "/about", label: "ABOUT" },
  { href: "/care", label: "CARE" },
  { href: "/guide", label: "GUIDE" },
  { href: "/tools", label: "TOOLS" },
  { href: "/insight-relay", label: "INSIGHT RELAY" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="새벽별 홈">
            <BrandLogo size="header" priority />
            <span className="brand-text">
              <strong>새벽별</strong>
              <small>Psychology for Everyday Life</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link className="header-contact" href="/contact">
            문의하기 <span aria-hidden="true">↗</span>
          </Link>

          <button
            className={`menu-button ${open ? "is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-navigation">
        <nav className="mobile-nav" aria-label="모바일 메뉴">
          {nav.map((item, index) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}<b aria-hidden="true">↗</b>
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}><span>{String(nav.length + 1).padStart(2, "0")}</span>CONTACT<b aria-hidden="true">↗</b></Link>
        </nav>
        <div className="mobile-menu-foot">
          <span>마음을 이해하고, 연결하고, 살아가는 방법</span>
          <StarMark size="large" />
        </div>
      </div>
    </>
  );
}
