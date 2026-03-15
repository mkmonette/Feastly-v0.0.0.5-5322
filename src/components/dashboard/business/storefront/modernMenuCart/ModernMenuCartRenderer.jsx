import React from 'react';
import { modernMenuCartTokens as tokens } from '../modernMenuCartTokens';
import Header from './Header';
import CategoryTabs from './CategoryTabs';
import MenuGrid from './MenuGrid';
import CartPanel from './CartPanel';

export default function ModernMenuCartRenderer() {
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
        <CategoryTabs />
        <MenuGrid />
      </div>

      <CartPanel />
    </div>
  );
}
