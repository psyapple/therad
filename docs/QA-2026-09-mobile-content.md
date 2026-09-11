# 콘텐츠 추가·모바일 가독성 검토 — 2026-09-11

기준: GitHub main `30d2e194e28a0a2d1adbb4e767af5bd4f52af1da`.

## 콘텐츠

- GUIDE 18 → 19, COLUMN 0 → 2, TOOLS 10 유지.
- 기존 GUIDE 18개와 TOOLS 10개의 generated record를 기준 커밋과 비교: 변경 0개.
- 신규 원문·선별 기준: `content-additions-2026-09.md`.
- 로컬 Threads 원본 아카이브는 Git 제외 상태 유지. 댓글·개인 사례·계정 식별자는 추가하지 않음.
- HOME 추천 순서, 카피, 상위 영역, 가격·자격·학력, Insight Relay 개발 상태 유지.

## 가독성

- 기존에 이름만 선언되어 있던 Pretendard Variable의 공식 v1.3.9 동적 서브셋을 자체 호스팅. 원본 라이선스 포함.
- 한 번에 전체 폰트를 받지 않고 페이지에 사용되는 문자 범위만 요청. 외부 폰트 CDN 호출 없음.
- 주요 본문 1rem(기본 16px), 줄 높이 1.85–1.9. 제목의 지나친 음수 자간 완화.
- 읽는 데 필요한 보조 정보 크기 확대, 긴 한글·영문 줄바꿈 허용.
- 모바일 GUIDE 필터 줄바꿈 및 선택 상태 aria-pressed 적용.
- 모바일 TOOLS archive 설명 숨김 해제. Header/Hero/별 그래픽/배색/큰 구획은 유지.

## 브라우저 검증

로컬 production build를 사용해 320 / 390 / 768 / 1440px에서 아래 12개 경로를 확인. 총 48개 조합에서 document horizontal overflow 0px, 제목 정상 표시.

`/`, `/about`, `/care`, `/care/trauma-attachment`, `/guide`, `/guide/couple-assessment-conversation`, `/tools`, `/tools/emotion-check-in`, `/column`, `/column/whose-story-is-therapy`, `/column/before-a-psychology-label`, `/contact`.

실제 클릭: GUIDE의 심리검사 필터 → 신규 GUIDE → 커플 CARE. GUIDE 하단 COLUMN → 신규 COLUMN → 관련 TOOL.

시각 확인: 모바일 GUIDE 필터·본문, TOOLS 설명, Footer, desktop HOME의 orbit 그래픽. Footer 진입 시 Floating CTA aria-hidden=true 확인.

물리적 iPhone/Android 실기기 검사는 아니며, 브라우저 viewport 기반 검증입니다. 공개 사이트는 이번 작업에서 배포하지 않습니다.
