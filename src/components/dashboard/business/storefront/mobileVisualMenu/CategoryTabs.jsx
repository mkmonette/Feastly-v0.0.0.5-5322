import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { mobileVisualMenuTokens as tokens } from '../mobileVisualMenuTokens';
import { useMobileVisualMenu } from './MobileVisualMenuContext';

export default function CategoryTabs() {
  const { categories } = useProducts();
  const { activeCategory, setActiveCategory } = useMobileVisualMenu();

  const allCategories = [
    { id: 'all', name: 'All' },
    ...(categories || [])
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: '73px',
        zIndex: 20,
        backgroundColor: tokens.colors.surface,
        borderBottom: `1px solid ${tokens.colors.border}`,
        padding: '0.875rem 0',
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          gap: '0.625rem',
        }}
      >
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={{
              padding: '0.625rem 1.125rem',
              backgroundColor: activeCategory === category.id ? tokens.colors.accent : 'transparent',
              color: activeCategory === category.id ? tokens.colors.buttonText : tokens.colors.secondaryText,
              border: `1px solid ${activeCategory === category.id ? tokens.colors.accent : tokens.colors.border}`,
              borderRadius: tokens.borderRadius.button,
              fontSize: tokens.typography.fontSize.smallText,
              fontWeight: tokens.typography.fontWeight.subheading,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              fontFamily: tokens.typography.fontFamily.body,
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
