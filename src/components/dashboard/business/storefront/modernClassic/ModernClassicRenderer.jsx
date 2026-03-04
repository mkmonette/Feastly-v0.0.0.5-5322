import React from 'react';
import HeaderHero from './HeaderHero';
import About from './About';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';
import { useStorefront } from './contextBridge';

function compare(a, operator, b) {
  switch (operator) {
    case ">": return a > b;
    case "<": return a < b;
    case "=":
    case "equals": return a === b;
    case "!=":
    case "not_equals": return a !== b;
    case ">=": return a >= b;
    case "<=": return a <= b;
    default: return false;
  }
}

function evaluateConditions(conditions, context) {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(condition => {
    switch (condition.type) {
      case "auth":
        return compare(context.userStatus, condition.operator || 'equals', condition.value);
      case "cart_item_count":
        return compare(context.cartItemCount, condition.operator, condition.value);
      default:
        return true;
    }
  });
}

const SectionWrapper = ({ sectionId, children }) => {
  const { sectionsConfig } = useStorefront();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section || !section.visibility?.enabled) return null;

  const context = {
    userStatus: 'guest',
    cartItemCount: 0
  };

  if (!evaluateConditions(section.visibility.conditions, context)) {
    return null;
  }

  const devices = section.visibility.devices || ['desktop', 'mobile'];
  const hideOnMobile = !devices.includes('mobile');
  const hideOnDesktop = !devices.includes('desktop');

  const visibilityClasses = [
    hideOnMobile ? 'hidden md:block' : '',
    hideOnDesktop ? 'md:hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={visibilityClasses}>
      {children}
    </div>
  );
};

const ModernClassicRenderer = () => {
  return (
    <div className="w-full bg-white">
      <SectionWrapper sectionId="hero">
        <HeaderHero />
      </SectionWrapper>

      <SectionWrapper sectionId="about">
        <About />
      </SectionWrapper>

      <SectionWrapper sectionId="banner">
        <Banner />
      </SectionWrapper>

      <SectionWrapper sectionId="featured">
        <FeaturedProducts />
      </SectionWrapper>

      <SectionWrapper sectionId="products">
        <ProductGrid />
      </SectionWrapper>

      <SectionWrapper sectionId="gallery">
        <Gallery />
      </SectionWrapper>

      <SectionWrapper sectionId="testimonials">
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper sectionId="cta">
        <CTABanner />
      </SectionWrapper>

      <SectionWrapper sectionId="contact">
        <Contact />
      </SectionWrapper>

      <SectionWrapper sectionId="footer">
        <Footer />
      </SectionWrapper>
    </div>
  );
};

export default ModernClassicRenderer;
