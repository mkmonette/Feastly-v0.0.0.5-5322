import React from 'react';
import { mobileVisualMenuTokens as tokens } from '../mobileVisualMenuTokens';
import Header from './Header';
import Hero from './Hero';
import CategoryTabs from './CategoryTabs';
import ProductGrid from './ProductGrid';
import CartDrawer from './CartDrawer';
import FloatingCartButton from './FloatingCartButton';

export default function MobileVisualMenuRenderer() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: tokens.colors.background,
        fontFamily: tokens.typography.fontFamily.body,
      }}
    >
      <Header />
      <Hero />
      <CategoryTabs />
      <ProductGrid />
      <FloatingCartButton />
      <CartDrawer />
    </div>
  );
}
