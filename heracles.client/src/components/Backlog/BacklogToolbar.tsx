// src/components/backlog/BacklogToolbar.tsx
import './BacklogToolbar.css';

interface BacklogToolbarProps {
  onCreate: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  totalCount?: number;
}

export function BacklogToolbar({
  onCreate,
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  totalCount = 0,
}: BacklogToolbarProps) {
  return (
    <section className="backlog-toolbar">
      <div className="backlog-toolbar__header">
        <div>
          <h1>Backlog</h1>
          <p>{totalCount} élément(s)</p>
        </div>

        <button type="button" onClick={onCreate} className="backlog-toolbar__create">
          + New Item
        </button>
      </div>

      <div className="backlog-toolbar__filters">
        <div className="backlog-toolbar__field">
          <label htmlFor="backlog-search">Recherche</label>
          <input
            id="backlog-search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher..."
          />
        </div>

        <div className="backlog-toolbar__field">
          <label htmlFor="backlog-type">Type</label>
          <select id="backlog-type" value={type} onChange={(e) => onTypeChange(e.target.value)}>
            <option value="">Tous</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
            <option value="initiative">Initiative</option>
          </select>
        </div>

        <div className="backlog-toolbar__field">
          <label htmlFor="backlog-status">Statut</label>
          <select id="backlog-status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Tous</option>
            <option value="idea">Idea</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </section>
  );
}