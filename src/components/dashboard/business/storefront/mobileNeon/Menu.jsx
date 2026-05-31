import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileNeon } from './MobileNeonContext';
import { formatCurrency } from '@/common/currency';

const CATEGORY_EMOJIS = {
  burger: '🍔', burgers: '🍔',
  pizza: '🍕',
  salad: '🥗', salads: '🥗',
  drink: '🥤', drinks: '🥤',
  dessert: '🍰', desserts: '🍰',
  chicken: '🍗',
  seafood: '🦞',
  pasta: '🍝',
  default: '🍽️'
};

const getCategoryEmoji = (cat) => {
  if (!cat) return CATEGORY_EMOJIS.default;
  const lower = cat.toLowerCase();
  return CATEGORY_EMOJIS[lower] || CATEGORY_EMOJIS.default;
};

const Menu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileNeon();
  const section = sectionsConfig.find(s => s.id === 'menu');
  const [activeCategory, setActiveCategory] = useState(null);

  if (!section?.content) return null;

  const { title } = section.content;

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const displayCategory = activeCategory || categories[0] || null;
  const filtered = displayCategory
    ? products.filter(p => p.category === displayCategory)
    : products;
  const displayProducts = filtered.slice(0, 6);

  if (products.length === 0) return null;

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-3" style={{ color: tokens.colors.primaryText }}>{title}</h2>

      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat, i) => {
            const isActive = (activeCategory || categories[0]) === cat;
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all"
                style={isActive
                  ? { backgroundColor: tokens.colors.primary, color: tokens.colors.secondary }
                  : { backgroundColor: tokens.colors.cardBackground, color: tokens.colors.muted, border: `1px solid ${tokens.colors.border}` }
                }
              >
                <span>{getCategoryEmoji(cat)}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {displayProducts.map(product => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.border}` }}
          >
            <div className="relative w-full" style={{ height: '100px' }}>
              <img
                src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.calories && (
                <div
                  className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-black"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: tokens.colors.primary }}
                >
                  {product.calories} cal
                </div>
              )}
            </div>
            <div className="p-2.5">
              <p className="text-xs font-black leading-tight line-clamp-1 mb-0.5" style={{ color: tokens.colors.primaryText }}>
                {product.name}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-black" style={{ color: tokens.colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-xs" style={{ color: tokens.colors.secondary }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
