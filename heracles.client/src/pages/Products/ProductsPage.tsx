// src/pages/Products/ProductsPage.tsx
import { useMemo, useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../services/useProducts';
import type { Product, ProductFilters } from '../../types/product';
import { ProductFilters as Filters } from '../../components/products/ProductFilters';
import { ProductList } from '../../components/products/ProductList';
import { ProductPagination } from '../../components/products/ProductPagination';
import { ProductForm } from '../../components/products/ProductForm';
import { ProductToolbar } from '../../components/products/ProductToolbar';
import { ProductEmptyState } from '../../components/products/ProductEmptyState';

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    isActive: '',
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useProducts(filters);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [editing, setEditing] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setFormOpen(true);
  };

  const submitForm = async (values: any) => {
    if (editing) {
      await updateProduct.mutateAsync({ id: editing.id, input: values });
    } else {
      await createProduct.mutateAsync(values);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const onDelete = async (id: number) => {
    if (window.confirm('Supprimer ce produit ?')) {
      await deleteProduct.mutateAsync(id);
    }
  };

  const hasItems = useMemo(() => items.length > 0, [items]);

  return (
    <div className="products-page">
      <ProductToolbar
  onCreate={openCreate}
  search={filters.search}
  onSearchChange={(value) => setFilters((f) => ({ ...f, search: value, page: 1 }))}
  category={filters.category}
  onCategoryChange={(value) => setFilters((f) => ({ ...f, category: value, page: 1 }))}
  isActive={filters.isActive}
  onIsActiveChange={(value) => setFilters((f) => ({ ...f, isActive: value, page: 1 }))}
  totalCount={data?.totalCount}
/>
      <Filters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div>Chargement...</div>
      ) : isError ? (
        <div>Erreur de chargement.</div>
      ) : hasItems ? (
        <>
          <ProductList products={items} onEdit={openEdit} onDelete={onDelete} />
          <ProductPagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
          />
        </>
      ) : (
        <ProductEmptyState onCreate={openCreate} />
      )}

      {formOpen && (
        <ProductForm
          initialValue={editing ?? undefined}
          onSubmit={submitForm}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}