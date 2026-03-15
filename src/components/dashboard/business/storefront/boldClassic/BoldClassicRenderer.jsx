import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Banner from '../sections/Banner';
import FeaturedProducts from '../sections/FeaturedProducts';
import ProductGrid from '../sections/ProductGrid';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';
import CTABanner from '../sections/CTABanner';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import { useBoldClassic } from './BoldClassicContext';

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

const SectionWrapper = ({ sectionId, children, useContext }) => {
  const { sectionsConfig } = useContext();
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

const BoldClassicRenderer = () => {
  return (
    <div className="w-full bg-white">
      <SectionWrapper sectionId="header" useContext={useBoldClassic}>
        <Header useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="hero" useContext={useBoldClassic}>
        <Hero useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="about" useContext={useBoldClassic}>
        <About useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="banner" useContext={useBoldClassic}>
        <Banner useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="featured" useContext={useBoldClassic}>
        <FeaturedProducts useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="products" useContext={useBoldClassic}>
        <ProductGrid useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="gallery" useContext={useBoldClassic}>
        <Gallery useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="testimonials" useContext={useBoldClassic}>
        <Testimonials useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="cta" useContext={useBoldClassic}>
        <CTABanner useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="contact" useContext={useBoldClassic}>
        <Contact useContext={useBoldClassic} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="footer" useContext={useBoldClassic}>
        <Footer useContext={useBoldClassic} />
      </SectionWrapper>
    </div>
  );
};

export default BoldClassicRenderer;
