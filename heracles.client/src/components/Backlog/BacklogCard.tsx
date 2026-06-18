// src/components/backlog/BacklogCard.tsx
import './BacklogCard.css';

export type BacklogItem = {
  id: number;
  title: string;
  description?: string | null;
  type: string;
  status: string;
  priority: number;
  createdAt?: string;
};

interface BacklogCardProps {
  item: BacklogItem;
  onEdit: (item: BacklogItem) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

const typeLabel: Record<string, string> = {
  feature: 'Feature',
  bug: 'Bug',
  initiative: 'Initiative',
};

const statusLabel: Record<string, string> = {
  idea: 'Idea',
  in_progress: 'In progress',
  done: 'Done',
};

export function BacklogCard({ item, onEdit, onDelete, onOpen }: BacklogCardProps) {
  return (
    <article className="backlog-card">
      <div className="backlog-card__header">
        <div className="backlog-card__badges">
          <span className={`backlog-card__badge backlog-card__badge--${item.type}`}>
            {typeLabel[item.type] ?? item.type}
          </span>
          <span className={`backlog-card__badge backlog-card__badge--status backlog-card__badge--${item.status}`}>
            {statusLabel[item.status] ?? item.status}
          </span>
        </div>

        <div className="backlog-card__priority">
          <span>Priority</span>
          <strong>{item.priority}</strong>
        </div>
      </div>

      <div className="backlog-card__body">
        <h3 className="backlog-card__title">{item.title}</h3>
        <p className="backlog-card__description">
          {item.description ?? 'Aucune description disponible.'}
        </p>
      </div>

      <div className="backlog-card__footer">
        <div className="backlog-card__meta">
          <span>ID #{item.id}</span>
          {item.createdAt ? <span>{new Date(item.createdAt).toLocaleDateString()}</span> : null}
        </div>

        <div className="backlog-card__actions">
          <button type="button" onClick={() => onOpen?.(item.id)} className="backlog-card__action">
            Voir
          </button>
          <button type="button" onClick={() => onEdit(item)} className="backlog-card__action">
            Modifier
          </button>
          <button type="button" onClick={() => onDelete(item.id)} className="backlog-card__action backlog-card__action--danger">
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}