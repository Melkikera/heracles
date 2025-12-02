import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';

const Home: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false);
  const handleProductAdded = () => setRefresh(!refresh);

  return (
    <div>
      <h1>Home</h1>
      <ProductList key={String(refresh)} />
      <ProductForm onProductAdded={handleProductAdded} />
    </div>
  );
};

export default Home;
