# 새벽별 COLUMN 운영 안내

## 현재 구조와 변경 범위

- 기존 사이트: Vinext 1.0.0-beta.2(App Router 호환), React 19.2.6, Vite 8, Sites/Cloudflare Workers. 정식 Next.js 서버나 Vercel 배포가 아닙니다.
- 동일 프로젝트 안에 `/studio`를 추가했습니다. 공식 `sanity` 6.14.1 및 `next-sanity` 13.3.4의 NextStudio를 관리자 경로에서만 지연 로드합니다. 일반 사이트는 서버 렌더링을 유지합니다.
- COLUMN 목록·상세·GUIDE의 COLUMN 소개·sitemap이 공통 Sanity 읽기 함수를 사용합니다. 공개 API를 매 요청 읽으므로 Publish 후 다음 페이지 요청에 반영됩니다. 재빌드나 webhook은 필요 없습니다.
- HOME, ABOUT, CARE, TOOLS, CONTACT 본문·디자인, Header/Footer, 도메인·DNS는 변경하지 않았습니다. GUIDE 19편과 TOOLS 10편은 기존 파일 기반을 유지합니다.
- 기존 COLUMN 2편은 **B: 임시 유지**를 선택했습니다. 아래 이전 도구로 원문과 URL을 보존하며 Sanity로 옮길 수 있습니다. 이 안내만으로 이전이 실행되는 것은 아닙니다.

## 운영자가 글을 쓰는 순서

1. `https://saebyeokstar.com/studio`를 열고 기존 Sanity 프로젝트 계정으로 로그인합니다.
2. `Content → COLUMN → 새 문서`에서 제목과 짧은 설명을 입력합니다.
3. 주소(slug)의 Generate를 선택합니다. **발행 후 slug 변경은 기존 URL을 바꾸므로 주의**하세요. 자동 리다이렉트는 이번 범위에 없습니다.
4. 대표 이미지가 필요하면 업로드하고 이미지 설명(alt)을 작성합니다.
5. 본문을 작성하고 카테고리를 선택합니다. 일반 문단, H2/H3, 굵게/기울임, 링크, 인용, 번호/기호 목록, 이미지, 구분선을 지원합니다.
6. `함께 보기`에서 관련 GUIDE/TOOLS를 **제목으로 선택**합니다. 연결이 없는 영역은 방문자에게 표시하지 않습니다.
7. 검색 제목/설명은 선택 사항입니다. 비워 두면 제목/짧은 설명을 사용합니다.
8. 발행일을 확인하고 Publish합니다. 미래 날짜이면 해당 시각부터 노출됩니다. draft만 저장한 문서는 노출되지 않습니다.
9. `/column`과 상세 주소를 새로 열어 확인합니다. 이미 열어 둔 방문자 화면이 실시간으로 바뀌는 기능은 아닙니다.

카테고리는 `Content → Categories`에서 추가·수정할 수 있습니다. 초기 6개(상담, 관계, 애착, 트라우마, 심리학·연구, 새벽별 기록)는 아래 초기화/이전 명령이 등록합니다. 명령을 실행하기 전에는 Studio에서 직접 만들 수도 있습니다.

## 최초 계정 설정 — 운영자가 확인할 것

- Sanity Manage → **SB website / 1uy5d575** → API → CORS origins에서 정확한 주소를 확인합니다.
  - 운영: `https://saebyeokstar.com`
  - 개발: `http://localhost:3000`
  - Studio 로그인에는 각 origin의 **Allow credentials**가 필요합니다. `*` 또는 불필요한 외부 주소를 등록하지 않습니다.
- Sanity 프로젝트 멤버에게 글 발행 권한이 있어야 합니다. Google 로그인과 프로젝트 편집 권한은 별개입니다.
- Dataset은 `production`, 공개 읽기가 가능한 상태입니다. 공개 데이터셋에는 상담 기록·개인정보·비밀값을 입력하지 마세요.
- Vercel 설정은 필요 없습니다. 기존 Sites 배포와 도메인 설정을 유지합니다.
- 공개 콘텐츠 읽기에 secret/read/write token은 필요 없습니다. Studio는 Sanity 로그인으로 쓰기 권한을 확인합니다. 토큰을 GitHub, `.env.example`, 대화에 넣지 마세요.

## 환경변수

| 이름 | 공개 가능 | 값/용도 |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | 예 | `1uy5d575` |
| `NEXT_PUBLIC_SANITY_DATASET` | 예 | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | 예 | `2025-02-19` |
| `SITE_URL` | 예 | 기존 `https://saebyeokstar.com` 유지 |

설정은 `sanity/env.ts` 한 곳에 모았습니다. 이 프로젝트의 공개 식별자를 기본값으로 제공하므로 별도 secret 설정 없이 읽기가 작동합니다. Studio의 공개 환경변수를 바꾸면 다시 빌드/배포해야 합니다. 이는 **글 Publish 시에는 필요하지 않습니다**.

## 기존 글의 안전한 이전

실행자는 프로젝트 편집 권한으로 `npx sanity login`을 먼저 완료해야 합니다. 브라우저 로그인과 로컬 CLI 로그인은 별개입니다. 새 write token은 만들지 않습니다.

```powershell
npm run sanity:migrate
```

