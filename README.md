# 새벽별 웹사이트

새벽별 심리상담센터의 CARE·GUIDE·TOOLS와 개발 중인 Insight Relay를 한곳에 모은 공개 웹사이트입니다.

- 공식 웹사이트: https://saebyeokstar.com
- 실제 웹사이트 전환 자료: [`docs/launch-materials.md`](docs/launch-materials.md)
- 정보 입력서: [`docs/site-information-form.md`](docs/site-information-form.md)
- 콘텐츠 운영 흐름: [`docs/content-update-workflow.md`](docs/content-update-workflow.md)

## 실행

```bash
npm install
npm run dev
```

검증과 배포용 빌드:

```bash
npm run lint
npm test
```

## 공개 콘텐츠 동기화

사이트에 표시되는 외부 데이터의 원본은 `data/content-sources.json`에서 관리합니다.

- 네이버 블로그: 공개 RSS에서 센터 소개와 최신 글 8개를 가져옵니다.
- 노션: 공개된 심리상담 가이드에서 소개·목차·상담 전 체크리스트를 가져옵니다.
- 인스타그램: 프로필은 항상 연결되며, 공식 Graph API 환경 변수가 있으면 최신 게시물도 가져옵니다.

수동으로 최신 데이터를 반영하려면:

```bash
npm run content:sync
```

`npm run build` 전에도 자동 동기화가 실행됩니다. 외부 서비스가 일시적으로 응답하지 않으면 마지막으로 저장된 `data/public-content.json`을 사용하므로 사이트 빌드는 계속됩니다.

인스타그램 게시물 동기화에는 다음 환경 변수가 필요합니다.

```text
INSTAGRAM_BUSINESS_ACCOUNT_ID=
INSTAGRAM_ACCESS_TOKEN=
```

토큰은 저장소에 커밋하지 않습니다. 환경 변수가 없을 때는 공개 프로필 링크만 표시됩니다.

로컬 설정은 `.env.example`을 복사해 사용합니다. 실제 값이 들어간 `.env` 파일은 GitHub에 올리지 않습니다.

## 주요 파일

- `app/`: 페이지와 메타데이터
- `components/`: 공통 UI와 공개 채널 스트림
- `lib/content.ts`: 사이트 자체 가이드·상담 서비스 데이터
- `data/public-content.json`: 외부 공개 소스의 검증된 스냅샷
- `scripts/sync-public-content.mjs`: 블로그·노션·인스타그램 동기화
- `public/brand-logo.png`: 네이버 블로그 프로필에 공개된 공식 로고 원본

상담 기록, 댓글·답글, 개인 메시지처럼 민감하거나 맥락이 필요한 데이터는 자동으로 게시하지 않습니다.
`data/threads_and_replies.json` 같은 원본 아카이브는 로컬에만 보관하고 공개 GitHub에서는 제외합니다.
