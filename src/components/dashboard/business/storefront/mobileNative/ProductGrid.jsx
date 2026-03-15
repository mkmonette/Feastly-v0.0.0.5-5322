import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { tokens, products, addToCart } = useMobileNative();

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}>
      <div className="grid grid-cols-2 gap-2.5">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white ${tokens.layout.borderRadius.card} overflow-hidden border active:scale-[0.98] transition-transform`}
            style={{
              borderColor: tokens.colors.border,
              boxShadow: tokens.effects.shadow.card
            }}
          >
            <div className={`w-full aspect-square ${tokens.layout.borderRadius.image} overflow-hidden bg-gray-100`}>
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <SafeIcon icon={FiIcons.FiImage} className="text-3xl text-gray-300" />
                </div>
              )}
            </div>

            <div className="p-2.5">
              <h3
                className={`text-[14px] ${tokens.typography.headingWeight} leading-tight mb-1 line-clamp-1`}
                style={{ color: tokens.colors.primaryText }}
              >
                {product.name}
              </h3>

              {product.description && (
                <p
                  className="text-[12px] line-clamp-2 mb-2"
                  style={{ color: tokens.colors.sectionNormalText }}
                >
                  {product.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span
                  className={`text-[16px] ${tokens.typography.headingWeight}`}
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className={`w-7 h-7 ${tokens.layout.borderRadius.button} flex items-center justify-center text-white active:scale-95 transition-transform`}
                  style={{
                    backgroundColor: tokens.colors.primary,
                    boxShadow: tokens.effects.shadow.button
                  }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-[16px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
