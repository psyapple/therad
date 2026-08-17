# GitHub 웹사이트에서 TOOL 추가하기

TOOLS는 독자가 일상에서 직접 사용해볼 수 있는 워크시트, 질문, 기록지와 연습입니다.

## 새 마음도구 만들기

1. GitHub의 `psyapple/therad` repository에서 `main` branch를 확인합니다.
2. `content` → `tools`로 이동합니다.
3. `_TEMPLATE.mdx` 전체를 복사합니다.
4. `Add file` → `Create new file`을 누릅니다.
5. `english-slug.mdx` 형식으로 파일명을 입력합니다.
6. template을 붙여넣고 title, slug, description, category, topics, format과 날짜를 수정합니다.
7. `relatedGuides`에는 실제 GUIDE slug, `relatedServices`에는 실제 CARE ID를 적습니다.
8. `##` 제목 아래에 설명과 사용자가 직접 적어볼 질문을 목록으로 작성합니다.
9. Preview를 확인하고 Commit changes를 누릅니다.
10. 배포 뒤 `/tools/slug`, TOOLS archive, 관련 GUIDE에서 연결을 확인합니다.

## 수정과 삭제

`content/tools/파일명.mdx`를 Edit하고 본문과 `updatedAt`을 수정한 뒤 commit합니다. 삭제하면 `/tools/slug`가 404가 되고 GUIDE relation이 깨질 수 있습니다. 먼저 해당 TOOL slug를 참조하는 GUIDE와 COLUMN을 확인합니다.

## Featured

`featured: true`인 TOOL은 HOME 추천 후보가 되며 `order`가 빠른 최대 3개가 표시됩니다.
