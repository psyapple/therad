import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export const GUIDE_CATEGORIES = [
  "상담 시작하기",
  "상담 잘 이용하기",
  "마음 이해하기",
  "심리치료 알아보기",
  "심리검사 알아보기",
];

export const CARE_IDS = ["individual", "couple", "child-parent", "assessment", "trauma-attachment"];
export const TOOL_CATEGORIES = ["감정", "관계", "자기돌봄", "상담"];
const SOURCE_PLATFORMS = ["website", "naver-blog", "instagram", "notion"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const requiredFields = {
  guide: ["title", "slug", "category", "categoryEn", "description", "topics", "relatedServices", "relatedTools", "sourcePlatform", "originalUrl", "publishedAt", "updatedAt", "featured", "readTime"],
  tools: ["title", "slug", "description", "category", "topics", "format", "relatedGuides", "relatedServices", "publishedAt", "updatedAt", "featured"],
  column: ["title", "slug", "description", "topics", "relatedGuides", "relatedTools", "relatedServices", "publishedAt", "updatedAt", "featured", "author"],
};

export function parseFrontmatter(source, file = "content file") {
  const normalized = source.replace(/\r\n?/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error(`${file}: 파일 맨 위에 --- 로 감싼 frontmatter가 필요합니다.`);

  const metadata = {};
  let arrayKey = null;

  for (const [index, rawLine] of match[1].split("\n").entries()) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const arrayItem = line.match(/^\s+-\s+(.+)$/);
    if (arrayItem) {
      if (!arrayKey || !Array.isArray(metadata[arrayKey])) throw new Error(`${file}:${index + 2}: 배열 항목 앞에 field 이름이 필요합니다.`);
      metadata[arrayKey].push(parseScalar(arrayItem[1], file, index + 2));
      continue;
    }

    const property = line.match(/^([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/);
    if (!property) throw new Error(`${file}:${index + 2}: frontmatter 형식을 이해할 수 없습니다: ${trimmed}`);
    const [, key, rawValue = ""] = property;
    if (Object.hasOwn(metadata, key)) throw new Error(`${file}:${index + 2}: ${key}가 중복되었습니다.`);
    if (!rawValue.trim()) {
      metadata[key] = [];
      arrayKey = key;
    } else {
      metadata[key] = parseScalar(rawValue.trim(), file, index + 2);
      arrayKey = null;
    }
  }

  return { metadata, body: normalized.slice(match[0].length).trim() };
}

function parseScalar(value, file, line) {
  if (value === "null") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  if (value === "[]") return [];
  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error();
      return parsed;
    } catch {
      throw new Error(`${file}:${line}: inline 배열은 JSON 형식으로 작성해주세요.`);
    }
  }
  if (value.startsWith('"')) {
    try { return JSON.parse(value); } catch { throw new Error(`${file}:${line}: 따옴표 문자열 형식이 올바르지 않습니다.`); }
  }
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'");
  return value.replace(/\s+#.*$/, "").trim();
}

export function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();
    const trimmed = line.trim();
    if (!trimmed) { index += 1; continue; }

    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, content: heading[2].trim() });
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const type = unordered ? "unordered-list" : "ordered-list";
      const items = [];
      while (index < lines.length) {
        const candidate = lines[index].trim();
        const item = type === "unordered-list" ? candidate.match(/^[-*]\s+(.+)$/) : candidate.match(/^\d+[.)]\s+(.+)$/);
        if (!item) break;
        items.push(item[1].trim());
        index += 1;
      }
      blocks.push({ type, items });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      const isNote = quoteLines[0]?.toUpperCase() === "[!NOTE]";
      blocks.push({ type: isNote ? "note" : "blockquote", content: quoteLines.slice(isNote ? 1 : 0).join(" ").trim() });
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (index < lines.length) {
      const candidate = lines[index].trim();
      if (!candidate || /^(#{2,3})\s+/.test(candidate) || /^---+$/.test(candidate) || /^[-*]\s+/.test(candidate) || /^\d+[.)]\s+/.test(candidate) || candidate.startsWith(">")) break;
      paragraph.push(candidate);
      index += 1;
    }
    blocks.push({ type: "paragraph", content: paragraph.join(" ") });
  }

  return blocks;
}

