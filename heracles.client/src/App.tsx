// src/App.tsx
import React, { useState } from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';

function App() {
  const [route, setRoute] = useState<'home' | 'about'>('home');

  const handleNavigate = (target: 'home' | 'about') => setRoute(target);

  return (
    <Layout onNavigate={handleNavigate} currentRoute={route}>
      {route === 'home' ? <Home /> : <About />}
    </Layout>
  );
}

export default App;