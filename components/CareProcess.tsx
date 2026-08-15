import type { CareProcessStep } from "@/lib/content";

type CareProcessProps = {
  steps: CareProcessStep[];
};

export function CareProcess({ steps }: CareProcessProps) {
  return (
    <section className="section care-process-section">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="section-kicker">HOW CARE CONTINUES</span>
            <h2>진행 과정</h2>
          </div>
          <span className="section-count">{String(steps.length).padStart(2, "0")} STEPS</span>
        </div>
        <div className="care-process-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <p className="care-process-note">서비스와 현재 상황에 따라 확인 과정과 진행 방식은 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}
