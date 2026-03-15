import React, { useState } from 'react';
import { useMobileVisualMenu } from './MobileVisualMenuContext';

const CategoryTabs = () => {
  const { tokens, products } = useMobileVisualMenu();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div
      className="sticky top-[65px] z-40 py-3 overflow-x-auto"
      style={{
        backgroundColor: tokens.colors.cardBackground,
        borderBottom: `1px solid ${tokens.colors.border}`,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <style>{`
        .category-tabs-visual::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex gap-2 px-4 justify-start category-tabs-visual">
        {categories.map(category => {
          const categoryId = category.toLowerCase();
          const isActive = activeCategory === categoryId;

          return (
            <button
              key={categoryId}
              onClick={() => setActiveCategory(categoryId)}
              className={`px-5 py-2 ${tokens.layout.borderRadius.button} font-semibold text-sm whitespace-nowrap transition-all`}
              style={{
                backgroundColor: isActive ? tokens.colors.primary : 'transparent',
                color: isActive ? tokens.colors.cartButtonText : tokens.colors.primaryText,
                border: `1px solid ${isActive ? tokens.colors.primary : tokens.colors.border}`
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
