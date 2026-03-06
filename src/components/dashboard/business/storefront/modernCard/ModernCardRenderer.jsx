import React from 'react';
import { useModernCard } from './ModernCardContext';
import Header from './Header';
import HeroCard from './HeroCard';
import ProductCards from './ProductCards';
import AboutCard from './AboutCard';
import ContactCard from './ContactCard';
import Footer from './Footer';

const SECTION_COMPONENTS = {
  header: Header,
  hero: HeroCard,
  products: ProductCards,
  about: AboutCard,
  contact: ContactCard,
  footer: Footer
};

const ModernCardRenderer = () => {
  const { tokens, sectionsConfig } = useModernCard();

  const isSectionVisible = (section) => {
    if (!section.visibility.enabled) return false;
    return true;
  };

  return (
    <div
      className={`min-h-screen ${tokens.typography.fontFamily}`}
      style={{ backgroundColor: tokens.colors.background }}
    >
      {sectionsConfig.map((section) => {
        const SectionComponent = SECTION_COMPONENTS[section.id];
        if (!SectionComponent || !isSectionVisible(section)) return null;
        return <SectionComponent key={section.id} />;
      })}
    </div>
  );
};

export default ModernCardRenderer;
