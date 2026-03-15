import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useVibrantClassic } from './VibrantClassicContext';

const ProductGrid = () => {
  const { tokens, addToCart } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  const products = [
    { id: 4, name: 'Power Salad', price: 12.99, category: 'Salads' },
    { id: 5, name: 'Tropical Pizza', price: 18.99, category: 'Mains' },
    { id: 6, name: 'Berry Blast', price: 7.99, category: 'Drinks' },
    { id: 7, name: 'Veggie Wrap', price: 11.99, category: 'Wraps' },
    { id: 8, name: 'Fruit Paradise', price: 9.99, category: 'Desserts' },
    { id: 9, name: 'Energy Bowl', price: 13.99, category: 'Bowls' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Full Menu
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${layout.gridGapMedium}`}>
          {products.map((product) => (
            <div key={product.id} className={`${layout.borderRadiusMedium} p-5 transition-all hover:scale-105 ${layout.shadow}`} style={{
              backgroundColor: colors.background
            }}>
              <div className={`aspect-[4/3] ${layout.borderRadiusSmall} mb-4`} style={{
                background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.surfaceAlt})`
              }} />

              <span className={`${typography.scale.xs} ${typography.weights.bold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.accent }}>
                {product.category}
              </span>

              <h3 className={`${typography.scale.h4} ${typography.weights.bold} ${typography.fontPrimary} mt-2 mb-4`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className={`${typography.scale.body} ${typography.weights.black} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-4 py-2 ${layout.borderRadiusBase} ${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontSecondary} transition-all`}
                  style={{
                    backgroundColor: colors.primaryLight,
                    color: colors.primary
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
