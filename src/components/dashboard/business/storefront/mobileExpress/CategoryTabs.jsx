import React, { useState } from 'react';
import { useMobileExpress } from './MobileExpressContext';

const CategoryTabs = () => {
  const { tokens, products } = useMobileExpress();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="sticky top-[73px] z-40 bg-white shadow-sm py-3 overflow-x-auto">
      <div className="flex gap-2 px-4 justify-center">
        {categories.map(category => {
          const categoryId = category.toLowerCase();
          const isActive = activeCategory === categoryId;

          return (
            <button
              key={categoryId}
              onClick={() => setActiveCategory(categoryId)}
              className={`px-6 py-2.5 ${tokens.layout.borderRadius.button} font-bold text-sm whitespace-nowrap transition-all`}
              style={{
                backgroundColor: isActive ? tokens.colors.primary : tokens.colors.background,
                color: isActive ? tokens.colors.cartButtonText : tokens.colors.primaryText,
                border: isActive ? 'none' : `2px solid ${tokens.colors.border}`
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
