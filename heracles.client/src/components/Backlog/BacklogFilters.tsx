import React from 'react';

interface BacklogFilters {
  type: 'feature' | 'bug' | 'initiative' | '';
  status: 'idea' | 'in_progress' | 'done' | '';
  search: string;
}

interface BacklogFiltersProps {
  filters: BacklogFilters;
  setFilters: (filters: BacklogFilters) => void;
}

export function BacklogFilters({ filters, setFilters }: BacklogFiltersProps) {
  return (
    <div className="backlog-filters">
      <input
        type="text"
        placeholder="Rechercher..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="filter-search"
      />

      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value as 'feature' | 'bug' | 'initiative' | '' })}
        className="filter-type"
      >
        <option value="">Tout types</option>
        <option value="feature">Feature</option>
        <option value="bug">Bug</option>
        <option value="initiative">Initiative</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value as 'idea' | 'in_progress' | 'done' | '' })}
        className="filter-status"
      >
        <option value="">Tout statuts</option>
        <option value="idea">Idea</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}