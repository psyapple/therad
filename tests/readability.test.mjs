import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships licensed, local Unicode-subset Korean fonts without missing assets", async () => {
  const fontRoot = new URL("public/fonts/pretendard/", root);
  const css = await readFile(new URL("pretendardvariable-dynamic-subset.css", fontRoot), "utf8");
  const files = [...css.matchAll(/url\(([^)]+)\)/g)].map((match) => match[1]);
  assert.ok(files.length > 1);
  assert.match(css, /unicode-range:/);
  assert.match(css, /font-display: swap/);
  for (const file of files) {
    assert.ok(file.startsWith("./woff2-dynamic-subset/"), file);
    const bytes = await readFile(new URL(file, fontRoot));
    assert.equal(bytes.subarray(0, 4).toString(), "wOF2", file);
  }
  assert.match(await readFile(new URL("LICENSE", fontRoot), "utf8"), /SIL OPEN FONT LICENSE/);
});

test("keeps responsive reading and filter accessibility protections", async () => {
  const css = await readFile(new URL("app/readability.css", root), "utf8");
  assert.match(css, /font-size: 1rem/);
  assert.match(css, /word-break: keep-all/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /\.tool-archive-row p \{ display: block/);
  assert.match(css, /\.category-tabs \{ flex-wrap: wrap/);
  const explorer = await readFile(new URL("components/GuideExplorer.tsx", root), "utf8");
  assert.match(explorer, /aria-pressed=\{category === item\}/);
});
