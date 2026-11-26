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
const instagram = await resolveSource("instagram", fetchInstagram);
const updateTimes = [blog.updatedAt, ...instagram.items.map((item) => item.publishedAt)]
  .filter(Boolean)
  .map((value) => new Date(value).valueOf())
  .filter(Number.isFinite);
const output = {
  sourceUpdatedAt: updateTimes.length ? new Date(Math.max(...updateTimes)).toISOString() : null,
  blog,
  instagram,
};
const serialized = `${JSON.stringify(output, null, 2)}\n`;
const existing = await readFile(outputPath, "utf8").catch(() => "");
if (existing !== serialized) await writeFile(outputPath, serialized, "utf8");

console.log(`Public content ready: ${blog.items.length} blog posts, ${instagram.items.length} Instagram posts.`);
if (errors.length) console.warn(`Using cached data for: ${errors.join("; ")}`);
