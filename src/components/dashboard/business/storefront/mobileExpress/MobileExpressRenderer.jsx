import React from 'react';
import { useMobileExpress } from './MobileExpressContext';
import Header from './Header';
import Hero from './Hero';
import CategoryTabs from './CategoryTabs';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Banner from './Banner';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

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
  const { sectionsConfig, cartItemCount } = useMobileExpress();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section || !section.visibility?.enabled) return null;

  const context = {
    userStatus: 'guest',
    cartItemCount: cartItemCount || 0
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

const MobileExpressRenderer = () => {
  return (
    <div className="w-full bg-white relative flex justify-center">
      <div className="w-full max-w-[420px]">
        <SectionWrapper sectionId="header">
          <Header />
        </SectionWrapper>

        <SectionWrapper sectionId="hero">
          <Hero />
        </SectionWrapper>

        <SectionWrapper sectionId="categories">
          <CategoryTabs />
        </SectionWrapper>

        <SectionWrapper sectionId="featured">
          <FeaturedProducts />
        </SectionWrapper>

        <SectionWrapper sectionId="products">
          <ProductGrid />
        </SectionWrapper>

        <SectionWrapper sectionId="banner">
          <Banner />
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

        <CartDrawer />
      </div>
    </div>
  );
};

export default MobileExpressRenderer;
