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
    <section className="py-5 px-4" style={{ backgroundColor: tokens.colors.background }}>
      <div className="mb-4">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-xl ${tokens.typography.headingWeight} mb-1`}
        />
        {subtitle && (
          <p className="text-xs font-normal" style={{ color: tokens.colors.sectionNormalText }}>{subtitle}</p>
        )}
      </div>

      <div className="space-y-2">
        {products.map(product => (
          <div
            key={product.id}
            className={`${tokens.layout.borderRadius.card} ${tokens.effects.shadow.card} flex gap-3 p-2`}
            style={{
              backgroundColor: tokens.colors.cardBackground,
              border: `1px solid ${tokens.colors.border}`
            }}
          >
            <div className={`w-20 h-20 flex-shrink-0 ${tokens.layout.borderRadius.image} overflow-hidden`}>
              <img
                src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3
                  className="text-sm font-extrabold mb-0.5 line-clamp-1"
                  style={{ color: tokens.colors.primaryText }}
                >
                  {product.name}
                </h3>
                <p className="text-xs mb-1 line-clamp-1" style={{ color: tokens.colors.sectionNormalText }}>
                  {product.description || 'Quick and tasty'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-base font-extrabold"
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className={`px-3 py-1.5 ${tokens.layout.borderRadius.button} font-bold text-xs flex items-center gap-1 transition-all active:scale-95 ${tokens.effects.shadow.button}`}
                  style={{
                    backgroundColor: tokens.colors.primary,
                    color: tokens.colors.cartButtonText
                  }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
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

export default ProductGrid;
