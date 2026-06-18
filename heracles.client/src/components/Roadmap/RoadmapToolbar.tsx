// src/components/roadmap/RoadmapToolbar.tsx
import './RoadmapToolbar.css';

interface RoadmapToolbarProps {
  onCreate: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  quarter: string;
  onQuarterChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  totalCount?: number;
}

export function RoadmapToolbar({
  onCreate,
  search,
  onSearchChange,
  quarter,
  onQuarterChange,
  status,
  onStatusChange,
  totalCount = 0,
}: RoadmapToolbarProps) {
  return (
    <section className="roadmap-toolbar">
      <div className="roadmap-toolbar__header">
        <div>
          <h1>Roadmap</h1>
          <p>{totalCount} élément(s)</p>
        </div>

        <button type="button" onClick={onCreate} className="roadmap-toolbar__create">
          + New Roadmap Item
        </button>
      </div>

      <div className="roadmap-toolbar__filters">
        <div className="roadmap-toolbar__field">
          <label htmlFor="roadmap-search">Recherche</label>
          <input
            id="roadmap-search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher..."
          />
        </div>

        <div className="roadmap-toolbar__field">
          <label htmlFor="roadmap-quarter">Quarter</label>
          <input
            id="roadmap-quarter"
            type="text"
            value={quarter}
            onChange={(e) => onQuarterChange(e.target.value)}
            placeholder="Q1 2026"
          />
        </div>

        <div className="roadmap-toolbar__field">
          <label htmlFor="roadmap-status">Statut</label>
          <select id="roadmap-status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
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