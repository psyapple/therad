type StarMarkProps = {
  size?: "small" | "medium" | "large" | "hero";
};

export function StarMark({ size = "medium" }: StarMarkProps) {
  return (
    <span className={`star-mark star-mark-${size}`} aria-hidden="true">
      <span className="star-main">✦</span>
      <span className="star-dot" />
      <span className="star-spark">·</span>
    </span>
  );
}
