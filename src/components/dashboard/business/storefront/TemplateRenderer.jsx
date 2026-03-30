import React from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Banner from './sections/Banner';
import FeaturedProducts from './sections/FeaturedProducts';
import ProductGrid from './sections/ProductGrid';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import CTABanner from './sections/CTABanner';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { useStorefront } from './StorefrontContext';

/**
 * Helper to compare values based on operator
 */
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

/**
 * Evaluates a list of visibility conditions
 */
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

/**
 * SectionWrapper applies visibility logic using CSS classes and condition evaluation.
 */
const SectionWrapper = ({ sectionId, children }) => {
  const { sectionsConfig } = useStorefront();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section || !section.visibility?.enabled) return null;

  // Mock context for visibility rules (to be connected to real stores later)
  const context = {
    userStatus: 'guest', // Default to guest for now
    cartItemCount: 0     // Default to empty cart
  };

  // Evaluate rule-based conditions
  if (!evaluateConditions(section.visibility.conditions, context)) {
    return null;
  }

  // Handle device visibility using Tailwind classes
  // Note: We use devices array from V2 schema
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

/**
 * TemplateRenderer renders all sections of the storefront.
 * It consumes data from StorefrontContext and ProductContext.
 */
const TemplateRenderer = () => {
  console.log('[TemplateRenderer] Default template renderer is rendering');
  return (
    <div className="w-full bg-white">
      <SectionWrapper sectionId="header">
        <Header />
      </SectionWrapper>
      
      <SectionWrapper sectionId="hero">
        <Hero />
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

export default TemplateRenderer;