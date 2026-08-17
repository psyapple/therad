# 새벽별 공식 웹사이트 공개 체크리스트

독립 도메인을 연결하거나 검색엔진 등록을 시작할 때 아래 항목을 순서대로 확인합니다. 현재 사이트는 환경변수 값이 없으면 방문자가 접속한 주소를 기준으로 canonical, sitemap과 robots 주소를 만듭니다.

## 1. 독립 도메인 연결

- [ ] 사용할 도메인을 확정합니다.
- [ ] Sites의 도메인 설정에서 독립 도메인을 추가합니다.
- [ ] 도메인 업체의 DNS 화면에 Sites가 안내하는 값을 그대로 입력합니다.
- [ ] `https://독립도메인`으로 HOME과 상세페이지가 열리는지 확인합니다.
- [ ] 기존 `chatgpt.site` 주소를 바로 없애기보다 독립 도메인의 연결과 인증서 상태를 먼저 확인합니다.

## 2. SITE_URL 환경변수 설정

- [ ] 사이트의 환경변수 설정에서 `SITE_URL`을 추가합니다.
- [ ] 값은 `https://독립도메인`처럼 origin만 입력합니다. 뒤에 `/guide` 같은 경로를 붙이지 않습니다.
- [ ] 저장 후 사이트를 다시 배포합니다.
- [ ] 페이지 소스의 `canonical`, `/sitemap.xml`, `/robots.txt`가 독립 도메인을 가리키는지 확인합니다.

`NEXT_PUBLIC_SITE_URL`도 지원하지만 운영 주소에는 서버 환경변수인 `SITE_URL` 사용을 권장합니다. 둘 다 없으면 현재 접속 host가 자동으로 사용됩니다.

## 3. Google Search Console 등록

- [ ] Google Search Console에서 독립 도메인 속성 또는 URL 접두어 속성을 추가합니다.
- [ ] DNS 확인을 선택했다면 Google이 제공한 TXT 값을 도메인 DNS에 입력합니다.
- [ ] HTML meta 확인을 사용한다면 Google이 제공한 `content` 값만 `GOOGLE_SITE_VERIFICATION` 환경변수에 입력합니다. `<meta>` 태그 전체를 넣지 않습니다.
- [ ] 사이트를 다시 배포한 뒤 Search Console에서 소유권 확인을 누릅니다.
- [ ] 확인 token을 임의로 만들지 않습니다.

## 4. Google sitemap 제출

- [ ] Search Console의 `Sitemaps` 메뉴를 엽니다.
- [ ] `sitemap.xml`을 입력해 제출합니다.
- [ ] 제출 주소가 `https://독립도메인/sitemap.xml`인지 확인합니다.
- [ ] GUIDE나 TOOL을 추가한 뒤 sitemap에 새 URL이 자동으로 나타나는지 확인합니다.

## 5. Naver Search Advisor 등록

- [ ] 네이버 서치어드바이저에서 사이트를 추가합니다.
- [ ] HTML meta 확인을 선택한 경우 네이버가 제공한 `content` 값만 `NAVER_SITE_VERIFICATION` 환경변수에 입력합니다.
- [ ] 사이트를 다시 배포하고 소유확인을 완료합니다.
- [ ] 사이트 관리의 요청 메뉴에서 `sitemap.xml`을 제출합니다.

## 6. 사이트 소유확인 공통 점검

- [ ] verification token 앞뒤에 따옴표나 `<meta>` 태그가 포함되지 않았는지 확인합니다.
- [ ] 공개 페이지 소스에 Google 또는 Naver verification meta가 한 번만 나타나는지 확인합니다.
- [ ] 소유확인 완료 후 token 유지 여부는 각 검색 서비스의 안내를 따릅니다.

## 7. 공유 OG 확인

- [ ] `https://독립도메인/og.png`가 열리는지 확인합니다.
- [ ] HOME 링크를 카카오톡 비공개 대화 또는 공유 디버거에서 테스트합니다.
- [ ] GUIDE와 COLUMN 링크에서 해당 글의 제목·설명과 기본 새벽별 OG 이미지가 표시되는지 확인합니다.
- [ ] 오래된 미리보기가 보이면 해당 플랫폼의 캐시 갱신 기능을 사용합니다.

## 8. favicon 확인

- [ ] desktop 브라우저 탭에서 새벽별 brand symbol이 표시되는지 확인합니다.
- [ ] 모바일 홈 화면 바로가기에서도 전체 로고가 아니라 brand symbol이 표시되는지 확인합니다.
- [ ] 브라우저 캐시 때문에 이전 아이콘이 보이면 새 시크릿 창 또는 캐시 삭제 후 다시 확인합니다.

## 9. 카카오 문의 테스트

- [ ] HOME, CARE와 CONTACT의 문의 버튼을 각각 눌러봅니다.
- [ ] 모두 공식 새벽별 카카오채널로 이동하는지 확인합니다.
- [ ] 첫 문의에 주민등록번호, 진단서, 상세 의료정보나 불필요한 민감정보를 보내지 않아도 된다는 안내를 확인합니다.
- [ ] Instagram과 네이버 블로그가 대표 문의 채널이 아닌 외부 콘텐츠 채널로 표현되는지 확인합니다.

## 10. 모바일 최종 테스트

- [ ] HOME, CARE, GUIDE, TOOLS, COLUMN, ABOUT, CONTACT, 개인정보 및 이용 안내를 확인합니다.
- [ ] Header menu와 Footer link가 눌리는지 확인합니다.
- [ ] 긴 GUIDE 제목, tag, related card에 가로 스크롤이 생기지 않는지 확인합니다.
- [ ] 존재하지 않는 주소에서 새벽별 404 화면과 HOME/GUIDE 버튼이 보이는지 확인합니다.

## 이후 별도 결정할 항목

Google Analytics 등 방문 분석 도구는 이번 공개 준비에 설치하지 않았습니다. 실제 필요성, 수집 범위, 쿠키·개인정보 안내를 함께 검토한 뒤 별도 작업으로 결정합니다.
