# 콘텐츠 배포 오류 해결하기

콘텐츠 validation이 실패하면 공개 사이트는 이전 정상 버전을 유지합니다. 오류 메시지에서 파일명과 항목을 확인해 수정한 뒤 다시 commit합니다.

## category가 허용되지 않는다는 오류

직접 만든 새 표현이나 오타가 들어간 경우입니다. GUIDE는 5개 허용값, TOOLS는 4개 broad category 중 하나를 정확히 복사합니다. 띄어쓰기까지 같아야 합니다.

## 존재하지 않는 CARE ID

한글 서비스명이 아니라 다음 ID 중 하나를 사용합니다.

```text
individual, couple, child-parent, assessment, trauma-attachment
```

## 존재하지 않는 GUIDE 또는 TOOL slug

relation에 적은 slug와 실제 파일의 frontmatter `slug`가 다른 경우입니다. 해당 폴더에서 정확한 slug를 복사합니다. 참조 대상 파일을 삭제했다면 relation에서도 제거합니다.

## duplicate slug

GUIDE·COLUMN·TOOLS 중 같은 slug가 두 번 사용되었습니다. 새 파일의 파일명과 slug를 다른 고유한 값으로 바꿉니다.

## 파일명과 slug가 다름

예를 들어 파일이 `emotion-note.mdx`라면 frontmatter도 `slug: "emotion-note"`여야 합니다. 둘 중 하나만 바꾸지 않습니다.

## 날짜 형식 오류

`2026-8-1`, `2026.08.01`이 아니라 `2026-08-01`처럼 작성합니다. 존재하지 않는 날짜도 허용되지 않습니다.

## intro / 소제목 / takeaway 오류

GUIDE는 다음 순서를 유지합니다.

1. 첫 도입문
2. 하나 이상의 `## 소제목`
3. `---` 구분선
4. `**기억해두면 좋은 한 문장**`
5. 핵심 문장

TOOLS는 하나 이상의 `## 단계 제목`이 필요합니다.

## 글이 archive에 보이지 않음

- 파일 확장자가 `.mdx`인지 확인합니다.
- `_TEMPLATE.mdx`처럼 파일명이 `_`로 시작하면 template으로 간주되어 공개되지 않습니다.
- commit 대상 branch가 `main`인지 확인합니다.
- 배포가 아직 진행 중인지 확인합니다.

## 기존 글 URL을 바꾸고 싶음

slug와 파일명 변경은 기존 외부 링크를 깨뜨립니다. 내용만 수정하고 URL은 유지하는 것이 원칙입니다. 꼭 변경해야 한다면 redirect 작업을 별도로 요청합니다.
