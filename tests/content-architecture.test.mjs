import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { loadContent, parseMarkdown } from "../scripts/content-pipeline.mjs";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseline = JSON.parse(await readFile(join(projectRoot, "tests", "fixtures", "content-baseline.json"), "utf8"));

test("migrates every GUIDE and TOOL without slug loss", async () => {
  const content = await loadContent(projectRoot);
  const guideSlugs = content.guides.map(({ slug }) => slug).sort();
  const toolSlugs = content.tools.map(({ slug }) => slug).sort();
  assert.equal(content.guides.length, 18);
  assert.equal(content.tools.length, 10);
  assert.deepEqual(guideSlugs, baseline.guides);
  assert.deepEqual(toolSlugs, baseline.tools);
  assert.equal(content.columns.length, 0);
});

test("excludes templates and preserves structured article bodies", async () => {
  const content = await loadContent(projectRoot);
  assert.equal(content.guides.some(({ slug }) => slug === "english-slug"), false);
  assert.equal(content.tools.some(({ slug }) => slug === "english-slug"), false);
  for (const guide of content.guides) {
    assert.ok(guide.intro.length > 0, guide.slug);
    assert.ok(guide.sections.length > 0, guide.slug);
    assert.ok(guide.takeaway.length > 0, guide.slug);
  }
  for (const tool of content.tools) assert.ok(tool.sections.length > 0, tool.slug);
});

test("supports the documented safe Markdown subset", () => {
  const blocks = parseMarkdown("## H2\n\n### H3\n\n문단 **강조** *기울임* [링크](/guide)\n\n- 하나\n- 둘\n\n1. 첫째\n2. 둘째\n\n> 인용\n\n> [!NOTE]\n> 노트\n\n---");
  assert.deepEqual(blocks.map(({ type }) => type), ["heading", "heading", "paragraph", "unordered-list", "ordered-list", "blockquote", "note", "hr"]);
});

test("rejects invalid category and broken relations with readable errors", async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), "saebyeokbyeol-content-"));
  try {
    await cp(join(projectRoot, "content"), join(tempRoot, "content"), { recursive: true });
    const target = join(tempRoot, "content", "guide", "invalid-content-test.mdx");
    await writeFile(target, `---\ntitle: "검증 테스트"\nslug: "invalid-content-test"\ncategory: "잘못된 분류"\ncategoryEn: "TEST"\ndescription: "validation을 확인합니다."\ntopics: []\nrelatedServices:\n  - "unknown-care"\nrelatedTools:\n  - "missing-tool"\nsourcePlatform: "website"\noriginalUrl: null\npublishedAt: "2026-08-18"\nupdatedAt: "2026-08-18"\nfeatured: false\nreadTime: "1분"\n---\n\n도입.\n\n## 본문\n\n내용.\n\n---\n\n**기억해두면 좋은 한 문장**\n\n문장.\n`, "utf8");
    await assert.rejects(() => loadContent(tempRoot), (error) => {
      assert.match(error.message, /허용값: 상담 시작하기/);
      assert.match(error.message, /존재하지 않는 CARE ID 'unknown-care'/);
      assert.match(error.message, /존재하지 않는 TOOL slug 'missing-tool'/);
      return true;
    });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
