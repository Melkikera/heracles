// src/components/roadmap/RoadmapList.tsx
import { RoadmapCard, type RoadmapItem } from './RoadmapCard';

interface RoadmapListProps {
  items: RoadmapItem[];
  onEdit: (item: RoadmapItem) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

export function RoadmapList({ items, onEdit, onDelete, onOpen }: RoadmapListProps) {
  return (
    <div className="roadmap-list">
      {items.map((item) => (
        <RoadmapCard
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