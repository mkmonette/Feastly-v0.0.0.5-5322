import React from 'react';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import FeaturedProducts from './FeaturedProducts';
import About from './About';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

const ContentArea = () => {
  return (
    <div>
      <Hero />
      <ProductGrid />
      <FeaturedProducts />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContentArea;
