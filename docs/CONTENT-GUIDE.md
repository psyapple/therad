# 새벽별 콘텐츠 운영 가이드

새벽별의 공개 콘텐츠는 `content` 폴더 안의 Markdown 파일이 원본입니다. 새 글을 발행할 때 `app`, `components`, `lib` 같은 사이트 코드 파일을 수정하지 않습니다.

```text
content/
├── guide/   독자의 이해와 정보 탐색을 돕는 글
├── column/  새벽별의 관점·해석·에세이
└── tools/   독자가 직접 사용해보는 마음도구
```

## 무엇을 어디에 쓰나요?

### GUIDE

- 무엇인가요?
- 어떻게 하나요?
- 어떤 차이가 있나요?
- 어떻게 선택하나요?

처럼 독자가 정보를 이해하고 선택하도록 돕는 글입니다.

### COLUMN

- 새벽별은 이것을 어떻게 바라보는가?
- 상담 현장에서 무엇을 생각하게 되는가?
- 심리학적 개념을 삶에서 어떻게 바라볼 것인가?

처럼 관점과 해석이 중심인 글입니다. COLUMN 글이 하나 이상 생기면 GUIDE 하단의 `FROM SAEBYEOKBYEOL · COLUMN` 영역이 자동으로 나타납니다. Header에는 COLUMN 메뉴를 추가하지 않습니다.

### TOOLS

“독자가 직접 해볼 수 있는가?”가 중심입니다. 워크시트, 기록지, 연습, 리플렉션처럼 행동과 질문으로 이어지는 자료를 등록합니다.

## 작성 형식

파일 확장자는 `.mdx`이지만 안전을 위해 일반 Markdown만 처리합니다. React component, JavaScript, HTML script는 실행되지 않습니다.

지원 형식:

- `##`와 `###` 제목
- 일반 문단
- `-` 순서 없는 목록
- `1.` 순서 있는 목록
- `> ` 인용문
- `> [!NOTE]` 새벽별 NOTE
- `**굵게**`, `*기울임*`
- `[표시 문구](https://example.com)` 링크
- `---` 구분선

## slug와 파일명

파일명과 frontmatter의 `slug`는 같아야 합니다.

```text
파일명: attachment-and-life.mdx
slug: "attachment-and-life"
```

slug에는 lowercase 영문, 숫자, hyphen만 사용할 수 있습니다. 공백, 한글, underscore는 사용할 수 없습니다. GUIDE·COLUMN·TOOLS 전체에서 같은 slug를 중복 사용할 수 없습니다.

## GUIDE category 허용값

```text
상담 시작하기
상담 잘 이용하기
마음 이해하기
심리치료 알아보기
심리검사 알아보기
```

## TOOLS category 허용값

```text
감정
관계
자기돌봄
상담
```

## CARE ID

relation에는 화면의 한글 제목이 아니라 다음 ID를 사용합니다.

```text
individual
couple
child-parent
assessment
trauma-attachment
```

## GUIDE ↔ TOOLS relation

- GUIDE의 `relatedTools`에는 TOOL slug를 적습니다.
- TOOL의 `relatedGuides`에는 GUIDE slug를 적습니다.
- 한쪽 파일에만 relation이 있어도 공개 UI에서는 양방향으로 연결됩니다.
- 존재하지 않는 slug나 CARE ID는 배포 전에 validation 오류로 차단됩니다.

## 날짜

`publishedAt`, `updatedAt`은 실제 날짜를 `YYYY-MM-DD`로 작성합니다. 글을 수정할 때 `updatedAt`도 바꿉니다.

## Featured와 표시 순서

`featured: true`인 글은 추천 콘텐츠 후보가 됩니다.

- HOME GUIDE: 추천 GUIDE 중 최대 3개
- HOME TOOLS: 추천 TOOL 중 최대 3개
- `order`가 작은 콘텐츠가 먼저 표시됩니다.
- `order`를 생략한 새 콘텐츠는 기존 순서를 깨지 않고 뒤에 추가됩니다.

추천 글을 교체하려면 기존 글의 `featured`를 `false`로 바꾸거나 `order`를 함께 조정합니다.

## 자동 검사

배포 전 다음 명령과 같은 검사가 자동으로 실행됩니다.

```text
npm run validate:content
```

필수 metadata, category, 날짜, slug, relation, 중복 여부와 본문 구조를 검사합니다. 오류가 있으면 배포되지 않으며 오류 메시지에 파일과 수정할 값이 표시됩니다.
