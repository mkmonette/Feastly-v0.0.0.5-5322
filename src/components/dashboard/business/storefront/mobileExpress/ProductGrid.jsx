import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileExpress } from './MobileExpressContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileExpress();
  const section = sectionsConfig.find(s => s.id === 'products');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-8 px-4">
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

      <div className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <div
            key={product.id}
            className={`${tokens.layout.borderRadius.card} overflow-hidden ${tokens.effects.shadow.card} flex flex-col`}
            style={{
              backgroundColor: tokens.colors.cardBackground,
              border: `1px solid ${tokens.colors.border}`
            }}
          >
            <div className={`w-full aspect-square ${tokens.layout.borderRadius.image} overflow-hidden`}>
              <img
                src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 flex-1 flex flex-col">
              <h3
                className="text-sm font-black mb-1 line-clamp-2"
                style={{ color: tokens.colors.primaryText }}
              >
                {product.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2 flex-1">
                {product.description || 'Delicious and freshly made'}
              </p>
              <span
                className="text-lg font-black mb-2"
                style={{ color: tokens.colors.primary }}
              >
                {formatCurrency(product.price)}
              </span>

              <button
                onClick={() => addToCart(product)}
                className={`w-full py-3 ${tokens.layout.borderRadius.button} font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
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
    </section>
  );
};

export default ProductGrid;
