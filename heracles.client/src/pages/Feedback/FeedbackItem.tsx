import React from 'react';
import type { Feedback } from '../../types/feedback';

interface FeedbackItemProps {
  item: Feedback;
  onEdit: () => void;
  onDelete: () => void;
}

export function FeedbackItem({ item, onEdit, onDelete }: FeedbackItemProps) {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'direct': return '#4f46e5';
      case 'support': return '#f59e0b';
      case 'sale': return '#10b981';
      case 'other': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#f59e0b';
      case 'linked': return '#3b82f6';
      case 'ignored': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="feedback-item">
      <div className="feedback-item-header">
        <span
          className="feedback-source"
          style={{ backgroundColor: getSourceColor(item.source) }}
        >
          {item.source}
        </span>
        <span
          className="feedback-status"
          style={{ backgroundColor: getStatusColor(item.status) }}
        >
          {item.status}
        </span>
      </div>

      <div className="feedback-item-content">
        <h3 className="feedback-title">{item.title}</h3>
        <p className="feedback-description">{item.description}</p>
        <div className="feedback-meta">
          {item.backlogItem && (
            <span className="feedback-backlog">
              Linked: {item.backlogItem.title} ({item.backlogItem.type})
            </span>
          )}
          <span className="feedback-created-by">
            By: {item.createdBy?.email || 'Unknown'}
          </span>
        </div>
      </div>

      <div className="feedback-item-actions">
        <button onClick={onEdit} className="btn-edit">Edit</button>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  );
}