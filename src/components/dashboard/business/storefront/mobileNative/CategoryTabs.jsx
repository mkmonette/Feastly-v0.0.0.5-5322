import React from 'react';
import { useMobileNative } from './MobileNativeContext';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  const { tokens } = useMobileNative();

  return (
    <div className="sticky top-11 z-40 backdrop-blur-xl bg-white/80 border-b" style={{ borderColor: tokens.colors.border }}>
      <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 py-2`}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1 text-[13px] font-medium whitespace-nowrap transition-all ${tokens.layout.borderRadius.button}`}
              style={{
                backgroundColor: activeCategory === category ? tokens.colors.primary : 'transparent',
                color: activeCategory === category ? tokens.colors.cartButtonText : tokens.colors.sectionNormalText
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
