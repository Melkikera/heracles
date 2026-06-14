import React from 'react';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title = "Prêt à commencer ?",
  description = "Rejoignez des milliers d'entreprises qui font déjà confiance à Heracles pour gérer leur activité",
  primaryButtonText = "Démarrer gratuitement",
  primaryButtonLink = "/products",
  secondaryButtonText = "Planifier une démo",
  secondaryButtonLink = "/contact",
  backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
}) => {
  return (
    <section 
      className="cta py-5"
      style={{
        background: backgroundColor,
        color: 'white'
      }}
    >
      <div className="container">
        <div className="row justify-content-center text-center py-5">
          <div className="col-lg-8">
            <h2 className="display-4 fw-bold mb-4">{title}</h2>
            <p className="lead mb-5">{description}</p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Link 
                to={primaryButtonLink} 
                className="btn btn-light btn-lg px-5 py-3"
              >
                {primaryButtonText}
              </Link>
              {secondaryButtonText && (
                <Link 
                  to={secondaryButtonLink} 
                  className="btn btn-outline-light btn-lg px-5 py-3"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
            <p className="mt-4 mb-0">
              <small>✓ Aucune carte bancaire requise • ✓ Installation en 2 minutes • ✓ Support gratuit</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
