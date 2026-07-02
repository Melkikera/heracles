// src/components/products/ProductForm.tsx
import { useState } from 'react';
import type { ProductFormValues } from '../../types/product';

export function ProductForm({
  initialValue,
  onSubmit,
  onCancel,
}: {
  initialValue?: Partial<ProductFormValues> & { id?: number };
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductFormValues>({
    name: initialValue?.name ?? '',
    price: initialValue?.price ?? 0,
    description: initialValue?.description ?? '',
    category: initialValue?.category ?? '',
    stockQuantity: initialValue?.stockQuantity ?? 0,
    isActive: initialValue?.isActive ?? true,
    sku: initialValue?.sku ?? '',
    discountPercentage: initialValue?.discountPercentage,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nom</label>
      <input
        id="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nom"
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="price">Prix</label>
      <input
        id="price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        placeholder="Prix"
        min={0}
      />
      </div>
      <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={form.description ?? ''}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
      />
      </div>
      <div className="form-group">
      <label htmlFor="category">Catégorie</label>
      <input
        id="category"
        value={form.category ?? ''}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="Catégorie"
      />
      </div>
      <div className="form-group">
      <label htmlFor="stockQuantity">Stock</label>
      <input
        id="stockQuantity"
        type="number"
        value={form.stockQuantity}
        onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
        placeholder="Stock"
        min={0}
      />
      </div>
      <div className="form-group">
      <label htmlFor="sku">SKU</label>
      <input
        id="sku"
        value={form.sku ?? ''}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
        placeholder="SKU"
      />
      </div>
      <div className="form-group">
      <label htmlFor="discountPercentage">Réduction %</label>
      <input
        id="discountPercentage"
        type="number"
        value={form.discountPercentage ?? ''}
        onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })}
        placeholder="Réduction %"
        min={0}
        max={100}
      />
      <label htmlFor="isActive">
        <input id="isActive" type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
        Actif
      </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {form.name ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}