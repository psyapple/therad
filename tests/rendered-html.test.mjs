import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished Korean brand home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /lang="ko"/);
  assert.match(html, /마음을 이해하는 일이/);
  assert.match(html, /Insight Relay/);
  assert.match(html, /CARE/);
  assert.match(html, /GUIDE/);
  assert.match(html, /새벽별 심리상담센터/);
  assert.match(html, /일상의 돌봄\. 안전기지/);
  assert.match(html, /심리상담 가이드 _by 새벽\/아오리/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders core product routes", async () => {
  for (const [pathname, text] of [
    ["/care", "개인 심리상담"],
    ["/guide", "마음의 사용 설명서"],
    ["/insight-relay", "상담과 상담 사이에도"],
    ["/contact", "어떤 이야기로 찾아오셨나요"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), new RegExp(text));
  }
});
