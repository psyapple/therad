import { Fragment, type ReactNode } from "react";
import Link from "@/components/SiteLink";
import type { MarkdownBlock } from "@/lib/content";

const inlinePattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(inlinePattern).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{inline(part.slice(2, -2), `${key}-strong`)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{inline(part.slice(1, -1), `${key}-em`)}</em>;
    }
    const link = part.match(/^\[([^\]]+)]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const isExternal = /^https?:\/\//i.test(href);
      if (isInternal || isExternal) {
        return <Link key={key} href={href} {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}>{label}</Link>;
      }
      return <Fragment key={key}>{label}</Fragment>;
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function MarkdownBlocks({ blocks }: { blocks: MarkdownBlock[] }) {
  return blocks.map((block, index) => {
    const key = `${block.type}-${index}`;
    if (block.type === "paragraph") return <p key={key}>{inline(block.content, key)}</p>;
    if (block.type === "heading") {
      return block.level === 2
        ? <h2 key={key}>{inline(block.content, key)}</h2>
        : <h3 key={key}>{inline(block.content, key)}</h3>;
    }
    if (block.type === "unordered-list" || block.type === "ordered-list") {
      const items = block.items.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{inline(item, `${key}-${itemIndex}`)}</li>);
      return block.type === "ordered-list" ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>;
    }
    if (block.type === "note") {
      return <div className="article-note" key={key}><strong>새벽별 NOTE</strong><p>{inline(block.content, key)}</p></div>;
    }
    if (block.type === "blockquote") return <blockquote className="markdown-blockquote" key={key}>{inline(block.content, key)}</blockquote>;
    return <hr className="markdown-rule" key={key} />;
  });
}

export function MarkdownInline({ text }: { text: string }) {
  return inline(text, "inline");
}
