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
import { useFreshCart } from './FreshCartContext';

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

const FreshCartRenderer = () => {
  return (
    <div className="w-full bg-white">
      <SectionWrapper sectionId="header" useContext={useFreshCart}>
        <Header useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="hero" useContext={useFreshCart}>
        <Hero useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="about" useContext={useFreshCart}>
        <About useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="banner" useContext={useFreshCart}>
        <Banner useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="featured" useContext={useFreshCart}>
        <FeaturedProducts useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="products" useContext={useFreshCart}>
        <ProductGrid useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="gallery" useContext={useFreshCart}>
        <Gallery useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="testimonials" useContext={useFreshCart}>
        <Testimonials useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="cta" useContext={useFreshCart}>
        <CTABanner useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="contact" useContext={useFreshCart}>
        <Contact useContext={useFreshCart} />
      </SectionWrapper>
      
      <SectionWrapper sectionId="footer" useContext={useFreshCart}>
        <Footer useContext={useFreshCart} />
      </SectionWrapper>
    </div>
  );
};

export default FreshCartRenderer;
