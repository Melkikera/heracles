// src/components/products/ProductCard.tsx
import type { Product } from '../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}

export function ProductCard({ product, onEdit, onDelete, onOpen }: ProductCardProps) {
  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url ??
    product.images?.[0]?.url ??
    null;

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__media"
        onClick={() => onOpen?.(product.id)}
        aria-label={`Ouvrir ${product.name}`}
      >
        {primaryImage ? (
          <img src={primaryImage} alt={product.name} className="product-card__image" />
        ) : (
          <div className="product-card__placeholder">No image</div>
        )}

        <span className={`product-card__status ${product.isActive ? 'is-active' : 'is-inactive'}`}>
          {product.isActive ? 'Actif' : 'Inactif'}
        </span>
      </button>

      <div className="product-card__body">
        <div className="product-card__top">
          <div>
            <h3 className="product-card__title">{product.name}</h3>
            <p className="product-card__subtitle">
              {product.category ?? 'Sans catégorie'} • SKU: {product.sku ?? '-'}
            </p>
          </div>

          <div className="product-card__price">
            {product.discountPercentage ? (
              <>
                <span className="product-card__price-current">
                  {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)} €
                </span>
                <span className="product-card__price-old">{product.price.toFixed(2)} €</span>
              </>
            ) : (
              <span className="product-card__price-current">{product.price.toFixed(2)} €</span>
            )}
          </div>
        </div>

        <p className="product-card__description">
          {product.description ?? 'Aucune description disponible.'}
        </p>

        <div className="product-card__meta">
          <div>
            <span className="product-card__meta-label">Stock</span>
            <strong>{product.stockQuantity}</strong>
          </div>
          <div>
            <span className="product-card__meta-label">Images</span>
            <strong>{product.images?.length ?? 0}</strong>
          </div>
          <div>
            <span className="product-card__meta-label">Tags</span>
            <strong>{product.tags?.length ?? 0}</strong>
          </div>
        </div>

        <div className="product-card__tags">
          {(product.tags ?? []).slice(0, 3).map((tag) => (
            <span key={tag.id} className="product-card__tag">
              {tag.tagName}
            </span>
          ))}
          {(product.tags?.length ?? 0) > 3 && (
            <span className="product-card__tag product-card__tag--more">
              +{(product.tags?.length ?? 0) - 3}
            </span>
          )}
        </div>
      </div>

      <div className="product-card__actions">
        <button type="button" onClick={() => onOpen?.(product.id)} className="product-card__action">
          Voir
        </button>
        <button type="button" onClick={() => onEdit(product)} className="product-card__action">
          Modifier
        </button>
        <button type="button" onClick={() => onDelete(product.id)} className="product-card__action product-card__action--danger">
          Supprimer
        </button>
      </div>
    </article>
  );
}