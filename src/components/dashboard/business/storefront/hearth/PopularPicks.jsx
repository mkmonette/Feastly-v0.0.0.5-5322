import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useHearth } from './HearthContext';
import { formatCurrency } from '@/common/currency';

const PLACEHOLDER = [
  { id: 'p1', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce', price: 12.99, image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg' },
  { id: 'p2', name: 'Artisan Pepperoni', description: 'Classic pepperoni with mozzarella on hand-tossed dough', price: 18.00, image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg' },
  { id: 'p3', name: 'Cobb Salad', description: 'Grilled chicken, bacon, eggs, avocado, and blue cheese', price: 14.99, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
  { id: 'p4', name: 'Chocolate Brownie', description: 'Warm fudgy brownie with vanilla ice cream', price: 7.99, image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg' }
];

/*
  Hearth card layout (light/white card, dark text):
  ┌─────────────────────────────┐
  │  Name               [+]     │  ← name top-left, yellow circle + top-right
  │  Description text           │
  │  $price                     │
  │  ┌─────────────────────┐    │
  │  │     image (inset)   │    │  ← padded, rounded, NOT touching edges
  │  └─────────────────────┘    │
  └─────────────────────────────┘
*/
const HearthCard = ({ product, tokens, onAdd }) => (
  <div
    className="rounded-2xl flex flex-col p-4"
    style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.cardBorder}` }}
  >
    {/* Top row: name + yellow circle + button */}
    <div className="flex items-start justify-between gap-2 mb-2">
      <h3 className="text-base font-black leading-snug flex-1" style={{ color: tokens.colors.cardPrimaryText }}>
        {product.name}
      </h3>
      <button
        onClick={() => onAdd(product)}
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-85 active:scale-95"
        style={{ backgroundColor: tokens.colors.addButtonBg, color: tokens.colors.addButtonText }}
      >
        <SafeIcon icon={FiIcons.FiPlus} className="text-base font-black" />
      </button>
    </div>

    {/* Description */}
    <p className="text-xs leading-relaxed mb-3" style={{ color: tokens.colors.cardDescriptionText }}>
      {product.description}
    </p>

    {/* Price */}
    <span className="text-base font-black mb-3" style={{ color: tokens.colors.cardPriceText }}>
      {formatCurrency(product.price)}
    </span>

    {/* Inset image — padded, rounded, NOT touching card edges */}
    <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
      <img
        src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const PopularPicks = () => {
  const { tokens, sectionsConfig, products, addToCart } = useHearth();
  const section = sectionsConfig.find(s => s.id === 'popular');
  if (!section?.content) return null;
  const { title, subtitle } = section.content;
  const displayProducts = products?.length > 0 ? products.slice(0, 4) : PLACEHOLDER;

  return (
    <section className="py-14" style={{ backgroundColor: tokens.colors.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-1" style={{ color: tokens.colors.primaryText }}>{title}</h2>
        {subtitle && <p className="text-sm mb-8" style={{ color: tokens.colors.mutedText }}>{subtitle}</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayProducts.map((product, i) => (
            <HearthCard key={product.id || i} product={product} tokens={tokens} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPicks;
