import React from 'react';

interface RoadmapFilters {
  quarter: string;
  search: string;
}

interface RoadmapFiltersProps {
  filters: RoadmapFilters;
  setFilters: (filters: RoadmapFilters) => void;
}

export function RoadmapFilters({ filters, setFilters }: RoadmapFiltersProps) {
  return (
    <div className="roadmap-filters">
      <input
        type="text"
        placeholder="Rechercher..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="filter-search"
      />

      <select
        value={filters.quarter}
        onChange={(e) => setFilters({ ...filters, quarter: e.target.value })}
        className="filter-quarter"
      >
        <option value="">Tout quarters</option>
        <option value="Q1 2026">Q1 2026</option>
        <option value="Q2 2026">Q2 2026</option>
        <option value="Q3 2026">Q3 2026</option>
        <option value="Q4 2026">Q4 2026</option>
      </select>
    </div>
  );
}