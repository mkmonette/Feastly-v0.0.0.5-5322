import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products, categories } = useProducts();
  const { sectionsConfig } = useStorefront();
  const [activeCategory, setActiveCategory] = useState('All');

  const section = sectionsConfig.find(s => s.id === 'products');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const secondaryBgStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  // Filter products based on active category
  const filteredProducts = products.filter(product => {
    if (activeCategory === 'All') return true;
    return product.category === activeCategory;
  }).filter(p => p.status === 'Active');

  const tabs = ['All', ...categories.map(c => c.name)];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding} bg-${colors.background} ${typography.fontSecondary}`}>
      <div className={`${layout.container} ${layout.containerWidth} mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6`}>
        <div className="text-left">
          <span 
            className={`text-${colors.primary} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4} mb-4 block ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            {content.subtitle}
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.tighter} ${typography.lineHeights.none} ${typography.fontPrimary}`}>
            {content.titlePre} <span style={primaryStyle}>{content.titleHighlight}</span>
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap ${typography.scale.xs_alt} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} transition-all ${typography.fontPrimary} ${isActive ? `bg-${colors.secondary} text-${colors.textInverse} shadow-lg` : `bg-${colors.surface} text-${colors.textMuted} hover:bg-gray-200`}`}
                style={isActive ? secondaryBgStyle : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className={`${layout.container} ${layout.containerWidth} grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="group text-left">
            <div className={`aspect-square ${layout.borderRadiusSmall} overflow-hidden mb-6 relative bg-gray-100`}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <SafeIcon icon={FiIcons.FiImage} className="text-4xl" />
                </div>
              )}
              <button 
                className={`absolute bottom-4 right-4 w-12 h-12 bg-white ${layout.borderRadiusIcon} flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-50`}
              >
                <SafeIcon icon={FiIcons.FiPlus} className="text-xl text-black" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className={`${typography.weights.bold} text-${colors.textPrimary} ${typography.tracking.tight} ${typography.fontPrimary} line-clamp-1`}>{product.name}</h3>
                <span 
                  className={`${typography.weights.black} text-${colors.primary} ${typography.fontPrimary} shrink-0 ml-4`}
                  style={primaryStyle}
                >
                  {formatCurrency(product.salePrice || product.price)}
                </span>
              </div>
              <p className={`text-xs text-${colors.textMuted} line-clamp-2 ${typography.fontSecondary}`}>
                {product.description || 'No description available.'}
              </p>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className={`text-${colors.textMuted} font-bold uppercase tracking-widest`}>No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;