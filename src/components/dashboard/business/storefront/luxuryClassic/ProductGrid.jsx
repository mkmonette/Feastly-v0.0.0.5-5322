import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useLuxuryClassic } from './LuxuryClassicContext';

const ProductGrid = () => {
  const { tokens, addToCart } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  const products = [
    { id: 4, name: 'Foie Gras', price: 55.00, category: 'Appetizers' },
    { id: 5, name: 'Caviar Service', price: 95.00, category: 'Appetizers' },
    { id: 6, name: 'Dover Sole', price: 72.00, category: 'Seafood' },
    { id: 7, name: 'Lamb Rack', price: 68.00, category: 'Mains' },
    { id: 8, name: 'Soufflé', price: 28.00, category: 'Desserts' },
    { id: 9, name: 'Vintage Wine', price: 150.00, category: 'Beverages' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-20">
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Complete Menu
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${layout.gridGapMedium}`}>
          {products.map((product) => (
            <div key={product.id} className={`p-6 border`} style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderWidth: '1px'
            }}>
              <div className={`aspect-[4/3] mb-6`} style={{
                backgroundColor: colors.surfaceAlt
              }} />

              <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary} mb-3 block`} style={{ color: colors.textSubtle }}>
                {product.category}
              </span>

              <h3 className={`${typography.scale.h4} ${typography.weights.regular} ${typography.fontPrimary} mb-6`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className={`${typography.scale.body} ${typography.weights.light} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-6 py-2 border ${typography.scale.xs} ${typography.weights.medium} ${typography.fontSecondary} transition-all`}
                  style={{
                    borderColor: colors.border,
                    color: colors.textPrimary
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

export default ProductGrid;