function guideBody(markdown, file) {
  const blocks = parseMarkdown(markdown);
  const firstHeading = blocks.findIndex((block) => block.type === "heading" && block.level === 2);
  const lastRule = blocks.map((block) => block.type).lastIndexOf("hr");
  if (firstHeading < 0) throw new Error(`${file}: GUIDE 본문에 ## 소제목이 하나 이상 필요합니다.`);
  if (lastRule < firstHeading) throw new Error(`${file}: 마지막 takeaway 앞에 --- 구분선이 필요합니다.`);

  const introBlocks = blocks.slice(0, firstHeading).filter((block) => block.type === "paragraph");
  const intro = introBlocks.map((block) => block.content).join("\n\n").trim();
  const sectionBlocks = blocks.slice(firstHeading, lastRule);
  const sections = [];
  let current = null;

  for (const block of sectionBlocks) {
    if (block.type === "heading" && block.level === 2) {
      current = { heading: block.content, blocks: [] };
      sections.push(current);
    } else if (current) {
      current.blocks.push(block);
    }
  }

  const takeawayBlocks = blocks.slice(lastRule + 1).filter((block) => block.type === "paragraph");
  if (takeawayBlocks[0]?.content.replace(/\*/g, "").trim() === "기억해두면 좋은 한 문장") takeawayBlocks.shift();
  const takeaway = takeawayBlocks.map((block) => block.content).join("\n\n").trim();
  if (!intro) throw new Error(`${file}: 첫 ## 소제목 앞에 intro 문단이 필요합니다.`);
  if (!takeaway) throw new Error(`${file}: takeaway 문장이 비어 있습니다.`);
  return { intro, sections, takeaway };
}

function sectionalBody(markdown, file, type) {
  const blocks = parseMarkdown(markdown);
  const sections = [];
  let current = null;
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      current = { heading: block.content, blocks: [] };
      sections.push(current);
    } else if (current) {
      current.blocks.push(block);
    } else if (block.type !== "hr") {
      throw new Error(`${file}: ${type} 본문은 ## 소제목으로 시작해주세요.`);
    }
  }
  if (!sections.length) throw new Error(`${file}: ${type} 본문에 ## 소제목이 하나 이상 필요합니다.`);
  return sections;
}

async function readType(root, type) {
  const directory = join(root, "content", type);
  let names;
  try { names = await readdir(directory); } catch { return []; }
  const files = names.filter((name) => name.endsWith(".mdx") && !name.startsWith("_")).sort();
  return Promise.all(files.map(async (name) => {
    const filePath = join(directory, name);
    const source = await readFile(filePath, "utf8");
    const { metadata, body } = parseFrontmatter(source, relative(root, filePath));
    return { ...metadata, file: relative(root, filePath).replaceAll("\\", "/"), bodySource: body };
  }));
}

function assertMetadata(record, type, errors) {
  for (const key of requiredFields[type]) {
    if (!Object.hasOwn(record, key)) errors.push(`${record.file}: 필수 frontmatter '${key}'가 없습니다.`);
  }
  for (const key of ["title", "slug", "description"]) {
    if (typeof record[key] !== "string" || !record[key].trim()) errors.push(`${record.file}: '${key}'는 비어 있지 않은 문자열이어야 합니다.`);
  }
  for (const key of ["topics", "relatedServices", ...(type === "guide" ? ["relatedTools"] : []), ...(type === "tools" ? ["relatedGuides"] : []), ...(type === "column" ? ["relatedGuides", "relatedTools"] : [])]) {
    if (!Array.isArray(record[key]) || record[key].some((item) => typeof item !== "string")) errors.push(`${record.file}: '${key}'는 문자열 배열이어야 합니다.`);
  }
  if (typeof record.slug === "string" && !SLUG_PATTERN.test(record.slug)) errors.push(`${record.file}: slug '${record.slug}'는 lowercase 영문·숫자·hyphen만 사용할 수 있습니다.`);
  const filename = record.file.split("/").at(-1)?.replace(/\.mdx$/, "");
  if (record.slug && filename !== record.slug) errors.push(`${record.file}: 파일명과 slug가 같아야 합니다. (${filename} ≠ ${record.slug})`);
  for (const key of ["publishedAt", "updatedAt"]) if (!validDate(record[key])) errors.push(`${record.file}: '${key}'는 실제 YYYY-MM-DD 날짜여야 합니다.`);
  if (typeof record.featured !== "boolean") errors.push(`${record.file}: 'featured'는 true 또는 false여야 합니다.`);
  if (record.order !== undefined && (!Number.isInteger(record.order) || record.order < 1)) errors.push(`${record.file}: 'order'는 1 이상의 정수여야 합니다.`);
}

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function sortRecords(records) {
  return records.sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}

