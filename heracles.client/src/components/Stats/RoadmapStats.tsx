import React from 'react';
import { useRoadmap } from '../../services/useRoadmap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function RoadmapStats() {
  const { data: roadmapItems = [], isLoading } = useRoadmap();

  if (isLoading) {
    return <div className="stats-card loading">Loading roadmap stats...</div>;
  }

  // Stats par quarter
  const statsByQuarter = roadmapItems.reduce((acc, item) => {
    const quarter = item.quarter || 'No quarter';
    acc[quarter] = (acc[quarter] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const quarterData = Object.entries(statsByQuarter).map(([quarter, count]) => ({
    quarter,
    count,
  }));

  // Stats par type (via backlogItem)
  const statsByType = roadmapItems.reduce((acc, item) => {
    const type = item.backlogItem?.type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(statsByType).map(([type, count]) => ({
    type,
    count,
  }));

  // Stats par statut (via backlogItem)
  const statsByStatus = roadmapItems.reduce((acc, item) => {
    const status = item.backlogItem?.status || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statsByStatus).map(([status, count]) => ({
    status,
    count,
  }));

  // Total items
  const totalItems = roadmapItems.length;

  // Items par quarter avec dates
  const quartersWithDates = [
    { quarter: 'Q1 2026', start: 'Jan 2026', end: 'Mar 2026' },
    { quarter: 'Q2 2026', start: 'Apr 2026', end: 'Jun 2026' },
    { quarter: 'Q3 2026', start: 'Jul 2026', end: 'Sep 2026' },
    { quarter: 'Q4 2026', start: 'Oct 2026', end: 'Dec 2026' },
    { quarter: 'No quarter', start: '-', end: '-' },
  ];

  const quarterStats = quartersWithDates.map((q) => ({
    quarter: q.quarter,
    count: statsByQuarter[q.quarter] || 0,
    start: q.start,
    end: q.end,
  }));

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
    <div className="stats-card roadmap-stats">
      <h3>Roadmap Statistics</h3>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-value">{totalItems}</span>
          <span className="kpi-label">Total Items</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">{statsByQuarter['Q2 2026'] || 0}</span>
          <span className="kpi-label">Q2 2026</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">{statsByQuarter['Q3 2026'] || 0}</span>
          <span className="kpi-label">Q3 2026</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">{Object.values(statsByQuarter).filter((c) => c > 0).length}</span>
          <span className="kpi-label">Active Quarters</span>
        </div>
      </div>

      {/* Graphique par quarter */}
      <div className="chart-section">
        <h4>Items by Quarter</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={quarterStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4f46e5" name="Items" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend par type */}
      <div className="legend-section">
        <h4>Items by Type</h4>
        <div className="legend-grid">
          {typeData.map((item) => (
            <div className="legend-item" key={item.type}>
              <span
                className="legend-color"
                style={{ backgroundColor: getTypeColor(item.type) }}
              />
              <span className="legend-label">{item.type}</span>
              <span className="legend-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend par statut */}
      <div className="legend-section">
        <h4>Items by Status</h4>
        <div className="legend-grid">
          {statusData.map((item) => (
            <div className="legend-item" key={item.status}>
              <span
                className="legend-color"
                style={{ backgroundColor: getStatusColor(item.status) }}
              />
              <span className="legend-label">{item.status}</span>
              <span className="legend-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table par quarter */}
      <div className="table-section">
        <h4>Quarter Breakdown</h4>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Items</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {quarterStats
              .filter((q) => q.count > 0)
              .map((q) => (
                <tr key={q.quarter}>
                  <td>{q.quarter}</td>
                  <td>{q.count}</td>
                  <td>{q.start} - {q.end}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}