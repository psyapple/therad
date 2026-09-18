import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import content from "../lib/generated-content.json" with { type: "json" };
import {
  initialColumnCategories,
  migrationDocuments,
  toPortableText,
} from "../scripts/column-migration.mjs";
import { setSanityFixture, sanityRequests } from "./mock-sanity.mjs";

const category = { _id: "category-test", title: "상담", slug: "counseling" };
const article = {
  _id: "test-column",
  slug: "cms-regression-only",
  title: "CMS 연결 검증",
  description: "검증용 설명",
  category,
  publishedAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-02T00:00:00Z",
  featured: true,
  seoTitle: "검색 제목 검증",
  seoDescription: "검색 설명 검증",
  coverImage: {
    _type: "image",
    asset: { _ref: "image-abcdef123456-800x1000-jpg" },
    alt: "대표 이미지 대체 설명",
  },
  body: [
    {
      _type: "block",
      _key: "h",
      style: "h2",
      children: [{ _type: "span", text: "본문 제목", marks: [] }],
    },
    {
      _type: "block",
      _key: "p",
      style: "normal",
      children: [
        { _type: "span", text: "강조한 내용", marks: ["strong"] },
        { _type: "span", text: " 링크", marks: ["unsafe"] },
      ],
      markDefs: [
        { _key: "unsafe", _type: "link", href: "javascript:alert(1)" },
      ],
    },
    {
      _type: "block",
      _key: "l",
      style: "normal",
      listItem: "number",
      level: 1,
      children: [{ _type: "span", text: "순서 있는 내용", marks: [] }],
    },
    {
      _type: "image",
      _key: "i",
      asset: { _ref: "image-abcdef123456-800x1000-jpg" },
      alt: "본문 이미지 대체 설명",
    },
  ],
  relatedGuides: [content.guides[0].slug, "missing-guide"],
  relatedTools: [content.tools[0].slug, "missing-tool"],
};
async function render(path) {
  const { default: worker } = await import(
    `../dist/server/index.js?cms=${Date.now()}-${Math.random()}`
  );
  const response = await worker.fetch(
    new Request(`https://saebyeokstar.com${path}`, {
      headers: { accept: "text/html", "user-agent": "Googlebot" },
    }),
    { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { response, text: await response.text() };
}

test("published CMS article renders dynamically with image, body, metadata and relations", async () => {
  setSanityFixture({
    articles: [article],
    categories: [category],
    migratedSlugs: [],
  });
  const { response, text } = await render(`/column/${article.slug}`);
  assert.equal(response.status, 200);
  for (const value of [
    article.title,
    article.description,
    article.seoTitle,
    article.seoDescription,
    "본문 제목",
    "대표 이미지 대체 설명",
    "본문 이미지 대체 설명",
    content.guides[0].title,
    content.tools[0].title,
  ])
    assert.ok(text.includes(value), value);
  assert.match(text, /<strong>강조한 내용<\/strong>/);
  assert.match(text, /<ol>/);
  assert.ok(
    text.includes(
      `rel="canonical" href="https://saebyeokstar.com/column/${article.slug}"`,
    ),
  );
  assert.match(text, /property="og:image" content="https:\/\/cdn.sanity.io/);
  assert.doesNotMatch(
    text,
    /href="javascript:|href="\/guide\/missing-guide|href="\/tools\/missing-tool/,
  );
  assert.ok(
    sanityRequests.some(
      ({ url }) => new URL(url).searchParams.get("perspective") === "published",
    ),
  );
});

test("archive filters categories and CMS slugs join sitemap without a rebuild", async () => {
  setSanityFixture({
    articles: [article],
    categories: [category],
    migratedSlugs: [],
  });
  const filtered = await render("/column?category=counseling");
  assert.match(filtered.text, /aria-current="page">상담/);
  assert.ok(filtered.text.includes(article.title));
  assert.ok(!filtered.text.includes(content.columns[0].title));
  const { text } = await render("/sitemap.xml");
  assert.ok(text.includes(`https://saebyeokstar.com/column/${article.slug}`));
  assert.ok(text.includes(`/guide/${content.guides[0].slug}`));
  assert.ok(text.includes(`/tools/${content.tools[0].slug}`));
});

test("drafts, scheduled posts and unpublished migrated fallback never leak", async () => {
  setSanityFixture({
    articles: [
      { ...article, _id: "drafts.test", title: "비공개 초안" },
      {
        ...article,
        _id: "scheduled",
        publishedAt: "2999-01-01T00:00:00Z",
        title: "미래 발행",
      },
    ],
    categories: [],
    migratedSlugs: content.columns.map(({ slug }) => slug),
  });
  const { text } = await render("/column");
  assert.doesNotMatch(text, /비공개 초안|미래 발행/);
  for (const old of content.columns) assert.ok(!text.includes(old.title));
  assert.equal(
    (await render(`/column/${content.columns[0].slug}`)).response.status,
    404,
  );
  assert.equal((await render("/column/does-not-exist")).response.status, 404);
});

test("CMS outage leaves other routes usable and never resurrects local articles", async () => {
  setSanityFixture({ articles: [], categories: [], migratedSlugs: [] }, true);
  const listing = await render("/column");
  assert.match(listing.text, /글을 잠시 불러오지 못했습니다/);
  for (const old of content.columns)
    assert.ok(!listing.text.includes(old.title));
  assert.equal((await render("/care")).response.status, 200);
  assert.equal((await render("/tools")).response.status, 200);
  // The metadata route throws instead of returning a misleading empty 200 sitemap.
  await assert.rejects(
    () => render("/sitemap.xml"),
    /Sitemap temporarily unavailable/,
  );
  setSanityFixture({ articles: [], categories: [], migratedSlugs: [] });
});

test("migration preserves URLs, bodies and relations and seeds six categories", async () => {
  const docs = migrationDocuments(content.columns);
  assert.equal(initialColumnCategories.length, 6);
  for (const [index, entry] of docs.entries()) {
    const old = content.columns[index];
    assert.equal(entry.document.slug.current, old.slug);
    assert.equal(entry.marker.slug, old.slug);
    assert.deepEqual(entry.document.relatedGuides, old.relatedGuides);
    assert.deepEqual(entry.document.relatedTools, old.relatedTools);
    assert.equal(
      entry.document.body.filter(({ _type }) => _type === "divider").length,
      old.blocks.filter(({ type }) => type === "hr").length,
    );
  }
  const blocks = toPortableText([
    {
      type: "paragraph",
      content: "**굵게** *기울임* [링크](https://example.com)",
    },
  ]);
  assert.equal(blocks[0].markDefs[0].href, "https://example.com");
  assert.ok(blocks[0].children.some(({ marks }) => marks.includes("strong")));
  const source = await readFile(
    new URL("../scripts/migrate-columns.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /SANITY_MIGRATION_APPLY/);
  assert.match(source, /client.getDocument\(marker._id\)/);
  assert.doesNotMatch(source, /createOrReplace|\.delete\(/);
});
