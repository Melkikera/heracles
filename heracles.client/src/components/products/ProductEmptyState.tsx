// src/components/products/ProductEmptyState.tsx
import './ProductEmptyState.css';

interface ProductEmptyStateProps {
  onCreate: () => void;
}

export function ProductEmptyState({ onCreate }: ProductEmptyStateProps) {
  return (
    <section className="product-empty-state" aria-label="empty product state">
      <div className="product-empty-state__icon">📦</div>
      <h2>Aucun produit trouvé</h2>
      <p>
        Vous pouvez créer un premier produit ou ajuster vos filtres pour afficher des résultats.
      </p>
      <button type="button" onClick={onCreate} className="product-empty-state__cta">
        + New Product
      </button>
    </section>
  );
}