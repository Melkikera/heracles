// src/components/products/ProductPagination.tsx
export function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="product-pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Précédent</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Suivant</button>
    </div>
  );
}