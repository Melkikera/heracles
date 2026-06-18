// src/components/roadmap/RoadmapEmptyState.tsx
import './RoadmapEmptyState.css';

export function RoadmapEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="roadmap-empty-state">
      <div className="roadmap-empty-state__icon">🛣️</div>
      <h2>Aucun élément roadmap</h2>
      <p>Ajoutez un premier item ou modifiez vos filtres pour voir les résultats.</p>
      <button type="button" onClick={onCreate} className="roadmap-empty-state__cta">
        + New Roadmap Item
      </button>
    </section>
  );
}