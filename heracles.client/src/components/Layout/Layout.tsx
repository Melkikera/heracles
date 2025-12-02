import React from 'react';
import './layout.css';

interface Props {
  children: React.ReactNode;
  onNavigate: (route: 'home' | 'about') => void;
  currentRoute: 'home' | 'about';
}

const defaultLogoDataUrl = `data:image/svg+xml;utf8,` + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'>` +
    `<rect width='120' height='40' rx='6' fill='#fff'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='#222'>Heracles</text>` +
  `</svg>`
);

const Layout: React.FC<Props> = ({ children, onNavigate, currentRoute }) => {
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
          <li className={currentRoute === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>Home</li>
          <li className={currentRoute === 'about' ? 'active' : ''} onClick={() => onNavigate('about')}>About</li>
        </ul>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
