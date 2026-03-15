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
  const featuredProducts = products.filter(p => p.featured).slice(0, 5);

  if (featuredProducts.length === 0) return null;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="mb-6 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-3xl ${tokens.typography.headingWeight} mb-2`}
        />
        {subtitle && (
          <p className="text-sm font-medium text-gray-600">{subtitle}</p>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {featuredProducts.map(product => (
          <div
            key={product.id}
            className={`flex-shrink-0 w-72 ${tokens.layout.borderRadius.card} overflow-hidden ${tokens.effects.shadow.card} snap-center`}
            style={{ backgroundColor: tokens.colors.cardBackground }}
          >
            <div className="relative aspect-[4/3]">
              <img
                src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black"
                  style={{
                    backgroundColor: tokens.colors.accent,
                    color: tokens.colors.primaryText
                  }}
                >
                  -{product.discount}%
                </div>
              )}
            </div>

            <div className="p-4">
              <h3
                className="text-lg font-black mb-1"
                style={{ color: tokens.colors.primaryText }}
              >
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description || 'Delicious and freshly made'}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-2xl font-black"
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-6 py-3 ${tokens.layout.borderRadius.button} font-black text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95`}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
