import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


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
              <Nav className="menu">
                  <Nav.Item><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink></Nav.Item>
                  <Nav.Item><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></Nav.Item>
                  <Nav.Item><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></Nav.Item>
                  <Nav.Item><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></Nav.Item>
        <NavDropdown title="Admin" id="nav-dropdown" >
            <NavDropdown.Item eventKey="4.1"><NavLink to="/admin">Dashboard</NavLink></NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2"><NavLink to="/admin/products">Products (admin)</NavLink></NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3"><NavLink to="/admin/contacts">Contacts (admin)</NavLink></NavDropdown.Item>                      
        </NavDropdown>
        </Nav>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
