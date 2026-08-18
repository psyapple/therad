import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

test("provides one accessible Kakao floating contact from the root layout", async () => {
  const [component, layout, styles] = await Promise.all([
    readFile(join(projectRoot, "components", "KakaoFloatingContact.tsx"), "utf8"),
    readFile(join(projectRoot, "app", "layout.tsx"), "utf8"),
    readFile(join(projectRoot, "app", "globals.css"), "utf8"),
  ]);

  assert.equal((layout.match(/<KakaoFloatingContact \/>/g) ?? []).length, 1);
  assert.match(component, /href=\{kakaoChannelUrl\}/);
  assert.match(component, /target="_blank"/);
  assert.match(component, /rel="noreferrer noopener"/);
  assert.match(component, /aria-label="새벽별 카카오채널로 문의하기"/);
  assert.match(component, /window\.scrollY >= 400/);
  assert.match(component, /\.site-footer/);
  assert.doesNotMatch(component, /next\/link|kakao_contact_click|analytics/i);
  assert.match(styles, /env\(safe-area-inset-bottom/);
  assert.match(styles, /min-height: 48px/);
  assert.match(styles, /kakao-floating-label-desktop/);
  assert.match(styles, /kakao-floating-label-mobile/);
});
