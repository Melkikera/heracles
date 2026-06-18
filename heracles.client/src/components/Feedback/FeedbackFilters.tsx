import React from 'react';

interface FeedbackFilters {
  source: string;
  status: string;
  search: string;
}

interface FeedbackFiltersProps {
  filters: FeedbackFilters;
  setFilters: (filters: FeedbackFilters) => void;
}

export function FeedbackFilters({ filters, setFilters }: FeedbackFiltersProps) {
  return (
    <div className="feedback-filters">
      <input
        type="text"
        placeholder="Rechercher..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="filter-search"
      />

      <select
        value={filters.source}
        onChange={(e) => setFilters({ ...filters, source: e.target.value })}
        className="filter-source"
      >
        <option value="">Tout sources</option>
        <option value="direct">Direct</option>
        <option value="support">Support</option>
        <option value="sale">Sale</option>
        <option value="other">Other</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="filter-status"
      >
        <option value="">Tout statuts</option>
        <option value="new">New</option>
        <option value="linked">Linked</option>
        <option value="ignored">Ignored</option>
      </select>
    </div>
  );
}