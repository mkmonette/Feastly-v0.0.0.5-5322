import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useLuxuryClassic } from './LuxuryClassicContext';

const FeaturedProducts = () => {
  const { tokens, addToCart } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  const featured = [
    { id: 1, name: 'Wagyu Beef Tenderloin', price: 89.00, description: 'Premium cut with truffle butter' },
    { id: 2, name: 'Lobster Thermidor', price: 75.00, description: 'Classic French preparation' },
    { id: 3, name: 'Caviar Tasting', price: 120.00, description: 'Selection of three finest caviars' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
            Signature Selections
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary} mt-4`} style={{ color: colors.textPrimary }}>
            Featured Dishes
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {featured.map((product) => (
            <div key={product.id} className="group border p-8 transition-all hover:border-opacity-100" style={{
              backgroundColor: colors.background,
              borderColor: colors.border
            }}>
              <div className="aspect-square bg-gradient-to-br mb-6" style={{
                backgroundImage: `linear-gradient(135deg, ${colors.surface}, ${colors.surfaceAlt})`
              }} />

              <h3 className={`${typography.scale.h4} ${typography.weights.medium} ${typography.fontPrimary} mb-2`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <p className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-4`} style={{ color: colors.textMuted }}>
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: colors.border }}>
                <span className={`${typography.scale.h4} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-6 py-2 ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary} transition-all`}
                  style={{
                    backgroundColor: colors.primary,
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
