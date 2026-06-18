import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useRoadmap } from '../../services/useRoadmap';
import type { RoadmapItem } from '../../types/roadmap';

interface RoadmapPreviewProps {
  quarters?: string[]; // Ex: ['Q2 2026', 'Q3 2026']
  limit?: number; // Nombre max d'items à afficher
  height?: number; // Hauteur du graphique
}

export function RoadmapPreview({ 
  quarters = ['Q2 2026', 'Q3 2026'], 
  limit = 5,
  height = 250 
}: RoadmapPreviewProps) {
  const { data: roadmapItems = [], isLoading } = useRoadmap();

  if (isLoading) {
    return <div className="roadmap-preview-loading">Loading roadmap...</div>;
  }

  // Filtrer par quarters
  const filteredItems = roadmapItems.filter((item) =>
    quarters.includes(item.quarter || '')
  );

  if (filteredItems.length === 0) {
    return <div className="roadmap-preview-empty">No roadmap items for selected quarters</div>;
  }

  // Préparer les données pour le graphique
  const chartData = quarters.map((quarter) => {
    const quarterItems = filteredItems.filter((item) => item.quarter === quarter);
    return {
      quarter,
      count: quarterItems.length,
      features: quarterItems.filter((i) => i.backlogItem?.type === 'feature').length,
      bugs: quarterItems.filter((i) => i.backlogItem?.type === 'bug').length,
      initiatives: quarterItems.filter((i) => i.backlogItem?.type === 'initiative').length,
    };
  });

  // Préparer les items à afficher (limités)
  const displayedItems = filteredItems.slice(0, limit);

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
    <div className="roadmap-preview-card">
      <h4>Roadmap Preview</h4>

      {/* Graphique par quarter */}
      <div className="roadmap-preview-chart">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData} stacked>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="quarter" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
              }}
            />
            <Legend />
            <Bar dataKey="features" name="Features" fill="#4f46e5" />
            <Bar dataKey="bugs" name="Bugs" fill="#ef4444" />
            <Bar dataKey="initiatives" name="Initiatives" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Liste des items */}
      <div className="roadmap-preview-items">
        <h5>Upcoming Items</h5>
        <div className="roadmap-items-list">
          {displayedItems.map((item) => (
            <div className="roadmap-item-preview" key={item.id}>
              <div className="item-type-badge">
                <span
                  style={{ backgroundColor: getTypeColor(item.backlogItem?.type || 'unknown') }}
                >
                  {item.backlogItem?.type || 'Unknown'}
                </span>
              </div>
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <div className="item-meta">
                  <span className="item-quarter">{item.quarter}</span>
                  <span
                    className="item-status"
                    style={{
                      backgroundColor: getStatusColor(item.backlogItem?.status || 'idea'),
                    }}
                  >
                    {item.backlogItem?.status || 'idea'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="roadmap-preview-kpi">
        <div className="kpi-item">
          <span className="kpi-value">{filteredItems.length}</span>
          <span className="kpi-label">Total Items</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-value features">
            {filteredItems.filter((i) => i.backlogItem?.type === 'feature').length}
          </span>
          <span className="kpi-label">Features</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-value bugs">
            {filteredItems.filter((i) => i.backlogItem?.type === 'bug').length}
          </span>
          <span className="kpi-label">Bugs</span>
        </div>
      </div>
    </div>
  );
}