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
  assert.match(html, /Psychology for Everyday Life/);
  assert.match(html, /새벽별은 마음을 이해하고 연결하는 일을 합니다/);
  assert.match(html, /상담 시작하기/);
  assert.doesNotMatch(html, /새벽별이 실제로 쓰고 있는 기록/);
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

test("renders connected CARE and GUIDE detail routes", async () => {
  const careResponse = await render("/care/trauma");
  assert.equal(careResponse.status, 200);
  const careHtml = await careResponse.text();
  assert.match(careHtml, /트라우마·애착 상담/);
  assert.match(careHtml, /조금 더 알아보고 싶다면/);
  assert.match(careHtml, /애착과 트라우마는 어떻게 연결될까요/);

  const guideResponse = await render("/guide/attachment-and-trauma");
  assert.equal(guideResponse.status, 200);
  const guideHtml = await guideResponse.text();
  assert.match(guideHtml, /관련해서 읽어보세요/);
  assert.match(guideHtml, /새벽별에서 이용할 수 있어요/);
  assert.match(guideHtml, /트라우마·애착 상담/);
});

