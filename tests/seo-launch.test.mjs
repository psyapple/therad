import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import generatedContent from "../lib/generated-content.json" with { type: "json" };

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const testOrigin = "https://seo.example";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo-test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`${testOrigin}${pathname}`, {
      headers: {
        accept: "text/html",
        host: "seo.example",
        "user-agent": "Googlebot",
        "x-forwarded-host": "seo.example",
        "x-forwarded-proto": "https",
      },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("builds a complete dynamic sitemap from current content", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/xml/);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const staticPaths = ["/", "/about", "/care", "/guide", "/tools", "/column", "/contact", "/privacy", "/insight-relay"];
  const expected = [
    ...staticPaths,
    ...["individual", "couple", "child-parent", "assessment", "trauma-attachment"].map((id) => `/care/${id}`),
    ...generatedContent.guides.map((article) => `/guide/${article.slug}`),
    ...generatedContent.tools.map((item) => `/tools/${item.slug}`),
    ...generatedContent.columns.map((article) => `/column/${article.slug}`),
  ].map((path) => `${testOrigin}${path}`);

  assert.equal(locations.length, expected.length);
  assert.equal(new Set(locations).size, expected.length);
  for (const url of expected) assert.ok(locations.includes(url), url);
  assert.doesNotMatch(xml, /_TEMPLATE|\/content\/|\/docs\/|generated-content/);
  assert.match(xml, new RegExp(`<lastmod>${generatedContent.guides[0].updatedAt}<\\/lastmod>`));
});

test("publishes crawlable robots with the dynamic sitemap origin", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  const robots = await response.text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, new RegExp(`Sitemap: ${testOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml`));
  for (const path of ["/.openai/", "/content/", "/docs/", "/scripts/", "/lib/", "/dist/"]) assert.ok(robots.includes(`Disallow: ${path}`), path);
});

test("emits canonical, social, Article, and breadcrumb metadata", async () => {
  const guide = generatedContent.guides[0];
  const guideResponse = await render(`/guide/${guide.slug}`);
  assert.equal(guideResponse.status, 200);
  const guideHtml = await guideResponse.text();
  assert.ok(guideHtml.includes(`rel="canonical" href="${testOrigin}/guide/${guide.slug}"`));
  assert.ok(guideHtml.includes('property="og:type" content="article"'));
  assert.ok(guideHtml.includes(`property="article:published_time" content="${guide.publishedAt}`));
  assert.ok(guideHtml.includes(`property="article:modified_time" content="${guide.updatedAt}`));
  assert.ok(guideHtml.includes(`${testOrigin}/og.png`));
  assert.ok(guideHtml.includes('"@type":"Article"'));
  assert.ok(guideHtml.includes('"@type":"BreadcrumbList"'));

  const tool = generatedContent.tools[0];
  const toolResponse = await render(`/tools/${tool.slug}`);
  assert.equal(toolResponse.status, 200);
  const toolHtml = await toolResponse.text();
  assert.ok(toolHtml.includes(`rel="canonical" href="${testOrigin}/tools/${tool.slug}"`));
  assert.ok(toolHtml.includes('property="og:type" content="website"'));
  assert.ok(toolHtml.includes('"@type":"BreadcrumbList"'));
  assert.doesNotMatch(toolHtml, /"@type":"Article"/);
});

test("emits canonical URLs for every public index route", async () => {
  for (const path of ["/", "/about", "/care", "/guide", "/tools", "/column", "/contact", "/privacy", "/insight-relay"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const canonical = path === "/" ? testOrigin : `${testOrigin}${path}`;
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), path);
  }
});

test("uses the default OG asset and brand symbol favicon", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(`property="og:image" content="${testOrigin}/og.png"`));
  assert.ok(html.includes('href="/brand-symbol.png"'));
  assert.doesNotMatch(html, /\[object Object\]/);
  assert.ok(html.includes('"@type":"Organization"'));
  assert.ok((await stat(join(projectRoot, "public", "og.png"))).size > 0);
  assert.ok((await stat(join(projectRoot, "public", "brand-symbol.png"))).size > 0);
});

test("renders current privacy guidance and the custom 404", async () => {
  const privacy = await render("/privacy");
  assert.equal(privacy.status, 200);
  const privacyHtml = await privacy.text();
  for (const text of ["회원가입과 자체 상담 문의폼이 없습니다", "대표 문의 채널은 카카오채널", "주민등록번호", "외부 콘텐츠·소셜 채널", "자기이해와 자기돌봄", "© 2026 새벽별 심리상담센터"]) {
    assert.ok(privacyHtml.includes(text), text);
  }

  const missing = await render("/not-a-real-public-page");
  assert.equal(missing.status, 404);
  const missingHtml = await missing.text();
  assert.match(missingHtml, /찾고 있던 페이지가/);
  assert.match(missingHtml, /HOME으로/);
  assert.match(missingHtml, /GUIDE 보기/);
});

test("keeps public domain and verification settings configurable", async () => {
  const sources = await Promise.all([
    readFile(join(projectRoot, "lib", "seo.ts"), "utf8"),
    readFile(join(projectRoot, "app", "layout.tsx"), "utf8"),
    readFile(join(projectRoot, ".env.example"), "utf8"),
  ]);
  assert.doesNotMatch(sources.join("\n"), /chatgpt\.site/);
  assert.match(sources[0], /SITE_URL/);
  assert.match(sources[1], /GOOGLE_SITE_VERIFICATION/);
  assert.match(sources[1], /NAVER_SITE_VERIFICATION/);
});

