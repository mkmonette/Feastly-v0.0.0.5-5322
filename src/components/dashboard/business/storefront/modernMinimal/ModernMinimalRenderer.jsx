import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import CartPanel from './CartPanel';
import Footer from './Footer';

const SectionWrapper = ({ sectionId, children }) => {
  const { sectionsConfig } = useModernMinimal();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section || !section.visibility?.enabled) return null;

  return <>{children}</>;
};

const ModernMinimalRenderer = () => {
  const { tokens } = useModernMinimal();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: tokens.colors.background,
        fontFamily: tokens.typography.fontFamily.primary,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <div style={{ width: tokens.layout.contentWidth, display: 'flex', flexDirection: 'column' }}>
          <SectionWrapper sectionId="header">
            <Header />
          </SectionWrapper>
          <div style={{ flex: 1 }}>
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
        </div>
        <div style={{ width: tokens.layout.cartWidth }}>
          <CartPanel />
        </div>
      </div>
    </div>
  );
};

export default ModernMinimalRenderer;
