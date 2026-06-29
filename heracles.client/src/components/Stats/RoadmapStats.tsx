// src/components/roadmap/RoadmapStats.tsx
import { StatsGrid } from '../common/StatsGrid';
import type { RoadmapItem } from '../Roadmap/RoadmapCard';

export function RoadmapStats({ items }: { items: RoadmapItem[] }) {
  const q1 = items.filter((i) => i.quarter?.includes('Q1')).length;
  const q2 = items.filter((i) => i.quarter?.includes('Q2')).length;
  const q3 = items.filter((i) => i.quarter?.includes('Q3')).length;
  const q4 = items.filter((i) => i.quarter?.includes('Q4')).length;

  return (
    <StatsGrid>
      <article className="stat-card">
        <span className="stat-card__label">Total roadmap</span>
        <strong className="stat-card__value">{items.length}</strong>
        <span className="stat-card__hint">All roadmap items</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Q1</span>
        <strong className="stat-card__value">{q1}</strong>
        <span className="stat-card__hint">First quarter items</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Q2 / Q3 / Q4</span>
        <strong className="stat-card__value">{q2} / {q3} / {q4}</strong>
        <span className="stat-card__hint">Distribution over the year</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Planned</span>
        <strong className="stat-card__value">{items.filter((i) => i.status === 'idea').length}</strong>
        <span className="stat-card__hint">Not started yet</span>
      </article>
    </StatsGrid>
  );
}