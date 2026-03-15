import React from 'react';
import { formatCurrency } from '@/common/currency';
import { useRefinedClassic } from './RefinedClassicContext';

const ProductGrid = () => {
  const { tokens, addToCart } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  const products = [
    { id: 4, name: 'Caesar Salad', price: 14.00, category: 'Appetizers' },
    { id: 5, name: 'Lobster Bisque', price: 18.00, category: 'Soups' },
    { id: 6, name: 'Filet Mignon', price: 52.00, category: 'Mains' },
    { id: 7, name: 'Seared Scallops', price: 36.00, category: 'Seafood' },
    { id: 8, name: 'Tiramisu', price: 12.00, category: 'Desserts' },
    { id: 9, name: 'Wine Selection', price: 45.00, category: 'Beverages' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Complete Menu
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${layout.gridGapMedium}`}>
          {products.map((product) => (
            <div key={product.id} className={`${layout.borderRadiusMedium} p-5 border transition-all`} style={{
              backgroundColor: colors.background,
              borderColor: colors.border
            }}>
              <div className={`aspect-[4/3] ${layout.borderRadiusSmall} mb-4`} style={{
                backgroundColor: colors.surfaceAlt
              }} />

              <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.textSubtle }}>
                {product.category}
              </span>

              <h3 className={`${typography.scale.h4} ${typography.weights.semibold} ${typography.fontPrimary} mt-2 mb-4`} style={{ color: colors.textPrimary }}>
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className={`${typography.scale.body} ${typography.weights.semibold} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-4 py-2 ${layout.borderRadiusBase} border ${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary} transition-all`}
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
