import { useState } from 'react';
import { useModernDashboard } from './ModernDashboardContext';

export const CategoryTabs = ({ categories, onCategoryChange }) => {
  const { tokens } = useModernDashboard();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const allCategories = [
    { id: 'all', name: 'All Items' },
    ...(categories || []),
  ];

  return (
    <div
      style={{
        padding: tokens.categoryTabs.padding,
        background: tokens.colors.primaryBg,
        borderBottom: `1px solid ${tokens.colors.borderColor}`,
        overflowX: 'auto',
        position: 'sticky',
        top: tokens.header.height,
        zIndex: 90,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: tokens.categoryTabs.gap,
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        {allCategories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              style={{
                padding: tokens.categoryTabs.itemPadding,
                borderRadius: tokens.categoryTabs.borderRadius,
                border: 'none',
                background: isActive ? tokens.colors.accentColor : tokens.colors.secondaryBg,
                color: isActive ? '#FFFFFF' : tokens.colors.secondaryTextColor,
                fontSize: tokens.typography.body.fontSize,
                fontWeight: isActive ? '600' : '500',
                fontFamily: tokens.typography.fontFamily,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: tokens.transitions.fast,
                boxShadow: isActive ? tokens.shadows.button : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = tokens.colors.borderColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = tokens.colors.secondaryBg;
                }
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
