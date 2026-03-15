import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'featured');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle } = section.content;
  const featuredProducts = products.slice(0, 4);

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className="py-6 px-4"
      style={{ backgroundColor: tokens.colors.cardBackground }}
    >
      <div className="mb-5 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-2xl ${tokens.typography.headingWeight} mb-1`}
        />
        {subtitle && (
          <p className="text-xs font-medium text-gray-600">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {featuredProducts.map(product => (
          <div
            key={product.id}
            className={`${tokens.layout.borderRadius.card} overflow-hidden transition-all ${tokens.effects.shadow.card}`}
            style={{
              backgroundColor: tokens.colors.background,
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
                className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-extrabold"
                style={{
                  backgroundColor: tokens.colors.badgeBg,
                  color: tokens.colors.badgeText
                }}
              >
                HOT
              </div>
            </div>

            <div className="p-3">
              <h3
                className="text-xs font-extrabold mb-1 line-clamp-1"
                style={{ color: tokens.colors.primaryText }}
              >
                {product.name}
              </h3>
              <span
                className="text-base font-extrabold block mb-2"
                style={{ color: tokens.colors.primary }}
              >
                {formatCurrency(product.price)}
              </span>

              <button
                onClick={() => addToCart(product)}
                className={`w-full py-2 ${tokens.layout.borderRadius.button} font-bold text-[10px] flex items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95`}
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.cartButtonText
                }}
              >
                <SafeIcon icon={FiIcons.FiShoppingBag} style={{ fontSize: '12px' }} />
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
