import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';
import Header from './Header';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';
import Footer from './Footer';

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
          <Header />
          <div style={{ flex: 1 }}>
            <Hero />
            <ProductGrid />
            <Footer />
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
