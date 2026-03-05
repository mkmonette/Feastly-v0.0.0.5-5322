import React, { useState } from 'react';
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

  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const sectionHeadlineHighlightStyle = { color: colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal };
  const accentStyle = { color: colors.accent };
  const primaryBgStyle = { backgroundColor: colors.primary };

  const activeProducts = products.filter(p => p.status === 'Active');
  const categories = ['All', ...new Set(activeProducts.map(p => p.category).filter(Boolean))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? activeProducts
    : activeProducts.filter(p => p.category === selectedCategory);

  return (
    <section className={`${layout.sectionPadding} bg-white ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-12">
          <div className="mb-4">
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wider} ${typography.transform.uppercase} ${typography.fontSecondary}`}
              style={accentStyle}
            >
              {content.subtitle || 'Our Menu'}
            </span>
          </div>
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`}>
            {content.titleHighlight ? (
              <>
                <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
                <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
              </>
            ) : (
              <span style={sectionHeadlineNormalStyle}>{content.titlePre || 'All Products'}</span>
            )}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 ${typography.scale.bodySmall} ${typography.weights.medium} transition-all ${typography.fontSecondary}`}
              style={
                selectedCategory === category
                  ? { backgroundColor: colors.primary, color: 'white' }
                  : { backgroundColor: colors.surface, color: colors.textSecondary }
              }
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = colors.surfaceAlt;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = colors.surface;
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border transition-all hover:shadow-lg"
                style={{ borderColor: colors.border }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <SafeIcon icon={FiIcons.FiImage} className="text-6xl" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`${typography.scale.h5} ${typography.weights.semibold} ${typography.fontPrimary} line-clamp-1 flex-1`} style={{ color: colors.textPrimary }}>
                      {product.name}
                    </h3>
                    <span className={`${typography.scale.h5} ${typography.weights.bold} ${typography.fontPrimary} ml-3`} style={{ color: colors.primary }}>
                      {formatCurrency(product.salePrice || product.price)}
                    </span>
                  </div>

                  {product.category && (
                    <span className={`${typography.scale.xs} ${typography.fontSecondary} block mb-3`} style={{ color: colors.textMuted }}>
                      {product.category}
                    </span>
                  )}

                  <p className={`${typography.scale.bodySmall} mb-4 line-clamp-2 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                    {product.description || 'Fresh and delicious.'}
                  </p>

                  <button
                    className={`w-full py-3 ${typography.scale.bodySmall} ${typography.weights.semibold} text-white transition-all hover:scale-105 ${typography.fontSecondary}`}
                    style={primaryBgStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className={`${typography.fontSecondary}`} style={{ color: colors.textMuted }}>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
