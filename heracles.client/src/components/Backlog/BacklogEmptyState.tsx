// src/components/backlog/BacklogEmptyState.tsx
import './BacklogEmptyState.css';

export function BacklogEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="backlog-empty-state">
      <div className="backlog-empty-state__icon">🗂️</div>
      <h2>Aucun élément backlog</h2>
      <p>Créez un premier item ou ajustez les filtres pour afficher les résultats.</p>
      <button type="button" onClick={onCreate} className="backlog-empty-state__cta">
        + New Item
      </button>
    </section>
  );
}