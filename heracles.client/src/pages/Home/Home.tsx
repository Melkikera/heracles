import React from 'react';
import HeroSection from '../../components/Landing/HeroSection';
import ValueProposition from '../../components/Landing/ValueProposition';
import FeaturesList from '../../components/Landing/FeaturesList';
import VisualDemo from '../../components/Landing/VisualDemo';
import Testimonials from '../../components/Landing/Testimonials';
import FAQ from '../../components/Landing/FAQ';
import CallToAction from '../../components/Landing/CallToAction';
import { featuresData } from '../../data/featuresData';
import { testimonialsData } from '../../data/testimonialsData';
import { faqData } from '../../data/faqData';
import '../../styles/landing.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section - Première impression */}
      <HeroSection
        title="Gérez votre activité avec Heracles"
        subtitle="La plateforme tout-en-un pour gérer vos produits, contacts et bien plus encore"
        ctaText="Découvrir nos fonctionnalités"
        ctaLink="/products"
      />

      {/* Proposition de valeur */}
      <ValueProposition />

      {/* Liste des fonctionnalités */}
      <FeaturesList 
        features={featuresData.slice(0, 6)} // Affiche les 6 premières fonctionnalités
      />

      {/* Démonstrations visuelles */}
      <VisualDemo />

      {/* Témoignages clients */}
      <Testimonials 
        testimonials={testimonialsData.slice(0, 3)} // Affiche les 3 premiers témoignages
      />

      {/* FAQ */}
      <FAQ 
        faqs={faqData.slice(0, 6)} // Affiche les 6 premières questions
      />

      {/* Call to Action final */}
      <CallToAction />
    </div>
  );
};

export default Home;
