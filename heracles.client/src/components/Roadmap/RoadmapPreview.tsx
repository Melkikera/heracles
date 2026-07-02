import { useRoadmapTimeline } from '../../services/useRoadmap';
import { RoadmapTimeline } from '../../pages/Roadmap/RoadmapTimeline';
import './RoadmapPreview.css';

interface RoadmapPreviewProps {
  quarters?: string[]; // Ex: ['Q2 2026', 'Q3 2026']
  limit?: number; // Nombre max d'items à afficher
  height?: number; // Hauteur du graphique
}

export function RoadmapPreview({ 
  quarters = ['Q2 2026', 'Q3 2026'], 
  limit = 5}: RoadmapPreviewProps) {
  const { data: timelineItems = [], isLoading: isLoadingTimeline, error: timelineError } = useRoadmapTimeline();


  // Filtrer par quarters
  const filteredItems = timelineItems.filter((item) =>
    quarters.includes(item.quarter || '')
  );

  if (filteredItems.length === 0) {
    return <div className="roadmap-preview-empty">No roadmap items for selected quarters</div>;
  } 

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

      {/* Vue Timeline */}
            <div className="roadmap-timeline-section">
              <h2>Timeline</h2>
              {isLoadingTimeline ? (
                <div className="loading">Loading...</div>
              ) : timelineError ? (
                <div className="error">Error loading timeline</div>
              ) : (
                <RoadmapTimeline items={displayedItems} />
              )}
            </div>

      {/* Liste des items */}
      <div className="roadmap-preview-items">
        <h5>Upcoming Items</h5>
        <div className="roadmap-items-list">
          {displayedItems.map((item) => (
            <div className="roadmap-item-preview" key={item.id}>
              <div className="item-type-badge">
                <span
                  style={{ backgroundColor: getTypeColor(item.backlogItemType || 'unknown') }}
                >
                  {item.backlogItemType || 'Unknown'}
                </span>
              </div>
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <div className="item-meta">
                  <span className="item-quarter">{item.quarter}</span>
                  <span
                    className="item-status"
                    style={{
                      backgroundColor: getStatusColor(item.status || 'idea'),
                    }}
                  >
                    {item.status || 'idea'}
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
            {filteredItems.filter((i) => i.backlogItemType === 'feature').length}
          </span>
          <span className="kpi-label">Features</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-value bugs">
            {filteredItems.filter((i) => i.backlogItemType === 'bug').length}
          </span>
          <span className="kpi-label">Bugs</span>
        </div>
      </div>
    </div>
  );
}