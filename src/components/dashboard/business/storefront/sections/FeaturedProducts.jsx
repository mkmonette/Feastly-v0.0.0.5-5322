import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products } = useProducts();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'featured');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const highlightColor = colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal;
  const sectionHeadlineHighlightStyle = { color: highlightColor };

  // Get featured products
  const featuredProducts = products
    .filter(p => p.flags?.featured && p.status === 'Active')
    .slice(0, 3);

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.surface} ${layout.horizontalPadding} ${typography.fontSecondary}`}>
      <div className={`${layout.container} ${layout.containerWidth} text-center mb-16`}>
        <span 
          className={`text-${colors.primary} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4} mb-4 block ${typography.fontPrimary}`}
          style={primaryStyle}
        >
          {content.subtitle}
        </span>
        <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.tighter} ${typography.fontPrimary}`}>
          {content.titleHighlight ? (
            <>
              <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span> <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
            </>
          ) : (
            <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>
          )}
        </h2>
      </div>
      
      <div className={`${layout.container} ${layout.containerWidth} grid md:grid-cols-3 ${layout.gridGapMedium}`}>
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <div key={product.id} className={`group bg-${colors.background} ${layout.borderRadiusSmall} overflow-hidden ${layout.shadow} hover:${layout.shadowLarge} transition-all duration-500 border border-${colors.border} flex flex-col`}>
              <div className="relative h-80 overflow-hidden bg-gray-100">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <SafeIcon icon={FiIcons.FiImage} className="text-4xl" />
                  </div>
                )}
                <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full`}>
                  <span 
                    className={`${typography.scale.xs} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} text-${colors.primary} ${typography.fontPrimary}`}
                    style={primaryStyle}
                  >{product.category}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col text-left">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`${typography.scale.h3} ${typography.weights.bold} text-${colors.textPrimary} ${typography.tracking.tight} ${typography.fontPrimary} line-clamp-1`}>{product.name}</h3>
                  <span 
                    className={`${typography.scale.h3} ${typography.weights.black} text-${colors.primary} ${typography.fontPrimary} shrink-0 ml-4`}
                    style={primaryStyle}
                  >{formatCurrency(product.salePrice || product.price)}</span>
                </div>
                <p className={`text-sm text-${colors.textMuted} mb-6 line-clamp-2 ${typography.fontSecondary}`}>
                  {product.description || 'Experience the finest ingredients crafted by our expert chefs.'}
                </p>
                <div className="mt-auto">
                  <button 
                    className={`w-full py-4 border-2 border-${colors.border} ${layout.borderRadiusBase} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.xs_alt} group-hover:bg-${colors.secondary} group-hover:text-${colors.textInverse} group-hover:border-${colors.secondary} transition-all ${typography.fontPrimary}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className={`text-${colors.textMuted} font-bold uppercase tracking-widest`}>No featured products available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;