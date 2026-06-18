import React from 'react';
import { ModernSplitProvider } from '../modernSplit/ModernSplitContext';
import { useStorefront } from '../modernSplit/contextBridge';

import Header from '../modernSplit/Header';
import Hero from '../modernSplit/Hero';
import About from '../modernSplit/About';
import FeaturedProducts from '../modernSplit/FeaturedProducts';
import ProductGrid from '../modernSplit/ProductGrid';
import Gallery from '../modernSplit/Gallery';
import Testimonials from '../modernSplit/Testimonials';
import CTABanner from '../modernSplit/CTABanner';
import Contact from '../modernSplit/Contact';
import Footer from '../modernSplit/Footer';
import CartPanel from '../modernSplit/CartPanel';

const sectionComponents = {
  header: Header,
  hero: Hero,
  about: About,
  featured: FeaturedProducts,
  products: ProductGrid,
  gallery: Gallery,
  testimonials: Testimonials,
  cta: CTABanner,
  contact: Contact,
  footer: Footer,
};

const ModernFluxContent = () => {
  const { sectionsConfig } = useStorefront();
  const enabledSections = sectionsConfig.filter((section) => section.enabled);

  return (
    <div className="flex min-h-screen" data-testid="modern-flux-frame">
      {/* LEFT — full-height cart panel (desktop only) */}
      <div className="hidden lg:block lg:w-[30%] lg:flex-shrink-0 lg:sticky lg:top-0 lg:h-screen">
        <CartPanel />
      </div>

      {/* RIGHT — main content area */}
      <div className="flex-1 lg:w-[70%] overflow-x-hidden">
        {enabledSections.map((section) => {
          const Component = sectionComponents[section.id];
          if (!Component) return null;
          return <Component key={section.id} />;
        })}
      </div>

      {/* Mobile cart (overlay drawer is handled inside CartPanel itself) */}
      <div className="lg:hidden">
        <CartPanel />
      </div>
    </div>
  );
};

const ModernFluxRenderer = () => {
  return (
    <ModernSplitProvider>
      <ModernFluxContent />
    </ModernSplitProvider>
  );
};

export default ModernFluxRenderer;
