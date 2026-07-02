import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useFeedback } from '../../services/useFeedback';
import '../../pages/Feedback/feedback.css';
import '../../components/Stats/stats.css'

interface RecentFeedbacksProps {
  limit?: number;
}

export function RecentFeedbacks({ limit = 5 }: RecentFeedbacksProps) {
  const { data: feedbacks = [], isLoading } = useFeedback();

  const recentFeedbacks = [...feedbacks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return '#f59e0b';
      case 'linked':
        return '#3b82f6';
      case 'ignored':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const statusCounts = [
    {
      name: 'new',
      label: 'New',
      value: feedbacks.filter((f) => f.status === 'new').length,
    },
    {
      name: 'linked',
      label: 'Linked',
      value: feedbacks.filter((f) => f.status === 'linked').length,
    },
    {
      name: 'ignored',
      label: 'Ignored',
      value: feedbacks.filter((f) => f.status === 'ignored').length,
    },
  ].filter((item) => item.value > 0);

  if (isLoading) {
    return <div className="widget-loading">Loading...</div>;
  }

  if (feedbacks.length === 0) {
    return <div className="widget-empty">No recent feedbacks</div>;
  }

  return (
    <div className="stats-card">
      <h3>Feedback overview</h3>

      <div className="chart-section">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusCounts.map((entry, index) => (
                  <Cell key={entry.name} fill={getStatusColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="legend-section">
        <div className="legend-grid">
          {statusCounts.map((item) => (
            <div className="legend-item" key={item.name}>
              <span
                className="legend-color"
                style={{ backgroundColor: getStatusColor(item.name) }}
              />
              <span className="legend-label">{item.label}</span>
              <span className="legend-count">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

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
                <span className="feedback-linked">→ {item.backlogItem.title}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}