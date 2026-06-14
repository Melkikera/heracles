import React from 'react';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Sophie Martin",
    role: "Directrice Marketing",
    company: "TechCorp",
    content: "Heracles a transformé notre façon de gérer nos produits. L'interface est intuitive et les fonctionnalités sont exactement ce dont nous avions besoin.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sophie+Martin&background=667eea&color=fff"
  },
  {
    name: "Pierre Dubois",
    role: "CEO",
    company: "StartupXYZ",
    content: "Un outil indispensable pour notre équipe. Le gain de temps est considérable et la courbe d'apprentissage très rapide.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Pierre+Dubois&background=764ba2&color=fff"
  },
  {
    name: "Marie Lefebvre",
    role: "Chef de Projet",
    company: "Innovation Co",
    content: "Excellente solution ! Le support client est réactif et les mises à jour régulières apportent constamment de nouvelles améliorations.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Marie+Lefebvre&background=667eea&color=fff"
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({
  title = "Ce que disent nos clients",
  subtitle = "Découvrez pourquoi des milliers d'entreprises font confiance à Heracles",
  testimonials = defaultTestimonials
}) => {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-warning' : 'text-muted'}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">{title}</h2>
            <p className="lead text-muted">{subtitle}</p>
          </div>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="card-text mb-4 fst-italic">"{testimonial.content}"</p>
                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">
                        {testimonial.role} - {testimonial.company}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
