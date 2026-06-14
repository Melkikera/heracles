import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

interface FeaturesListProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: "📦",
    title: "Gestion des Produits",
    description: "Gérez facilement votre catalogue de produits avec des outils intuitifs",
    highlight: true
  },
  {
    icon: "👥",
    title: "Gestion des Contacts",
    description: "Centralisez tous vos contacts et leurs informations importantes"
  },
  {
    icon: "📱",
    title: "Interface Responsive",
    description: "Accédez à votre plateforme depuis n'importe quel appareil"
  },
  {
    icon: "🔔",
    title: "Notifications en Temps Réel",
    description: "Restez informé des événements importants instantanément"
  },
  {
    icon: "📈",
    title: "Rapports Détaillés",
    description: "Analysez vos données avec des rapports personnalisables"
  },
  {
    icon: "🔐",
    title: "Authentification Sécurisée",
    description: "Protection avancée avec authentification par API Key"
  }
];

const FeaturesList: React.FC<FeaturesListProps> = ({
  title = "Fonctionnalités Principales",
  subtitle = "Tout ce dont vous avez besoin pour gérer efficacement votre activité",
  features = defaultFeatures
}) => {
  return (
    <section className="features-list py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">{title}</h2>
            <p className="lead text-muted">{subtitle}</p>
          </div>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div 
                className={`card h-100 ${feature.highlight ? 'border-primary' : 'border-0'} shadow-sm`}
                style={feature.highlight ? { borderWidth: '2px' } : {}}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-2 me-3">{feature.icon}</span>
                    <h5 className="card-title mb-0 fw-bold">{feature.title}</h5>
                  </div>
                  <p className="card-text text-muted">{feature.description}</p>
                  {feature.highlight && (
                    <span className="badge bg-primary">Populaire</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
