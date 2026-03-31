import React from 'react';
import { ModernMenuCartProvider, useModernMenuCart } from './ModernMenuCartContext';
import HeaderHero from './HeaderHero';
import CartPanel from './CartPanel';
import About from './About';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';

function ModernMenuCartContent() {
  const { tokens, sectionsConfig } = useModernMenuCart();

  const isVisible = (sectionId) => {
    const section = sectionsConfig.find(s => s.id === sectionId);
    return section?.visibility?.enabled;
  };

  return (
    <div style={{
      fontFamily: tokens.typography.fontFamily.primary,
      backgroundColor: tokens.colors.background,
      minHeight: '100vh',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <div style={{
        display: 'flex',
        minHeight: '100vh'
      }}>
        <div style={{
          flex: 1,
          paddingRight: '400px'
        }}>
          {isVisible('headerHero') && <HeaderHero />}
          {isVisible('about') && <About />}
          {isVisible('banner') && <Banner />}
          {isVisible('featured') && <FeaturedProducts />}
          {isVisible('products') && <ProductGrid />}
          {isVisible('gallery') && <Gallery />}
          {isVisible('testimonials') && <Testimonials />}
          {isVisible('cta') && <CTABanner />}
          {isVisible('contact') && <Contact />}
          {isVisible('footer') && <Footer />}
        </div>

        <div style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: tokens.layout.cartWidth,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: tokens.colors.surface,
          borderLeft: `1px solid ${tokens.colors.border}`,
          padding: '2rem 1.5rem',
          zIndex: 100
        }}>
          <CartPanel />
        </div>
      </div>
    </div>
  );
}

export default function ModernMenuCartRenderer() {
  return (
    <ModernMenuCartProvider>
      <ModernMenuCartContent />
    </ModernMenuCartProvider>
  );
}
