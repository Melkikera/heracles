// src/components/products/ProductTagsList.tsx
import type { ProductTag } from '../../types/product';

export function ProductTagsList({ tags }: { tags: ProductTag[] }) {
  if (!tags.length) return <div>Aucun tag</div>;
  return (
    <div className="product-tags-list">
      {tags.map((tag) => <span key={tag.id}>{tag.tagName}</span>)}
    </div>
  );
}