기본은 확인용(dry run)입니다. 등록 예정인 카테고리와 기존 2개 slug만 출력합니다.

내용을 확인한 다음 실제 이전:

```powershell
$env:SANITY_MIGRATION_APPLY = "1"
npm run sanity:migrate
Remove-Item Env:SANITY_MIGRATION_APPLY
```

- 기존 주소 `/column/before-a-psychology-label`, `/column/whose-story-is-therapy` 유지.
- 본문·발행일·작성자·관계·문장·링크를 유지하고 Markdown을 Portable Text로 변환.
- `createIfNotExists`만 사용합니다. 같은 주소의 Sanity 글이 있으면 덮어쓰지 않고 멈춥니다.
- 한 글과 이전 기록을 같은 transaction으로 생성합니다. 중간 실패 후 다시 실행할 수 있습니다.
- 이전 기록이 있는 글은 재실행해도 다시 만들지 않습니다. **Unpublish한 글이 MDX fallback으로 되살아나지 않습니다.**
- 숨겨진 `columnMigration` 문서는 이 보호를 위한 기록입니다. 운영 중 삭제하지 마세요.
- 원본 MDX는 백업으로 남깁니다. 실제 Sanity 이전 완료 후 운영자는 MDX를 수정하지 않습니다.

## 스키마

- `column`: title, slug, excerpt, coverImage(alt/caption/hotspot), category(reference), body(Portable Text), publishedAt, featured, relatedGuides, relatedTools, seoTitle, seoDescription. 수정일은 Sanity `_updatedAt`을 사용합니다. 기존 author/topics/relatedServices는 이전 보존용 숨김 필드입니다.
- `columnCategory`: title, slug, order.
- `columnMigration`: 이전된 slug를 기록하는 관리용 문서. 일반 작성 메뉴에서 제외합니다.
- 기존 GUIDE/TOOLS 제목 선택지는 파일 데이터에서 가져옵니다. GUIDE/TOOLS를 새로 추가할 때는 기존 절차대로 사이트를 배포하면 Studio 선택지도 갱신됩니다.

## 안전성과 오류 처리

- 읽기 client: token 없음, `perspective: published`, CDN 캐시 대신 최신 공개 API, `no-store`.
- draft/버전 문서와 미래 발행 글은 query 및 응답 단계에서 제외합니다.
- Sanity 장애 시 COLUMN 목록에 안내를 표시하고 상세는 전용 오류 화면을 사용합니다. 기존 GUIDE/TOOLS/CARE는 유지됩니다.
- 장애 때 과거 MDX를 임의 재공개하지 않습니다. sitemap도 잘못된 빈 성공 응답을 내보내지 않고 재시도 가능한 서버 오류로 처리합니다.
- 실제 없는 COLUMN은 기존 404로 처리합니다. Studio는 noindex 및 robots 제외 대상입니다.
- Canonical은 `https://saebyeokstar.com/column/{slug}`. OG/Twitter는 글의 SEO 설정과 실제 cover image만 사용합니다.

## 검증 범위와 남은 확인

- content validation: GUIDE 19, 기존 COLUMN 2, TOOLS 10 정상.
- TypeScript, ESLint, production build, 회귀 테스트 33개 통과(최종 작업 로그에서 재확인).
- 자동 테스트: 동적 CMS 상세, Portable Text, 이미지 alt/OG, category 필터, 관련 콘텐츠, draft/미래 날짜 차단, 404, sitemap, 장애, 이전 보호, 기존 서비스 회귀 검증.
- 실제 브라우저: Studio 로그인 화면, 기존 COLUMN 목록/상세 1440/768/390px, 본문 16px/줄간격 30.4px, 가로 넘침 없음. COLUMN→GUIDE/TOOL 클릭 및 모바일 CARE/CONTACT/GUIDE/TOOLS 확인.
- **실제 Sanity 계정으로 테스트 글 작성·이미지 업로드·Publish·사이트 확인은 계정 로그인 후 별도 확인이 필요합니다.** 자동 fixture 검증은 실제 발행 검증과 다릅니다. 기존 글의 실제 이전과 초기 카테고리 등록도 로그인 후 실행합니다.
- 개발 도구 의존성에 npm 보안 경고가 남아 있습니다. Sanity CLI의 YAML/TOML 처리 및 기존 Vite/로컬 서버 계열 등이 포함됩니다. 이번 작업에서 무리한 major downgrade나 전체 도구 업데이트를 하지 않았습니다. 공개 Worker는 npm 서버/CLI를 실행하지 않습니다. 도구 업데이트는 별도 호환성 검증이 필요합니다.

## 파일 안내

수정: `app/column/page.tsx`, `app/column/[slug]/page.tsx`, `app/guide/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/columns.ts`, `lib/seo.ts`, `.env.example`, `package.json`, `package-lock.json`, `tests/seo-launch.test.mjs`.

추가: `sanity/`(env/client/queries/image/schemaTypes), `sanity.config.ts`, `sanity.cli.ts`, `app/studio/`, `app/column/column.css`, `app/column/error.tsx`, `components/ColumnPortableText.tsx`, `scripts/column-migration.mjs`, `scripts/migrate-columns.ts`, `tests/mock-sanity.mjs`, `tests/sanity-column.test.mjs`, 이 운영 안내.
