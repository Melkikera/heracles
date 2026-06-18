import React from 'react';
import type { RoadmapItem } from '../../types/roadmap';

interface RoadmapItemProps {
  item: RoadmapItem;
  onEdit: () => void;
  onDelete: () => void;
}

export function RoadmapItem({ item, onEdit, onDelete }: RoadmapItemProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return '#4f46e5';
      case 'bug': return '#ef4444';
      case 'initiative': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="roadmap-item">
      <div className="roadmap-item-header">
        <span
          className="roadmap-type"
          style={{ backgroundColor: item.backlogItem?.type ? getTypeColor(item.backlogItem.type) : '#6b7280' }}
        >
          {item.backlogItem?.type || 'Unknown'}
        </span>
        <span className="roadmap-quarter">{item.quarter || 'No quarter'}</span>
      </div>

      <div className="roadmap-item-content">
        <h3 className="roadmap-title">{item.title}</h3>
        {item.description && (
          <p className="roadmap-description">{item.description}</p>
        )}
        <div className="roadmap-meta">
          <span className="roadmap-dates">
            {item.startDate} → {item.endDate}
          </span>
          {item.backlogItem && (
            <span className="roadmap-backlog">
              Backlog: {item.backlogItem.title}
            </span>
          )}
        </div>
      </div>

      <div className="roadmap-item-actions">
        <button onClick={onEdit} className="btn-edit">Edit</button>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  );
}