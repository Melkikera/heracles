import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Comment puis-je commencer à utiliser Heracles ?",
    answer: "C'est très simple ! Cliquez sur le bouton 'Commencer' et vous serez guidé à travers un processus d'inscription rapide. Une fois inscrit, vous aurez accès à toutes les fonctionnalités de base immédiatement."
  },
  {
    question: "Heracles est-il sécurisé ?",
    answer: "Absolument. Nous utilisons les dernières technologies de sécurité, incluant le chiffrement SSL, l'authentification par API Key, et des sauvegardes régulières. Vos données sont notre priorité."
  },
  {
    question: "Puis-je importer mes données existantes ?",
    answer: "Oui, Heracles supporte l'importation de données depuis divers formats (CSV, Excel, etc.). Notre équipe peut également vous aider à migrer vos données existantes."
  },
  {
    question: "Quels sont les tarifs ?",
    answer: "Nous proposons plusieurs formules adaptées à tous les besoins. Contactez-nous pour obtenir un devis personnalisé en fonction de votre utilisation."
  },
  {
    question: "Y a-t-il un support client ?",
    answer: "Oui ! Notre équipe de support est disponible par email, chat et téléphone. Nous offrons également une documentation complète et des tutoriels vidéo."
  },
  {
    question: "Puis-je essayer avant d'acheter ?",
    answer: "Bien sûr ! Nous offrons une période d'essai gratuite de 14 jours sans engagement ni carte bancaire requise."
  }
];

const FAQ: React.FC<FAQProps> = ({
  title = "Questions Fréquentes",
  subtitle = "Trouvez rapidement les réponses à vos questions",
  faqs = defaultFAQs
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq py-5 bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">{title}</h2>
            <p className="lead text-muted">{subtitle}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item border-0 shadow-sm mb-3">
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${activeIndex !== index ? 'collapsed' : ''}`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      style={{
                        backgroundColor: activeIndex === index ? '#f8f9fa' : 'white',
                        fontWeight: '600'
                      }}
                    >
                      {faq.question}
                    </button>
                  </h3>
                  <div
                    className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                  >
                    <div className="accordion-body text-muted">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-8 mx-auto text-center">
            <p className="lead">Vous avez d'autres questions ?</p>
            <a href="/contact" className="btn btn-primary btn-lg">
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
