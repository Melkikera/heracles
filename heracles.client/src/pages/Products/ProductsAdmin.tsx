import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, ROUTES } from '../../constants';
import ProductModal from '../Products/ProductModal';

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
    const [editing, setEditing] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);

  const load = async () => {
      try {
          const res = await axios.get(ROUTES.PRODUCTS, { headers: { 'X-API-KEY': API_KEY } });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
      if (!confirm('Delete this product?')) return;
      await axios.delete(ROUTES.PRODUCTS +`/${id}`, { headers: { 'X-API-KEY': API_KEY } });
    load();
  };

    const handleEdit = (p: any) => {

        console.log('Edit a product',p)
        setEditing(p);
        setShowModal(true);
  };

    const handleAdd = () => {
        console.log('Adding new product');
        setEditing(null);
        setShowModal(true);
    };

  return (
    <div>
      <h1>Products (admin)</h1>
        <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>

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
          {showModal && <ProductModal product={editing} onClose={() => setShowModal(false)} onSaved={load} />}                      
        </div>      
      
        
  );
};

export default ProductsAdmin;
