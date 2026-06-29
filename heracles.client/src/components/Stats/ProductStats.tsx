// src/components/products/ProductStats.tsx
import type { Product } from '../../types/product';
import { StatsGrid } from '../common/StatsGrid';

export function ProductStats({ products, totalCount }: { products: Product[]; totalCount: number }) {
  const activeCount = products.filter((p) => p.isActive).length;
  const inactiveCount = products.filter((p) => !p.isActive).length;
  const totalImages = products.reduce((acc, p) => acc + (p.images?.length ?? 0), 0);
  const totalTags = products.reduce((acc, p) => acc + (p.tags?.length ?? 0), 0);

  return (
    <StatsGrid>
      <article className="stat-card">
        <span className="stat-card__label">Total products</span>
        <strong className="stat-card__value">{totalCount}</strong>
        <span className="stat-card__hint">All items in database</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Active</span>
        <strong className="stat-card__value">{activeCount}</strong>
        <span className="stat-card__hint">Visible and usable products</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Inactive</span>
        <strong className="stat-card__value">{inactiveCount}</strong>
        <span className="stat-card__hint">Hidden or disabled products</span>
      </article>

      <article className="stat-card">
        <span className="stat-card__label">Images / Tags</span>
        <strong className="stat-card__value">{totalImages} / {totalTags}</strong>
        <span className="stat-card__hint">Linked media and labels</span>
      </article>
    </StatsGrid>
  );
}