import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products } = useProducts();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'products');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const highlightColor = colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal;
  const sectionHeadlineHighlightStyle = { color: highlightColor };

  const activeProducts = products.filter(p => p.status === 'Active').slice(0, 6);

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.background} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-12">
          <span
            className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            {content.subtitle || 'Our Menu'}
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} mt-2 ${typography.fontPrimary}`}>
            <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
            <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${layout.gridGapMedium}`}>
          {activeProducts.length > 0 ? (
            activeProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-${colors.background} border border-${colors.border} ${layout.borderRadiusLarge} overflow-hidden hover:${layout.shadowLarge} transition-all duration-300`}
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <SafeIcon icon={FiIcons.FiImage} className="text-4xl" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
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

                  {product.category && (
                    <span className={`inline-block ${typography.scale.xs} ${typography.weights.medium} text-${colors.textMuted} mb-3 ${typography.fontSecondary}`}>
                      {product.category}
                    </span>
                  )}

                  <p className={`${typography.scale.bodySmall} text-${colors.textMuted} mb-4 line-clamp-2 ${typography.fontSecondary}`}>
                    {product.description || 'Fresh and delicious.'}
                  </p>

                  <button
                    className={`w-full py-3 border-2 border-${colors.border} text-${colors.textPrimary} ${typography.scale.bodySmall} ${typography.weights.semibold} ${layout.borderRadiusBase} hover:border-${colors.primary} hover:bg-${colors.primary} hover:text-${colors.textInverse} transition-all ${typography.fontPrimary}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className={`text-${colors.textMuted} ${typography.fontSecondary}`}>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
