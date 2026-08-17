# GitHub 웹사이트에서 GUIDE 추가하기

코드 편집 프로그램 없이 GitHub 웹사이트에서 새 GUIDE를 발행할 수 있습니다.

## 새 글 만들기

1. GitHub에서 `psyapple/therad` repository를 엽니다.
2. 기본 branch가 `main`인지 확인합니다.
3. `content` → `guide` 폴더로 이동합니다.
4. `_TEMPLATE.mdx`를 열고 오른쪽 위의 Raw 또는 코드 영역에서 전체 내용을 복사합니다.
5. `content/guide`로 돌아가 `Add file` → `Create new file`을 누릅니다.
6. 파일명을 `english-slug.mdx` 형식으로 작성합니다. 예: `understanding-emotional-distance.mdx`
7. 복사한 template 내용을 붙여넣습니다.
8. frontmatter의 `title`, `slug`, category, description, topics, relation, 날짜 등을 실제 글에 맞게 수정합니다. 파일명과 `slug`는 같아야 합니다.
9. template 아래의 예시 본문을 모두 지우고 실제 도입문, `##` 소제목, 본문, NOTE, takeaway를 작성합니다.
10. `Preview` 탭에서 제목·문단·목록이 의도대로 보이는지 확인합니다.
11. `Commit changes`를 누르고 변경 내용을 간단히 적은 뒤 `Commit changes`로 확정합니다.
12. 배포가 끝난 뒤 `/guide/작성한-slug`와 GUIDE archive에서 글을 확인합니다.

## 반드시 확인할 항목

- category는 허용된 5개 값 중 하나인가?
- `relatedServices`에는 실제 CARE ID만 사용했는가?
- `relatedTools`에는 실제 `content/tools` 파일의 slug만 사용했는가?
- `publishedAt`, `updatedAt`은 `YYYY-MM-DD`인가?
- 첫 문단, 하나 이상의 `##` 소제목, 마지막 takeaway가 있는가?

## GUIDE 수정하기

1. `content/guide/파일명.mdx`를 엽니다.
2. 연필 모양의 `Edit this file`을 누릅니다.
3. 필요한 metadata나 본문을 수정합니다.
4. `updatedAt`을 수정한 날짜로 변경합니다.
5. Preview를 확인하고 Commit changes를 누릅니다.

slug와 파일명은 공개 URL이므로 기존 글에서는 바꾸지 않는 것이 원칙입니다.

## GUIDE 삭제하기

파일을 삭제하면 기존 `/guide/slug` URL이 404가 될 수 있습니다. 이미 공개한 글은 삭제보다 다음 방법을 먼저 고려합니다.

- 기존 내용을 최신 정보로 업데이트
- 다른 글로 안내하는 redirect 추가 요청
- 향후 archive 상태 도입

정말 삭제해야 한다면 해당 글을 참조하는 TOOL과 COLUMN relation도 먼저 확인합니다. relation이 남아 있으면 validation이 실패합니다.

## Featured 변경하기

```yaml
featured: true
```

로 바꾸면 추천 후보가 됩니다. HOME에는 `order`가 빠른 추천 GUIDE 3개까지만 보입니다. 기존 HOME 구성을 바꾸려는 경우에만 기존 featured와 order를 함께 조정합니다.
