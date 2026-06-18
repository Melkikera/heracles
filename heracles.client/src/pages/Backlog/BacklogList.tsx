// src/components/backlog/BacklogList.tsx
import { BacklogCard, type BacklogItem } from '../../components/Backlog/BacklogCard';

interface BacklogListProps {
  items: BacklogItem[];
  onEdit: (item: BacklogItem) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

export function BacklogList({ items, onEdit, onDelete, onOpen }: BacklogListProps) {
  return (
    <div className="backlog-list">
      {items.map((item) => (
        <BacklogCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}