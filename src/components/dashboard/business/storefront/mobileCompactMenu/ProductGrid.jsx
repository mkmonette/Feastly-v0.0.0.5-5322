import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'products');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-6 px-4">
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
        {products.map(product => (
          <div
            key={product.id}
            className={`${tokens.layout.borderRadius.card} overflow-hidden transition-all ${tokens.effects.shadow.card}`}
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

            <div className="p-3">
              <h3
                className="text-xs font-extrabold mb-1 line-clamp-2 min-h-[32px]"
                style={{ color: tokens.colors.primaryText }}
              >
                {product.name}
              </h3>
              <p className="text-[10px] text-gray-500 mb-2 line-clamp-1">
                {product.description || 'Fresh & delicious'}
              </p>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-base font-extrabold"
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>
                <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
                  <SafeIcon icon={FiIcons.FiStar} className="text-yellow-400" style={{ fontSize: '10px' }} />
                  <span className="font-medium">4.8</span>
                </div>
              </div>

              <button
                onClick={() => addToCart(product)}
                className={`w-full py-2 ${tokens.layout.borderRadius.button} font-bold text-[10px] flex items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.cartButtonText
                }}
              >
                <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '12px' }} />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
