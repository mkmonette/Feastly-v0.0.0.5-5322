import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'featured');

  if (!section?.content) return null;

  const { title, seeAllText } = section.content;
  const featured = products.filter(p => p.featured).slice(0, 6);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 6);

  if (displayProducts.length === 0) return null;

  return (
    <section className="px-4 pt-5 pb-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-black" style={{ color: tokens.colors.primaryText }}>{title}</h2>
        <button className="text-xs font-bold flex items-center gap-0.5" style={{ color: tokens.colors.primary }}>
          {seeAllText}
          <SafeIcon icon={FiIcons.FiChevronRight} className="text-xs" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {displayProducts.map(product => (
          <div
            key={product.id}
            className="flex-shrink-0 w-28 bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ border: `1px solid ${tokens.colors.border}` }}
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <img
                src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md transition-all hover:scale-110 active:scale-95"
                style={{ backgroundColor: tokens.colors.primary }}
              >
                <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
              </button>
            </div>
            <div className="p-2">
              <p className="text-[11px] font-black leading-tight line-clamp-1 mb-0.5" style={{ color: tokens.colors.primaryText }}>
                {product.name}
              </p>
              <p className="text-[11px] font-black" style={{ color: tokens.colors.primary }}>
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
