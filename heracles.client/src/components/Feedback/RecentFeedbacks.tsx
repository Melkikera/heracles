import React from 'react';
import { useFeedback } from '../../services/useFeedback';

interface RecentFeedbacksProps {
  limit?: number;
}

export function RecentFeedbacks({ limit = 5 }: RecentFeedbacksProps) {
  const { data: feedbacks = [], isLoading } = useFeedback();

  const recentFeedbacks = feedbacks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  if (isLoading) {
    return <div className="widget-loading">Loading...</div>;
  }

  if (recentFeedbacks.length === 0) {
    return <div className="widget-empty">No recent feedbacks</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#f59e0b';
      case 'linked': return '#3b82f6';
      case 'ignored': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="recent-feedbacks-widget">
      <h4>Recent Feedbacks</h4>
      <div className="recent-feedbacks-list">
        {recentFeedbacks.map((item) => (
          <div className="recent-feedback-item" key={item.id}>
            <span
              className="feedback-status-badge"
              style={{ backgroundColor: getStatusColor(item.status) }}
            >
              {item.status}
            </span>
            <div className="feedback-item-info">
              <span className="feedback-title">{item.title}</span>
              {item.backlogItem && (
                <span className="feedback-linked">
                  → {item.backlogItem.title}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}