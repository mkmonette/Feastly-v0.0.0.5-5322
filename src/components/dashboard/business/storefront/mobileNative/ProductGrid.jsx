import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';

const ProductGrid = ({ products }) => {
  const { tokens, addToCart } = useMobileNative();

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}>
      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white ${tokens.layout.borderRadius.card} overflow-hidden border active:scale-[0.98] transition-transform`}
            style={{
              borderColor: tokens.colors.border,
              boxShadow: tokens.effects.shadow.card
            }}
          >
            <div className="flex gap-3 p-2.5">
              <div className={`w-20 h-20 ${tokens.layout.borderRadius.image} overflow-hidden bg-gray-100 flex-shrink-0`}>
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiImage} className="text-2xl text-gray-300" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h3
                    className={`text-[15px] ${tokens.typography.headingWeight} leading-tight mb-0.5`}
                    style={{ color: tokens.colors.primaryText }}
                  >
                    {product.name}
                  </h3>
                  {product.description && (
                    <p
                      className="text-[13px] line-clamp-1"
                      style={{ color: tokens.colors.sectionNormalText }}
                    >
                      {product.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span
                    className={`text-[17px] ${tokens.typography.headingWeight}`}
                    style={{ color: tokens.colors.primary }}
                  >
                    {formatCurrency(product.price)}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className={`px-3 py-1.5 ${tokens.layout.borderRadius.button} text-[13px] font-semibold text-white active:scale-95 transition-transform`}
                    style={{
                      backgroundColor: tokens.colors.primary,
                      boxShadow: tokens.effects.shadow.button
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