export async function loadContent(root = projectRoot) {
  const [guidesRaw, toolsRaw, columnsRaw] = await Promise.all([readType(root, "guide"), readType(root, "tools"), readType(root, "column")]);
  const errors = [];
  for (const item of guidesRaw) assertMetadata(item, "guide", errors);
  for (const item of toolsRaw) assertMetadata(item, "tools", errors);
  for (const item of columnsRaw) assertMetadata(item, "column", errors);

  const all = [...guidesRaw, ...toolsRaw, ...columnsRaw];
  const seen = new Map();
  for (const record of all) {
    if (!record.slug) continue;
    const previous = seen.get(record.slug);
    if (previous) errors.push(`duplicate slug '${record.slug}': ${previous} / ${record.file}`);
    else seen.set(record.slug, record.file);
  }

  const guideSlugs = new Set(guidesRaw.map(({ slug }) => slug));
  const toolSlugs = new Set(toolsRaw.map(({ slug }) => slug));
  for (const guide of guidesRaw) {
    if (!GUIDE_CATEGORIES.includes(guide.category)) errors.push(`${guide.file}: category '${guide.category}'는 허용되지 않습니다. 허용값: ${GUIDE_CATEGORIES.join(", ")}`);
    if (typeof guide.categoryEn !== "string" || !guide.categoryEn.trim()) errors.push(`${guide.file}: 'categoryEn'은 비어 있지 않은 문자열이어야 합니다.`);
    if (!SOURCE_PLATFORMS.includes(guide.sourcePlatform)) errors.push(`${guide.file}: sourcePlatform '${guide.sourcePlatform}'는 허용되지 않습니다. 허용값: ${SOURCE_PLATFORMS.join(", ")}`);
    if (guide.originalUrl !== null && typeof guide.originalUrl !== "string") errors.push(`${guide.file}: originalUrl은 URL 문자열 또는 null이어야 합니다.`);
    if (typeof guide.readTime !== "string" || !guide.readTime.trim()) errors.push(`${guide.file}: readTime이 비어 있습니다.`);
    for (const id of guide.relatedServices ?? []) if (!CARE_IDS.includes(id)) errors.push(`${guide.file}: 존재하지 않는 CARE ID '${id}'. 허용값: ${CARE_IDS.join(", ")}`);
    for (const slug of guide.relatedTools ?? []) if (!toolSlugs.has(slug)) errors.push(`${guide.file}: 존재하지 않는 TOOL slug '${slug}'를 참조합니다.`);
  }
  for (const tool of toolsRaw) {
    if (!TOOL_CATEGORIES.includes(tool.category)) errors.push(`${tool.file}: category '${tool.category}'는 허용되지 않습니다. 허용값: ${TOOL_CATEGORIES.join(", ")}`);
    if (typeof tool.format !== "string" || !tool.format.trim()) errors.push(`${tool.file}: format이 비어 있습니다.`);
    for (const id of tool.relatedServices ?? []) if (!CARE_IDS.includes(id)) errors.push(`${tool.file}: 존재하지 않는 CARE ID '${id}'. 허용값: ${CARE_IDS.join(", ")}`);
    for (const slug of tool.relatedGuides ?? []) if (!guideSlugs.has(slug)) errors.push(`${tool.file}: 존재하지 않는 GUIDE slug '${slug}'를 참조합니다.`);
  }
  for (const column of columnsRaw) {
    if (typeof column.author !== "string" || !column.author.trim()) errors.push(`${column.file}: author가 비어 있습니다.`);
    for (const id of column.relatedServices ?? []) if (!CARE_IDS.includes(id)) errors.push(`${column.file}: 존재하지 않는 CARE ID '${id}'. 허용값: ${CARE_IDS.join(", ")}`);
    for (const slug of column.relatedGuides ?? []) if (!guideSlugs.has(slug)) errors.push(`${column.file}: 존재하지 않는 GUIDE slug '${slug}'를 참조합니다.`);
    for (const slug of column.relatedTools ?? []) if (!toolSlugs.has(slug)) errors.push(`${column.file}: 존재하지 않는 TOOL slug '${slug}'를 참조합니다.`);
  }

  const guides = [];
  const tools = [];
  const columns = [];
  for (const record of guidesRaw) {
    try { const { bodySource, file, ...metadata } = record; guides.push({ ...metadata, ...guideBody(bodySource, file) }); } catch (error) { errors.push(error.message); }
  }
  for (const record of toolsRaw) {
    try { const { bodySource, file, ...metadata } = record; tools.push({ ...metadata, sections: sectionalBody(bodySource, file, "TOOL") }); } catch (error) { errors.push(error.message); }
  }
  for (const record of columnsRaw) {
    try {
      const { bodySource, ...metadata } = record;
      delete metadata.file;
      columns.push({ ...metadata, blocks: parseMarkdown(bodySource) });
    } catch (error) { errors.push(error.message); }
  }

  if (errors.length) throw new Error(`콘텐츠 validation 실패 (${errors.length}개)\n- ${errors.join("\n- ")}`);
  return { guides: sortRecords(guides), tools: sortRecords(tools), columns: sortRecords(columns) };
}

export async function generateContent(root = projectRoot) {
  const content = await loadContent(root);
  const target = join(root, "lib", "generated-content.json");
  await writeFile(target, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return content;
}

async function main() {
  const mode = process.argv[2] ?? "--validate";
  const content = mode === "--generate" ? await generateContent() : await loadContent();
  console.log(`Content validation passed: GUIDE ${content.guides.length}, COLUMN ${content.columns.length}, TOOLS ${content.tools.length}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
