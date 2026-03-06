import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';
import FeaturedProducts from './FeaturedProducts';
import About from './About';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

const MinimalRecipeRenderer = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
    }}>
      <Header />
      <Hero />
      <ProductGrid />
      <FeaturedProducts />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <CartPanel />
    </div>
  );
};

export default MinimalRecipeRenderer;
