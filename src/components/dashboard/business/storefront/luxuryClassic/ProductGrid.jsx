import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useLuxuryClassic } from './LuxuryClassicContext';

const ProductGrid = () => {
  const { tokens, addToCart } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  const products = [
    { id: 4, name: 'Roasted Duck Breast', price: 52.00, category: 'Mains' },
    { id: 5, name: 'Chilean Sea Bass', price: 68.00, category: 'Seafood' },
    { id: 6, name: 'Lamb Rack', price: 62.00, category: 'Mains' },
    { id: 7, name: 'Tuna Tartare', price: 38.00, category: 'Appetizers' },
    { id: 8, name: 'Oyster Selection', price: 45.00, category: 'Appetizers' },
    { id: 9, name: 'Crème Brûlée', price: 18.00, category: 'Desserts' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Full Menu
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${layout.gridGapMedium}`}>
          {products.map((product) => (
            <div key={product.id} className="border p-6 group transition-all" style={{
              backgroundColor: colors.surface,
              borderColor: colors.border
            }}>
              <div className="aspect-[4/3] bg-gradient-to-br mb-4" style={{
                backgroundImage: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.surface})`
              }} />

              <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.textSubtle }}>
                {product.category}
              </span>

              <h3 className={`${typography.scale.h4} ${typography.weights.medium} ${typography.fontPrimary} mt-2 mb-4`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-4 py-2 border ${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary} transition-all`}
                  style={{
                    borderColor: colors.border,
                    color: colors.textPrimary
                  }}
                >
                  Add to Cart
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
