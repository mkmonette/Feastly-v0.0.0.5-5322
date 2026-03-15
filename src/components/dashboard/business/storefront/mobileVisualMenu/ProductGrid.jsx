import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileVisualMenu } from './MobileVisualMenuContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileVisualMenu();
  const section = sectionsConfig.find(s => s.id === 'products');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-6 px-4" style={{ backgroundColor: tokens.colors.background }}>
      <div className="mb-5">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-2xl ${tokens.typography.headingWeight} mb-1`}
        />
        {subtitle && (
          <p className="text-sm font-normal" style={{ color: tokens.colors.sectionNormalText }}>{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <div
            key={product.id}
            className={`${tokens.layout.borderRadius.card} overflow-hidden ${tokens.effects.shadow.card} flex flex-col transition-transform hover:scale-[1.02]`}
            style={{
              backgroundColor: tokens.colors.cardBackground,
              border: `1px solid ${tokens.colors.border}`
            }}
          >
            <div className="relative">
              <div className={`w-full aspect-square overflow-hidden`}>
                <img
                  src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.discount && (
                <div
                  className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: tokens.colors.accent, color: '#FFF' }}
                >
                  -{product.discount}%
                </div>
              )}
            </div>

            <div className="p-3 flex-1 flex flex-col">
              <h3
                className="text-sm font-bold mb-1 line-clamp-2"
                style={{ color: tokens.colors.primaryText }}
              >
                {product.name}
              </h3>
              <p className="text-xs mb-2 line-clamp-2 flex-1" style={{ color: tokens.colors.sectionNormalText }}>
                {product.description || 'Fresh and delicious'}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span
                  className="text-base font-bold"
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className={`p-2.5 ${tokens.layout.borderRadius.button} transition-all hover:scale-110 active:scale-95 ${tokens.effects.shadow.button}`}
                  style={{
                    backgroundColor: tokens.colors.primary,
                    color: tokens.colors.cartButtonText
                  }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-lg" />
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
