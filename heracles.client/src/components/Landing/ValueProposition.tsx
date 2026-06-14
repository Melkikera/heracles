import React from 'react';

interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

interface ValuePropositionProps {
  mainTitle?: string;
  mainDescription?: string;
  values?: ValueCard[];
}

const defaultValues: ValueCard[] = [
  {
    icon: "⚡",
    title: "Rapide et Efficace",
    description: "Gagnez du temps avec une interface intuitive et des processus optimisés"
  },
  {
    icon: "🔒",
    title: "Sécurisé",
    description: "Vos données sont protégées avec les meilleurs standards de sécurité"
  },
  {
    icon: "🎯",
    title: "Précis",
    description: "Des outils puissants pour une gestion précise de vos opérations"
  },
  {
    icon: "📊",
    title: "Analytique",
    description: "Suivez vos performances avec des tableaux de bord détaillés"
  }
];

const ValueProposition: React.FC<ValuePropositionProps> = ({
  mainTitle = "Pourquoi choisir Heracles ?",
  mainDescription = "Découvrez les avantages qui font d'Heracles la solution idéale pour votre entreprise",
  values = defaultValues
}) => {
  return (
    <section className="value-proposition py-5 bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">{mainTitle}</h2>
            <p className="lead text-muted">{mainDescription}</p>
          </div>
        </div>
        <div className="row g-4">
          {values.map((value, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">{value.icon}</div>
                  <h5 className="card-title fw-bold mb-3">{value.title}</h5>
                  <p className="card-text text-muted">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
