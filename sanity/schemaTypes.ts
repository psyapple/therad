import { defineArrayMember, defineField, defineType } from "sanity";
import content from "../lib/generated-content.json";

const imageFields = [
  defineField({
    name: "alt",
    title: "이미지 설명 (alt)",
    type: "string",
    validation: (rule) => rule.required(),
    description: "이미지를 보지 못하는 독자에게 전달할 설명입니다.",
  }),
  defineField({ name: "caption", title: "캡션", type: "string" }),
];
const slug = defineField({
  name: "slug",
  title: "주소 (slug)",
  type: "slug",
  options: {
    source: "title",
    slugify: (value) =>
      value
        .normalize("NFKC")
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 100),
  },
  validation: (rule) =>
    rule
      .required()
      .custom(
        (value) =>
          !value?.current ||
          /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value.current) ||
          "글자·숫자와 하이픈만 사용해 주세요.",
      ),
});
function relations(
  name: "relatedGuides" | "relatedTools",
  title: string,
  items: { title: string; slug: string }[],
) {
  return defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "string",
        options: {
          list: items.map((item) => ({ title: item.title, value: item.slug })),
        },
      }),
    ],
    validation: (rule) =>
      rule
        .unique()
        .custom(
          (values) =>
            !values ||
            values.every((value) =>
              items.some((item) => item.slug === value),
            ) ||
            "현재 사이트에 없는 연결이 있습니다. 다시 선택해 주세요.",
        ),
  });
}

export const columnCategory = defineType({
  name: "columnCategory",
  title: "Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "카테고리 이름",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slug,
    defineField({ name: "order", title: "정렬 순서", type: "number" }),
  ],
});

export const column = defineType({
  name: "column",
  title: "COLUMN",
  type: "document",
  groups: [
    { name: "content", title: "글쓰기", default: true },
    { name: "relations", title: "함께 보기" },
    { name: "seo", title: "검색 설정 (선택)" },
  ],
  initialValue: () => ({
    featured: false,
    publishedAt: new Date().toISOString(),
    author: "새벽별",
  }),
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    {
      ...slug,
      group: "content",
      validation: (rule) =>
        rule.required().custom((input, context) => {
          const value = input as { current?: string } | undefined;
          if (
            value?.current &&
            !/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value.current)
          )
            return "글자·숫자와 하이픈만 사용해 주세요.";
          if (
            content.columns.some((item) => item.slug === value?.current) &&
            context.document?._id.replace(/^drafts\./, "") !==
              `column-${value?.current}`
          )
            return "기존 COLUMN 주소입니다. 먼저 안전한 이전 명령으로 가져와 주세요.";
          return true;
        }),
    },
    defineField({
      name: "excerpt",
      title: "짧은 설명",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(300).warning("300자 이내를 권장합니다."),
    }),
    defineField({
      name: "coverImage",
      title: "대표 이미지",
      type: "image",
      options: { hotspot: true },
      fields: imageFields,
      group: "content",
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "reference",
      to: [{ type: "columnCategory" }],
      group: "content",
    }),
    defineField({
      name: "body",
      title: "본문",
      type: "array",
      group: "content",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "문단", value: "normal" },
            { title: "제목 2", value: "h2" },
            { title: "제목 3", value: "h3" },
            { title: "인용", value: "blockquote" },
          ],
          lists: [
            { title: "글머리 기호", value: "bullet" },
            { title: "번호 목록", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "굵게", value: "strong" },
              { title: "기울임", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "링크",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "주소",
                    type: "url",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({
                          allowRelative: true,
                          scheme: ["http", "https", "mailto", "tel"],
                        }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: imageFields,
        }),
        defineArrayMember({
          name: "divider",
          type: "object",
          title: "구분선",
          fields: [
            defineField({
              name: "label",
              type: "string",
              initialValue: "구분선",
              hidden: true,
            }),
          ],
          preview: { prepare: () => ({ title: "구분선" }) },
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "발행일",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
      description:
        "미래 날짜의 글은 해당 시각 이후 공개됩니다. 저장만 한 draft는 공개되지 않습니다.",
    }),
    defineField({
      name: "featured",
      title: "목록 위쪽에 소개",
      type: "boolean",
      group: "content",
    }),
    {
      ...relations("relatedGuides", "관련 GUIDE", content.guides),
      group: "relations",
    },
    {
      ...relations("relatedTools", "관련 TOOLS", content.tools),
      group: "relations",
    },
    defineField({
      name: "seoTitle",
      title: "검색 제목",
      type: "string",
      group: "seo",
      description: "비워 두면 글 제목을 사용합니다.",
    }),
    defineField({
      name: "seoDescription",
      title: "검색 설명",
      type: "text",
      rows: 3,
      group: "seo",
      description: "비워 두면 짧은 설명을 사용합니다.",
    }),
    defineField({
      name: "author",
      title: "글쓴이",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "topics",
      title: "기존 주제",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
    }),
    defineField({
      name: "relatedServices",
      title: "기존 CARE 연결",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "coverImage" },
  },
  orderings: [
    {
      title: "발행일 최신순",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

// Persistent tombstone: unpublishing a migrated article must never revive its MDX fallback.
export const columnMigration = defineType({
  name: "columnMigration",
  title: "Migration record",
  type: "document",
  hidden: true,
  fields: [defineField({ name: "slug", type: "string", readOnly: true })],
});
export const schemaTypes = [column, columnCategory, columnMigration];
