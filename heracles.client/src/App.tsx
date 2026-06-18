// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import ContactsAdmin from './pages/Admin/ContactsAdmin';
import ProductsAdmin from './pages/Products/ProductsAdmin';
import Backlog from './pages/Backlog/Backlog';
import Roadmap from './pages/Roadmap/Roadmap';
import Feedback from './pages/Feedback/Feedback';
import ProductDetailsPage from './pages/Products/ProductDetailsPage';
import ProductsPage from './pages/Products/ProductsPage';

// Dans Routes
function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailsPage />} />
                    <Route path="/backlog" element={<Backlog />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin/products" element={<ProductsAdmin />} />
                    <Route path="/admin/contacts" element={<ContactsAdmin />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;