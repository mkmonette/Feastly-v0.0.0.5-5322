import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useVibrantClassic } from './VibrantClassicContext';

const FeaturedProducts = () => {
  const { tokens, addToCart } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  const featured = [
    { id: 1, name: 'Rainbow Bowl', price: 14.99, description: 'Colorful mix of fresh vegetables' },
    { id: 2, name: 'Sunrise Smoothie', price: 8.99, description: 'Tropical fruits blended to perfection' },
    { id: 3, name: 'Happy Burger', price: 16.99, description: 'Juicy beef with all the fixings' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <span className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.secondary }}>
            Customer Favorites
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.fontPrimary} mt-3`} style={{ color: colors.textPrimary }}>
            Most Loved Dishes
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {featured.map((product) => (
            <div key={product.id} className={`group ${layout.borderRadiusLarge} p-6 transition-all hover:scale-105 ${layout.shadow}`} style={{
              backgroundColor: colors.surface
            }}>
              <div className={`aspect-square ${layout.borderRadiusMedium} mb-6`} style={{
                background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.surface})`
              }} />

              <h3 className={`${typography.scale.h4} ${typography.weights.black} ${typography.fontPrimary} mb-2`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <p className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-4`} style={{ color: colors.textMuted }}>
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-4">
                <span className={`${typography.scale.h4} ${typography.weights.black} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-6 py-2 ${layout.borderRadiusBase} ${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontSecondary} transition-all hover:scale-105`}
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: colors.textInverse
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
