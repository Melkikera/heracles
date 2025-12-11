import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../../pages/Products/ProductForm/ProductForm';
import { API_KEY } from '../../constants';

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const load = async () => {
    try {
        const res = await axios.get('/api/products', { headers: { 'X-API-KEY': API_KEY } });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
      await axios.delete(`/api/products/${id}`, { headers: { 'X-API-KEY': API_KEY } });
    load();
  };

    const handleEdit = (p: any) => {

        console.log('Edit a product',p)
    setEditing(p);
  };

  return (
    <div>
      <h1>Products (admin)</h1>
      <ProductForm key={editing?.id ?? 'new'} onProductAdded={() => load()} initialProduct={editing} />

      <table className="table table-striped mt-3">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;
