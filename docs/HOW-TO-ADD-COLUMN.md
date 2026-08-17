# GitHub 웹사이트에서 COLUMN 추가하기

COLUMN은 새벽별의 관점과 해석, 상담과 삶에 대한 editorial writing을 위한 글입니다. 독자의 정보 탐색이 목적이면 GUIDE를, 직접 해보는 활동이면 TOOLS를 선택합니다.

## 새 글 만들기

1. GitHub의 `psyapple/therad` repository에서 `main` branch를 확인합니다.
2. `content` → `column`으로 이동합니다.
3. `_TEMPLATE.mdx` 전체를 복사합니다.
4. `Add file` → `Create new file`을 누릅니다.
5. `english-slug.mdx` 파일명을 입력합니다.
6. template을 붙여넣고 `title`, `slug`, description, topics, 날짜, author를 수정합니다.
7. 관련 글이나 서비스가 있으면 실제 GUIDE slug, TOOL slug, CARE ID를 relation에 적습니다.
8. 예시 본문을 지우고 실제 COLUMN을 작성합니다.
9. Preview를 확인하고 Commit changes를 누릅니다.
10. 배포 뒤 `/column/slug`에서 확인합니다.

COLUMN이 0개일 때 GUIDE에는 빈 영역이 나타나지 않습니다. 첫 COLUMN이 등록되면 GUIDE 하단에 `FROM SAEBYEOKBYEOL · COLUMN` section이 자동으로 나타납니다. Header navigation은 그대로 유지됩니다.

## 수정과 삭제

수정할 때는 `content/column/파일명.mdx`를 Edit하고 `updatedAt`을 변경한 뒤 commit합니다. 삭제하면 `/column/slug`가 404가 될 수 있으므로 공개 글은 가능한 한 업데이트를 우선합니다.
