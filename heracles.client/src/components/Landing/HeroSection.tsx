import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Bienvenue sur Heracles",
  subtitle = "La solution complète pour gérer vos produits et contacts en toute simplicité",
  ctaText = "Commencer maintenant",
  ctaLink = "/products",
  backgroundImage
}) => {
  return (
    <section 
      className="hero-section py-5" 
      style={{
        background: backgroundImage 
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage}) center/cover`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-4">{title}</h1>
            <p className="lead fs-4 mb-4">{subtitle}</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to={ctaLink} className="btn btn-light btn-lg px-4 gap-3">
                {ctaText}
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
