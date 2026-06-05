import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
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
              <Nav className="menu">
                  <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                  <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                  <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        <NavDropdown title="Admin" id="nav-dropdown" >
            <NavDropdown.Item eventKey="4.1" href="/admin">Dashboard</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2" href="/admin/products">Products (admin)</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3" href="/admin/contacts">Contacts (admin) </NavDropdown.Item>                      
        </NavDropdown>
        </Nav>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
