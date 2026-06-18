import React from 'react';
import type  { BacklogItem } from '../../types/backlog';

interface BacklogItemProps {
  item: BacklogItem;
  onEdit: () => void;
  onDelete: () => void;
}

export function BacklogItem({ item, onEdit, onDelete }: BacklogItemProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return '#4f46e5';
      case 'bug': return '#ef4444';
      case 'initiative': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return '#f59e0b';
      case 'in_progress': return '#3b82f6';
      case 'done': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="backlog-item">
      <div className="backlog-item-header">
        <span
          className="backlog-type"
          style={{ backgroundColor: getTypeColor(item.type) }}
        >
          {item.type}
        </span>
        <span
          className="backlog-status"
          style={{ backgroundColor: getStatusColor(item.status) }}
        >
          {item.status}
        </span>
      </div>

      <div className="backlog-item-content">
        <h3 className="backlog-title">{item.title}</h3>
        {item.description && (
          <p className="backlog-description">{item.description}</p>
        )}
        <div className="backlog-meta">
          <span className="backlog-priority">Priority: {item.priority}</span>
          <span className="backlog-created-by">
            By: {item.createdBy?.email || 'Unknown'}
          </span>
        </div>
      </div>

      <div className="backlog-item-actions">
        <button onClick={onEdit} className="btn-edit">Edit</button>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  );
}