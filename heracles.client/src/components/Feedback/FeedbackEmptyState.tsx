// src/components/feedback/FeedbackEmptyState.tsx
import './FeedbackEmptyState.css';

export function FeedbackEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="feedback-empty-state">
      <div className="feedback-empty-state__icon">💬</div>
      <h2>Aucun feedback</h2>
      <p>Ajoutez un premier feedback ou ajustez les filtres pour afficher les résultats.</p>
      <button type="button" onClick={onCreate} className="feedback-empty-state__cta">
        + New Feedback
      </button>
    </section>
  );
}