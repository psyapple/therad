# 새벽별 공식 웹사이트 공개 체크리스트

## 확정된 공식 주소

- Primary Domain: `https://saebyeokstar.com`
- canonical, Open Graph URL, sitemap, robots와 구조화 데이터는 모두 위 apex `.com`을 기준으로 생성합니다.
- Sites 배포 주소는 배포·장애 확인을 위한 기술적 주소로만 유지하며 공식 URL로 안내하지 않습니다.
- 운영 환경의 `SITE_URL`은 `https://saebyeokstar.com`으로 설정합니다. 환경변수가 없더라도 production fallback은 같은 주소입니다.
- 로컬 개발 요청은 `localhost` 또는 `127.0.0.1` origin을 그대로 사용합니다.

## 도메인 운영 TODO

- [x] `saebyeokstar.com`을 Sites Custom Domain에 연결하고 HTTPS를 확인합니다.
- [ ] `www.saebyeokstar.com`을 연결한 뒤 `https://saebyeokstar.com`으로 301 redirect합니다.
- [ ] `saebyeokstar.kr`을 방어용으로 유지하고 `https://saebyeokstar.com`으로 301 redirect합니다.
- [ ] 위 보조 도메인은 canonical이나 sitemap URL로 사용하지 않습니다.

이번 코드 작업에서는 `www`와 `.kr`의 DNS 또는 redirect 설정을 변경하지 않습니다.

## 배포 후 SEO 확인

- [ ] `https://saebyeokstar.com`과 주요 상세페이지가 HTTPS로 열리는지 확인합니다.
- [ ] HOME, ABOUT, CARE, GUIDE, TOOLS, COLUMN, CONTACT, PRIVACY, INSIGHT RELAY의 canonical이 apex `.com`을 가리키는지 확인합니다.
- [ ] GUIDE, TOOLS, CARE 상세페이지의 canonical도 해당 `.com` 경로를 가리키는지 확인합니다.
- [ ] GUIDE와 COLUMN은 글별 title, description, 발행일, 수정일과 Article Open Graph가 출력되는지 확인합니다.
- [ ] TOOLS는 Article이 아닌 website Open Graph로 출력되는지 확인합니다.
- [ ] Organization, Article, BreadcrumbList 구조화 데이터의 URL이 `.com`인지 확인합니다.
- [ ] `https://saebyeokstar.com/og.png`가 HTTP 200으로 열리는지 확인합니다.
- [ ] favicon으로 기존 brand symbol이 표시되는지 확인합니다.
- [ ] 존재하지 않는 GUIDE, TOOL, COLUMN, CARE와 일반 URL이 404를 반환하는지 확인합니다.

## Sitemap과 robots

- [ ] `https://saebyeokstar.com/sitemap.xml`이 열리는지 확인합니다.
- [ ] HOME과 공개 index, CARE 상세, GUIDE 18개, TOOLS 10개, 실제 COLUMN 상세가 포함되는지 확인합니다.
- [ ] 새 GUIDE, TOOL, COLUMN이 파일 기반 콘텐츠에 추가되면 sitemap에도 자동으로 추가되는지 확인합니다.
- [ ] `_TEMPLATE.mdx`와 프로젝트 내부 경로가 sitemap에 포함되지 않는지 확인합니다.
- [ ] `https://saebyeokstar.com/robots.txt`가 공개 콘텐츠 crawl을 허용하는지 확인합니다.
- [ ] robots의 Sitemap 값이 `https://saebyeokstar.com/sitemap.xml`인지 확인합니다.

## Google Search Console

- [ ] 권장: Domain Property `saebyeokstar.com`을 등록합니다.
- [ ] 대안: URL-prefix property `https://saebyeokstar.com`을 등록합니다.
- [ ] Google이 제공한 DNS TXT 또는 verification token만 사용하며 임의 값을 만들지 않습니다.
- [ ] HTML meta 방식이면 token의 `content` 값만 Sites의 `GOOGLE_SITE_VERIFICATION`에 입력하고 재배포합니다.
- [ ] `https://saebyeokstar.com/sitemap.xml`을 제출합니다.
- [ ] HOME, CARE, GUIDE, GUIDE 상세, TOOLS의 색인 상태를 순서대로 확인합니다.

## Naver Search Advisor

- [ ] 공식 사이트 `https://saebyeokstar.com`을 등록합니다.
- [ ] 네이버가 제공한 verification token만 사용하며 임의 값을 만들지 않습니다.
- [ ] HTML meta 방식이면 token의 `content` 값만 Sites의 `NAVER_SITE_VERIFICATION`에 입력하고 재배포합니다.
- [ ] `https://saebyeokstar.com/robots.txt` 진단을 실행합니다.
- [ ] `https://saebyeokstar.com/sitemap.xml`을 제출합니다.
- [ ] 주요 페이지의 수집 요청과 색인 상태를 확인합니다.

## 개인정보·문의·저작권

- [x] 웹사이트 자체에는 회원가입, 상담기록 저장, 자체 상담문의 DB와 문의 template 서버 전송이 없습니다.
- [x] 대표 문의채널은 새벽별 카카오채널입니다.
- [x] 네이버 블로그, Instagram과 Notion은 외부 콘텐츠·소셜 채널로 구분합니다.
- [x] `© 2026 새벽별 심리상담센터` 표기를 유지합니다.
- [ ] Analytics, Meta Pixel, Kakao Pixel은 별도의 privacy/cookie 검토 전에는 설치하지 않습니다.

## 독립 도메인 안정화 후 외부 채널 변경

다음 항목의 홈페이지 링크를 모두 `https://saebyeokstar.com`으로 통일합니다.

- [ ] Naver Blog 프로필 홈페이지
- [ ] Instagram 프로필 링크
- [ ] Kakao Channel 홈페이지
- [ ] Google Business Profile이 있다면 홈페이지
- [ ] 기관 소개자료
- [ ] 명함과 QR
- [ ] PDF 소개서
- [ ] 이메일 서명

## 최종 공개 점검

- [ ] desktop, tablet, mobile에서 주요 페이지와 Header/Footer 링크를 확인합니다.
- [ ] HOME, CARE와 CONTACT의 카카오 문의 링크를 확인합니다.
- [ ] 공유 미리보기에서 HOME과 대표 GUIDE의 제목·설명을 확인합니다.
- [ ] 공개 HTML에 Sites 기술 주소가 canonical, OG URL 또는 구조화 데이터의 공식 URL로 남지 않았는지 확인합니다.
