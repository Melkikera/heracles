// src/components/products/ProductForm.tsx
import { useState } from 'react';
import type { Product, ProductCreateInput } from '../../types/product';

export function ProductForm({
  initialValue,
  onSubmit,
  onCancel,
}: {
  initialValue?: Product;
  onSubmit: (values: ProductCreateInput) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductCreateInput>({
    name: initialValue?.name ?? '',
    price: initialValue?.price ?? 0,
    description: initialValue?.description ?? '',
    category: initialValue?.category ?? '',
    stockQuantity: initialValue?.stockQuantity ?? 0,
    isActive: initialValue?.isActive ?? true,
    sku: initialValue?.sku ?? '',
    discountPercentage: initialValue?.discountPercentage ?? null,
  });

  return (
    <div className="product-modal">
      <div className="product-form">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom" />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Prix" />
        <textarea value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <input value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Catégorie" />
        <input type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })} placeholder="Stock" />
        <input value={form.sku ?? ''} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="SKU" />
        <input type="number" value={form.discountPercentage ?? ''} onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })} placeholder="Réduction %" />
        <label>
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Actif
        </label>

        <div className="form-actions">
          <button onClick={() => onSubmit(form)}>Enregistrer</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
}