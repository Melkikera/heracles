// src/components/feedback/FeedbackList.tsx
import { FeedbackCard, type FeedbackItem } from './FeedbackCard';

interface FeedbackListProps {
  items: FeedbackItem[];
  onEdit: (item: FeedbackItem) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

export function FeedbackList({ items, onEdit, onDelete, onOpen }: FeedbackListProps) {
  return (
    <div className="feedback-list">
      {items.map((item) => (
        <FeedbackCard
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