import React from 'react';
import { ElegantClassicProvider } from './ElegantClassicContext';
import HeaderHero from './HeaderHero';
import About from './About';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';

const ElegantClassicRenderer = ({ tokens, businessData, sectionsConfig, updateSectionContent }) => {
  const sectionComponents = {
    hero: HeaderHero,
    about: About,
    featured: FeaturedProducts,
    products: ProductGrid,
    gallery: Gallery,
    testimonials: Testimonials,
    cta: CTABanner,
    contact: Contact,
    footer: Footer,
  };

  const visibleSections = sectionsConfig.filter(section => section.visible !== false);

  return (
    <ElegantClassicProvider
      tokens={tokens}
      businessData={businessData}
      sectionsConfig={sectionsConfig}
      updateSectionContent={updateSectionContent}
    >
      <div className="elegant-classic-template">
        {visibleSections.map((section) => {
          const SectionComponent = sectionComponents[section.id];
          return SectionComponent ? <SectionComponent key={section.id} /> : null;
        })}
      </div>
    </ElegantClassicProvider>
  );
};

export default ElegantClassicRenderer;
