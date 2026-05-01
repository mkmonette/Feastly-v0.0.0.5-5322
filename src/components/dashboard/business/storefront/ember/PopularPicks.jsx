import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useEmber } from './EmberContext';
import { formatCurrency } from '@/common/currency';

const PLACEHOLDER = [
  { id: 'p1', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce', price: 12.99, image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg' },
  { id: 'p2', name: 'Artisan Pepperoni', description: 'Classic pepperoni with mozzarella on hand-tossed dough', price: 18.00, image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg' },
  { id: 'p3', name: 'Cobb Salad', description: 'Grilled chicken, bacon, eggs, avocado, and blue cheese', price: 14.99, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
  { id: 'p4', name: 'Chocolate Brownie', description: 'Warm fudgy brownie with vanilla ice cream', price: 7.99, image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg' }
];

/* Ember card: dark card, full-width image on top, dark body: name, full desc, price + dark pill "+ Add" */
const EmberCard = ({ product, tokens, onAdd }) => (
  <div
    className="rounded-xl overflow-hidden flex flex-col"
    style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.cardBorder}` }}
  >
    <img
      src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
      alt={product.name}
      className="w-full object-cover"
      style={{ height: 170 }}
    />
    <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
      <h3 className="text-base font-bold leading-snug" style={{ color: tokens.colors.primaryText }}>
        {product.name}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: tokens.colors.descriptionText }}>
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-base font-black" style={{ color: tokens.colors.primaryText }}>
          {formatCurrency(product.price)}
        </span>
        <button
          onClick={() => onAdd(product)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80 active:scale-95"
          style={{
            backgroundColor: tokens.colors.buttonPrimary,
            color: tokens.colors.buttonText,
            border: `1px solid ${tokens.colors.buttonBorder}`
          }}
        >
          <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
          Add
        </button>
      </div>
    </div>
  </div>
);

const PopularPicks = () => {
  const { tokens, sectionsConfig, products, addToCart } = useEmber();
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
            <EmberCard key={product.id || i} product={product} tokens={tokens} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPicks;
