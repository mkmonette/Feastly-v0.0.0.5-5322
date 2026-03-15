import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useRefinedClassic } from './RefinedClassicContext';

const FeaturedProducts = () => {
  const { tokens, addToCart } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  const featured = [
    { id: 1, name: 'Grilled Salmon', price: 32.00, description: 'Fresh Atlantic salmon with herbs' },
    { id: 2, name: 'Prime Ribeye', price: 48.00, description: 'USDA Prime beef, 12oz cut' },
    { id: 3, name: 'Pasta Primavera', price: 24.00, description: 'Seasonal vegetables, fresh pasta' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <span className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
            Signature Dishes
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.fontPrimary} mt-3`} style={{ color: colors.textPrimary }}>
            Featured Menu
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {featured.map((product) => (
            <div key={product.id} className={`${layout.borderRadiusMedium} p-6 border transition-all hover:${layout.shadowLarge}`} style={{
              backgroundColor: colors.surface,
              borderColor: colors.border
            }}>
              <div className={`aspect-square ${layout.borderRadiusSmall} mb-6`} style={{
                backgroundColor: colors.surfaceAlt
              }} />

              <h3 className={`${typography.scale.h4} ${typography.weights.semibold} ${typography.fontPrimary} mb-2`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <p className={`${typography.scale.bodySmall} ${typography.weights.normal} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-4`} style={{ color: colors.textMuted }}>
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: colors.border }}>
                <span className={`${typography.scale.h4} ${typography.weights.semibold} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-6 py-2 ${layout.borderRadiusBase} ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontSecondary} transition-all`}
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
