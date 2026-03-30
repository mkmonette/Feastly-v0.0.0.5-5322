import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import { useProducts } from '@/context/ProductContext';
import { useModernSplitCartContext } from './ModernSplitCartContext';
import { formatCurrency } from '@/common/currency';
import Headline from '../Headline';

const ProductGrid = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products } = useProducts();
  const { sectionsConfig } = useStorefront();
  const { addToCart } = useModernSplitCartContext();

  const section = sectionsConfig.find(s => s.id === 'products');
  const content = section?.content || {};

  const accentStyle = { color: colors.accent };

  const activeProducts = products.filter(p => p.status === 'Active');
  const categories = ['All', ...new Set(activeProducts.map(p => p.category).filter(Boolean))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? activeProducts
    : activeProducts.filter(p => p.category === selectedCategory);

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="mb-6">
          <div className="mb-2">
            <span
              className={`${typography.scale.xs} ${typography.weights.semibold} ${typography.transform.uppercase} ${typography.tracking.wider} ${typography.fontSecondary}`}
              style={accentStyle}
            >
              {content.subtitle || 'Our Menu'}
            </span>
          </div>
          <Headline
            normalText={content.titlePre || 'All Products'}
            highlightText={content.titleHighlight}
            tokens={{ colors }}
            className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-lg ${typography.scale.xs} ${typography.weights.medium} transition-all ${typography.fontSecondary}`}
              style={
                selectedCategory === category
                  ? { backgroundColor: colors.accent, color: colors.textInverse }
                  : { backgroundColor: colors.surface, color: colors.textSecondary, border: `1px solid ${colors.border}` }
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-lg overflow-hidden border hover:shadow-lg transition-all"
                style={{ backgroundColor: colors.background, borderColor: colors.border }}
              >
                <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: colors.surfaceAlt }}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SafeIcon icon={FiIcons.FiImage} className="text-5xl" style={{ color: colors.textMuted }} />
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`${typography.scale.body} ${typography.weights.semibold} ${typography.fontPrimary} line-clamp-1 flex-1`} style={{ color: colors.textPrimary }}>
                      {product.name}
                    </h3>
                    <span className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontPrimary} ml-2`} style={{ color: colors.accent }}>
                      {formatCurrency(product.salePrice || product.price)}
                    </span>
                  </div>

                  {product.category && (
                    <span className={`${typography.scale.xs} ${typography.fontSecondary} block mb-1.5`} style={{ color: colors.textMuted }}>
                      {product.category}
                    </span>
                  )}

                  <p className={`${typography.scale.xs} mb-2.5 line-clamp-2 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                    {product.description || 'Fresh and delicious.'}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className={`w-full py-2 rounded-lg ${typography.scale.xs} ${typography.weights.semibold} transition-all hover:opacity-90 ${typography.fontSecondary}`}
                    style={{ backgroundColor: colors.accent, color: colors.textInverse }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className={`${typography.fontSecondary}`} style={{ color: colors.textMuted }}>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
