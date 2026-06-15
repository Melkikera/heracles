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
      {/* Header agrandi */}
      <header className="app-header">
        <div className="header-top">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center py-2">
              <div className="header-contact">
                <small className="text-white-50">
                  📧 contact@heracles.com | 📞 +33 1 23 45 67 89
                </small>
              </div>
              <div className="header-actions">
                <a href="/contact" className="btn btn-sm btn-outline-light me-2">
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <img
                ref={imgRef}
                src="/logo.JPG"
                alt="logo"
                className="brand-logo me-2"
                onError={handleImgError}
              />
              <span className="brand-text">Heracles</span>
            </NavLink>

            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <Nav className="navbar-nav ms-auto">
                <NavLink to="/" className="nav-link">
                  🏠 Accueil
                </NavLink>
                <NavLink to="/products" className="nav-link">
                  📦 Produits
                </NavLink>
                <NavLink to="/dashboard" className="nav-link">
                  📊 Dashboard
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  ℹ️ À propos
                </NavLink>
                <NavLink to="/contact" className="nav-link">
                  ✉️ Contact
                </NavLink>
                <NavDropdown title="⚙️ Admin" id="nav-dropdown" className="nav-item">
                  <NavDropdown.Item as={NavLink} to="/admin/products">
                    Gestion Produits
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/contacts">
                    Gestion Contacts
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="content">{children}</main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container-fluid py-5">
          <div className="row">
            {/* Colonne 1: À propos */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Heracles</h5>
              <p className="footer-text">
                La solution complète pour gérer vos produits et contacts en toute simplicité.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Colonne 2: Liens rapides */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Liens rapides</h5>
              <ul className="footer-links">
                <li><NavLink to="/">Accueil</NavLink></li>
                <li><NavLink to="/products">Produits</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/about">À propos</NavLink></li>
              </ul>
            </div>

            {/* Colonne 3: Support */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-links">
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Centre d'aide</a></li>
              </ul>
            </div>

            {/* Colonne 4: Newsletter */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Newsletter</h5>
              <p className="footer-text">
                Restez informé des dernières nouveautés
              </p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  className="form-control mb-2" 
                  placeholder="Votre email"
                />
                <button type="submit" className="btn btn-primary w-100">
                  S'abonner
                </button>
              </form>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* Copyright */}
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="footer-copyright mb-0">
                © {new Date().getFullYear()} Heracles. Tous droits réservés.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="footer-legal-link">Politique de confidentialité</a>
              <span className="mx-2">|</span>
              <a href="#" className="footer-legal-link">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
