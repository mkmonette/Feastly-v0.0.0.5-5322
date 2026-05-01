import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';
import { formatCurrency } from '@/common/currency';

const PLACEHOLDER = {
  name: 'Classic Cheeseburger',
  description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce',
  price: 12.99,
  image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
};

const ChefsFavorites = () => {
  const { tokens, sectionsConfig, products } = useSage();
  const section = sectionsConfig.find(s => s.id === 'featured');
  if (!section) return null;
  const { label, title } = section.content || {};

  const featured = products?.length > 0 ? products[0] : PLACEHOLDER;

  return (
    <section style={{ backgroundColor: tokens.colors.background }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section label + title */}
        <div className="text-center mb-10">
          {label && (
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: tokens.colors.sectionLabel }}>
              {label}
            </p>
          )}
          <h2 className="text-3xl font-black" style={{ color: tokens.colors.textPrimary }}>{title}</h2>
        </div>

        {/* Single wide featured card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: tokens.colors.featuredCardBg, border: `1px solid ${tokens.colors.border}` }}
        >
          <img
            src={featured.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
            alt={featured.name}
            className="w-full object-cover"
            style={{ height: 260 }}
          />
          <div className="px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black mb-1" style={{ color: tokens.colors.textPrimary }}>{featured.name}</h3>
              <p className="text-xs mb-2 max-w-lg" style={{ color: tokens.colors.textMuted }}>{featured.description}</p>
              <span className="text-lg font-black" style={{ color: tokens.colors.primary }}>
                {formatCurrency(featured.price)}
              </span>
            </div>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all hover:opacity-85 active:scale-95 flex-shrink-0"
              style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
            >
              <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefsFavorites;
