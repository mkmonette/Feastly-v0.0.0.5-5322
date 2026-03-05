import React from 'react';
import { ModernSplitProvider } from './ModernSplitContext';
import { useStorefront } from './contextBridge';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';
import CartPanel from './CartPanel';

const sectionComponents = {
  header: Header,
  hero: Hero,
  featured: FeaturedProducts,
  products: ProductGrid,
  gallery: Gallery,
  testimonials: Testimonials,
  cta: CTABanner,
  contact: Contact,
  footer: Footer,
};

const ModernSplitContent = () => {
  const { sectionsConfig } = useStorefront();
  const enabledSections = sectionsConfig.filter(section => section.enabled);

  return (
    <ModernSplitProvider>
      <div className="flex min-h-screen">
        <div className="flex-1 lg:w-[70%] overflow-x-hidden">
          {enabledSections.map((section) => {
            const Component = sectionComponents[section.id];
            if (!Component) return null;

            return <Component key={section.id} />;
          })}
        </div>

        <div className="hidden lg:block lg:w-[30%] lg:flex-shrink-0">
          <CartPanel />
        </div>

        <div className="lg:hidden">
          <CartPanel />
        </div>
      </div>
    </ModernSplitProvider>
  );
};

const ModernSplitRenderer = () => {
  return <ModernSplitContent />;
};

export default ModernSplitRenderer;
