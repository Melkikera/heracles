// src/components/products/ProductFilters.tsx
import type { ProductFilters as FiltersType } from '../../types/product';

export function ProductFilters({
  filters,
  onChange,
}: {
  filters: FiltersType;
  onChange: (f: FiltersType) => void;
}) {
  return (
    <div className="product-filters">
      <input
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
        placeholder="Rechercher..."
      />
      <input
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value, page: 1 })}
        placeholder="Catégorie"
      />
      <select
        value={filters.isActive}
        onChange={(e) => onChange({ ...filters, isActive: e.target.value, page: 1 })}
      >
        <option value="">Tous</option>
        <option value="true">Actifs</option>
        <option value="false">Inactifs</option>
      </select>
    </div>
  );
}