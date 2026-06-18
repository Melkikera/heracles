import React from 'react';
import { FeedbackForm } from './FeedbackForm';
import type { Feedback, FeedbackCreate } from '../../types/feedback';

interface FeedbackModalProps {
  isOpen: boolean;
  item?: Feedback;
  onSubmit: (data: FeedbackCreate) => void;
  onClose: () => void;
  backlogItems?: { id: number; title: string }[];
}

export function FeedbackModal({ isOpen, item, onSubmit, onClose, backlogItems = [] }: FeedbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{item ? 'Edit Feedback' : 'Create Feedback'}</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <FeedbackForm
          item={item}
          onSubmit={onSubmit}
          onCancel={onClose}
          backlogItems={backlogItems}
        />
      </div>
    </div>
  );
}