import React from 'react';
import ProductList from './ProductList/ProductList';
import ProductForm from '../../pages/Products//ProductForm/ProductForm';

const Products: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false);
  const handleProductAdded = () => setRefresh(prev => !prev);

  return (
    <div>
      <h1>Products</h1>
      <ProductList key={String(refresh)} />
      <ProductForm onProductAdded={handleProductAdded} />
    </div>
  );
};

export default Products;
