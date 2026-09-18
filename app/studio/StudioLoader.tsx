"use client";
import { useEffect, useState, type ComponentType } from "react";
import "./studio.css";

// The Studio (and its editor dependencies) is never evaluated in the Worker/RSC runtime.
export default function StudioLoader() {
  const [Studio, setStudio] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let mounted = true;
    import("./Studio")
      .then((module) => {
        if (mounted) setStudio(() => module.default);
      })
      .catch(() => {
        if (mounted) setFailed(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="sanity-studio-root">
      {Studio ? (
        <Studio />
      ) : (
        <p role="status">
          {failed
            ? "관리자 화면을 불러오지 못했습니다. 페이지를 새로고침해 주세요."
            : "새벽별 글쓰기 화면을 불러오고 있습니다…"}
        </p>
      )}
    </div>
  );
}
