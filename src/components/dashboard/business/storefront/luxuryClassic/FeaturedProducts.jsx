import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useLuxuryClassic } from './LuxuryClassicContext';

const FeaturedProducts = () => {
  const { tokens, addToCart } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  const featured = [
    { id: 1, name: 'Wagyu Steak', price: 85.00, description: 'Premium Japanese beef' },
    { id: 2, name: 'Lobster Thermidor', price: 65.00, description: 'Classic French preparation' },
    { id: 3, name: 'Truffle Risotto', price: 45.00, description: 'Black truffle, Arborio rice' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ backgroundColor: colors.primary }} />
            <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
              Signature Collection
            </span>
            <div className="h-px w-16" style={{ backgroundColor: colors.primary }} />
          </div>
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textInverse }}>
            Our Finest <span className={typography.weights.medium} style={{ color: colors.primary }}>Selection</span>
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {featured.map((product) => (
            <div key={product.id} className={`group p-8 border transition-all hover:border-opacity-100`} style={{
              backgroundColor: colors.surfaceAlt,
              borderColor: colors.border,
              borderWidth: '1px'
            }}>
              <div className={`aspect-square mb-8`} style={{
                backgroundColor: colors.surface
              }} />

              <h3 className={`${typography.scale.h4} ${typography.weights.light} ${typography.fontPrimary} mb-3`} style={{ color: colors.textInverse }}>
                {product.name}
              </h3>

              <p className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-6`} style={{ color: colors.textInverseMuted }}>
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: colors.border }}>
                <span className={`${typography.scale.h4} ${typography.weights.light} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-8 py-3 border ${typography.scale.xs} ${typography.weights.semibold} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary} transition-all hover:bg-opacity-100`}
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    backgroundColor: 'transparent'
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
