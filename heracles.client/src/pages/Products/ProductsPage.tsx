// src/pages/Products/ProductsPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../../services/useProducts';
import type { Product, ProductFilters, ProductFormValues } from '../../types/product';
import { ProductToolbar } from '../../components/products/ProductToolbar';
import { ProductList } from '../../components/products/ProductList';
import { ProductPagination } from '../../components/products/ProductPagination';
import { ProductEmptyState } from '../../components/products/ProductEmptyState';
import ProductModal from './ProductModal';

export default function ProductsPage() {
  const navigate = useNavigate();
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

  const [modalOpen, setModalOpen] = useState(false);

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const submitForm = async (values: ProductFormValues) => {
  if (editing) {
    await updateProduct.mutateAsync({ id: editing.id, input: values });
  } else {
    await createProduct.mutateAsync(values);
  }
  setModalOpen(false);
  setEditing(null);
};

  const onDelete = async (id: number) => {
    if (window.confirm('Supprimer ce produit ?')) {
      await deleteProduct.mutateAsync(id);
    }
  };

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

      {isLoading ? (
        <div>Chargement...</div>
      ) : isError ? (
        <div>Erreur de chargement.</div>
      ) : items.length > 0 ? (
        <>
          <ProductList
            products={items}
            onEdit={openEdit}
            onDelete={onDelete}
            onOpen={(id) => navigate(`/products/${id}`)}
          />
          <ProductPagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
          />
        </>
      ) : (
        <ProductEmptyState onCreate={openCreate} />
      )}

      <ProductModal
        isOpen={modalOpen}
        product={editing ?? undefined}
        onSubmit={submitForm}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
      />
    </div>
  );
}