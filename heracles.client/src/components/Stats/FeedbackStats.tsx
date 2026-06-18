import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFeedback } from '../../services/useFeedback';

export function FeedbackStats() {
  const { data: feedbacks = [], isLoading } = useFeedback();

  if (isLoading) {
    return <div className="stats-card">Loading stats...</div>;
  }

  // Stats par source
  const bySource = feedbacks.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceData = [
    { name: 'Direct', count: bySource['direct'] || 0 },
    { name: 'Support', count: bySource['support'] || 0 },
    { name: 'Sale', count: bySource['sale'] || 0 },
    { name: 'Other', count: bySource['other'] || 0 },
  ];

  // Stats par statut
  const byStatus = feedbacks.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalFeedbacks = feedbacks.length;
  const linkedCount = byStatus['linked'] || 0;
  const newCount = byStatus['new'] || 0;
  const ignoredCount = byStatus['ignored'] || 0;
  const linkedPercentage = totalFeedbacks > 0 ? Math.round((linkedCount / totalFeedbacks) * 100) : 0;

  return (
    <div className="stats-card">
      <h3>Feedback Stats</h3>

      {/* KPI Cards */}
      <div className="stats-kpi">
        <div className="kpi-item">
          <span className="kpi-value">{totalFeedbacks}</span>
          <span className="kpi-label">Total</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-value linked">{linkedCount}</span>
          <span className="kpi-label">Linked</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-value new">{newCount}</span>
          <span className="kpi-label">New</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-value ignored">{ignoredCount}</span>
          <span className="kpi-label">Ignored</span>
        </div>
      </div>

      {/* Percentage Link */}
      <div className="stats-link-percentage">
        <span className="link-pct-value">{linkedPercentage}%</span>
        <span className="link-pct-label">linked to backlog</span>
      </div>

      {/* Graphique par source */}
      <div className="stats-chart">
        <h4>By Source</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sourceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}