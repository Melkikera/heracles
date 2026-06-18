// src/components/feedback/FeedbackCard.tsx
import './FeedbackCard.css';

export type FeedbackItem = {
  id: number;
  title: string;
  description: string;
  source: string;
  status: string;
  backlogItemTitle?: string | null;
  createdAt?: string;
};

interface FeedbackCardProps {
  item: FeedbackItem;
  onEdit: (item: FeedbackItem) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

const sourceLabel: Record<string, string> = {
  direct: 'Direct',
  support: 'Support',
  sale: 'Sales',
};

const statusLabel: Record<string, string> = {
  new: 'New',
  linked: 'Linked',
  ignored: 'Ignored',
};

export function FeedbackCard({ item, onEdit, onDelete, onOpen }: FeedbackCardProps) {
  return (
    <article className="feedback-card">
      <div className="feedback-card__header">
        <div className="feedback-card__badges">
          <span className="feedback-card__badge feedback-card__badge--source">
            {sourceLabel[item.source] ?? item.source}
          </span>
          <span className={`feedback-card__badge feedback-card__badge--status feedback-card__badge--${item.status}`}>
            {statusLabel[item.status] ?? item.status}
          </span>
        </div>

        {item.backlogItemTitle ? (
          <span className="feedback-card__linked">
            Linked to: {item.backlogItemTitle}
          </span>
        ) : (
          <span className="feedback-card__linked feedback-card__linked--muted">Not linked</span>
        )}
      </div>

      <div className="feedback-card__body">
        <h3 className="feedback-card__title">{item.title}</h3>
        <p className="feedback-card__description">{item.description}</p>
      </div>

      <div className="feedback-card__footer">
        <div className="feedback-card__meta">
          <span>ID #{item.id}</span>
          {item.createdAt ? <span>{new Date(item.createdAt).toLocaleDateString()}</span> : null}
        </div>

        <div className="feedback-card__actions">
          <button type="button" onClick={() => onOpen?.(item.id)} className="feedback-card__action">
            Voir
          </button>
          <button type="button" onClick={() => onEdit(item)} className="feedback-card__action">
            Modifier
          </button>
          <button type="button" onClick={() => onDelete(item.id)} className="feedback-card__action feedback-card__action--danger">
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}