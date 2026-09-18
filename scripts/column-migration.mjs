// Pure conversion, shared by the dry-run/import command and regression tests.
export const initialColumnCategories = [
  ["counseling", "상담"],
  ["relationships", "관계"],
  ["attachment", "애착"],
  ["trauma", "트라우마"],
  ["psychology-research", "심리학·연구"],
  ["saebyeokbyeol", "새벽별 기록"],
].map(([slug, title], order) => ({
  _id: `column-category-${slug}`,
  _type: "columnCategory",
  title,
  slug: { _type: "slug", current: slug },
  order,
}));

export function toPortableText(blocks) {
  let sequence = 0;
  const key = () => `m${++sequence}`;
  function block(text, style = "normal", listItem) {
    const markDefs = [];
    function spans(value, marks = []) {
      return value
        .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
        .filter(Boolean)
        .flatMap((part) => {
          if (part.startsWith("**") && part.endsWith("**"))
            return spans(part.slice(2, -2), [...marks, "strong"]);
          if (part.startsWith("*") && part.endsWith("*"))
            return spans(part.slice(1, -1), [...marks, "em"]);
          const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (link) {
            const mark = key();
            markDefs.push({ _type: "link", _key: mark, href: link[2] });
            return spans(link[1], [...marks, mark]);
          }
          return [{ _type: "span", _key: key(), text: part, marks }];
        });
    }
    return {
      _type: "block",
      _key: key(),
      style,
      ...(listItem ? { listItem, level: 1 } : {}),
      children: spans(text),
      markDefs,
    };
  }
  return blocks.flatMap((source) => {
    if (source.type === "heading")
      return [block(source.content, `h${source.level}`)];
    if (source.type === "unordered-list" || source.type === "ordered-list")
      return source.items.map((item) =>
        block(
          item,
          "normal",
          source.type === "ordered-list" ? "number" : "bullet",
        ),
      );
    if (source.type === "blockquote")
      return [block(source.content, "blockquote")];
    if (source.type === "note")
      return [block(`**새벽별 NOTE**\n${source.content}`, "blockquote")];
    if (source.type === "hr") return [{ _type: "divider", _key: key() }];
    return [block(source.content)];
  });
}

export function migrationDocuments(columns) {
  return columns.map((article) => ({
    document: {
      _id: `column-${article.slug}`,
      _type: "column",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.description,
      body: toPortableText(article.blocks),
      publishedAt: new Date(article.publishedAt).toISOString(),
      featured: article.featured,
      relatedGuides: article.relatedGuides,
      relatedTools: article.relatedTools,
      relatedServices: article.relatedServices,
      author: article.author,
      topics: article.topics,
    },
    marker: {
      _id: `column-migration-${article.slug}`,
      _type: "columnMigration",
      slug: article.slug,
    },
  }));
}
