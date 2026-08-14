import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcesPath = path.join(root, "data", "content-sources.json");
const outputPath = path.join(root, "data", "public-content.json");
const allowStale = process.argv.includes("--allow-stale");
const sources = JSON.parse(await readFile(sourcesPath, "utf8"));

const decodeXml = (value = "") =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

const tag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return decodeXml(match?.[1] ?? "");
};

const plainText = (value = "") =>
  decodeXml(value)
    .replace(/<img\b[^>]*>/gi, " ")
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isoDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
};

async function fetchNaverBlog() {
  const response = await fetch(sources.naverBlog.rssUrl, {
    headers: { "user-agent": "SaebyeokbyeolWebsite/1.0" },
  });
  if (!response.ok) throw new Error(`Naver RSS returned ${response.status}`);
  const xml = await response.text();
  const channel = xml.match(/<channel>([\s\S]*?)<item>/i)?.[1] ?? xml;
  const imageBlock = channel.match(/<image>([\s\S]*?)<\/image>/i)?.[1] ?? "";
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 8).map((match) => {
    const item = match[1];
    const title = tag(item, "title");
    const description = plainText(tag(item, "description"));
    return {
      title,
      category: tag(item, "category") || "새벽별 소식",
      url: tag(item, "guid") || tag(item, "link"),
      publishedAt: isoDate(tag(item, "pubDate")),
      excerpt: description.replace(title, "").trim().slice(0, 180),
      tags: tag(item, "tag").split(",").map((value) => value.trim()).filter(Boolean).slice(0, 5),
    };
  });

  return {
    title: tag(channel, "title"),
    description: plainText(tag(channel, "description")),
    profileUrl: sources.naverBlog.profileUrl,
    rssUrl: sources.naverBlog.rssUrl,
    logoSourceUrl: tag(imageBlock, "url"),
    updatedAt: items[0]?.publishedAt || null,
    items,
  };
}

const notionText = (block) =>
  (block?.properties?.title ?? [])
    .map((segment) => segment?.[0] ?? "")
    .join("")
    .replace(/\s+/g, " ")
    .trim();

async function fetchNotionGuide() {
  const response = await fetch("https://www.notion.so/api/v3/loadPageChunk", {
    method: "POST",
    headers: { "content-type": "application/json", "user-agent": "SaebyeokbyeolWebsite/1.0" },
    body: JSON.stringify({
      pageId: sources.notion.pageId,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
    }),
  });
  if (!response.ok) throw new Error(`Notion public page returned ${response.status}`);
  const payload = await response.json();
  const blocks = Object.fromEntries(
    Object.entries(payload.recordMap?.block ?? {}).map(([id, record]) => [id, record?.value?.value]),
  );
  const rootBlock = blocks[sources.notion.pageId];
  if (!rootBlock) throw new Error("Notion public page is not readable");
  const topLevel = (rootBlock.content ?? []).map((id) => blocks[id]).filter(Boolean);
  const overview = topLevel
    .filter((block) => block.type === "text")
    .map(notionText)
    .find((text) => text.length > 90) ?? "";
  const sections = topLevel
    .filter((block) => ["sub_header", "toggle"].includes(block.type))
    .map((block) => ({ title: notionText(block), type: block.type }))
    .filter((section) => section.title && !/원문 링크|관련 스레드/i.test(section.title));
  const checklist = topLevel
    .filter((block) => block.type === "to_do")
    .map(notionText)
    .filter(Boolean);

  return {
    title: notionText(rootBlock),
    publicUrl: sources.notion.publicUrl,
    overview,
    updatedAt: new Date(rootBlock.last_edited_time).toISOString(),
    sections: sections.slice(0, 12),
    checklist: checklist.slice(0, 8),
  };
}

async function fetchInstagram() {
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const base = {
    handle: sources.instagram.handle,
    profileUrl: sources.instagram.profileUrl,
    connection: accountId && accessToken ? "graph-api" : "profile-link",
    items: [],
  };
  if (!accountId || !accessToken) return base;

  const endpoint = new URL(`https://graph.facebook.com/v23.0/${accountId}/media`);
  endpoint.searchParams.set("fields", "id,caption,media_type,permalink,timestamp");
  endpoint.searchParams.set("limit", "6");
  endpoint.searchParams.set("access_token", accessToken);
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Instagram Graph API returned ${response.status}`);
  const payload = await response.json();
  return {
    ...base,
    connection: "graph-api",
    items: (payload.data ?? []).map((item) => ({
      id: item.id,
      caption: (item.caption ?? "").trim().slice(0, 240),
      mediaType: item.media_type,
      url: item.permalink,
      publishedAt: isoDate(item.timestamp),
    })),
  };
}

async function loadStale() {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    return null;
  }
}

const previous = await loadStale();
const errors = [];
const resolveSource = async (name, fetcher) => {
  try {
    return await fetcher();
  } catch (error) {
    errors.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
    if (allowStale && previous?.[name]) return previous[name];
    throw error;
  }
};

const blog = await resolveSource("blog", fetchNaverBlog);
const notion = await resolveSource("notion", fetchNotionGuide);
const instagram = await resolveSource("instagram", fetchInstagram);
const updateTimes = [blog.updatedAt, notion.updatedAt, ...instagram.items.map((item) => item.publishedAt)]
  .filter(Boolean)
  .map((value) => new Date(value).valueOf())
  .filter(Number.isFinite);
const output = {
  sourceUpdatedAt: new Date(Math.max(...updateTimes)).toISOString(),
  blog,
  notion,
  instagram,
};
const serialized = `${JSON.stringify(output, null, 2)}\n`;
const existing = await readFile(outputPath, "utf8").catch(() => "");
if (existing !== serialized) await writeFile(outputPath, serialized, "utf8");

console.log(`Public content ready: ${blog.items.length} blog posts, ${notion.sections.length} Notion sections, ${instagram.items.length} Instagram posts.`);
if (errors.length) console.warn(`Using cached data for: ${errors.join("; ")}`);
