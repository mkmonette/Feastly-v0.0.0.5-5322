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
        <div className="text-center mb-20">
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} mb-8 ${typography.fontPrimary}`}>
            {content.titleHighlight ? (
              <>
                <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
                <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
              </>
            ) : (
              <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>
            )}
          </h2>
          <div className={`w-32 h-2 bg-${colors.primary} mx-auto`} style={primaryBgStyle} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProducts.length > 0 ? (
            activeProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group relative border-4 border-${colors.border} hover:border-${colors.primary} transition-all duration-300`}
              >
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <SafeIcon icon={FiIcons.FiImage} className="text-6xl" />
                    </div>
                  )}

                  <div className={`absolute top-0 left-0 w-16 h-16 bg-${colors.primary} flex items-center justify-center`} style={primaryBgStyle}>
                    <span className={`${typography.scale.h4} ${typography.weights.black} text-black ${typography.fontPrimary}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`${typography.scale.h4} ${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.fontPrimary} line-clamp-1 flex-1`}>
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
                    <span className={`inline-block ${typography.scale.xs} ${typography.weights.bold} text-${colors.textMuted} ${typography.transform.uppercase} mb-3 ${typography.fontSecondary}`}>
                      {product.category}
                    </span>
                  )}

                  <p className={`${typography.scale.bodySmall} text-${colors.textMuted} mb-6 line-clamp-2 ${typography.fontSecondary}`}>
                    {product.description || 'Fresh and delicious.'}
                  </p>

                  <button
                    className={`w-full py-4 border-2 border-${colors.textPrimary} text-${colors.textPrimary} ${typography.scale.bodySmall} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} hover:bg-${colors.textPrimary} hover:text-white transition-all ${typography.fontPrimary}`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className={`text-${colors.textMuted} ${typography.fontSecondary}`}>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
