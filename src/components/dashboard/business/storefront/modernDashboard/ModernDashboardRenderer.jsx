import React from 'react';
import { useModernDashboard } from './ModernDashboardContext';
import Header from './Header';
import Hero from './Hero';
import CategoryPills from './CategoryPills';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import PopularDishes from './PopularDishes';
import PromoBanner from './PromoBanner';
import NewItems from './NewItems';
import Testimonials from './Testimonials';
import About from './About';
import Footer from './Footer';
import CartPanel from './CartPanel';

const ModernDashboardRenderer = () => {
  const { settings } = useModernDashboard();
  const { tokens } = settings;

  return (
    <div
      style={{
        backgroundColor: tokens.backgroundColor,
        minHeight: '100vh',
        display: 'flex'
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main>
          <Hero />
          <CategoryPills />
          <FeaturedProducts />
          <ProductGrid />
          <PopularDishes />
          <PromoBanner />
          <NewItems />
          <Testimonials />
          <About />
        </main>
        <Footer />
      </div>

      <div
        style={{
          width: '420px',
          flexShrink: 0
        }}
      >
        <CartPanel />
      </div>
    </div>
  );
};

export default ModernDashboardRenderer;
