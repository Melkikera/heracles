import React from 'react';
import type { Product } from '../../types/product';
import type { ProductFormValues } from '../../types/product';
import { ProductForm } from '../../components/products/ProductForm';

interface Props {
  isOpen: boolean;
  product?: Product;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
}

const ProductModal: React.FC<Props> = ({ isOpen, product, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const initialValue = product
    ? {
        id: product.id,
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        category: product.category ?? '',
        isActive: product.isActive,
        stockQuantity: product.stockQuantity,
        sku: product.sku ?? '',
        discountPercentage: product.discountPercentage ?? undefined,
      }
    : undefined;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content" role="dialog" aria-modal="true" aria-label={product ? 'Edit Product' : 'Create a new Product'}>
          <div className="modal-header">
            <h2>{product ? 'Edit Product' : 'Create a new Product'}</h2>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>

          <div className="modal-body">
            <ProductForm
              initialValue={initialValue}
              onSubmit={onSubmit}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
