// src/components/products/ProductList.tsx
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

export function ProductList({
  products,
  onEdit,
  onDelete,
  onOpen,
}: {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  onOpen?: (id: number) => void;
}) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} onOpen={onOpen} />
      ))}
    </div>
  );
}