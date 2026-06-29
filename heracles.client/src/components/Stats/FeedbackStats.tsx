// src/components/feedback/FeedbackStats.tsx
import type { Feedback } from '../../types/feedback';
import { StatsGrid } from '../common/StatsGrid';

export function FeedbackStats({ items }: { items: Feedback[] }) {
  const newCount = items.filter((i) => i.status === 'new').length;
  const linkedCount = items.filter((i) => i.status === 'linked').length;
  const ignoredCount = items.filter((i) => i.status === 'ignored').length;
  const supportCount = items.filter((i) => i.source === 'support').length;

  return (
    <StatsGrid>
      <article className="stat-card">
        <span className="stat-card__label">Total feedback</span>
        <strong className="stat-card__value">{items.length}</strong>
        <span className="stat-card__hint">All feedback items</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">New</span>
        <strong className="stat-card__value">{newCount}</strong>
        <span className="stat-card__hint">Not processed yet</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Linked</span>
        <strong className="stat-card__value">{linkedCount}</strong>
        <span className="stat-card__hint">Attached to backlog</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Ignored / Support</span>
        <strong className="stat-card__value">{ignoredCount} / {supportCount}</strong>
        <span className="stat-card__hint">Filtered and support sources</span>
      </article>
    </StatsGrid>
  );
}