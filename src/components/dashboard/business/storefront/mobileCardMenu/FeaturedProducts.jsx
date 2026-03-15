import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'featured');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle } = section.content;
  const featuredProducts = products.slice(0, 4);

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className={tokens.layout.spacing.section}
      style={{ backgroundColor: tokens.colors.cardBackground }}
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
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className={`${tokens.layout.borderRadius.card} overflow-hidden transition-all ${tokens.effects.shadow.card}`}
              style={{
                backgroundColor: tokens.colors.background,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div className={`w-full aspect-square ${tokens.layout.borderRadius.image} overflow-hidden relative`}>
                <img
                  src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-2 left-2 px-2 py-1 rounded-lg text-[10px] font-bold"
                  style={{
                    backgroundColor: tokens.colors.accent,
                    color: 'white'
                  }}
                >
                  FEATURED
                </div>
              </div>

              <div className="p-4">
                <h3
                  className="text-sm font-bold mb-1 line-clamp-1"
                  style={{ color: tokens.colors.primaryText }}
                >
                  {product.name}
                </h3>
                <span
                  className="text-lg font-bold block mb-3"
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className={`w-full py-2.5 ${tokens.layout.borderRadius.button} font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95`}
                  style={{
                    backgroundColor: tokens.colors.primary,
                    color: tokens.colors.cartButtonText
                  }}
                >
                  <SafeIcon icon={FiIcons.FiShoppingCart} />
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

export default FeaturedProducts;
