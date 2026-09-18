import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { imageUrl, imageDimensions, type ContentImage } from "@/sanity/image";

export function ColumnImage({
  value,
  eager = false,
}: {
  value: ContentImage;
  eager?: boolean;
}) {
  const src = imageUrl(value);
  if (!src) return null;
  return (
    <figure className="column-image">
      {/* Sanity CDN provides responsive, format-optimized images without a second proxy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={[400, 800, 1200, 1600]
          .map((width) => `${imageUrl(value, width)} ${width}w`)
          .join(", ")}
        sizes="(max-width: 850px) 90vw, 760px"
        {...imageDimensions(value)}
        alt={value.alt || ""}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <ColumnImage value={value as ContentImage} />,
    divider: () => <hr className="markdown-rule" />,
  },
  block: {
    blockquote: ({ children }) => (
      <blockquote className="markdown-blockquote">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const internal = /^(\/(?!\/)|#)/.test(href);
      const safe = internal || /^(https?:\/\/|mailto:|tel:)/i.test(href);
      if (!safe) return <>{children}</>;
      return (
        <a
          href={href}
          {...(!internal
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function ColumnPortableText({
  value,
}: {
  value: (PortableTextBlock | ContentImage)[];
}) {
  return <PortableText value={value} components={components} />;
}
