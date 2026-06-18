import React from 'react';
import { RoadmapForm } from './RoadmapForm';
import type { RoadmapItem, RoadmapItemCreate } from '../../types/roadmap';

interface RoadmapModalProps {
  isOpen: boolean;
  item?: RoadmapItem;
  onSubmit: (data: RoadmapItemCreate) => void;
  onClose: () => void;
  backlogItems: { id: number; title: string }[];
}

export function RoadmapModal({ isOpen, item, onSubmit, onClose, backlogItems }: RoadmapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{item ? 'Edit Roadmap Item' : 'Create Roadmap Item'}</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <RoadmapForm
          item={item}
          onSubmit={onSubmit}
          onCancel={onClose}
          backlogItems={backlogItems}
        />
      </div>
    </div>
  );
}