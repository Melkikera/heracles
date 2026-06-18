// src/components/feedback/FeedbackToolbar.tsx
import './FeedbackToolbar.css';

interface FeedbackToolbarProps {
  onCreate: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  totalCount?: number;
}

export function FeedbackToolbar({
  onCreate,
  search,
  onSearchChange,
  source,
  onSourceChange,
  status,
  onStatusChange,
  totalCount = 0,
}: FeedbackToolbarProps) {
  return (
    <section className="feedback-toolbar">
      <div className="feedback-toolbar__header">
        <div>
          <h1>Feedback</h1>
          <p>{totalCount} élément(s)</p>
        </div>

        <button type="button" onClick={onCreate} className="feedback-toolbar__create">
          + New Feedback
        </button>
      </div>

      <div className="feedback-toolbar__filters">
        <div className="feedback-toolbar__field">
          <label htmlFor="feedback-search">Recherche</label>
          <input
            id="feedback-search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher..."
          />
        </div>

        <div className="feedback-toolbar__field">
          <label htmlFor="feedback-source">Source</label>
          <select id="feedback-source" value={source} onChange={(e) => onSourceChange(e.target.value)}>
            <option value="">Tous</option>
            <option value="direct">Direct</option>
            <option value="support">Support</option>
            <option value="sale">Sales</option>
          </select>
        </div>

        <div className="feedback-toolbar__field">
          <label htmlFor="feedback-status">Statut</label>
          <select id="feedback-status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Tous</option>
            <option value="new">New</option>
            <option value="linked">Linked</option>
            <option value="ignored">Ignored</option>
          </select>
        </div>
      </div>
    </section>
  );
}