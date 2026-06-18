import React from 'react';
import { BacklogForm } from './BacklogForm';
import type { BacklogItem, BacklogItemCreate } from '../../types/backlog';

interface BacklogModalProps {
  isOpen: boolean;
  item?: BacklogItem;
  onSubmit: (data: BacklogItemCreate) => void;
  onClose: () => void;
}

export function BacklogModal({ isOpen, item, onSubmit, onClose }: BacklogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{item ? 'Edit Backlog Item' : 'Create Backlog Item'}</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <BacklogForm
          item={item}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}