import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';

interface Props {
  children: React.ReactNode;
}

const defaultLogoDataUrl = `data:image/svg+xml;utf8,` + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'>` +
    `<rect width='120' height='40' rx='6' fill='#fff'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='#222'>Heracles</text>` +
  `</svg>`
);

const Layout: React.FC<Props> = ({ children }) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const handleImgError = () => {
    if (imgRef.current && imgRef.current.src !== defaultLogoDataUrl) {
      imgRef.current.src = defaultLogoDataUrl;
    }
  };

  return (
    <div className="app-root">
      <nav className="navbar">
        <div className="brand">
          <img
            ref={imgRef}
            src="/logo.JPG"
            alt="logo"
            className="brand-logo"
            onError={handleImgError}
          />
          <span className="brand-text">Heracles</span>
        </div>
        <ul className="menu">
          <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} end>Home</NavLink></li>
          <li><NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''}>Products</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
          <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
          <li className="admin-dropdown">
            <span>Admin</span>
            <ul className="admin-menu">
              <li><NavLink to="/admin">Dashboard</NavLink></li>
              <li><NavLink to="/admin/products">Products (admin)</NavLink></li>
              <li><NavLink to="/admin/contacts">Contacts (admin)</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
