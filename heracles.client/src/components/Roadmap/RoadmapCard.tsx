// src/components/roadmap/RoadmapCard.tsx
import './RoadmapCard.css';

export type RoadmapItem = {
  id: number;
  title: string;
  description?: string | null;
  quarter?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status?: string | null;
  backlogItemTitle?: string | null;
};

interface RoadmapCardProps {
  item: RoadmapItem;
  onEdit: (item: RoadmapItem) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

export function RoadmapCard({ item, onEdit, onDelete, onOpen }: RoadmapCardProps) {
  return (
    <article className="roadmap-card">
      <div className="roadmap-card__header">
        <div>
          <p className="roadmap-card__quarter">{item.quarter ?? 'No quarter'}</p>
          <h3 className="roadmap-card__title">{item.title}</h3>
        </div>

        {item.status ? <span className={`roadmap-card__status roadmap-card__status--${item.status}`}>{item.status}</span> : null}
      </div>

      <p className="roadmap-card__description">
        {item.description ?? 'Aucune description disponible.'}
      </p>

      <div className="roadmap-card__meta">
        <div>
          <span>Start</span>
          <strong>{item.startDate ? new Date(item.startDate).toLocaleDateString() : '-'}</strong>
        </div>
        <div>
          <span>End</span>
          <strong>{item.endDate ? new Date(item.endDate).toLocaleDateString() : '-'}</strong>
        </div>
        <div>
          <span>Backlog</span>
          <strong>{item.backlogItemTitle ?? '-'}</strong>
        </div>
      </div>

      <div className="roadmap-card__actions">
        <button type="button" onClick={() => onOpen?.(item.id)} className="roadmap-card__action">
          Voir
        </button>
        <button type="button" onClick={() => onEdit(item)} className="roadmap-card__action">
          Modifier
        </button>
        <button type="button" onClick={() => onDelete(item.id)} className="roadmap-card__action roadmap-card__action--danger">
          Supprimer
        </button>
      </div>
    </article>
  );
}