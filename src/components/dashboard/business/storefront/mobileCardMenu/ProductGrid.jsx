import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'products');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className={tokens.layout.spacing.section}
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="px-4">
        <div className="mb-6 text-center">
          <Headline
            normalText={normalText}
            highlightText={highlightText}
            tokens={tokens}
            className={`text-2xl ${tokens.typography.headingWeight} mb-2`}
          />
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className={`${tokens.layout.borderRadius.card} overflow-hidden transition-all ${tokens.effects.shadow.card}`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div className="relative">
                <div className={`w-full aspect-square ${tokens.layout.borderRadius.image} overflow-hidden`}>
                  <img
                    src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute top-2 right-2 px-2 py-1 rounded-lg text-[10px] font-bold"
                  style={{
                    backgroundColor: tokens.colors.badgeBg,
                    color: tokens.colors.badgeText
                  }}
                >
                  NEW
                </div>
              </div>

              <div className="p-4">
                <h3
                  className="text-sm font-bold mb-1 line-clamp-2 min-h-[40px]"
                  style={{ color: tokens.colors.primaryText }}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {product.description || 'Freshly prepared with quality ingredients'}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xl font-bold"
                    style={{ color: tokens.colors.primary }}
                  >
                    {formatCurrency(product.price)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <SafeIcon icon={FiIcons.FiStar} className="text-yellow-500" />
                    <span className="font-medium">4.5</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className={`w-full py-3 ${tokens.layout.borderRadius.button} font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
                  style={{
                    backgroundColor: tokens.colors.primary,
                    color: tokens.colors.cartButtonText
                  }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} />
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
