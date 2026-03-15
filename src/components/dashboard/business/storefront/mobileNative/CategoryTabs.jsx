import React, { useState, useMemo } from 'react';
import { useMobileNative } from './MobileNativeContext';

const CategoryTabs = () => {
  const { tokens, products } = useMobileNative();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [products]);

  return (
    <div className="sticky top-11 z-40 backdrop-blur-xl bg-white/80 border-b" style={{ borderColor: tokens.colors.border }}>
      <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 py-2`}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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
