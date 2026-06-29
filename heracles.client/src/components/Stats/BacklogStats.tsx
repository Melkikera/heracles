// src/components/backlog/BacklogStats.tsx
import type { BacklogItem } from '../Backlog/BacklogCard';
import { StatsGrid } from '../common/StatsGrid';

export function BacklogStats({ items }: { items: BacklogItem[] }) {
  const features = items.filter((i) => i.type === 'feature').length;
  const bugs = items.filter((i) => i.type === 'bug').length;
  const inProgress = items.filter((i) => i.status === 'in_progress').length;

  return (
    <StatsGrid>
      <article className="stat-card">
        <span className="stat-card__label">Total backlog</span>
        <strong className="stat-card__value">{items.length}</strong>
        <span className="stat-card__hint">All backlog elements</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Features</span>
        <strong className="stat-card__value">{features}</strong>
        <span className="stat-card__hint">Planned product features</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Bugs</span>
        <strong className="stat-card__value">{bugs}</strong>
        <span className="stat-card__hint">Issues to fix</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">In progress</span>
        <strong className="stat-card__value">{inProgress}</strong>
        <span className="stat-card__hint">Currently being worked on</span>
      </article>
    </StatsGrid>
  );
}