import React from 'react';
import { modernSplitCartTokens as tokens } from '../modernSplitCartTokens';
import Header from './Header';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';

export default function ModernSplitCartRenderer() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: tokens.colors.background,
        fontFamily: tokens.typography.fontFamily.body,
      }}
    >
      <div
        style={{
          flex: 1,
          width: tokens.layout.contentWidth,
          overflowY: 'auto',
        }}
      >
        <Header />
        <Hero />
        <ProductGrid />
      </div>

      <CartPanel />
    </div>
  );
}
