import React from 'react';
import { useQuickOrder } from './QuickOrderContext';

const CategoryTabs = () => {
  const { tokens, products, selectedCategory, setSelectedCategory } = useQuickOrder();

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="sticky top-[73px] z-40 bg-white border-b" style={{ borderColor: tokens.colors.border }}>
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 justify-center">
          {categories.map(category => {
            const categoryId = category.toLowerCase();
            const isActive = selectedCategory === categoryId;

            return (
              <button
                key={categoryId}
                onClick={() => setSelectedCategory(categoryId)}
                className={`px-4 py-2 ${tokens.layout.borderRadius.button} text-sm font-semibold whitespace-nowrap transition-all`}
                style={{
                  backgroundColor: isActive ? tokens.colors.primary : 'transparent',
                  color: isActive ? tokens.colors.buttonText : tokens.colors.primaryText,
                  border: isActive ? 'none' : `1px solid ${tokens.colors.border}`
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
