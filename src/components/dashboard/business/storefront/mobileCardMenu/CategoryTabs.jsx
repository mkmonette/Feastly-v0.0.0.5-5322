import React, { useState } from 'react';
import { useMobileCardMenu } from './MobileCardMenuContext';

const CategoryTabs = () => {
  const { tokens } = useMobileCardMenu();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'burgers', label: 'Burgers', icon: '🍔' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'salads', label: 'Salads', icon: '🥗' },
    { id: 'drinks', label: 'Drinks', icon: '🥤' }
  ];

  return (
    <section
      className="sticky top-[73px] z-40 py-4 border-b"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.border
      }}
    >
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeCategory === category.id ? tokens.effects.shadow.button : ''
              }`}
              style={{
                backgroundColor: activeCategory === category.id ? tokens.colors.primary : tokens.colors.cardBackground,
                color: activeCategory === category.id ? tokens.colors.cartButtonText : tokens.colors.primaryText,
                border: `1px solid ${activeCategory === category.id ? tokens.colors.primary : tokens.colors.border}`
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTabs;
