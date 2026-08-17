import { StarMark } from "./StarMark";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  index: string;
  tone?: "light" | "night" | "lavender";
  actions?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, index, tone = "light", actions }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <div className="shell page-hero-grid">
        <div className="page-hero-copy">
          <div className="eyebrow-line"><StarMark size="small" /><span>{eyebrow}</span></div>
          <h1>{title}</h1>
          <p>{description}</p>
          {actions && <div className="page-hero-actions">{actions}</div>}
        </div>
        <div className="page-hero-index" aria-hidden="true">
          <span>{index}</span>
          <div className="page-orbit"><StarMark size="large" /></div>
        </div>
      </div>
    </section>
  );
}
