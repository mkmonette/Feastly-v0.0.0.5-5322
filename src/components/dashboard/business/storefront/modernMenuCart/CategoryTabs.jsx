import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { modernMenuCartTokens as tokens } from '../modernMenuCartTokens';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function CategoryTabs() {
  const { categories } = useProducts();
  const { activeCategory, setActiveCategory } = useModernMenuCart();

  const allCategories = [
    { id: 'all', name: 'All Items' },
    ...(categories || [])
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: '57px',
        zIndex: 20,
        backgroundColor: tokens.colors.surface,
        borderBottom: `1px solid ${tokens.colors.border}`,
        padding: '1rem 2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={{
              padding: '0.625rem 1.25rem',
              backgroundColor: activeCategory === category.id ? tokens.colors.accent : 'transparent',
              color: activeCategory === category.id ? tokens.colors.buttonText : tokens.colors.categoryTabInactive,
              border: `1px solid ${activeCategory === category.id ? tokens.colors.accent : tokens.colors.border}`,
              borderRadius: tokens.borderRadius.button,
              fontSize: tokens.typography.fontSize.categoryTab,
              fontWeight: tokens.typography.fontWeight.subheading,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              fontFamily: tokens.typography.fontFamily.body,
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== category.id) {
                e.target.style.borderColor = tokens.colors.categoryTabActive;
                e.target.style.color = tokens.colors.categoryTabActive;
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== category.id) {
                e.target.style.borderColor = tokens.colors.border;
                e.target.style.color = tokens.colors.categoryTabInactive;
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
