// src/components/products/ProductToolbar.tsx
import './ProductToolbar.css';

interface ProductToolbarProps {
  onCreate: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  isActive: string;
  onIsActiveChange: (value: string) => void;
  totalCount?: number;
}

export function ProductToolbar({
  onCreate,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  isActive,
  onIsActiveChange,
  totalCount = 0,
}: ProductToolbarProps) {
  return (
    <section className="product-toolbar">
      <div className="product-toolbar__header">
        <div className="product-toolbar__title">
          <h1>Products</h1>
          <p>{totalCount} produit(s)</p>
        </div>

        <button type="button" onClick={onCreate} className="product-toolbar__create">
          + New Product
        </button>
      </div>

      <div className="product-toolbar__filters">
        <div className="product-toolbar__field">
          <label htmlFor="product-search">Recherche</label>
          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher un produit..."
          />
        </div>

        <div className="product-toolbar__field">
          <label htmlFor="product-category">Catégorie</label>
          <input
            id="product-category"
            type="text"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            placeholder="Catégorie"
          />
        </div>

        <div className="product-toolbar__field">
          <label htmlFor="product-status">Statut</label>
          <select id="product-status" value={isActive} onChange={(e) => onIsActiveChange(e.target.value)}>
            <option value="">Tous</option>
            <option value="true">Actifs</option>
            <option value="false">Inactifs</option>
          </select>
        </div>
      </div>
    </section>
  );
}