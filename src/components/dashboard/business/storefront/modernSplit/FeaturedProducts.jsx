import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import { useProducts } from '@/context/ProductContext';
import { useModernSplitCart } from './ModernSplitContext';
import { formatCurrency } from '@/common/currency';
import Headline from '../Headline';

const FeaturedProducts = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products } = useProducts();
  const { sectionsConfig } = useStorefront();
  const { addToCart } = useModernSplitCart();

  const section = sectionsConfig.find(s => s.id === 'featured');
  const content = section?.content || {};

  const accentStyle = { color: colors.accent };

  const featuredProducts = products
    .filter(p => p.flags?.featured && p.status === 'Active')
    .slice(0, 3);

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="mb-12">
          <div className="mb-4">
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.transform.uppercase} ${typography.tracking.wider} ${typography.fontSecondary}`}
              style={accentStyle}
            >
              {content.subtitle || 'Featured'}
            </span>
          </div>
          <Headline
            normalText={content.titlePre || 'Featured Dishes'}
            highlightText={content.titleHighlight}
            tokens={{ colors }}
            className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                style={{ backgroundColor: colors.surface }}
              >
                <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: colors.surfaceAlt }}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SafeIcon icon={FiIcons.FiImage} className="text-6xl" style={{ color: colors.textMuted }} />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {product.category && (
                    <span
                      className={`${typography.scale.xs} ${typography.weights.semibold} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontSecondary}`}
                      style={accentStyle}
                    >
                      {product.category}
                    </span>
                  )}

                  <h3 className={`${typography.scale.h5} ${typography.weights.semibold} mt-2 mb-2 ${typography.fontPrimary} line-clamp-1`} style={{ color: colors.textPrimary }}>
                    {product.name}
                  </h3>

                  <p className={`${typography.scale.bodySmall} mb-4 line-clamp-2 ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                    {product.description || 'Delicious and freshly prepared.'}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: colors.border }}>
                    <span className={`${typography.scale.h5} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.accent }}>
                      {formatCurrency(product.salePrice || product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className={`px-6 py-2 rounded-lg ${typography.scale.bodySmall} ${typography.weights.semibold} transition-all hover:opacity-90 ${typography.fontSecondary}`}
                      style={{ backgroundColor: colors.accent, color: colors.textInverse }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className={`${typography.fontSecondary}`} style={{ color: colors.textMuted }}>No featured products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
