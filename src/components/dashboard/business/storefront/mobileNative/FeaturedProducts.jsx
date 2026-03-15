import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { tokens, products, addToCart, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'featured');
  const content = section?.content || {};

  const {
    title = 'Featured',
    titleHighlight = 'Featured',
    subtitle = 'Our most popular items'
  } = content;

  const featuredProducts = products.filter(p => p.computedFlags?.featured).slice(0, 4);

  if (featuredProducts.length === 0) return null;

  const parts = title.split(titleHighlight);

  return (
    <div
      className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="mb-3">
        <h2
          className={`text-[22px] ${tokens.typography.headingWeight} mb-1`}
          style={{ color: tokens.colors.primaryText }}
        >
          {parts[0]}
          {titleHighlight && (
            <span style={{ color: tokens.colors.primary }}>
              {titleHighlight}
            </span>
          )}
          {parts[1]}
        </h2>
        {subtitle && (
          <p
            className="text-[14px]"
            style={{ color: tokens.colors.sectionNormalText }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-3 pb-2">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white ${tokens.layout.borderRadius.card} overflow-hidden border active:scale-95 transition-transform flex-shrink-0 w-[140px]`}
              style={{
                borderColor: tokens.colors.border,
                boxShadow: tokens.effects.shadow.card
              }}
            >
              <div className={`w-full aspect-square overflow-hidden bg-gray-100`}>
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

              <div className="p-2">
                <h3
                  className={`text-[13px] ${tokens.typography.headingWeight} leading-tight mb-1 line-clamp-1`}
                  style={{ color: tokens.colors.primaryText }}
                >
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[15px] ${tokens.typography.headingWeight}`}
                    style={{ color: tokens.colors.primary }}
                  >
                    {formatCurrency(product.price)}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className={`w-6 h-6 ${tokens.layout.borderRadius.button} flex items-center justify-center text-white active:scale-90 transition-transform`}
                    style={{
                      backgroundColor: tokens.colors.primary
                    }}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} className="text-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
