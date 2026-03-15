import React from 'react';
import { useVibrantClassic } from './VibrantClassicContext';
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

const VibrantClassicRenderer = () => {
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

export default VibrantClassicRenderer;
