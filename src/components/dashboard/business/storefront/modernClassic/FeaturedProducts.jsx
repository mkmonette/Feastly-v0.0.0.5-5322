import React, { useRef } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products } = useProducts();
  const { sectionsConfig } = useStorefront();
  const scrollRef = useRef(null);

  const section = sectionsConfig.find(s => s.id === 'featured');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const highlightColor = colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal;
  const sectionHeadlineHighlightStyle = { color: highlightColor };

  const featuredProducts = products
    .filter(p => p.flags?.featured && p.status === 'Active')
    .slice(0, 6);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.surface} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="flex items-end justify-between mb-12">
          <div className="text-left">
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
              style={primaryStyle}
            >
              {content.subtitle || 'Featured'}
            </span>
            <h2 className={`${typography.scale.h2} ${typography.weights.black} mt-2 ${typography.fontPrimary}`}>
              <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
              <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
            </h2>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className={`w-12 h-12 border-2 border-${colors.border} ${layout.borderRadiusBase} flex items-center justify-center hover:border-${colors.primary} hover:bg-${colors.primary} hover:text-${colors.textInverse} transition-all group`}
            >
              <SafeIcon icon={FiIcons.FiChevronLeft} className="text-xl" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`w-12 h-12 border-2 border-${colors.border} ${layout.borderRadiusBase} flex items-center justify-center hover:border-${colors.primary} hover:bg-${colors.primary} hover:text-${colors.textInverse} transition-all group`}
            >
              <SafeIcon icon={FiIcons.FiChevronRight} className="text-xl" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-[320px] snap-start group bg-${colors.background} ${layout.borderRadiusLarge} overflow-hidden border border-${colors.border} hover:${layout.shadowLarge} transition-all duration-300`}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <SafeIcon icon={FiIcons.FiImage} className="text-4xl" />
                    </div>
                  )}
                  {product.category && (
                    <div className={`absolute top-4 left-4 bg-${colors.background} px-3 py-1 ${layout.borderRadiusBase} ${layout.shadow}`}>
                      <span className={`${typography.scale.xs} ${typography.weights.semibold} text-${colors.textPrimary} ${typography.fontPrimary}`}>
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`${typography.scale.h4} ${typography.weights.bold} text-${colors.textPrimary} ${typography.fontPrimary} line-clamp-1 flex-1`}>
                      {product.name}
                    </h3>
                    <span
                      className={`${typography.scale.h4} ${typography.weights.black} text-${colors.primary} ${typography.fontPrimary} ml-3`}
                      style={primaryStyle}
                    >
                      {formatCurrency(product.salePrice || product.price)}
                    </span>
                  </div>

                  <p className={`${typography.scale.bodySmall} text-${colors.textMuted} mb-4 line-clamp-2 ${typography.fontSecondary}`}>
                    {product.description || 'Delicious and freshly prepared.'}
                  </p>

                  <button
                    className={`w-full py-3 bg-${colors.primary} text-${colors.textInverse} ${typography.scale.bodySmall} ${typography.weights.semibold} ${layout.borderRadiusBase} hover:bg-${colors.primaryHover} transition-all ${typography.fontPrimary}`}
                    style={primaryBgStyle}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center">
              <p className={`text-${colors.textMuted} ${typography.fontSecondary}`}>No featured products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
