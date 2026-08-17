import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import generatedContent from "../lib/generated-content.json" with { type: "json" };

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html", "user-agent": "Mozilla/5.0" } }),
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
  assert.match(html, /TOOLS/);
  assert.match(html, /만나기/);
  assert.match(html, /이해하기/);
  assert.match(html, /돌보기/);
  assert.match(html, /IN DEVELOPMENT · COMING SOON/);
  assert.match(html, /현재 개발 중입니다/);
  assert.match(html, /Psychology for Everyday Life/);
  assert.match(html, /새벽별은 마음을 이해하고 연결하는 일을 합니다/);
  assert.match(html, /상담 시작하기/);
  assert.doesNotMatch(html, /새벽별이 실제로 쓰고 있는 기록/);
  assert.doesNotMatch(html, /PRODUCT PREVIEW|기록 시작하기/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);

  const careIndex = html.indexOf("마음을 만나는 여러 가지 방식");
  const guideIndex = html.indexOf("알고 나면 덜 막막해지는 것들");
  const toolsIndex = html.indexOf("알고 끝나지 않고");
  const relayIndex = html.indexOf("상담과 상담 사이,");
  assert.ok(careIndex < guideIndex && guideIndex < toolsIndex && toolsIndex < relayIndex);
});

test("keeps public navigation independent from the broken client router", async () => {
  for (const directory of ["app", "components"]) {
    const root = join(projectRoot, directory);
    const files = await readdir(root, { recursive: true });

    for (const file of files.filter((entry) => /\.[jt]sx$/.test(entry))) {
      const source = await readFile(join(root, file), "utf8");
      assert.doesNotMatch(source, /from ["']next\/link["']/, join(directory, file));
    }
  }

  const siteLink = await readFile(join(projectRoot, "components", "SiteLink.tsx"), "utf8");
  assert.match(siteLink, /return <a href=\{href\}[^>]*>\{children\}<\/a>/);
});

test("renders core product routes", async () => {
  for (const [pathname, text] of [
    ["/care", "개인 심리상담"],
    ["/guide", "마음의 사용 설명서"],
    ["/tools", "직접 해볼 수 있도록"],
    ["/insight-relay", "현재 개발 중입니다"],
    ["/contact", "어떤 이야기로 찾아오셨나요"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), new RegExp(text));
  }
});

test("preserves every migrated GUIDE and TOOL route", async () => {
  for (const guide of generatedContent.guides) {
    const response = await render(`/guide/${guide.slug}`);
    assert.equal(response.status, 200, `/guide/${guide.slug}`);
    assert.match(await response.text(), new RegExp(guide.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const tool of generatedContent.tools) {
    const response = await render(`/tools/${tool.slug}`);
    assert.equal(response.status, 200, `/tools/${tool.slug}`);
    assert.match(await response.text(), new RegExp(tool.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("supports an empty COLUMN archive without exposing an empty GUIDE section", async () => {
  const columnResponse = await render("/column");
  assert.equal(columnResponse.status, 200);
  assert.match(await columnResponse.text(), /상담과 마음에 대해/);
  const guideResponse = await render("/guide");
  assert.equal(guideResponse.status, 200);
  assert.doesNotMatch(await guideResponse.text(), /FROM SAEBYEOKBYEOL|COLUMN 전체 보기/);
});

test("publishes Kakao-first contact information without storing inquiry details", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /정리된 질문이 아니어도/);
  assert.match(html, /https:\/\/pf\.kakao\.com\/_bPuxan/);
  assert.match(html, /카카오채널로 문의하기/);
  assert.match(html, /상담·심리평가/);
  assert.match(html, /교육·기관·협업/);
  assert.match(html, /웹사이트는 이 내용을 저장하거나 전송하지 않습니다/);
  assert.doesNotMatch(html, /Instagram 열기/);
});

test("renders transparent CARE session and assessment information", async () => {
  for (const [pathname, expected] of [
    ["/care/individual", ["50 MIN", "80,000 KRW", "단회기 상담", "80 MIN", "120,000 KRW"]],
    ["/care/couple", ["80 MIN", "150,000 KRW", "대면 및 화상상담"]],
    ["/care/child-parent", ["아동 40분 + 보호자 10분", "80,000 KRW", "양육코칭", "100,000 KRW"]],
    ["/care/trauma-attachment", ["60 MIN", "100,000 KRW", "90 MIN", "150,000 KRW"]],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    for (const text of expected) assert.ok(html.includes(text), `${pathname}: ${text}`);
  }

  const assessmentResponse = await render("/care/assessment");
  assert.equal(assessmentResponse.status, 200);
  const assessmentHtml = await assessmentResponse.text();
  for (const text of ["무엇을 알고 싶은지에서", "개인심리평가 A", "부모자녀 상호작용 평가", "PREPARE / ENRICH", "심리도식평가", "애착유형평가", "해석상담이 포함됩니다", "서면 보고서가 필요한 경우 별도 비용"]) {
    assert.ok(assessmentHtml.includes(text), text);
  }
});

test("publishes the official practitioner profile and expanded work areas", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of ["당신만의 고유성이 빛나도록", "이해 — 안정 — 회복 — 연결 — 일상으로의 번역과 확장", "새벽별심리상담센터 대표", "상담심리사 2급", "TRAINING &amp; APPROACH", "숙명여자대학교 아동심리치료 박사수료", "BEYOND THE COUNSELING ROOM", "교육청 프로그램", "웰니스 협업"]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /https:\/\/blog\.naver\.com\/dawnstar_mindtherapy/);
  assert.doesNotMatch(html, /세부 학력·수련·경력은 문의 과정에서 확인/);
});

test("keeps Insight Relay clearly in development without invented functions", async () => {
  const response = await render("/insight-relay");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /IN DEVELOPMENT · COMING SOON/);
  assert.match(html, /between-session self-care service/);
  assert.doesNotMatch(html, /오늘의 상태 체크|회기 사이의 사건 기록|상담 후 핵심 정리|다음 상담으로 연결|기록 시작하기/);
});

test("renders connected CARE and GUIDE detail routes", async () => {
  const careResponse = await render("/care/trauma-attachment");
  assert.equal(careResponse.status, 200);
  const careHtml = await careResponse.text();
  assert.match(careHtml, /트라우마·애착 상담/);
  assert.match(careHtml, /이런 경우/);
  assert.match(careHtml, /새벽별에서는/);
  assert.match(careHtml, /진행 과정/);
  assert.match(careHtml, /조금 더 이해하고 싶다면/);
  assert.match(careHtml, /불안정애착, 애착 손상, 애착 트라우마, 발달 트라우마는 어떻게 다를까요/);
  assert.doesNotMatch(careHtml, /TODO|미정|상담 비용|회기 시간|예약 URL/);

  const guideResponse = await render("/guide/attachment-and-trauma");
  assert.equal(guideResponse.status, 200);
  const guideHtml = await guideResponse.text();
  assert.match(guideHtml, /관련해서 읽어보세요/);
  assert.match(guideHtml, /새벽별에서 이용할 수 있어요/);
  assert.match(guideHtml, /트라우마·애착 상담/);
});

test("renders all five CARE v1.0 service routes from shared data", async () => {
  for (const [pathname, title, description] of [
    ["/care/individual", "개인 심리상담", "혼자 이해하고 해결하려 했지만"],
    ["/care/couple", "커플·부부상담", "누가 옳은지를 정하기보다"],
    ["/care/child-parent", "놀이치료·양육코칭", "아이의 행동만 바꾸기보다"],
    ["/care/assessment", "심리평가", "검사 이름을 먼저 고르기보다"],
    ["/care/trauma-attachment", "트라우마·애착 상담", "과거의 경험이 지금의 감정과 관계"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, new RegExp(description));
    assert.match(html, /HOME.*CARE/);
    assert.match(html, pathname === "/care/assessment" ? /어떤 평가가 필요한지 궁금하다면/ : /상담을 알아보고 있다면/);
    assert.doesNotMatch(html, /TODO|미정/);
  }
});

test("renders source-derived GUIDE and bidirectional TOOL relations", async () => {
  const guideResponse = await render("/guide/how-to-start-therapy");
  assert.equal(guideResponse.status, 200);
  const guideHtml = await guideResponse.text();
  assert.match(guideHtml, /심리상담, 무엇부터 시작하면 될까요/);
  assert.match(guideHtml, /첫 상담 준비 체크리스트/);
  assert.match(guideHtml, /새벽별에서 이용할 수 있어요/);

  const toolResponse = await render("/tools/relationship-distance-question");
  assert.equal(toolResponse.status, 200);
  const toolHtml = await toolResponse.text();
  assert.match(toolHtml, /가족과의 거리 다시 생각하기/);
  assert.match(toolHtml, /애착은 한 가지 유형으로만 설명되지 않습니다/);
  assert.match(toolHtml, /전문적인 도움이 필요하다면/);
});

test("returns 404 for unknown GUIDE, TOOL, and CARE records", async () => {
  for (const pathname of [
    "/guide/not-a-real-guide",
    "/tools/not-a-real-tool",
    "/care/not-a-real-service",
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 404, pathname);
  }
});
