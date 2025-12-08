// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import Dashboard from './pages/Admin/Dashboard';
import Layout from './components/Layout/Layout';
import ContactsAdmin from './pages/Admin/ContactsAdmin';
import ProductsAdmin from './pages/Products/ProductsAdmin';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
          <Route path="/admin/contacts" element={<ContactsAdmin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;