import React, { useState } from 'react';

interface DemoItem {
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
}

interface VisualDemoProps {
  title?: string;
  subtitle?: string;
  demos?: DemoItem[];
}

const defaultDemos: DemoItem[] = [
  {
    title: "Dashboard Intuitif",
    description: "Visualisez toutes vos données importantes en un coup d'œil avec notre tableau de bord personnalisable",
    image: "https://via.placeholder.com/800x500/667eea/ffffff?text=Dashboard+Preview"
  },
  {
    title: "Gestion Simple",
    description: "Ajoutez, modifiez et supprimez vos produits en quelques clics grâce à notre interface épurée",
    image: "https://via.placeholder.com/800x500/764ba2/ffffff?text=Product+Management"
  },
  {
    title: "Rapports Avancés",
    description: "Générez des rapports détaillés pour suivre vos performances et prendre les bonnes décisions",
    image: "https://via.placeholder.com/800x500/667eea/ffffff?text=Advanced+Reports"
  }
];

const VisualDemo: React.FC<VisualDemoProps> = ({
  title = "Découvrez Heracles en Action",
  subtitle = "Explorez nos fonctionnalités à travers des démonstrations visuelles",
  demos = defaultDemos
}) => {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <section className="visual-demo py-5 bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">{title}</h2>
            <p className="lead text-muted">{subtitle}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Image/Video principale */}
            <div className="demo-preview mb-4 rounded shadow-lg overflow-hidden">
              {demos[activeDemo].videoUrl ? (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={demos[activeDemo].videoUrl}
                    title={demos[activeDemo].title}
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={demos[activeDemo].image}
                  alt={demos[activeDemo].title}
                  className="img-fluid w-100"
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Informations de la démo active */}
            <div className="text-center mb-4">
              <h3 className="fw-bold">{demos[activeDemo].title}</h3>
              <p className="text-muted">{demos[activeDemo].description}</p>
            </div>

            {/* Navigation entre les démos */}
            <div className="d-flex justify-content-center gap-2">
              {demos.map((_, index) => (
                <button
                  key={index}
                  className={`btn ${activeDemo === index ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveDemo(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualDemo;
