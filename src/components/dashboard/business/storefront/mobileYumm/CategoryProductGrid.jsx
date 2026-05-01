import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';
import { formatCurrency } from '@/common/currency';

const CATEGORY_EMOJIS = {
  burger: '🍔', burgers: '🍔',
  pizza: '🍕',
  salad: '🥗', salads: '🥗',
  drinks: '🥤', drink: '🥤',
  dessert: '🍰', desserts: '🍰',
  chicken: '🍗',
  sushi: '🍣',
  all: '🍽️'
};

const getCategoryEmoji = (cat) => CATEGORY_EMOJIS[cat.toLowerCase()] || '🍽️';

const CategoryProductGrid = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileYumm();
  const [activeCategory, setActiveCategory] = useState(null);

  const section = sectionsConfig.find(s => s.id === 'categories');

  if (!section?.content) return null;

  const { title } = section.content;

  const rawCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const categories = rawCategories.length > 0 ? rawCategories : [];
  const currentCategory = activeCategory ?? (categories[0] || 'all');

  const filtered = currentCategory === 'all'
    ? products
    : products.filter(p => p.category?.toLowerCase() === currentCategory.toLowerCase());

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-3" style={{ color: tokens.colors.primaryText }}>{title}</h2>

      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: currentCategory === cat ? tokens.colors.primary : '#FFFFFF',
                color: currentCategory === cat ? '#FFFFFF' : tokens.colors.primaryText,
                border: currentCategory === cat ? 'none' : `1.5px solid ${tokens.colors.border}`
              }}
            >
              <span>{getCategoryEmoji(cat)}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ border: `1px solid ${tokens.colors.border}` }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2.5">
              <h3 className="text-xs font-black leading-tight mb-0.5 line-clamp-1" style={{ color: tokens.colors.primaryText }}>
                {product.name}
              </h3>
              <p className="text-[10px] text-gray-500 line-clamp-1 mb-2">{product.description || ''}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black" style={{ color: tokens.colors.primary }}>
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProductGrid;
