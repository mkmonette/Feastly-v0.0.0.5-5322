import React, { useState } from 'react';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const CategoryTabs = () => {
  const { tokens } = useMobileCompactMenu();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'combo', label: 'Combos' },
    { id: 'healthy', label: 'Healthy' },
    { id: 'dessert', label: 'Desserts' }
  ];

  return (
    <section
      className="sticky top-[61px] z-40 py-3 border-b"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.border
      }}
    >
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {categories.map(category => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex-shrink-0 px-4 py-2 rounded-lg font-bold text-[11px] transition-all"
                style={{
                  backgroundColor: isActive ? tokens.colors.primary : tokens.colors.cardBackground,
                  color: isActive ? tokens.colors.cartButtonText : tokens.colors.primaryText,
                  border: `1px solid ${isActive ? tokens.colors.primary : tokens.colors.border}`,
                  boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryTabs;
