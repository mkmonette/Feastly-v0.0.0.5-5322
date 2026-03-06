import React from 'react';
import { WarmCulinaryProvider, useWarmCulinary } from './WarmCulinaryContext';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';

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

const WarmCulinaryContent = () => {
  const { sectionsConfig } = useWarmCulinary();
  const enabledSections = sectionsConfig.filter(section => section.enabled);

  return (
    <div className="w-full bg-white">
      {enabledSections.map((section) => {
        const Component = sectionComponents[section.id];
        if (!Component) return null;

        return <Component key={section.id} />;
      })}
    </div>
  );
};

const WarmCulinaryRenderer = () => {
  return (
    <WarmCulinaryProvider>
      <WarmCulinaryContent />
    </WarmCulinaryProvider>
  );
};

export default WarmCulinaryRenderer;
