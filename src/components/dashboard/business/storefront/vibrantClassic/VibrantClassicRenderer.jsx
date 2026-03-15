import React from 'react';
import { VibrantClassicProvider, useVibrantClassic } from './VibrantClassicContext';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import About from './About';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import CartPanel from './CartPanel';

const VibrantClassicContent = () => {
  const { tokens } = useVibrantClassic();

  return (
    <div className="min-h-screen" style={{ backgroundColor: tokens.colors.background }}>
      <Header />
      <Hero />
      <FeaturedProducts />
      <ProductGrid />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <CartPanel />
    </div>
  );
};

const VibrantClassicRenderer = () => {
  return (
    <VibrantClassicProvider>
      <VibrantClassicContent />
    </VibrantClassicProvider>
  );
};

export default VibrantClassicRenderer;
